import { QuestionService } from "../../.services/MainServices";
import { Form } from 'react-bootstrap';
import { React } from 'react';
import { handleSelection } from '../../.helpers/MainHelpers';
import { useState } from 'react';
import { QuestionController } from '../../.controllers/.MainControllersExport';

const QuestionSearch = ({ onQuestionSelected }) => {
    const [options, setOptions] = useState([]);

    const handleFieldChange = async (event) => {
        const { value } = event.target;
        if (value !== "") {
            try {
                let questionPage = await QuestionController.Search(value);
                if (questionPage.questions.length > 0) {
                    const options = questionPage.questions.map((question) => (
                        <option key={question.id} value={question.title}></option>
                    ));
                    setOptions(options);
                } else {
                    setOptions([]);
                }
            } catch (error) {
                alert(error);
            }
        }
    };

    const handleQuestionSelect = (event) => {
        handleSelection(options, event, onQuestionSelected);
    };

    return (
        <Form NoValidate>
            <Form.Group controlId="formQuestionsSearch">
                <Form.Label>Search Questions</Form.Label>
                <Form.Control
                    list="questions"
                    name="questionSearch"
                    required
                    type="text"
                    id="searchBar"
                    placeholder="Enter question title"
                    onChange={handleFieldChange}
                    onInput={handleQuestionSelect}
                    autoComplete="off"
                />
                <datalist id="questions">
                    {options}
                </datalist>
                <Form.Control.Feedback type="invalid">
                    Please select a question.
                </Form.Control.Feedback>
            </Form.Group>
        </Form>
    );
};

export default QuestionSearch;
