import { React, useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import { ParagraphService } from '../../.services/.MainServices';
import { StatusHelper } from '../../.helpers/MainHelpers';
import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';
import { Question } from '../../.entities/.MainEntitiesExport';
import ParagraphSearch from '../Paragraphs/paragraph-search';

const EditQuestions = () => {
    const [question, setQuestions] = useState(
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
            const exists = await ParagraphService.getParagraph(question.paragraphId);
            if (StatusHelper.isOK(exist) === true) {
                let data = "";
                if (update) {
                    data = await QuestionService.putQuestion(question.toJson());
                    if (StatusHelper.isOK(data) === true) {
                        alert('Updated question successfully.');
                    }
                } else {
                    data = await QuestionService.postQuestion(question.toJson());
                    if (StatusHelper.isOK(data) === true) {
                        setUpdate(true);

                        alert('Created question successfully.');
                    }
                }

                if (StatusHelper.isOK(data) === true) {
                    const question = new Question();  // Assuming an empty constructor
                    question.fromJson(data);
                    setQuestions(question);
                } else if (StatusHelper.isError(data) === true) {
                    alert(StatusHelper.getErrorMessage(data));
                } else {
                    alert("Error getting data");
                }
            } else {
                alert("Paragraph ID does not exist.");
            }
        } else {
            alert("Please enter paragraph ID.");
        }

    }



    const handleFieldChange = (event) => {
        const { name, value } = event.target;

        setQuestions(prevQuestion => {
            const newQuestion = Question.createQuestionFromCopy(prevQuestion);

            // Use the hasField method to check if the field exists
            if (newQuestion.hasField(name)) {
                newQuestion[name] = value; // Use setter for the corresponding field
            }

            return newQuestion;
        });
    }

    const resetUpdating = () => {
        setUpdate(false);
        setQuestions(new Question());
    }

    const updateParagraphId = (paragraphId) => {
        setQuestions(prevQuestion => {
            const newQuestion = Question.createQuestionFromCopy(prevQuestion);

            newQuestion.paragraphId = paragraphId;

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
                        required type="text" autoComplete='off'
                        placeholder="Enter paragraph ID"
                        onChange={handleFieldChange}
                        pattern={ValidationPatternConstants.IdPattern}
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
                        pattern={ValidationPatternConstants.QuestionTextPattern}
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
                        pattern={ValidationPatternConstants.TitlePattern}
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