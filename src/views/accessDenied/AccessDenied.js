import React from 'react'
import WeclomeComponent from '../../components/welcomeComponent/WelcomeComponent';
import './AccessDenied.css'

const AccessDenied = () => {
    return (
        <div className="access-denied">
            <WeclomeComponent title='' />
            <h1 id="title" >403</h1>
            <h1 id="title">Access Denied !</h1>
            {/* <div id="message">
                <span>You are not authorized to acceed this page</span>
            </div> */}
        </div>
    )
}

export default AccessDenied;