import { React, useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';

import ArticleService from '../.services/Articles/article-service';
import ParagraphService from '../.services/Paragraphs/paragraph-service';

const EditParagraph = () => {
    const [paragraph, setParagraph] = useState({});
    const [questionIds, setQuestions] = useState(null);
    const [validated, setValidated] = useState(false);
    const [update, setUpdate] = useState(false);

    const CheckIfArticleIdExists = async () => {
        if (paragraph && paragraph.articleId) {
            return ArticleService.checkIfArticleIdExists(paragraph.articleId);
        }
        return false;
    };

    const handleSave = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        let paragraphToPost = paragraph;
        if (paragraphToPost.questionIds && Array.isArray(paragraphToPost.questionIds)) {
            paragraphToPost.questionIds = paragraphToPost.questionIds.map(x => x.id);
        } else {
            paragraphToPost.questionIds = [];
        }

        if (paragraph && paragraph.articleId) {

            const exist = await ArticleService.checkIfArticleIdExists(paragraph.articleId);
            if (exist === true) {
                let data = "";
                if (update) {
                    data = await ParagraphService.putParagraph(paragraphToPost);
                    if (data && data.paragraph) {
                        alert('Updated paragraph successfully.');
                    }
                } else {
                    data = await ParagraphService.postParagraph(paragraphToPost);
                    setUpdate(true);

                    if (data && data.paragraph) {
                        alert('Created paragraph successfully.');
                    }

                }

                console.log(data);

                if (data && data.paragraph) {
                    setParagraph(data.paragraph);
                } else {
                    alert("Error getting data");
                }
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

    return (
        <>
            <Form NoValidate validated={validated} onSubmit={handleSave}>
                <Form.Group controlId="formtestTitle">
                    <Form.Label>Article ID</Form.Label>
                    <Form.Control name="articleId" value={paragraph && paragraph.articleId || ''} required type="text" autoComplete='off' placeholder="Enter article ID" onChange={handleFieldChange} />
                    <Form.Control.Feedback type="invalid">
                        Please enter article ID.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formtestTitle">
                    <Form.Label>Paragraph Text</Form.Label>
                    <Form.Control name="text" value={paragraph && paragraph.text || ''} required type="text" autoComplete='off' placeholder="Enter Paragraph Text" onChange={handleFieldChange} />
                    <Form.Control.Feedback type="invalid">
                        Please enter paragraph title.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formtestCategory">
                    <Form.Label>Next Paragraph ID</Form.Label>
                    <Form.Control name="nextParagraphId" value={paragraph && paragraph.nextParagraphId || ''} type="text" placeholder="Enter Next Paragraph ID" onChange={handleFieldChange} />
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