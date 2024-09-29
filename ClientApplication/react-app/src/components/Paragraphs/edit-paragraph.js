import { React, useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';

const EditParagraph = () => {
    const [paragraph, setParagraph] = useState({});
    const [questionIds, setQuestions] = useState(null);
    const [validated, setValidated] = useState(false);
    const [update, setUpdate] = useState(false);

    const CheckIfArticleIdExists = async () => {
        if (paragraph && paragraph.articleId) {
            const apiUrl = process.env.REACT_APP_API_URL + `Articles/${paragraph.articleId}`;
            try {
                const res = await fetch(apiUrl); // Await the fetch call
                if (!res.ok) {
                    throw new Error(`Failed to get article. Status code: ${res.status}`);
                }
                const data = await res.json(); // Await the json parsing
                return !!data; // If data is truthy, return true, otherwise false
            } catch (error) {
                alert("Error getting data: " + error.message);
                return false;
            }
        }
        return false;
    };




    const handleSave = (event) => {
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

        const requestOptions = {
            method: update ? "PUT" : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paragraphToPost)
        };
        console.log('Data being sent:', paragraphToPost);


        if (paragraph && paragraph.articleId) {
            CheckIfArticleIdExists().then(exist => {
                if (exist === true) {
                    const apiUrl = process.env.REACT_APP_API_URL + `Paragraphs/${paragraph.articleId}`;

                    fetch(apiUrl, requestOptions)
                        .then(res => {
                            if (res.ok) {
                                return res.json();
                            } else {
                                throw new Error(`Failed to save paragraph. Status code: ${res.status}`);
                            }
                        }).
                        then(res => {
                            setParagraph(res.data);
                            alert(update ? 'Updated paragraph successfully.' : 'Created paragraph successfully.');
                            setUpdate(true);
                        })
                        .catch(err => alert("Error saving data: " + err.message));
                } else {
                    alert("Article ID does not exist.");
                }
            });
        } else {
            alert("Please enter article ID.");
        }

    }



    const handleFieldChange = (event) => {
        const { name, value } = event.target;

        //check if the articleId has changed
        if (name === 'articleId' && paragraph && paragraph.articleId && paragraph.articleId !== value) {
            setUpdate(false);
            const tempText = paragraph.text;
            const tempNextParagraphId = paragraph.nextParagraphId;
            setParagraph({ articleId: value, text: tempText, nextParagraphId: tempNextParagraphId });
        }

        setParagraph(prevParagraph => ({ ...prevParagraph, [name]: value }));
    }

    /**
     * This is the return statement for the component.
     * It contains a form with input fields for the paragraph data.
     */
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

                <Button type="submit">{paragraph && paragraph.id > 0 ? "Update" : "Create"}</Button>
            </Form>
        </>
    )
}

export default EditParagraph;