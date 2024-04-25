import SucessIcon from '../sucessIcon/SucessIcon'
import React from 'react'
import { Modal, ModalBody, ModalFooter,Row } from 'reactstrap'
import Container from 'reactstrap/lib/Container'
import './MessageModal.css'

const MessageModal = (props) => {
    return (
        <Modal
            {...props}
            isOpen={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ModalBody>
                <Container>
                    <Row>
                        <SucessIcon />
                    </Row>
                    <Row>
                        <p>{props.body}</p>
                        
                    </Row>
                </Container>

            </ModalBody>
            <ModalFooter>
            {props.footer}
            </ModalFooter>
        </Modal>
    )
}

export default MessageModal
