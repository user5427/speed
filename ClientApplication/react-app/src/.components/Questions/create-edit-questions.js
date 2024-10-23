import { React, useState, useEffect } from 'react';
import { Row, Col, Button, Form, Image } from 'react-bootstrap';
import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';
import { Question } from '../../.entities/.MainEntitiesExport';
import ParagraphSearch from '../Paragraphs/paragraph-search';
import { ParagraphController, QuestionController } from '../../.controllers/.MainControllersExport';
import ErrorPopup from '../.common-components/ErrorPopup';
import AnswerItem from './answerItem';
import Divider from '@mui/material/Divider';
import SuccessPopup from '../.common-components/SuccessPopup';
import DeletePopup from '../.common-components/DeletePopup';
import { MdDelete } from "react-icons/md";
import NoImage from '../../no-image.png'
import { GrRevert } from "react-icons/gr";
const EditQuestions = ({ paragraphFromOutsideId = undefined, existingQuestionId = undefined, sendCreatedId = undefined, redirect = true, sendUpdate = undefined }) => {
    const [question, setQuestion] = useState(
        new Question()
    );
    const [validated, setValidated] = useState(false);
    const [update, setUpdate] = useState(false);

    const [errorMessage, setErrorMessage] = useState([""]); // State for error message
    const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal

    const [answers, setAnswers] = useState([]);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1);

    const [successMessage, setSuccessMessage] = useState(""); // State for success message
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State to show/hide modal

    const [outsideParagraph, setOutsideParagraph] = useState(null);

    const [MyRedirect, setRedirect] = useState(redirect);

    const [imageFileUrl, setImageUrl] = useState(NoImage)
    const [imageFile, setImageFile] = useState(undefined)
    const [updateImageFile, setUpdateImageFile] = useState(false)

    const [deleteMessage, setDeleteMessage] = useState(""); // State for success message
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State to show/hide modal
    const [deleteRequest, setDeleteRequest] = useState(null)

    useEffect(() => {
        getParagraphFromOutside(paragraphFromOutsideId);
    }, [paragraphFromOutsideId]); // Add articleFromOutside as a dependency

    useEffect(() => {
        setQuestionFromExisting(existingQuestionId);
    }, [existingQuestionId]); // Add articleFromOutside as a dependency

    useEffect(() => {
        setRedirect(redirect);
    }, []); // Add redirect as a dependency

    useEffect(() => {
        if (question && question.imageFileName) {
            getQuestionImage(); // Fetch image when the article is updated
        }
    }, [question.imageFileName]);

    useEffect(() => {
        updateQuestionImage();
    }, [question.id]);

    // save the image, then if user creates or updates the question, do the same for the image
    /**
     * Handle file upload
     */
    const handleFileUpload = (event) => {
        event.preventDefault();
        const file = event.target.files[0];

        if (file) {
            setImageFile(file);
            setUpdateImageFile(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result); // Set the image to the data URL
            };
            reader.readAsDataURL(file); // Read the file as a Data URL
        }
    };

    const getQuestionImage = async () => {
        try {
            if (question.imageFileName) {
                let imageURL = await QuestionController.GetImage(question.id);
                setImageUrl(imageURL);
                setImageFile(undefined);
                setUpdateImageFile(false);
            }
        } catch (error) {
            setErrorMessage(error.message); // Set error message
            setShowErrorModal(true); // Show modal
        }
    }

    const updateQuestionImage = async () => {
        try {
            if (question.id === null) {
                return;
            }
            if (question.imageFileName === null && imageFile) {
                await QuestionController.PostImage(question.id, imageFile);
                question.imageFileName = "hasImage";
            } else if (question.imageFileName && imageFile && updateImageFile) {
                await QuestionController.DeleteImage(question.id);
                await QuestionController.PostImage(question.id, imageFile);
                question.imageFileName = "hasImage";
                imageFile === undefined
                setUpdateImageFile(false);
            }
        } catch (err) {
            throw err;
        }
    }

    const deleteQuestionImage = () => {
        if (!question.imageFileName) {
            return;
        }
        setDeleteRequest(1);
        setShowDeleteModal(true);
        setDeleteMessage("Are you sure you want to delete the image?");
    }

    const deleteConfirmed = async () => {
        setShowDeleteModal(false);
        if (deleteRequest === 1) {
            try {
                if (question.imageFileName) {
                    await QuestionController.DeleteImage(question.id);
                    question.imageFileName = null;
                    imageFile === undefined
                    setImageUrl(NoImage);
                }
            }
            catch (error) {
                setErrorMessage(error.message); // Set error message
                setShowErrorModal(true); // Show modal
            }

        }
        setDeleteRequest(null)
    }

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setDeleteRequest(null)
    }

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
                    setRedirect(false);
                    setSuccessMessage("Updated question successfully.");
                    setShowSuccessModal(true);
                    updateQuestionImage();
                    if (sendUpdate) {
                        sendUpdate();
                    }
                } else {
                    newQuestion = await QuestionController.Post(question);
                    setUpdate(true);
                    setSuccessMessage("Created question successfully.");
                    setShowSuccessModal(true);
                }
                setQuestion(newQuestion);
            } catch (error) {
                setErrorMessage(error.message); // Set error message
                setShowErrorModal(true); // Show modal
            }
        } else {
            setErrorMessage("Please enter paragraph ID."); // Set error message
            setShowErrorModal(true); // Show modal
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

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
        if (MyRedirect) {
            window.location.href = `/edit-question?questionId=${question.id}`;
        }
        if (sendCreatedId) {
            sendCreatedId(question.id);
        }
    }

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
            <Form>
                <Form.Group className="d-flex justify-content-center">
                    <Image height="200" src={imageFileUrl} alt="Uploaded Image" />
                </Form.Group>
                <Form.Group className="d-flex justify-content-center">
                    <div>
                        <input
                            className="form-control darkInput"
                            type="file"
                            onChange={handleFileUpload}
                        />
                    </div>
                </Form.Group>
                <Row>
                    {question.imageFileName && (
                        <Col>

                            <Button onClick={getQuestionImage}><GrRevert /> Reset image</Button>
                        </Col>
                    )}

                    {question.imageFileName && (
                        <Col>

                            <Button variant="danger" onClick={deleteQuestionImage}><MdDelete /> Delete image</Button>
                        </Col>
                    )}

                </Row>
            </Form>

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
                                <Form.Label>Paragraph ID</Form.Label>
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
                    <Button variant="success" type="submit" >{update ? "Update" : "Create"}</Button>
                </div>
            </Form>

            {/* Error Popup */}
            <ErrorPopup
                showErrorModal={showErrorModal}
                errorMessage={errorMessage}
                onClose={closeErrorModal}
            />

            {/* Success Popup */}
            <SuccessPopup
                showCreateModal={showSuccessModal}
                message={successMessage}
                onClose={closeSuccessModal}
            />

            <DeletePopup
                showDeleteModal={showDeleteModal}
                message={deleteMessage}
                onClose={closeDeleteModal}
                onDelete={deleteConfirmed}
            />
        </>
    )
}

export default EditQuestions;