import { React, useState, useEffect } from 'react';
import { Row, Col, Button, Form, Image } from 'react-bootstrap';
import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';
import { Question } from '../../.entities/.MainEntitiesExport';
import ParagraphSearch from '../Paragraphs/paragraph-search';
import { ParagraphController, QuestionController } from '../../.controllers/.MainControllersExport';
import ErrorPopup from '../.common-components/ErrorPopup';
import AnswerItem from './answerItem';
import Divider from '@mui/material/Divider';


const EditQuestions = ({ paragraphFromOutsideId, existingQuestionId, sendCreatedId }) => {
    const [question, setQuestion] = useState(
        new Question()
    );
    const [validated, setValidated] = useState(false);
    const [update, setUpdate] = useState(false);

    const [errorMessage, setErrorMessage] = useState([""]); // State for error message
    const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal

    const [answers, setAnswers] = useState([]);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1);

    const [outsideParagraph, setOutsideParagraph] = useState(null);

    useEffect(() => {
        getParagraphFromOutside(paragraphFromOutsideId);
    }, [paragraphFromOutsideId]); // Add articleFromOutside as a dependency

    useEffect(() => {
        setQuestionFromExisting(existingQuestionId);
    }, [existingQuestionId]); // Add articleFromOutside as a dependency

    const handleSave = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        if (correctAnswerIndex === -1) {
            setErrorMessage("Please select a correct answer.");
            setShowErrorModal(true);
            return;
        }

        if (answers.length < ValidationConstants.MinAnswerChoicesCount) {
            setErrorMessage("Please add at least 2 answers.");
            setShowErrorModal(true);
            return;
        }

        if (question && question.paragraphId) {
            try {
                try {
                    const paragraph = await ParagraphController.Get(question.paragraphId);
                } catch (error) {
                    throw new Error("Paragraph ID does not exist.");
                }

                let newQuestion;
                if (update) {
                    newQuestion = await QuestionController.Put(question);
                    alert('Updated question successfully.');
                } else {
                    newQuestion = await QuestionController.Post(question);
                    setUpdate(true);
                    alert('Created question successfully.');
                    if (sendCreatedId) {
                        sendCreatedId(newQuestion.id);
                    }
                }
                setQuestion(newQuestion);
            } catch (error) {
                setErrorMessage(error.message); // Set error message
                setShowErrorModal(true); // Show modal
            }
        } else {
            alert("Please enter paragraph ID.");
        }
    }

    const handleFieldChange = (event) => {
        const { name, value } = event.target;

        setQuestion(prevQuestion => {
            const newQuestion = Question.createQuestionFromCopy(prevQuestion);

            // Use the hasField method to check if the field exists
            if (newQuestion.hasField(name)) {
                if (name === newQuestion.varParagraphIdName) {
                    newQuestion.paragraphId = Number(value);
                } else {
                    newQuestion[name] = value; // Use setter for the corresponding field
                }
            }

            return newQuestion;
        });
    }

    // const resetUpdating = () => {
    //     setUpdate(false);
    //     setQuestion(new Question());
    //     setAnswers([]);
    // }

    const updateParagraphId = (paragraphId) => {
        setQuestion(prevQuestion => {
            const newQuestion = Question.createQuestionFromCopy(prevQuestion);

            newQuestion.paragraphId = Number(paragraphId);

            return newQuestion;
        });
    }

    // Function to close the error modal
    const closeErrorModal = () => {
        setShowErrorModal(false);
    };

    const sendBackText = (index, text) => {
        let newAnswers = [...answers];
        newAnswers[index] = text;

        setQuestion(prevQuestion => {
            const newQuestion = Question.createQuestionFromCopy(prevQuestion);

            newQuestion.answerChoices = newAnswers;

            return newQuestion;
        });

        setAnswers(newAnswers);
    }

    const deleteAnswer = (index) => {
        answers.splice(index, 1);
        let newAnswers = [...answers];
        setAnswers(newAnswers);

        if (index === correctAnswerIndex) {
            setCorrectAnswerIndex(-1);

            setQuestion(prevQuestion => {
                const newQuestion = Question.createQuestionFromCopy(prevQuestion);

                newQuestion.correctAnswerIndex = null;

                return newQuestion;
            });
        }
    }

    const addEmptyAnswer = () => {
        setAnswers([...answers, ""]);
    }

    const setCorrect = (index) => {
        setCorrectAnswerIndex(index);
        let newAnswers = [...answers];
        setAnswers(newAnswers);
        setQuestion(prevQuestion => {
            const newQuestion = Question.createQuestionFromCopy(prevQuestion);

            newQuestion.correctAnswerIndex = index;

            return newQuestion;
        });
    }

    const getParagraphFromOutside = async (parFromOut) => {
        if (parFromOut) {
            let paragraph = null;
            try {
                paragraph = await ParagraphController.Get(parFromOut);
            } catch (error) {
                setErrorMessage(error.message); // Set error message
                setShowErrorModal(true); // Show modal
            }

            if (paragraph) {
                setOutsideParagraph(paragraph);
                setQuestion(prevQuestion => {
                    const newQuestion = Question.createQuestionFromCopy(prevQuestion);

                    newQuestion.paragraphId = Number(paragraph.id);

                    return newQuestion;
                });
            }
        }
    }

    const setQuestionFromExisting = async (exQuesId) => {
        if (!exQuesId) {
            return;
        }

        let existingQuestion = null;
        try {
            existingQuestion = await QuestionController.Get(exQuesId);
        } catch (error) {
            setErrorMessage(error.message); // Set error message
            setShowErrorModal(true); // Show modal
        }

        if (existingQuestion) {
            setQuestion(existingQuestion);
            setAnswers(existingQuestion.answerChoices);
            setCorrectAnswerIndex(existingQuestion.correctAnswerIndex);
            setUpdate(true);

            try {
                let paragraph = await ParagraphController.Get(existingQuestion.paragraphId);
                setOutsideParagraph(paragraph);
            } catch (error) {
                setErrorMessage(error.message); // Set error message
                setShowErrorModal(true); // Show modal
            }
        }

    }


    return (
        <>
            {outsideParagraph ? "" :
                (
                    <ParagraphSearch
                        onParagraphSelected={updateParagraphId}
                        paragraphFromOutside={outsideParagraph}
                    />
                )}

            <Form validated={validated} onSubmit={handleSave}>
                {
                    outsideParagraph ? "" :
                        (
                            <Form.Group controlId="formtestTitle">
                                <Form.Label>Paragraph Title</Form.Label>
                                <Form.Control
                                    name={Question.varParagraphIdName()}
                                    value={question.paragraphId}
                                    required type="number"
                                    autoComplete='off'
                                    className="form-control darkInput"
                                    placeholder="Enter paragraph ID"
                                    onChange={handleFieldChange}
                                    pattern={ValidationPatternConstants.IdPattern.source}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter paragraph ID.
                                </Form.Control.Feedback>
                            </Form.Group>
                        )
                }


                <Form.Group controlId="formtestTitle">
                    <Form.Label>Question Title</Form.Label>
                    <Form.Control
                        name={Question.varTitleName()}
                        value={question.title}
                        required type="text"
                        autoComplete='off'
                        className="form-control darkInput"
                        placeholder="Enter Question Title"
                        onChange={handleFieldChange}
                        minLength={ValidationConstants.MinTitleLength}
                        maxLength={ValidationConstants.MaxTitleLength}
                        pattern={ValidationPatternConstants.TitlePattern.source}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter question text.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formtestTitle">
                    <Form.Label>Question Text</Form.Label>
                    <Form.Control
                        name={Question.varTextName()}
                        value={question.text}
                        as="textarea"
                        rows={3}
                        required type="text"
                        autoComplete='off'
                        className="form-control darkInput"
                        placeholder="Enter Question Text"
                        onChange={handleFieldChange}
                        minLength={ValidationConstants.MinQuestionTextLength}
                        maxLength={ValidationConstants.MaxQuestionTextLength}
                        pattern={ValidationPatternConstants.QuestionTextPattern.source}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter question text.
                    </Form.Control.Feedback>
                </Form.Group>


                <div>
                    <Row style={{ marginBottom: '10px', marginTop: '20px' }} >
                        <Col xs={12} md={10} >
                            <Button onClick={() => addEmptyAnswer()}>Add answer</Button>
                        </Col>
                    </Row>

                    <Divider style={{ backgroundColor: '#ccc', borderBottomWidth: 2 }}></Divider>

                    {answers.map((answer, index) => (
                        <div key={index}>
                            <AnswerItem
                                index={index}
                                articleText={answer}
                                sendBackText={sendBackText}
                                deleteAnswer={deleteAnswer}
                                setCorrect={setCorrect}
                                correctAnswerIndex={correctAnswerIndex}
                            />
                            <Divider style={{ backgroundColor: '#ccc', borderBottomWidth: 2 }}></Divider>

                        </div>
                    ))}
                    <Divider style={{ backgroundColor: '#ccc', borderBottomWidth: 2, marginBottom: '20px' }}></Divider>

                </div>


                <div>
                    <Button type="submit">{update ? "Update" : "Create"}</Button>
                </div>
                {/* if you can update the article, make a button apear for creating a new article */}
                {/* {update ?
                    <Button onClick={resetUpdating}>Reset</Button> : ""
                } */}
            </Form>

            {/* Error Popup */}
            <ErrorPopup
                showErrorModal={showErrorModal}
                errorMessage={errorMessage}
                onClose={closeErrorModal}
            />
        </>
    )
}

export default EditQuestions;