import { useState } from 'react'
import { Route, Switch } from 'react-router'
import AlertModal from '../components/alertModal/AlertModal'
import Navbar from '../components/navbar/Navbar'
import { signOut } from '../redux/actions/loginAction'
import AddUserView from '../views/addUserView/AddUserView'
import ChangePasswordView from '../views/changePasswordView/ChangePasswordView'
import EditUserView from '../views/editUserView/EditUserView'
import ServiceHomeView from '../views/servicesHomeView/ServiceHomeView'
import ShowAllUsersView from '../views/showAllUsersView/ShowAllUsersView'
import ShowProfileView from '../views/showProfileView/ShowProfile'
import StorageGeneratorView from '../views/storageGeneratorView/StorageGeneratorView'
import StorageHomeView from '../views/storageHomeView/StorageHomeView'
import WeclomeView from '../views/welcomeView/WelcomeView'


const Home = props => {
    const [showAlertModal, setShowAlertModal] = useState(false)
    const logout = () => {
        props.store.dispatch(signOut())
        props.history.push('/')
      }  

    return(
        <>
             <Navbar logout={() => setShowAlertModal(true)} {...props} />
             <Switch>
             <Route exact path="/home/welcome" component={WeclomeView} />
                <Route exact path="/home/home" component={StorageHomeView} />
                <Route exact path="/home/generator" component={StorageGeneratorView} />
                <Route exact path="/home/shome" component={ServiceHomeView} />
                <Route exact path="/home/change" component={ChangePasswordView} />
                <Route exact path="/home/showprofile" component={ShowProfileView} />
                <Route exact path="/home/showallusers" component={ShowAllUsersView} />
                <Route exact path="/home/adduser" component={AddUserView} />
                <Route exact path="/home/edituser/:id" component={EditUserView} />
             </Switch>
             <AlertModal
                show={showAlertModal}
                title='Alert !'
                message='Do you want to logout ?'
                handleAgree={logout}
                handleDisagree={() => setShowAlertModal(false)} />
        </>
    )
}

export default Home 