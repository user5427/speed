import { React, useState, useEffect } from 'react';
import { Button, Form, Image } from 'react-bootstrap';

import NoImage from '../../../no-image.png'
import { ValidationConstants, ValidationPatternConstants } from '../../../.constants/MainConstants';
import { Article } from '../../../.entities/.MainEntitiesExport';
import { ArticleController } from '../../../.controllers/.MainControllersExport';
import ErrorPopup from '../../.common-components/ErrorPopup';
import SuccessPopup from '../../.common-components/SuccessPopup';
const EditArticle = ({ existingArticleId=undefined, sendCreatedId=undefined, redirect=true }) => {
    const [article, setArticle] = useState(
        new Article()
    );
    const [validated, setValidated] = useState(false);
    const [update, setUpdate] = useState(false);

    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal

    const [successMessage, setSuccessMessage] = useState(""); // State for success message
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State to show/hide modal

    const [MyRedirect, setRedirect] = useState(redirect);

    // Trigger setArticleFromExisting when component mounts or existingArticleId changes
    useEffect(() => {
        setArticleFromExisting(existingArticleId);
    }, [existingArticleId]); // Add existingArticleId as a dependency

    useEffect(() => {
        setRedirect(redirect);
    }, []); // Add redirect as a dependency

    // save the image, then if user creates or updates the article, do the same for the image
    /**
     * Handle file upload
     */
    // const handleFileUpload = (event) => {
    //     event.preventDefault();
    //     var file = event.target.files[0];
    //     const form = new FormData();
    //     form.append("imageFile", file);

    //     fetch(process.env.REACT_APP_API_URL + "Articles/upload-test-image", {
    //         method: "POST",
    //         body: form
    //     }).then(res => {
    //         if (res.ok) {
    //             return res.json();
    //         } else {
    //             throw new Error(`Failed to save image. Status code: ${res.status}`);
    //         }
    //     }).then(res => {
    //         var newArticle = article;
    //         newArticle.coverImage = res.profileImage;

    //         setArticle(oldData => { return { ...oldData, ...newArticle }; });
    //     }).catch(err => alert("Error in file upload"));
    // }

    const handleSave = async (event) => {
        event.preventDefault(); // we do not want the page to reload.
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;  // stop execution if the form is not valid
        }

        try {
            let newArticle;
            if (update) {
                newArticle = await ArticleController.Put(article);
                setRedirect(false);
                setSuccessMessage("Updated article successfully.");
                setShowSuccessModal(true);
            } else {
                newArticle = await ArticleController.Post(article);
                setSuccessMessage("Created article successfully.");
                setShowSuccessModal(true);
                setUpdate(true);
                if (sendCreatedId) {
                    sendCreatedId(newArticle.id);
                }
            }
            setArticle(newArticle);
        } catch (error) {
            setErrorMessage(error.message); // Set error message
            setShowErrorModal(true); // Show modal
        }
    }

    const handleFieldChange = (event) => {
        const { name, value } = event.target;

        setArticle(prevArticle => {
            const newArticle = Article.createArticleFromCopy(prevArticle);

            // Use the hasField method to check if the field exists
            if (newArticle.hasField(name)) {
                newArticle[name] = value; // Use setter for the corresponding field
            }

            return newArticle;
        });
    }

    // Function to close the error modal
    const closeErrorModal = () => {
        setShowErrorModal(false);
    };

    const setArticleFromExisting = async (exArtId) => {
        if (!exArtId) {
            return;
        }
        
        let existingArticle = null;
        try {
            existingArticle = await ArticleController.Get(exArtId);
        } catch (error) {
            setErrorMessage("Article ID does not exist.");
            setShowErrorModal(true);
        }

        if (existingArticle) {
            setArticle(existingArticle);
            setUpdate(true);
        }
    }

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
        if (MyRedirect) {
            window.location.href = `/edit-all?articleId=${article.id}`;
        }
    }


    return (
        <>
            <Form validated={validated} onSubmit={handleSave}>
                {/* <Form.Group className="d-flex justify-content-center">
                    <Image width="200" height="200" src={article && article.coverImage || NoImage} />
                </Form.Group>
                <Form.Group className="d-flex justify-content-center">
                    <div><input className="form-control darkInput" type="file" onChange={handleFileUpload} /> </div>
                </Form.Group> */}
                <Form.Group controlId="formtestTitle">
                    <Form.Label>Article Title</Form.Label>
                    <Form.Control
                        name={Article.varTitleName()}
                        value={article.title}
                        required type="text" autoComplete='off'
                        placeholder="Enter Article Title"
                        className="form-control darkInput"
                        onChange={handleFieldChange}
                        minLength={ValidationConstants.MinTitleLength}
                        maxLength={ValidationConstants.MaxTitleLength}
                        pattern={ValidationPatternConstants.TitlePattern.source}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter article title.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formtestCategory">
                    <Form.Label>Article Category</Form.Label>
                    <Form.Control
                        name={Article.varCategoryTitleName()}
                        value={article.categoryTitle}
                        className="form-control darkInput"
                        required type="text" placeholder="Enter Article Category"
                        onChange={handleFieldChange}
                        pattern={ValidationPatternConstants.ArticleCategoryPattern.source}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter article category.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="success" type="submit">{update ? "Update" : "Create"}</Button>
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

export default EditArticle;