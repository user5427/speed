import React from 'react';
import { Modal } from 'react-bootstrap';

const CreateTestModel = (props) => {



    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Test</Modal.Title>    
                </Modal.Header>    

                <Modal.Body>
                    <div>this is Body</div>
                </Modal.Body>
            </Modal>        
        </>
    )
}

export default CreateTestModel;