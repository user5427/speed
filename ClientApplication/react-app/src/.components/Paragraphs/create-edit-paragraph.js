import { React, useState, useEffect } from 'react';
import { Button, Form, Image, Col, Row } from 'react-bootstrap';
import { MdDelete } from "react-icons/md";
import NoImage from '../../no-image.png'
import ArticleSearch from '../Articles/article-search';
import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';
import { Paragraph } from '../../.entities/.MainEntitiesExport';
import { ArticleController, ParagraphController } from '../../.controllers/.MainControllersExport';
import ErrorPopup from '../.common-components/ErrorPopup';
import SuccessPopup from '../.common-components/SuccessPopup';
import DeletePopup from '../.common-components/DeletePopup';
import { GrRevert } from "react-icons/gr";

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

    const [imageFileUrl, setImageUrl] = useState(NoImage)
    const [imageFile, setImageFile] = useState(undefined)
    const [updateImageFile, setUpdateImageFile] = useState(false)

    const [deleteMessage, setDeleteMessage] = useState(""); // State for success message
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State to show/hide modal
    const [deleteRequest, setDeleteRequest] = useState(null)

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

    useEffect(() => {
        if (paragraph && paragraph.imageFileName) {
            getParagraphImage(); // Fetch image when the article is updated
        }
    }, [paragraph.imageFileName]);

    // save the image, then if user creates or updates the paragraph, do the same for the image
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

    const getParagraphImage = async () => {
        try {
            if (paragraph.imageFileName) {
                let imageURL = await ParagraphController.GetImage(paragraph.id);
                setImageUrl(imageURL);
                setImageFile(undefined);
                setUpdateImageFile(false);
            }
        } catch (error) {
            setErrorMessage(error.message); // Set error message
            setShowErrorModal(true); // Show modal
        }
    }


    const updateParagraphImage = async () => {
        try {
            if (paragraph.imageFileName && imageFile === undefined) {
                await ParagraphController.DeleteImage(paragraph.id);
                paragraph.imageFileName = null;
                imageFile === undefined
                setImageUrl(NoImage);
            } if (paragraph.imageFileName === null && imageFile) {
                await ParagraphController.PostImage(paragraph.id, imageFile);
                paragraph.imageFileName = "hasImage";
            } else if (paragraph.imageFileName && imageFile && updateImageFile) {
                await ParagraphController.DeleteImage(paragraph.id);
                await ParagraphController.PostImage(paragraph.id, imageFile);
                paragraph.imageFileName = "hasImage";
                imageFile === undefined
                setUpdateImageFile(false);
            }
        } catch (err) {
            throw err;
        }
    }

    const deleteParagraphImage = () => {
        if (!paragraph.imageFileName) {
            return;
        }
        setDeleteRequest(1);
        setShowDeleteModal(true);
        setDeleteMessage("Are you sure you want to delete the image?");
    }

    const deleteConfirmed = async () => {
        setShowDeleteModal(false);
        if (deleteRequest === 1){
            try {
                await updateParagraphImage();
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
                await updateParagraphImage();
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
                {paragraph.imageFileName && (
                        <Col>

                            <Button onClick={getParagraphImage}><GrRevert /> Reset image</Button>
                        </Col>
                    )}

                    {paragraph.imageFileName && (
                        <Col>

                            <Button variant="danger" onClick={deleteParagraphImage}><MdDelete /> Delete image</Button>
                        </Col>
                    )}
            </Form>

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

            <DeletePopup
                showDeleteModal={showDeleteModal}
                message={deleteMessage}
                onClose={closeDeleteModal}
                onDelete={deleteConfirmed}
            />
        </>
    )
}

export default EditParagraph;