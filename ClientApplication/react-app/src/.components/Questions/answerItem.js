import { ValidationPatternConstants } from '../../.constants/MainConstants';
import { React, useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { MdDelete } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";

const AnswerItem = ({ index, articleText, sendBackText, deleteAnswer, setCorrect, correctAnswerIndex }) => {
    const [validated, setValidated] = useState(false);
    const [text, setText] = useState(articleText);

    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal

    const handleSave = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }
    }

    const handleFieldChange = (event) => {
        const { name, value } = event.target;

        setText(value);

        sendBackText(index, value);
    }

    return (
        <>
            <Row style={{ marginBottom: '10px', marginTop: '10px' }} >
                <Col xs={12} md={12} >
                    <Form.Group controlId="answer">
                        <Form.Label>
                            Answer {index + 1} {correctAnswerIndex === index ? <GiConfirmed /> : null}
                        </Form.Label>
                        <Form.Control
                            name="answer"
                            as="textarea"
                            rows={3}
                            required
                            type="text"
                            placeholder="Enter answer"
                            onChange={handleFieldChange}
                            onInput={handleFieldChange}
                            pattern={ValidationPatternConstants.QuestionTextPattern.source}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter an answer.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="d-flex justify-content-between align-items-center" style={{ marginBottom: '10px', marginTop: '10px' }}>
                <Col xs={12} md={2}>
                    <Button variant="primary" onClick={() => setCorrect(index)}>
                        <GiConfirmed /> Correct
                    </Button>
                </Col>
                <Col xs={12} md={2}>
                    <Button variant="danger" onClick={() => deleteAnswer(index)}>
                        <MdDelete /> Delete
                    </Button>
                </Col>
            </Row>

        </>
    );
}

export default AnswerItem;