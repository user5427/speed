import { React, useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';
import { Question } from '../../.entities/.MainEntitiesExport';
import ParagraphSearch from '../Paragraphs/paragraph-search';
import { ParagraphController, QuestionController } from '../../.controllers/.MainControllersExport';

const EditQuestions = () => {
    const [question, setQuestion] = useState(
        new Question()
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

        if (question && question.paragraphId) {
            try {
                try {
                    const paragraph = await ParagraphController.Get(question.paragraphId);
                } catch (error) {
                    throw new Error("Paragraph ID does not exist.");
                }

                let newQuestion;
                if (update) {
                    newQuestion = await QuestionController.Put(question);
                    alert('Updated question successfully.');
                } else {
                    newQuestion = await QuestionController.Post(question);
                    setUpdate(true);
                    alert('Created question successfully.');
                }
                setQuestion(newQuestion);
            } catch (error) {
                alert(error);
            }
        } else {
            alert("Please enter paragraph ID.");
        }
    }



    const handleFieldChange = (event) => {
        const { name, value } = event.target;

        setQuestion(prevQuestion => {
            const newQuestion = Question.createQuestionFromCopy(prevQuestion);

            // Use the hasField method to check if the field exists
            if (newQuestion.hasField(name)) {
                if(name === newQuestion.varParagraphIdName) {
                    newQuestion.paragraphId = Number(value);
                } else {
                    newQuestion[name] = value; // Use setter for the corresponding field
                }
            }

            return newQuestion;
        });
    }

    const resetUpdating = () => {
        setUpdate(false);
        setQuestion(new Question());
    }

    const updateParagraphId = (paragraphId) => {
        setQuestion(prevQuestion => {
            const newQuestion = Question.createQuestionFromCopy(prevQuestion);

            newQuestion.paragraphId = Number(paragraphId);

            return newQuestion;
        });
    }

    return (
        <>
            <ParagraphSearch onParagraphSelected={updateParagraphId} />

            <Form NoValidate validated={validated} onSubmit={handleSave}>
                <Form.Group controlId="formtestTitle">
                    <Form.Label>Paragraph ID</Form.Label>
                    <Form.Control
                        name={question.varParagraphIdName}
                        value={question && question.paragraphId || ''}
                        required type="number" 
                        autoComplete='off'
                        placeholder="Enter paragraph ID"
                        onChange={handleFieldChange}
                        pattern={ValidationPatternConstants.IdPattern.source}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter paragraph ID.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formtestTitle">
                    <Form.Label>Question Text</Form.Label>
                    <Form.Control
                        name={question.varTextName}
                        value={question && question.text || ''}
                        required type="text"
                        autoComplete='off'
                        placeholder="Enter Question Text"
                        onChange={handleFieldChange}
                        minLength={ValidationConstants.MinQuestionTextLength}
                        maxLength={ValidationConstants.MaxQuestionTextLength}
                        pattern={ValidationPatternConstants.QuestionTextPattern.source}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter question text.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formtestTitle">
                    <Form.Label>Question Title</Form.Label>
                    <Form.Control
                        name={question.varTitleName}
                        value={question && question.title || ''}
                        required type="text"
                        autoComplete='off'
                        placeholder="Enter Question Text"
                        onChange={handleFieldChange}
                        minLength={ValidationConstants.MinTitleLength}
                        maxLength={ValidationConstants.MaxTitleLength}
                        pattern={ValidationPatternConstants.TitlePattern.source}
                    />
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