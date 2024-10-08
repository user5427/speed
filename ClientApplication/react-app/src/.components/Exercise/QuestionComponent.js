import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import Divider from '@mui/material/Divider';

const QuestionComponent = ({ question, options = [], onSubmit }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(''); // Track selected answer
    const [submitted, setSubmitted] = useState(false); // Track if the user has submitted the answer

    // Handle answer selection
    const handleAnswerChange = (e) => {
        setSelectedAnswer(e.target.value);
    };

    const handleSubmit = () => {
        setSubmitted(true); // Disable the button after submission
        onSubmit(selectedAnswer); // Pass the selected answer to the parent component
    };

    return (
        <div className="questionContainer">
            <Row>
                <Col>
                    <h3>{question}</h3> {/* Use the dynamic question */}
                </Col>
            </Row>
            <Divider variant="middle" style={{ margin: '20px 0', backgroundColor: '#ccc', borderBottomWidth: 4 }} />
            <ul 
                style={{
                    listStyleType: 'none', 
                    paddingLeft: 0, 
                    marginLeft: "15px",
                    pointerEvents: submitted ? 'none' : 'auto' // Disable list interaction on submit
                }}
            >
                {options.map((option, index) => (
                    <li key={index}>
                        <input
                            type="radio"
                            name="answer"
                            value={option}
                            onChange={handleAnswerChange}
                            checked={selectedAnswer === option}
                        /> {option}
                    </li>
                ))}
            </ul>
            <Button
                className='subjectButtons'
                size="lg"
                style={{ marginTop: "10px", backgroundColor: '#2eb8b8', borderColor: '#248f8f' }}
                onClick={handleSubmit} // Call the handleSubmit when user submits
                disabled={submitted || !selectedAnswer} // Disable the button if already submitted or if no answer selected
            >
                Submit Answer
            </Button>
        </div>
    );
};


export default QuestionComponent;
