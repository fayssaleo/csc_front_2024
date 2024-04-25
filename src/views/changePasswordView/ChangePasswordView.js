import { useEffect, useState } from 'react'
import loginService from '../../services/LoginService'
import jsonWebToken from 'jsonwebtoken'
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Input, Label } from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom';
import MessageModal from '../../components/messageModal/MessageModal'
import { connect } from 'react-redux';
import { setLogin } from '../../redux/actions/loginAction'
import './ChangePasswordView.css'
import WeclomeComponent from '../../components/welcomeComponent/WelcomeComponent';

const ChangePasswordView = props => {
    const [showPassword, setShowPassword] = useState(false)
    const [active, setActive] = useState(false)
    const [show, setShow] = useState(false)
    const [id, setId] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [oldPasswordError, setOldPasswordError] = useState(false)
    const [newPasswordError, setNewPasswordError] = useState(false)
    const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState('')

    const handleCheck = event => setShowPassword(event.target.checked)

    const checkOldPassword = () => {
        setActive(true)
        const login = { email: props.login.email, password: oldPassword }
        loginService.loginExists(login)
            .then(response => {
                setOldPasswordError(!response)
                setActive(response)
                if (response) passwordMatches()
            })
    }
    const passwordMatches = () => {

        const passwordFormat = "^[A-Z]([a-z]*([0-9])+([@$!%*#?&])+)+$"
        if (!newPassword.match(passwordFormat) || newPassword.length < 6) {
            setActive(false)
            setNewPasswordError(true)
            setNewPasswordErrorMessage('Your password must contain at least 6 characters must begin with a capital letter contain at least one number and one special character')
        }
        else if (newPassword !== confirmPassword) {
            setActive(false)
            setNewPasswordError(true)
            setNewPasswordErrorMessage('Passwords does not match')
        }
        else {
            setNewPasswordError(false)
            changePassword()
        }
    }
    const changePassword = () => {
        const login = { id, firstName: props.login.firstName,lastName: props.login.lastName,email: props.login.email, password: newPassword, role: props.login.role }
        loginService.changePassword(login)
            .then(() => {
                loginService.addAuthentication(login)
                    .then(loginToken => {
                        localStorage.setItem('token', loginToken.token);
                        const { exp, iat, ...login } = jsonWebToken.decode(loginToken.token)
                        props.setLogin(login)
                        setActive(false)
                        setShow(true)
                    })
            })

    }
    useEffect(() => {
        loginService.getLoginByEmail(props.login.email)
            .then(login => setId(login.id))
    })


    return (<>
        <WeclomeComponent title='Tanger Alliance Storage and Particular services calculator' />
        <div className="change-password">
            <LoadingOverlay
                active={active}
                spinner
                text='Veuillez patientez...'>
                <Card>
                    <CardHeader tag="h5">Change Password </CardHeader>
                    <CardBody>
                        <div className="body">
                            <FormGroup row className="change-password-section">
                                <Col sm={3} className="change-password-label">
                                    <Label>Email</Label>
                                </Col>
                                <Col sm={6}>
                                    <Input type="text" name="email" defaultValue={props.login.email} disabled />
                                </Col>
                            </FormGroup>
                            {oldPasswordError && <FormGroup row>
                                <Col className="change-password-label error"><span><strong>Incorrect Password</strong></span></Col>
                            </FormGroup>}
                            <FormGroup row className="change-password-section">
                                <Col sm={3} className="change-password-label">
                                    <Label>Old Password</Label>
                                </Col>
                                <Col sm={6}>
                                    <Input type={showPassword ? 'text' : 'password'} name="oldPassword" onChange={event => setOldPassword(event.target.value)} />
                                </Col>
                            </FormGroup>
                            {newPasswordError && <FormGroup row>
                                <Col className="change-password-label error"><span><strong>{newPasswordErrorMessage}</strong></span></Col>
                            </FormGroup>}
                            <FormGroup row className="change-password-section">
                                <Col sm={3} className="change-password-label">
                                    <Label>New Password</Label>
                                </Col>
                                <Col sm={6}>
                                    <Input type={showPassword ? 'text' : 'password'} name="newPassword" onChange={event => setNewPassword(event.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row className="change-password-section">
                                <Col sm={3} className="change-password-label">
                                    <Label>Confirm password</Label>
                                </Col>
                                <Col sm={6}>
                                    <Input type={showPassword ? 'text' : 'password'} name="confirmPassword" onChange={event => setConfirmPassword(event.target.value)} />
                                </Col>
                            </FormGroup >
                            <FormGroup row className="change-password-section ">
                                <FormGroup check className="change-password-label">
                                    <Label check >
                                        <Input type="checkbox" onChange={handleCheck}  />Show Passwords
                                    </Label>
                                </FormGroup>
                            </FormGroup>
                            <FormGroup row>
                                <div id="wrapper">
                                    <Button color="primary" onClick={() => checkOldPassword()}>Validate</Button>
                                </div>
                            </FormGroup>

                        </div>
                    </CardBody>
                </Card>
            </LoadingOverlay>
        </div>

        <MessageModal show={show} body='Password changed successfully' footer={<Link to='/'>Go back</Link>} />
    </>)
}

const mapStateToProps = state => ({ login: state.login });
const mapDispatchToProps = dispatch => {
    return {
        setLogin: (login) => dispatch(setLogin(login))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordView)