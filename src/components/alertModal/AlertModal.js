import React from 'react'
import LoadingOverlay from 'react-loading-overlay'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const AlertModal = (props) => {
  return (
    <Modal isOpen={props.show}>
      <LoadingOverlay
        active={props.active}
        spinner
        text='Please wait...'
      >
        <ModalHeader className="text-warning" toggle={props.handleClose}>{props.title}</ModalHeader>
        <ModalBody>
         {props.message}
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={props.handleAgree}>Yes</Button>{' '}
          <Button color="danger" onClick={props.handleDisagree}>No</Button>
        </ModalFooter>
      </LoadingOverlay>
    </Modal>
  )
}

export default AlertModal