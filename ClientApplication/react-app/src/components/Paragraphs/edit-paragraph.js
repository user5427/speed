import { React, useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';

const EditParagraph = () => {
    const [paragraph, setParagraph] = useState({});
    const [questionIds, setQuestions] = useState(null);
    const [validated, setValidated] = useState(false);

    const handleSave = (event) => {
        event.preventDefault(); // we do not want the page to reload.
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;  // stop execution if the form is not valid
        }

        let paragraphToPost = paragraph;
        // Ensure that questionIds is an array before mapping
        if (paragraphToPost.questionIds && Array.isArray(paragraphToPost.questionIds)) {
            paragraphToPost.questionIds = paragraphToPost.questionIds.map(x => x.id);
        } else {
            paragraphToPost.questionIds = [];  // Set to an empty array if undefined
        }

        const requestOptions = {
            method: paragraph && paragraph.id > 0 ? "PUT" : "POST",  // Use PUT for updates, POST for creation
            headers: {
                'Accept': 'application/json',  // Correct header for receiving JSON response
                'Content-Type': 'application/json',  // Correct header for sending JSON data
            },
            body: JSON.stringify(paragraphToPost)  // Stringify the article object to send as JSON
        };

        const apiUrl = process.env.REACT_APP_API_URL + `Paragraph/${paragraph && paragraph.id > 0 ? paragraph.id : '0'}`;

        fetch(apiUrl, requestOptions)
            .then(res => {
                if (res.ok) {
                    return res.json();  // Parse the response body as JSON if the status is 200 or 201
                } else {
                    throw new Error(`Failed to save paragraph. Status code: ${res.status}`);
                }
            })
            .then(res => {
                setParagraph(res.data);
                alert(paragraph && paragraph.id > 0 ? 'Updated paragraph successfully.' : 'Created paragraph successfully.');
            })
            .catch(err => alert("Error saving data: " + err.message));
    }

    const handleFieldChange = (event) => {
        const { name, value } = event.target;

        setParagraph(prevParagraph => ({ ...prevParagraph, [name]: value }));
    }

    return (
        <>
            <Form NoValidate validated={validated} onSubmit={handleSave}>
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