import { connect } from "react-redux";
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap"
import WeclomeComponent from "../../components/welcomeComponent/WelcomeComponent";
import { getRoleNomination } from "../../utils/fixtures";
import './ShowProfile.css'




const ShowProfileView = props => {
    const {firstName,lastName,email,role} = props.login
    return(<>
    <WeclomeComponent title='Tanger Alliance Storage and Particular services calculator' />
    <div className="change-password">
     <Card>
         <CardHeader tag="h5">My profile</CardHeader>
         <CardBody>
             <Container>
                 <Row className='sp-container'>
                     <Col><strong>First Name</strong></Col>
                     <Col>{firstName}</Col>
                 </Row>
                 <Row className='sp-container'>
                     <Col><strong>Last Name</strong></Col>
                     <Col>{lastName}</Col>
                 </Row>
                 <Row className='sp-container'>
                     <Col><strong>Email</strong></Col>
                     <Col>{email}</Col>
                 </Row>
                 <Row className='sp-container'>
                     <Col><strong>Role</strong></Col>
                     <Col>{getRoleNomination(role)}</Col>
                 </Row>
                 <div id="wrapper" className="sp-container">
                                        <Button color="primary" onClick={() => props.history.push('/home/change')}>Change Password</Button>
                                    </div>
                 
             </Container>

         </CardBody>
     </Card>
     </div>
    </>)
}

const mapStateToProps = state => ({ login: state.login });

export default connect(mapStateToProps)(ShowProfileView)