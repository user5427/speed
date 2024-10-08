import React, { useState, useEffect } from 'react';
import "../styles/exerciseStyle.css"; 
import { Row, Col, Button } from 'react-bootstrap';
import Slider from '@mui/material/Slider';
import { VscDebugStart } from "react-icons/vsc";
import { FaQuestion } from "react-icons/fa6";
import QuestionComponent from '../.components/Exercise/QuestionComponent.js';

const Exercise = () => {
    const valuetext = (value) => `${value}`;

    const text = "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.";
    const subject = "Biology";
    const category = "Plants";
    const part = 1;
    const outOf = 3;

    const startWords = "Press Go to begin";
    const endWords = "― H. Jackson Brown Jr., P.S. I Love You";

    const words = text.split(" ");
    const [inputValue, setInputValue] = useState(238); // Track WPM value
    const [currentWordIndex, setCurrentWordIndex] = useState(0); // Index of the current word
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);
    const [questionButtonClicked, setQuestionButtonClicked] = useState(false); // New state variable
    const [feedbackMessage, setFeedbackMessage] = useState(''); // New state variable to show feedback after submission

    const avgReadingSpeed = 238;
    const worldRecordWPM = 25000;
    const correctAnswer = "leaves";
    //TODO MAKE NOT HARD CODED

    // Convert linear value to logarithmic and round
    const linearToLog = (value) => {
        return Math.round(Math.pow(10, value / 100));
    };

    // Convert logarithmic value to linear and round
    const logToLinear = (value) => {
        return Math.round(Math.log10(value) * 100);
    };

    // The flashing words loop
    useEffect(() => {
        if (!started) return;

        const wpm = Math.min(parseInt(inputValue) || avgReadingSpeed, worldRecordWPM); // Get WPM value, check if it doesn't exceed max
        const intervalTime = 60000 / wpm; // Convert WPM to milliseconds, default 238 WPM (average)

        const interval = setInterval(() => {
            setCurrentWordIndex((prevIndex) => {
                if (prevIndex < words.length) {
                    return prevIndex + 1;
                } else {
                    setFinished(true);
                    clearInterval(interval); // Clear interval when finished
                    return prevIndex;
                }
            });
        }, intervalTime);

        return () => clearInterval(interval); // Prevent memory leaks
    }, [started, inputValue, words.length]);

    // Function to handle displaying the question
    const handleShowQuestion = () => {
        setShowQuestion(true);
        setQuestionButtonClicked(true); // Disable the button when clicked
    };

    // Function to handle question submission
    const handleQuestionSubmit = (selectedAnswer) => {
        if (selectedAnswer === correctAnswer) {
            setFeedbackMessage("Correct!");
        } else {
            setFeedbackMessage("Incorrect! The correct answer is 'Leaves'.");
        }
    };

    return (
        <>
            <div className='mainContainer'>
                <Row style={{ marginTop: '10px', marginBottom: '10px', color: 'grey' }}>
                    <Col><h3>{subject}</h3></Col>
                    <Col style={{ textAlign: 'center', color: '#cccccc' }}><h3>{category}</h3></Col>
                    <Col><h3 style={{ textAlign: 'right' }}>{part}/{outOf}</h3></Col>
                </Row>

                <div className='exerciseWindow'>
                    <p className="singleWord">
                        {started ? words[currentWordIndex] : startWords}
                        {finished ? endWords : ""}
                    </p>
                </div>

                <Row style={{ marginTop: '25px', marginBottom:'10px' }}>
                    <Col xs={12} md={2}>
                        <Button
                            className='subjectButtons'
                            size="lg"
                            style={{ backgroundColor: '#739900', borderColor: '#608000' }}
                            onClick={() => setStarted(true)}
                            disabled={started}
                        >
                            Start<VscDebugStart style={{ marginTop: '-3px' }} />
                        </Button>
                    </Col>

                    <Col>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                            <Slider
                                aria-label="WPM Slider"
                                value={logToLinear(inputValue)} // Bind the logarithmic value
                                onChange={(e, newValue) => setInputValue(Math.min(linearToLog(newValue), worldRecordWPM))} // Update WPM using the logarithmic value, capped at worldRecordWPM
                                getAriaValueText={valuetext}
                                color="secondary"
                                min={logToLinear(50)} // Minimum WPM in log scale
                                max={logToLinear(worldRecordWPM)} // Maximum WPM in log scale
                                style={{ marginRight: '20px' }}
                            />
                            <input
                                type="number"
                                value={inputValue}
                                onChange={(e) => {
                                    const newValue = Math.min(Math.max(Math.round(e.target.value), 50), worldRecordWPM); // Cap input value between 50 and worldRecordWPM
                                    setInputValue(newValue);
                                }}
                                placeholder={avgReadingSpeed}
                                className="form-control"
                                disabled={started}
                                style={{ marginLeft: '5px', width: "100px" }}
                            />
                            <span style={{ marginLeft: '10px' }}>WPM</span>
                        </div>
                    </Col>
                    <Col>
                        <Button
                            className='subjectButtons'
                            size="lg"
                            style={{ backgroundColor: '#e67300', borderColor: '#994d00' }}
                            onClick={handleShowQuestion} // When this button is clicked, shows the question
                            disabled={!finished || questionButtonClicked}
                        >
                            <FaQuestion style={{ marginTop: '-3px' }} /> Go to question
                        </Button>
                    </Col>
                </Row>


            </div>

            {showQuestion && (
                <div className='mainContainer'>
                    <QuestionComponent onSubmit={handleQuestionSubmit} />
                </div>
            )}

            {feedbackMessage && (
                    <div className='mainContainer' style={{color: feedbackMessage.includes("Correct") ? '#a6ff4d' : '#ff6666' }}>
                        <Row>
                            <Col><h4>{feedbackMessage}</h4></Col>
                            <Button
                                className='subjectButtons'
                                size="lg"
                                style={{ marginRight: '12px', backgroundColor: '#cc0066', borderColor: '#99004d', width:'200px'}}
                                >Continue 
                            </Button>
                        </Row>
                    </div>
            )}
        </>
    );
};

export default Exercise;
