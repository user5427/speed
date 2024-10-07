import { React, useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';

const EditQuestions = () => {
    const [questions, setQuestions] = useState({});
    const [validated, setValidated] = useState(false);
    const [update, setUpdate] = useState(false);

    const CheckIfParagraphIdExists = async () => {
        if (questions && questions.paragraphId) {
            const apiUrl = process.env.REACT_APP_API_URL + `Paragraphs/${questions.paragraphId}`;
            try {
                const res = await fetch(apiUrl); // Await the fetch call
                if (!res.ok) {
                    throw new Error(`Failed to get paragraph. Status code: ${res.status}`);
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

        let questionToPost = questions;
        if (questionToPost.answerChoices && Array.isArray(questionToPost.answerChoices)) {

        } else {
            questionToPost.questionIds = [];
        }

        const requestOptions = {
            method: update ? "PUT" : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionToPost)
        };
        console.log('Data being sent:', questionToPost);


        if (questions && questions.paragraphId) {
            CheckIfParagraphIdExists().then(exist => {
                if (exist === true) {
                    const apiUrl = process.env.REACT_APP_API_URL + `Questions/${questions.paragraphId}`;

                    fetch(apiUrl, requestOptions)
                        .then(res => {
                            if (res.ok) {
                                return res.json();
                            } else {
                                throw new Error(`Failed to save question. Status code: ${res.status}`);
                            }
                        }).
                        then(res => {
                            setQuestions(res.data);
                            alert(update ? 'Updated question successfully.' : 'Created question successfully.');
                            setUpdate(true);
                        })
                        .catch(err => alert("Error saving data: " + err.message));
                } else {
                    alert("Paragraph ID does not exist.");
                }
            });
        } else {
            alert("Please enter paragraph ID.");
        }

    }



    const handleFieldChange = (event) => {
        const { name, value } = event.target;

        //check if the articleId has changed
        // if (name === 'paragraphId' && questions && questions.paragraphId && questions.paragraphId !== value) {
        //     setUpdate(false);
        //     const tempText = questions.questionText;
        //     const tempAnswers = questions.answerChoices;
        //     const tempCorrectAnswer = questions.correctAnswer;
        //     setQuestions({ ...questions, questionText: tempText, answerChoices: tempAnswers, correctAnswer: tempCorrectAnswer });
        // }

        setQuestions(prevQuestion => ({ ...prevQuestion, [name]: value }));
    }

    const resetUpdating = () => {
        setUpdate(false);
        setQuestions({ paragraphId: '', questionText: '', answerChoices: '', correctAnswerIndex: ''});
    }

    /**
     * This is the return statement for the component.
     * It contains a form with input fields for the paragraph data.
     */
    return (
        <>
            <Form NoValidate validated={validated} onSubmit={handleSave}>
                <Form.Group controlId="formtestTitle">
                    <Form.Label>Paragraph ID</Form.Label>
                    <Form.Control name="paragraphId" value={questions && questions.articleId || ''} required type="text" autoComplete='off' placeholder="Enter paragraph ID" onChange={handleFieldChange} />
                    <Form.Control.Feedback type="invalid">
                        Please enter paragraph ID.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formtestTitle">
                    <Form.Label>Question Text</Form.Label>
                    <Form.Control name="text" value={questions && questions.text || ''} required type="text" autoComplete='off' placeholder="Enter Question Text" onChange={handleFieldChange} />
                    <Form.Control.Feedback type="invalid">
                        Please enter question text.
                    </Form.Control.Feedback>
                </Form.Group>

                <h1>This is not finished yet!!!!</h1>

                <Button type="submit">{update ? "Update" : "Create"}</Button>
                {/* if you can update the article, make a button apear for creating a new article */}
                {update ?
                    <Button onClick={resetUpdating}>Reset</Button> : ""
                }
            </Form>
        </>
    )
}

export default EditQuestions;