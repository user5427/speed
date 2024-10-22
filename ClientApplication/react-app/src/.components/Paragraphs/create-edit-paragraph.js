import { React, useState, useEffect } from 'react';
import { Button, Form, Image } from 'react-bootstrap';

import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';
import ArticleSearch from '../Articles/article-search';
import { Paragraph } from '../../.entities/.MainEntitiesExport';
import { ArticleController, ParagraphController } from '../../.controllers/.MainControllersExport';
import ErrorPopup from '../.common-components/ErrorPopup';
import SuccessPopup from '../.common-components/SuccessPopup';
const EditParagraph = ({ articleFromOutsideId=undefined, existingParagraphId=undefined, sendCreatedId=undefined, redirect=true, sendUpdate=undefined }) => {
    const [paragraph, setParagraph] = useState(
        new Paragraph()
    );
    const [validated, setValidated] = useState(false);
    const [update, setUpdate] = useState(false);

    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal

    const [successMessage, setSuccessMessage] = useState(""); // State for success message
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State to show/hide modal

    const [outsideArticle, setOutsideArticle] = useState(null);

    const [MyRedirect, setRedirect] = useState(redirect);

    // Trigger getArticleFromOutside when component mounts or articleFromOutside changes
    useEffect(() => {
        getArticleFromOutside(articleFromOutsideId);
    }, [articleFromOutsideId]); // Add articleFromOutside as a dependency

    // Trigger setParagraphFromExisting when component mounts or existingParagraphId changes
    useEffect(() => {
        setParagraphFromExisting(existingParagraphId);
    }, [existingParagraphId]); // Add existingParagraphId as a dependency

    useEffect(() => {
        setRedirect(redirect);
    }, []); // Add redirect as a dependency

    const handleSave = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        if (paragraph && paragraph.articleId) {
            try {
                try {
                    let article = await ArticleController.Get(paragraph.articleId);
                } catch (error) {
                    throw new Error("Article ID does not exist.");
                }

                let newParagraph;
                if (update) {
                    newParagraph = await ParagraphController.Put(paragraph);
                    setRedirect(false);
                    setSuccessMessage("Updated paragraph successfully.");
                    setShowSuccessModal(true);
                    if (sendUpdate) {
                        sendUpdate();
                    }
                } else {
                    newParagraph = await ParagraphController.Post(paragraph);
                    setSuccessMessage("Created paragraph successfully.");
                    setShowSuccessModal(true);
                    setUpdate(true);
                    if (sendCreatedId) {
                        sendCreatedId(newParagraph.id);
                    }
                }
                setParagraph(newParagraph);
            } catch (error) {
                setErrorMessage(error.message); // Set error message
                setShowErrorModal(true); // Show modal
                // alert("js sucks");
            }
        } else {
            setErrorMessage("Please enter article ID."); // Set error message
            setShowErrorModal(true); // Show modal
        }
    }

    const handleFieldChange = (event) => {
        const { name, value } = event.target;

        setParagraph(prevParagraph => {
            const newParagraph = Paragraph.createParagraphFromCopy(prevParagraph);

            // Use the hasField method to check if the field exists
            if (newParagraph.hasField(name)) {
                if (name === paragraph.varArticleIdName) {
                    newParagraph._articleId = Number(value);  // Convert to number
                } else {
                    newParagraph[name] = value; // Use setter for the corresponding field
                }
            }

            return newParagraph;
        });
    }

    // const resetUpdating = () => {
    //     setUpdate(false);
    //     setParagraph(new Paragraph());
    //     setOutsideArticle(null);
    // }

    const updateArticleId = (articleId) => {
        setParagraph(prevParagraph => {
            const newParagraph = Paragraph.createParagraphFromCopy(prevParagraph);

            // Use the hasField method to check if the field exists
            newParagraph.articleId = Number(articleId); // Use setter for the corresponding field

            return newParagraph;
        });
    }

    // Function to close the error modal
    const closeErrorModal = () => {
        setShowErrorModal(false);
    };

    // Function to close the success modal
    const closeSuccessModal = () => {
        setShowSuccessModal(false);
        if (MyRedirect) {
            window.location.href = `/edit-paragraph-question?paragraphId=${paragraph.id}`;
        }
    };

    const getArticleFromOutside = async (artFromOut) => {
        if (artFromOut) {
            let article = null;
            try {
                article = await ArticleController.Get(artFromOut);
            } catch (error) {
                setErrorMessage(error.message); // Set error message
                setShowErrorModal(true); // Show modal
            }

            if (article) {
                setOutsideArticle(article);
                setParagraph(prevParagraph => {
                    const newParagraph = Paragraph.createParagraphFromCopy(prevParagraph);

                    // Use the hasField method to check if the field exists
                    newParagraph.articleId = Number(article.id); // Use setter for the corresponding field

                    return newParagraph;
                });
            }
        }
    }

    const setParagraphFromExisting = async (exParId) => {
        if (!exParId) {
            return;
        }

        let paragraph = null;
        try {
            paragraph = await ParagraphController.Get(exParId);
        } catch (error) {
            setErrorMessage(error.message); // Set error message
            setShowErrorModal(true); // Show modal
        }

        if (paragraph) {
            setParagraph(paragraph);
            setUpdate(true);

            try {
                let article = await ArticleController.Get(paragraph.articleId);
                setOutsideArticle(article);
            } catch (error) {
                setErrorMessage(error.message); // Set error message
                setShowErrorModal(true); // Show modal
            }
        }

    }

    return (
        <>
            {
                outsideArticle ? "" :
                    (
                        <ArticleSearch
                            onArticleSelected={updateArticleId}
                            articleFromOutside={outsideArticle}
                        />
                    )
            }



            <Form validated={validated} onSubmit={handleSave}>
                {
                    outsideArticle ? "" :
                        (
                            <Form.Group controlId="formtestTitle">
                                <Form.Label>Article ID</Form.Label>
                                <Form.Control
                                    name={Paragraph.varArticleIdName()}
                                    value={paragraph.articleId}
                                    required type="number"
                                    autoComplete='off'
                                    placeholder="Enter article ID"
                                    className="form-control darkInput"
                                    onChange={handleFieldChange}
                                    pattern={ValidationPatternConstants.IdPattern.source}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter article ID.
                                </Form.Control.Feedback>
                            </Form.Group>
                        )
                }


                <Form.Group controlId="formtestTitle">
                    <Form.Label>Paragraph Title</Form.Label>
                    <Form.Control
                        name={Paragraph.varTitleName()}
                        value={paragraph.title}
                        autoComplete='off'
                        placeholder="Enter Paragraph Title"
                        className="form-control darkInput"
                        onChange={handleFieldChange}
                        required type="text"
                        minLength={ValidationConstants.MinTitleLength}
                        maxLength={ValidationConstants.MaxTitleLength}
                        pattern={ValidationPatternConstants.TitlePattern.source}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid paragraph title (letters and spaces only).
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formtestText">
                    <Form.Label>Paragraph Text</Form.Label>
                    <Form.Control
                        name={Paragraph.varTextName()}
                        value={paragraph.text}
                        as="textarea"
                        rows={3}
                        className="form-control darkInput"
                        required type="text"
                        autoComplete='off'
                        placeholder="Enter Paragraph Text"
                        onChange={handleFieldChange}
                        minLength={ValidationConstants.MinParagraphLength}
                        maxLength={ValidationConstants.MaxParagraphLength}
                        pattern={ValidationPatternConstants.ParagraphPattern.source}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter paragraph text between 10 and 1500 characters.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="success" type="submit">{update ? "Update" : "Create"}</Button>
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

            {/* Success Popup */}
            <SuccessPopup
                showCreateModal={showSuccessModal}
                message={successMessage}
                onClose={closeSuccessModal}
            />
        </>
    )
}

export default EditParagraph;