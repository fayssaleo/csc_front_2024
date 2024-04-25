import React, { useEffect, useState } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import { Redirect, Route } from "react-router";
import { store } from "../redux/store/store";
import loginService from '../services/LoginService';


const PrivateRoute = ({component: Component, ...rest }) => {

    const [authenticated,setAuthenticated] = useState(false)
    const [isTokenChecked, setIsTokenChecked] = useState(false)

    useEffect(() => {
        let token = localStorage.getItem("token");
        if(token) {
            loginService.isTokenValid()
                .then(() => setAuthenticated(true))
                .catch(() => {
                    setAuthenticated(false)
                    localStorage.removeItem('token')
                })
                .then(() => setIsTokenChecked(true))
        }
        else {
            setIsTokenChecked(true)
        }
    },[])

 if(!isTokenChecked) return <LoadingOverlay></LoadingOverlay>
 return authenticated ? <Route {...rest} render= { props =>  <Component store={ store } { ...props }/> }/> : <Redirect to='/' />
    
}

export default PrivateRoute