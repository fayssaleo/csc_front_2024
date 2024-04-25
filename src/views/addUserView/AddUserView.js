import { useState } from "react"
import { Button, Card, CardBody, CardHeader, FormGroup, Input, Label } from "reactstrap"
import WeclomeComponent from "../../components/welcomeComponent/WelcomeComponent"
import loginService from "../../services/LoginService"
import './AddUserView.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUserView = props => {
    const [passwordType, setPasswordType] = useState('password')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('USER')
    const [emailExists, setEmailExists] = useState(false)

    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = useState('Invalid email')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('Invalid password')

    const clearErrorFields = () => {
        setFirstNameError(false);
        setLastNameError(false);
        setEmailError(false);
        setPasswordError(false);
    }
    const checkEmail = async () => {
        loginService.loginEmailExists(email)
            .then(response => setEmailExists(response))
    }

    const validateForm = () => {

        if(!firstName.match("^[a-zA-Z]+$")) {
            setFirstNameError(true)
            return
        }
        else if(!lastName.match("^[a-zA-Z]+$")) {
            setLastNameError(true)
            return
        }
        else if(!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setEmailError(true)
            setEmailErrorMessage('Enter a valid email')
            return
        }
        else if (emailExists) {
            setEmailError(true)
            setEmailErrorMessage('This email already exists')
            return
        }
        else if (!password.match("^[A-Z]([a-z]*([0-9])+([@$!%*#?&])+)+$") || password.length < 6) {
            setPasswordError(true)
            setPasswordErrorMessage('Your password must contain at least 6 characters must begin with a capital letter contain at least one number and one special character')
            return
        }
        else if (password !== confirmPassword) {
            setPasswordError(true)
            setPasswordErrorMessage('Passwords does not match')
        }
        else {
            let user = {firstName,lastName,email,password,role}
            loginService.addUser(user)
            .then(() => {
                toast.success('User added successfully')
                setTimeout(() => {
                    props.history.push('/home/showallusers')
                },1000)
            })
        }

    }

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
                        <Input type="text" onChange={e => { clearErrorFields(); setFirstName(e.target.value) }} />
                    </FormGroup>
                    {lastNameError && <FormGroup row>
                        <span className="error-message"><strong>Enter a valid last name</strong></span>
                    </FormGroup>}
                    <FormGroup>
                        <Label>Last Name</Label>
                        <Input type="text" onChange={e => { clearErrorFields(); setLastName(e.target.value) }} />
                    </FormGroup>
                    {emailError && <FormGroup row>
                        <span className="error-message"><strong>{emailErrorMessage}</strong></span>
                    </FormGroup>}
                    <FormGroup>
                        <Label>Email</Label>
                        <Input type="email" onChange={e => { clearErrorFields(); setEmail(e.target.value) }} onBlur={checkEmail()} />
                    </FormGroup>
                    {passwordError && <FormGroup row>
                        <span className="error-message"><strong>{passwordErrorMessage}</strong></span>
                    </FormGroup>}
                    <FormGroup>
                        <Label>Password</Label>
                        <Input type={passwordType} onChange={e => { clearErrorFields(); setPassword(e.target.value) }} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Confirm Password</Label>
                        <Input type={passwordType} onChange={e => { clearErrorFields(); setConfirmPassword(e.target.value) }} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Role</Label>
                        <Input type="select" onChange={e => setRole(e.target.value)} >
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
                        <Button color="primary" onClick={validateForm}>Add User</Button>

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

export default AddUserView