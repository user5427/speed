import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import '../../styles/errorPopup.css';
const DeletePopup = ({ showErrorModal, errorMessage, onClose, onDelete, type }) => {
    return (
        <Modal show={showErrorModal} onHide={onClose} centered>
            <div className='error-popup'>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Row>
                        <Col>
                            <Button variant="secondary" onClick={onClose}>
                                Close
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="delete" onClick={onDelete(type)}>
                                Close
                            </Button>
                        </Col>
                    </Row>


                </Modal.Footer>
            </div>
        </Modal>
    );
};

export default DeletePopup;
