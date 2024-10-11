import { React, useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import AsyncSelect from 'react-select'


import NoImage from '../../../no-image.png'
import { ArticleService } from "../../../.services/.MainServices";
import { ValidationConstants, ValidationPatternConstants } from '../../../.constants/MainConstants';
import { StatusHelper } from '../../../.helpers/MainHelpers';
import { Article } from '../../../.entities/.MainEntitiesExport';

const EditArticle = () => {
    const [article, setArticle] = useState(
        new Article()
    );
    const [validated, setValidated] = useState(false);
    const [update, setUpdate] = useState(false);

    /**
     * Handle file upload
     */
    const handleFileUpload = (event) => {
        event.preventDefault();
        var file = event.target.files[0];
        const form = new FormData();
        form.append("imageFile", file);

        fetch(process.env.REACT_APP_API_URL + "Articles/upload-test-image", {
            method: "POST",
            body: form
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`Failed to save image. Status code: ${res.status}`);
            }
        }).then(res => {
            var newArticle = article;
            newArticle.coverImage = res.profileImage;

            setArticle(oldData => { return { ...oldData, ...newArticle }; });
        }).catch(err => alert("Error in file upload"));
    }

    const handleSave = async (event) => {
        event.preventDefault(); // we do not want the page to reload.
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;  // stop execution if the form is not valid
        }

        let data = "";
        if (update) {
            data = await ArticleService.putArticle(article.toJson());
            if (StatusHelper.isOK(data) === true) {
                alert('Updated article successfully.');
            }
        } else {
            data = await ArticleService.postArticle(article.toJson());
            if (StatusHelper.isOK(data) === true) {
                setUpdate(true);

                alert('Created article successfully.');
            }
        }


        if (StatusHelper.isOK(data) === true) {
            // Create a new Article instance
            const article = new Article();

            // Use the 'fromJson' setter to populate the instance
            article.fromJson(data);

            // Now set this article in your state (if using a state management like React)
            setArticle(article);
        } else if (StatusHelper.isError(data) === true) {
            alert(StatusHelper.getErrorMessage(data));
        } else {
            alert("Error getting data");
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

    return (
        <>
            <Form NoValidate validated={validated} onSubmit={handleSave}>
                <Form.Group className="d-flex justify-content-center">
                    <Image width="200" height="200" src={article && article.coverImage || NoImage} />
                </Form.Group>
                <Form.Group className="d-flex justify-content-center">
                    <div><input type="file" onChange={handleFileUpload} /> </div>
                </Form.Group>
                <Form.Group controlId="formtestTitle">
                    <Form.Label>Article Title</Form.Label>
                    <Form.Control
                        name={article.varTitleName}
                        value={article && article.title || ''}
                        required type="text" autoComplete='off'
                        placeholder="Enter Article Title"
                        onChange={handleFieldChange}
                        minLength={ValidationConstants.MinTitleLength}
                        maxLength={ValidationConstants.MaxTitleLength}
                        pattern={ValidationPatternConstants.TitlePattern}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter article title.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formtestCategory">
                    <Form.Label>Article Category</Form.Label>
                    <Form.Control
                        name={article.varCategoryTitleName}
                        value={article && article.categoryTitle || ''}
                        required type="text" placeholder="Enter Article Category"
                        onChange={handleFieldChange}
                        pattern={ValidationPatternConstants.ArticleCategoryPattern}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter article category.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit">{update ? "Update" : "Create"}</Button>
            </Form>
        </>
    )
}

export default EditArticle;