import { useEffect, useState } from "react"
import { Button, Card, Form, FormGroup, CardHeader, CardBody, Label, Input } from 'reactstrap'
import './LoginView.css'
import { Redirect } from 'react-router-dom'
import { setLogin } from '../../redux/actions/loginAction'
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay'
import jsonWebToken from 'jsonwebtoken'
import loginService from '../../services/LoginService'
import 'react-toastify/dist/ReactToastify.css';
import WeclomeComponent from "../../components/welcomeComponent/WelcomeComponent"



const LoginView = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [active, setActive] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)
    const [isTokenChecked, setTokenChecked] = useState(false)
    const [passwordType, setPasswordType] = useState('password')


    const handleCheck = event => {
        event.target.checked ? setPasswordType('text') : setPasswordType('password')
    }

    const handleSubmit = event => {
        event.preventDefault()
        setActive(true)
        const login = { email, password };
        loginService.addAuthentication(login)
            .then(loginToken => {
                localStorage.setItem('token', loginToken.token)
                const { exp, iat, ...login } = jsonWebToken.decode(loginToken.token)
                props.store.dispatch(setLogin(login))
                setTimeout(() => {
                    props.history.push('/home/welcome')
                }, 500)

            })
            .catch(() => {
                setActive(false)
                toast.error("Email ou mot de passe incorrect")
            })
    }

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            loginService.isTokenValid()
                .then(() => setAuthenticated(true))
                .catch(() => {
                    setAuthenticated(false)
                    localStorage.removeItem('token')
                    localStorage.removeItem('persist:root')
                })
                .then(() => setTokenChecked(true))
        }
        else {
            setTokenChecked(true)
        }
    }, [authenticated, isTokenChecked])

    if (!isTokenChecked) {
        return <LoadingOverlay />
    }
    else if (authenticated) {
        return <Redirect to='/home/welcome' />
    }

    return (
        <>
            <div id="login-content">
                <WeclomeComponent title='Tanger Alliance container storage and particular services calculator' style={{ marginTop: '5%' }} />
                <div id="container">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <div className="login">
                                <Card>
                                    <LoadingOverlay
                                        active={active}
                                        spinner
                                        text='Veuillez patientez...'
                                    >
                                        <CardHeader tag="h5">Sign in </CardHeader>
                                        <CardBody>
                                            <Form onSubmit={handleSubmit}>
                                                <FormGroup>
                                                    <Label>Email</Label>
                                                    <Input type="email" onChange={e => setEmail(e.target.value)} />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Password</Label>
                                                    <Input id="password" type={passwordType} onChange={e => setPassword(e.target.value)} />
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label className="form-check-label">
                                                        <Input type="checkbox" onChange={handleCheck} />
                                                        Show Password
                                                        <span className="form-check-sign">
                                                            <span className="check"></span>
                                                        </span>
                                                    </Label>
                                                </FormGroup>
                                                <div id="wrapper">
                                                    <Button color="primary" type="submit" id="submit">Sign in</Button>
                                                </div>

                                            </Form>
                                        </CardBody>
                                    </LoadingOverlay>
                                </Card>
                            </div>
                        </div>
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
                </div>
            </div>
        </>
    )
}

export default LoginView