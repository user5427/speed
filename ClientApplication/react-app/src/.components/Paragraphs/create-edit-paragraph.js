import { React, useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';

import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';
import ArticleSearch from '../Articles/article-search';
import { Paragraph } from '../../.entities/.MainEntitiesExport';
import { ArticleController, ParagraphController } from '../../.controllers/.MainControllersExport';

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
            try {
                try {
                    let article = await ArticleController.Get(paragraph.articleId);
                } catch (error) {
                    throw new Error("Article ID does not exist.");
                }

                let newParagraph;
                if (update) {
                    newParagraph = await ParagraphController.Put(paragraph);
                    alert('Updated paragraph successfully.');
                } else {
                    newParagraph = await ParagraphController.Post(paragraph);
                    alert('Created paragraph successfully.');
                    setUpdate(true);
                }
                setParagraph(newParagraph);
            } catch (error) {
                alert(error);
                return;
            }
        } else {
            alert("Please enter article ID.");
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

    const resetUpdating = () => {
        setUpdate(false);
        setParagraph(new Paragraph());
    }

    const updateArticleId = (articleId) => {
        setParagraph(prevParagraph => {
            const newParagraph = Paragraph.createParagraphFromCopy(prevParagraph);

            // Use the hasField method to check if the field exists
            newParagraph.articleId = Number(articleId); // Use setter for the corresponding field

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
                        required type="number"
                        autoComplete='off'
                        placeholder="Enter article ID"
                        onChange={handleFieldChange}
                        pattern={ValidationPatternConstants.IdPattern.source}
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
                        pattern={ValidationPatternConstants.TitlePattern.source}
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
                        pattern={ValidationPatternConstants.ParagraphPattern.source}
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