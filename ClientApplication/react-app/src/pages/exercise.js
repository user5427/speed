import React, { useState, useEffect } from 'react';
import "../styles/exerciseStyle.css"; 
import { Row, Col, Button } from 'react-bootstrap';
import Slider from '@mui/material/Slider';
import { VscDebugStart } from "react-icons/vsc";
import { FaQuestion } from "react-icons/fa6";
import { QuestionComponent } from '../.components/.MainComponentsExport';
import { useNavigate } from 'react-router-dom';
import { IoReturnUpBackSharp } from "react-icons/io5";
import { Table } from 'react-bootstrap';



const Exercise = () => {
    const navigate = useNavigate();

    const redirectToCategories = () => {
        navigate('/categories');
    };

    const valuetext = (value) => `${value}`;

    // Paragraphs array from the database
    const paragraphs = [
        "The secret to a blueberry’s hue is in the structure of its wax coat. \n Waxy coverings on blue-colored fruits such as blueberries, grapes and some plums contain nanostructures that scatter blue and ultraviolet light, researchers report February 7 in Science Advances. That makes these fruits look blue to people. Birds — capable of seeing UV light — probably see such delicious snacks as blue-UV.",
        "Blue is not a common color in nature. And while there are some known blue fruits, few contain pigments in that shade. Blueberries, for instance, contain a heaping amount of anthocyanin, a skin pigment that should give each sphere a dark red color. \n But structures in the fruits’ waxy outer layers can create their own blues. Devising ways to mimic a blueberry’s color-forming coating might one day provide a new way to give plastics or makeup a blue tint. “Using this kind of coloring is cool because it doesn’t stain,” says Rox Middleton, a physicist at the University of Bristol in England and Dresden University of Technology in Germany.",
        "To better understand what is special about the berries’ waxy coverings, Middleton and colleagues looked at a variety of fruits under a scanning electron microscope. The resulting images showed an assortment of tiny molecular structures. Additional optical experiments revealed that all the structures scatter blue and UV light. \n “When you rub the outside of a blueberry and take this outside layer of wax off,” Middleton says, “then you can see underneath is completely dark.” \n The team also managed to re-create this effect in the lab. Wax from Oregon grapes became transparent when it was dissolved with chloroform. When the wax recrystallized after being spread on a black card, the layer regained its blue hue."
    ];

    // Questions array corresponding to each paragraph
    const questions = [
        {
            question: "Waxy coverings on blue-colored fruits such as blueberries, grapes and some plums contain nanostructures that scatter what light?",
            correctAnswer: "Blue and ultraviolet light",
            options: ["Cyan and ultraviolet light", "Blue and alpha light", "Blue and gamma light", "Blue and ultraviolet light"] 
        },
        {
            question: "Structures in the fruits’ waxy outer layers can create their own blues. Thus, this kind of coloring ...?",
            correctAnswer: "Doesn't stain",
            options: ["Is also tasty", "Is eco-friendly", "Looks cool", "Doesn't stain"]
        },
        {
            question: "What was used to make wax from Oregon grapes transparent?",
            correctAnswer: "Chloroform",
            options: ["Chloroform", "Ammonium", "Caesium", "Calcium"]
        }
    ];

    const subject = "Biology";
    const title = "Here’s why blueberries are blue";
    const author = "Erin Garcia de Jesús";
    const source = "https://shorturl.at/4H1md";
    const publisher = "ScienceNews";

    const avgReadingSpeed = 238;
    const worldRecordWPM = 25000;

    const [inputValue, setInputValue] = useState(238); // Track WPM value
    const [currentWordIndex, setCurrentWordIndex] = useState(0); // Index of the current word
    const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0); // Track current paragraph
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);
    const [questionButtonClicked, setQuestionButtonClicked] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [articleCompleted, setArticleCompleted] = useState(false); // New state for article completion
    const [timePerParagraph, setTimePerParagraph] = useState([]); // Array to store time for each paragraph
    const [startTime, setStartTime] = useState(null); // Track the start time of a paragraph
    const [answersCorrectness, setAnswersCorrectness] = useState([]); // Array to store correctness per paragraph


    const linearToLog = (value) => Math.round(Math.pow(10, value / 100));
    const logToLinear = (value) => Math.round(Math.log10(value) * 100);

    const words = paragraphs[currentParagraphIndex].split(" ");

