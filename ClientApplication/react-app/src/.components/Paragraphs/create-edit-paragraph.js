import { React, useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';

import { ArticleService, ParagraphService } from '../../.services/MainServices';
import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';
import { StatusHelper } from '../../.helpers/MainHelpers';
import ArticleSearch from '../Articles/article-search';
import { Paragraph } from '../../.entities/.MainEntitiesExport';

const EditParagraph = () => {
    const [paragraph, setParagraph] = useState(
        new Paragraph()
    );
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
                    data = await ParagraphService.putParagraph(paragraph.toJson);
                    if (StatusHelper.isOK(data) === true) {
                        alert('Updated paragraph successfully.');
                    }
                } else {
                    data = await ParagraphService.postParagraph(paragraph.toJson);
                    if (StatusHelper.isOK(data) === true) {
                        setUpdate(true);

                        alert('Created paragraph successfully.');
                    }
                }

                if (StatusHelper.isOK(data) === true) {
                    const paragraph = new Paragraph();  // Assuming an empty constructor
                    paragraph.fromJson = data;
                    setParagraph(paragraph);
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

        setParagraph(prevParagraph => {
            const newParagraph = new Paragraph(
                prevParagraph
            );

            // Use the hasField method to check if the field exists
            if (newParagraph.hasField(name)) {
                newParagraph[name] = value; // Use setter for the corresponding field
            }

            return newParagraph;
        });
    }

    const resetUpdating = () => {
        setUpdate(false);
        setParagraph(new Paragraph());
    }

    const updateArticleId = (articleId) => {
        setParagraph(prevParagraph => {
            const newParagraph = new Paragraph(
                prevParagraph
            );

            // Use the hasField method to check if the field exists
            newParagraph.articleId = articleId; // Use setter for the corresponding field

            return newParagraph;
        });
    }

    return (
        <>
            <ArticleSearch onArticleSelected={updateArticleId} />

            <Form NoValidate validated={validated} onSubmit={handleSave}>
                <Form.Group controlId="formtestTitle">
                    <Form.Label>Article ID</Form.Label>
                    <Form.Control
                        name={paragraph.varArticleIdName}
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

            <Form.Group controlId="formtestTitle">
                    <Form.Label>Paragraph Title</Form.Label>
                    <Form.Control
                        name={paragraph.varTitleName}
                        value={paragraph && paragraph.title || ''}
                        autoComplete='off'
                        placeholder="Enter Paragraph Title"
                        onChange={handleFieldChange}
                        required type="text"
                        minLength={ValidationConstants.MinTitleLength}
                        maxLength={ValidationConstants.MaxTitleLength}
                        pattern={ValidationPatternConstants.TitlePattern}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid paragraph title (letters and spaces only).
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formtestText">
                    <Form.Label>Paragraph Text</Form.Label>
                    <Form.Control
                        name={paragraph.varTextName}
                        value={paragraph && paragraph.text || ''}
                        required type="text"
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

                <Button type="submit">{update ? "Update" : "Create"}</Button>
                {update ?
                    <Button onClick={resetUpdating}>Reset</Button> : ""
                }
            </Form>
        </>
    )
}

export default EditParagraph;