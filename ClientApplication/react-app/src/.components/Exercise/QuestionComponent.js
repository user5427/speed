import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import Divider from '@mui/material/Divider';

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const QuestionComponent = ({ question, options = [], onSubmit, currentParagraphIndex }) => {
    const [shuffledOptions, setShuffledOptions] = useState([]); // Store shuffled options
    const [selectedAnswer, setSelectedAnswer] = useState(''); // Track selected answer
    const [submitted, setSubmitted] = useState(false); // Track if the user has submitted the answer

    // Shuffle the options only once when the component is first rendered
    useEffect(() => {
        setShuffledOptions(shuffleArray([...options])); // Shuffle options when the component mounts
    }, []); // Empty dependency array ensures this runs only once after the first render

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
                    <h3>{currentParagraphIndex + 1}. {question}</h3>
                </Col>
            </Row>
            <Divider variant="middle" style={{ margin: '13px 0', backgroundColor: '#ccc', borderBottomWidth: 3 }} />
            <ul 
                style={{
                    listStyleType: 'none', 
                    paddingLeft: 0, 
                    marginLeft: "15px",
                    pointerEvents: submitted ? 'none' : 'auto' // Disable list interaction on submit
                }}
            >
                {shuffledOptions.map((option, index) => (
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
