import { React, useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';

import { ArticleService, ParagraphService } from '../../.services/MainServices';
import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';
import { StatusHelper } from '../../.helpers/MainHelpers';
import ArticleSearch from '../Articles/article-search';

const EditParagraph = () => {
    const [paragraph, setParagraph] = useState({
        title: '',
        text: '',
        articleId: ''
    });
    const [validated, setValidated] = useState(false);
    const [update, setUpdate] = useState(false);

    const handleSave = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        if (paragraph && paragraph.articleId) {

            const exist = await ArticleService.getArticle(paragraph.articleId);
            if (StatusHelper.isOK(exist) === true) {
                let data = "";
                if (update) {
                    data = await ParagraphService.putParagraph(paragraph);
                    if (StatusHelper.isOK(data) === true) {
                        alert('Updated paragraph successfully.');
                    }
                } else {
                    data = await ParagraphService.postParagraph(paragraph);
                    if (StatusHelper.isOK(data) === true) {
                        setUpdate(true);

                        alert('Created paragraph successfully.');
                    }
                }

                if (StatusHelper.isOK(data) === true) {
                    setParagraph(data);
                } else if (StatusHelper.isError(data) === true) {
                    alert(StatusHelper.getErrorMessage(data));
                } else {
                    alert("Error getting data");
                }
            } else {
                alert("Article ID does not exist.");
            }
        } else {
            alert("Please enter article ID.");
        }

    }



    const handleFieldChange = (event) => {
        const { name, value } = event.target;

        setParagraph(prevParagraph => ({ ...prevParagraph, [name]: value }));
    }

    const resetUpdating = () => {
        setUpdate(false);
        setParagraph({ articleId: '', text: '', nextParagraphId: null });
    }

    const updateArticleId = (articleId) => {
        setParagraph(prevParagraph => ({ ...prevParagraph, articleId: articleId }));
    }

    return (
        <>
            <ArticleSearch onArticleSelected={updateArticleId} />

            <Form NoValidate validated={validated} onSubmit={handleSave}>
                <Form.Group controlId="formtestTitle">
                    <Form.Label>Article ID</Form.Label>
                    <Form.Control
                        name="articleId"
                        value={paragraph && paragraph.articleId || ''}
                        required type="text"
                        autoComplete='off'
                        placeholder="Enter article ID"
                        onChange={handleFieldChange}
                        pattern={ValidationPatternConstants.IdPattern}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter article ID.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formtestText">
                    <Form.Label>Paragraph Text</Form.Label>
                    <Form.Control
                        name="text"
                        value={paragraph && paragraph.text || ''}
                        required
                        type="text"
                        autoComplete='off'
                        placeholder="Enter Paragraph Text"
                        onChange={handleFieldChange}
                        minLength={ValidationConstants.MinParagraphLength}
                        maxLength={ValidationConstants.MaxParagraphLength}
                        pattern={ValidationPatternConstants.ParagraphPattern}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter paragraph text between 10 and 1500 characters.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formtestTitle">
                    <Form.Label>Paragraph Title</Form.Label>
                    <Form.Control
                        name="title"
                        value={paragraph && paragraph.title || ''}
                        autoComplete='off'
                        placeholder="Enter Paragraph Title (optional)"
                        onChange={handleFieldChange}
                        minLength={ValidationConstants.MinTitleLength}
                        maxLength={ValidationConstants.MaxTitleLength}
                        pattern={ValidationPatternConstants.TitlePattern}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid paragraph title (letters and spaces only).
                    </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit">{update ? "Update" : "Create"}</Button>
                {update ?
                    <Button onClick={resetUpdating}>Reset</Button> : ""
                }
            </Form>
        </>
    )
}

export default EditParagraph;