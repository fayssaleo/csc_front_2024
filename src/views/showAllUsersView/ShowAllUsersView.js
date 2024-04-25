import { useEffect, useRef } from "react"
import { useState } from "react"
import LoadingOverlay from "react-loading-overlay"
import { connect } from "react-redux"
import { Button, Col, Row } from "reactstrap"
import AlertModal from "../../components/alertModal/AlertModal"
import TableContainer from "../../components/table/TableContainer"
import WeclomeComponent from "../../components/welcomeComponent/WelcomeComponent"
import loginService from "../../services/LoginService"
import { userColumns } from "../../utils/fixtures"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ShowAllUsersView.css'
import ShowUserView from "../showUserView/ShowUserView"


const ShowAllUsersView = props => {
    const isMe = id => props.login.id === id
    const [users,setUsers] = useState([])
    const [showAlertModal, setShowAlertModal] = useState(false)
    const [showUserModel,setShowUserModal] = useState(false)
    const [active, setActive] = useState(true)
    const [userId,setUserId] = useState('')
    const [user,setUser] = useState({firstName:'', lastName:'',email:'',role:''})
    
    const handleDelete = id => {
        setShowAlertModal(true)
        setUserId(id)
    }
    const handleEdit = id => {
        props.history.push('/home/edituser/'+id)
    }
    const handleShow = id => {
        loginService.getLoginById(id)
        .then(user => setUser(user))
        setShowUserModal(true)
    }
    const getAllLogins = () => {
        loginService.getAllLogins()
        .then(users => setUsers(users))
    }
    const deleteUser = () => {
         setActive(true)
         loginService.deleteUserById(userId)
         .then(() => {
             setActive(false)
             setShowAlertModal(false)
             toast.success("User deleted successfully")
             getAllLogins()

         })
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
        if(prevProps !== props) {
            getAllLogins()
        }
    })
    return(<>
    <WeclomeComponent title={'Tanger Alliance Storage and Particular services calculator'}/>
    <div id="wrapper">
                    <Button color="success" id="add-user-button" onClick={() => props.history.push('/home/adduser') } ><i class="fas fa-plus"></i></Button>
                </div>
    <Row>
        <Col md={2}></Col>
        <Col md={8}>
        <TableContainer columns={userColumns(isMe,handleShow,handleDelete,handleEdit)} data={users} />
        </Col>
        <Col md={2}></Col>

    </Row>
    <LoadingOverlay
        active={showAlertModal && active}
        spinner
        text='Please wait...'
      >
    <ShowUserView
               show={showUserModel}
               handleClose = {() => setShowUserModal(false)}
               user={user}
               {...props}
    />
    <AlertModal
                show={showAlertModal}
                title='Alert !'
                message='Do you really want to delete this user ?'
                handleAgree={deleteUser}
                handleDisagree={() => setShowAlertModal(false)} />
    </LoadingOverlay>
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
const mapStateToProps = state => ({ login: state.login });

export default connect(mapStateToProps)(ShowAllUsersView)