import { useEffect, useRef, useState } from "react"
import { Button, Card, CardBody, CardHeader, FormGroup, Input, Label } from "reactstrap"
import WeclomeComponent from "../../components/welcomeComponent/WelcomeComponent"
import loginService from "../../services/LoginService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditUserView = props => {
    const [changePassword, setChangePassword] = useState(false)
    const [passwordType, setPasswordType] = useState('password')
    const [id,setId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('USER')
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('Invalid password')

    const clearErrorFields = () => {
        setFirstNameError(false);
        setLastNameError(false);
        setPasswordError(false);
    }
    const handleEnablingPasswordChange = event => {
        if (event.target.checked) {
            setChangePassword(true)
        }
        else {
            setChangePassword(false)
            setPassword('')
            setConfirmPassword('')
            setPasswordError(false)
        }
    }
    const validateForm = () => {

        if (!firstName.match("^[a-zA-Z]+$")) {
            setFirstNameError(true)
            return
        }
        else if (!lastName.match("^[a-zA-Z]+$")) {
            setLastNameError(true)
            return
        }
        else if (changePassword && (!password.match("^[A-Z]([a-z]*([0-9])+([@$!%*#?&])+)+$") || password.length < 6)) {
            setPasswordError(true)
            setPasswordErrorMessage('Your password must contain at least 6 characters must begin with a capital letter contain at least one number and one special character')
            return
        }
        else if (changePassword && (password !== confirmPassword)) {
            setPasswordError(true)
            setPasswordErrorMessage('Passwords does not match')
        }
        else {
            let user = { id, firstName, lastName, email, password, role }
            loginService.editUser(user)
            .then(() => {
                toast.success('User modified successfully')
                setTimeout(() => {
                    props.history.push('/home/showallusers')
                },1000) 
            })
        }
    }
    const usePrevious = value => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }
    const prevProps = usePrevious(props);

    useEffect(() => {
        if (prevProps !== props) {
            loginService.getLoginById(props.match.params.id)
                .then(user => {
                    setId(user.id)
                    setFirstName(user.firstName)
                    setLastName(user.lastName)
                    setEmail(user.email)
                    setRole(user.role)
                })
        }

    })

    return (<>
        <WeclomeComponent title='Tanger Alliance Storage and Particular services calculator' />
        <div className="change-password">
            <Card>
                <CardHeader tag="h5">Add a new user</CardHeader>
                <CardBody>
                    {firstNameError && <FormGroup row>
                        <span className="error-message "><strong>Enter a valid first name</strong></span>
                    </FormGroup>}
                    <FormGroup>
                        <Label>First Name</Label>
                        <Input type="text" onChange={e => { clearErrorFields(); setFirstName(e.target.value) }} defaultValue={firstName} />
                    </FormGroup>
                    {lastNameError && <FormGroup row>
                        <span className="error-message"><strong>Enter a valid last name</strong></span>
                    </FormGroup>}
                    <FormGroup>
                        <Label>Last Name</Label>
                        <Input type="text" onChange={e => { clearErrorFields(); setLastName(e.target.value) }} defaultValue={lastName} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input type="email" onChange={e => { clearErrorFields(); setEmail(e.target.value) }} defaultValue={email} disabled />
                    </FormGroup>
                    {passwordError && <FormGroup row>
                        <span className="error-message"><strong>{passwordErrorMessage}</strong></span>
                    </FormGroup>}
                    <FormGroup>
                        <FormGroup style={{ marginBottom: '1%' }} check>
                            <Label className="form-check-label">
                                <Input type="checkbox" onChange={handleEnablingPasswordChange} />
                                Change Password
                                <span className="form-check-sign">
                                    <span className="check"></span>
                                </span>
                            </Label>
                        </FormGroup>
                        <Label>Password</Label>
                        <Input type={passwordType} onChange={e => { clearErrorFields(); setPassword(e.target.value) }} disabled={!changePassword} value={password} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Confirm Password</Label>
                        <Input type={passwordType} onChange={e => { clearErrorFields(); setConfirmPassword(e.target.value) }} disabled={!changePassword} value={confirmPassword} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Role</Label>
                        <Input type="select" onChange={e => setRole(e.target.value)} value={role} >
                            <option value='USER'>User</option>
                            <option value='ADMIN'>Administrator</option>
                        </Input>
                    </FormGroup>
                    <FormGroup check>
                        <Label className="form-check-label">
                            <Input type="checkbox" onChange={e => e.target.checked ? setPasswordType('text') : setPasswordType('password')} />
                            Show Password
                            <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                        </Label>
                    </FormGroup>
                    <div id="wrapper">
                        <Button color="primary" onClick={validateForm} >Edit User</Button>
                    </div>
                </CardBody>

            </Card>
        </div>
        <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </>)

}

export default EditUserView;