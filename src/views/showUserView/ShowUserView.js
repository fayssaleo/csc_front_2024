import { Col, Container, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import { getRoleNomination } from "../../utils/fixtures"

const ShowUserView = props => {
    return(<>
                    <Modal
                    {...props}
                    isOpen={props.show}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                        <ModalHeader toggle={props.handleClose}>User Infos</ModalHeader>
                        <ModalBody>
                        <Container>
                 <Row className='sp-container'>
                     <Col><strong>First Name</strong></Col>
                     <Col>{props.user.firstName}</Col>
                 </Row>
                 <Row className='sp-container'>
                     <Col><strong>Last Name</strong></Col>
                     <Col>{props.user.lastName}</Col>
                 </Row>
                 <Row className='sp-container'>
                     <Col><strong>Email</strong></Col>
                     <Col>{props.user.email}</Col>
                 </Row>
                 <Row className='sp-container'>
                     <Col><strong>Role</strong></Col>
                     <Col>{getRoleNomination(props.user.role)}</Col>
                 </Row>
                 
             </Container>
                        </ModalBody>

                    </Modal>

    </>)
}
export default ShowUserView