// Word reveal loop for each paragraph
useEffect(() => {
    if (!started || finished) return;

    const wpm = Math.min(parseInt(inputValue) || avgReadingSpeed, worldRecordWPM);
    const intervalTime = 60000 / wpm; // Convert WPM to milliseconds

    // Record the start time when the paragraph starts
    if (!startTime) {
        setStartTime(Date.now());
    }

    const interval = setInterval(() => {
        setCurrentWordIndex((prevIndex) => {
            if (prevIndex < words.length) {
                return prevIndex + 1;
            } else {
                clearInterval(interval); // Finish current paragraph
                setFinished(true); // Mark paragraph as finished

                // Calculate the time taken to finish the paragraph
                const endTime = Date.now();
                const timeTaken = (endTime - startTime) / 1000; // Time in seconds
                
                
                setTimePerParagraph([...timePerParagraph, timeTaken]);

                return prevIndex;
            }
        });
    }, intervalTime);

    return () => clearInterval(interval); // Cleanup
}, [started, inputValue, words.length, startTime, timePerParagraph, finished]);


    // Move to the next paragraph or display question
    const handleNextParagraphOrQuestion = () => {
        if (currentParagraphIndex < paragraphs.length - 1) {
            // Move to next paragraph
            setCurrentParagraphIndex(currentParagraphIndex + 1);
            setCurrentWordIndex(0);
            setStarted(false); // Reset to start new paragraph
            setFinished(false);
            setQuestionButtonClicked(false);
            setShowQuestion(false); // Hide question for new paragraph
            setFeedbackMessage(""); // Reset feedback
            setStartTime(null); // Reset start time for the new paragraph
        } else {
            // All paragraphs are finished
            setArticleCompleted(true); // Mark article as completed
        }
    };

    const handleShowQuestion = () => {
        setShowQuestion(true);
        setQuestionButtonClicked(true);
    };

    const handleQuestionSubmit = (selectedAnswer) => {
        const correctAnswer = questions[currentParagraphIndex].correctAnswer;
        const isCorrect = selectedAnswer === correctAnswer;
    
        // Update the answersCorrectness array
        setAnswersCorrectness((prevAnswers) => [
            ...prevAnswers,
            isCorrect,
        ]);
    
        if (isCorrect) {
            setFeedbackMessage("Correct!");
        } else {
            setFeedbackMessage(`Incorrect! The correct answer was '${correctAnswer}'.`);
        }
    };
    

// Inside the articleCompleted section
if (articleCompleted) {
    return (
        <div className="mainContainer" style={{ textAlign: 'left' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>Exercise Completed!</h1>
                <h4 style={{ textAlign: 'left' }}>Results:</h4>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Paragraph nr</th>
                            <th>Time (seconds)</th>
                            <th>Answers</th> {}
                        </tr>
                    </thead>
                    <tbody>
                        {timePerParagraph.map((time, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{time.toFixed(1)}s</td>
                                <td>{answersCorrectness[index] ? "Correct" : "Incorrect"}</td> {/* Display correctness */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Row>
                <Col>
                
                </Col>
            </Row>

            <Button
                className='subjectButtons'
                size="lg"
                style={{ backgroundColor: '#cca300', borderColor: '#b38f00' }}
                onClick={redirectToCategories}
            >
                <IoReturnUpBackSharp style={{ marginTop: '-4px' }} /> Go back to categories
            </Button>
        </div>
    );
}



    return (
        <>
            <div className='mainContainer'>
                <Row style={{ marginTop: '10px', marginBottom: '10px', color: 'grey' }}>
                    <Col><h3>{subject}</h3></Col>
                    <Col style={{ textAlign: 'center', color: '#d9d9d9' }}><h3>{title}</h3></Col>
                    <Col><h3 style={{ textAlign: 'right' }}>{currentParagraphIndex + 1}/{paragraphs.length}</h3></Col>
                </Row>

                <div className='exerciseWindow'>
                    <p className="singleWord">
                        {started ? words[currentWordIndex] : `Press Start to begin Paragraph ${currentParagraphIndex + 1}` }
                        {finished ? `End of Paragraph ${currentParagraphIndex + 1}` : ""}
                    </p>
                </div>
                <Row style={{ marginTop: '5px' }}>
                    <Col>
                      <span style={{ color: 'grey' }}>Publisher: </span> 
                        <span style={{ color: 'grey' }}>{publisher}</span>
                    </Col>
                    <Col style={{ textAlign: 'center' }}>
                      <span style={{ color: 'grey' }}>Author: </span> 
                        <span style={{ color: 'grey' }}>{author}</span>
                    </Col>
                    <Col style={{ textAlign: 'right' }}>
                        <span style={{ color: 'grey' }}>Source: </span> 
                            <a href={source} style={{ color: 'grey' }} target="_blank" rel="noopener noreferrer">
                                {source}
                            </a>
                    </Col>
                </Row>

                <Row style={{ marginTop: '18px', marginBottom: '10px' }}>
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
                                value={logToLinear(inputValue)}
                                onChange={(e, newValue) => setInputValue(Math.min(linearToLog(newValue), worldRecordWPM))}
                                getAriaValueText={valuetext}
                                color="secondary"
                                min={logToLinear(50)}
                                max={logToLinear(worldRecordWPM)}
                                style={{ marginRight: '20px' }}
                            />
                            <input
                                type="number"
                                value={inputValue}
                                onChange={(e) => setInputValue(Math.min(Math.max(Math.round(e.target.value), 50), worldRecordWPM))}
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
                            onClick={handleShowQuestion}
                            disabled={!finished || questionButtonClicked}
                        >
                            <FaQuestion style={{ marginTop: '-3px' }} /> Go to question
                        </Button>
                    </Col>
                </Row>
            </div>

            {showQuestion && (
                <div className='mainContainer'>
                    <QuestionComponent
                        question={questions[currentParagraphIndex].question}
                        options={questions[currentParagraphIndex].options}
                        onSubmit={handleQuestionSubmit}
                    />
                </div>
            )}

            {feedbackMessage && (
                <div className='mainContainer' style={{ color: feedbackMessage.includes("Correct") ? '#a6ff4d' : '#ff6666' }}>
                    <Row>
                        <Col><h4>{feedbackMessage}</h4></Col>
                        <Button
                            className='subjectButtons'
                            size="lg"
                            style={{ marginRight: '12px', backgroundColor: '#cc0066', borderColor: '#99004d', width: '200px' }}
                            onClick={handleNextParagraphOrQuestion}
                        >
                            {currentParagraphIndex < paragraphs.length - 1 ? "Next paragraph" : "Finish"}
                        </Button>
                    </Row>
                </div>
            )}
        </>
    );
};

export default Exercise;
