import { Modal, Button } from 'react-bootstrap';
import React from 'react';

const ErrorPopup = ({ showErrorModal, errorMessage, onClose }) => {
    return (
        <Modal show={showErrorModal} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>{errorMessage}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ErrorPopup;
