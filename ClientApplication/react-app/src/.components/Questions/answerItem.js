import { ValidationPatternConstants } from '../../.constants/MainConstants';
import { React, useState, useEffect } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { MdDelete } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";

const AnswerItem = ({ index, articleText, sendBackText, deleteAnswer, setCorrect, correctAnswerIndex }) => {
    const [validated, setValidated] = useState(false);
    const [text, setText] = useState(""); //

    useEffect(() => {
        setText(articleText)
    }, [articleText])

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
                            Answer {index + 1} {correctAnswerIndex === index ? <span style={{ color: '#b5ffbb' }}><GiConfirmed /></span> : null}
                        </Form.Label>
                        <Form.Control
                            name="answer"
                            as="textarea"
                            value={text}
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
            <Row className="no-gutters d-flex justify-content-between align-items-center" style={{ marginBottom: '10px', marginTop: '10px' }}>
                <Col xs={12} md={3}>
                    <Button variant="success" onClick={() => setCorrect(index)}>
                        <GiConfirmed /> Correct
                    </Button>
                </Col>
                <Col xs={12} md={3}>
                    <Button variant="danger" onClick={() => deleteAnswer(index)}>
                        <MdDelete /> Delete
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default AnswerItem;