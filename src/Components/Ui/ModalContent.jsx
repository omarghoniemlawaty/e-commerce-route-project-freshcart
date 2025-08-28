import React from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalContents = ({content , show , setShow}) => {
      const handleClose = () => setShow(false);
      
  return (
           <Modal 
            show={show}
             onHide={handleClose}
             className="d-flex align-items-center"
           >
             <Modal.Header closeButton>
               <Modal.Title>Modal heading</Modal.Title>
             </Modal.Header>
             <Modal.Body>
               <div className="d-flex justify-content-between align-items-center">
                 <h1>{content.name}</h1>
                 <img src={content.image} width={200} height={200} alt="close" />
               </div>
             </Modal.Body>
             <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                 Close
               </Button>
             </Modal.Footer>
           </Modal>
  )
}

export default ModalContents
