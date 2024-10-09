import { QuestionService } from "../../.services/MainServices";
import { Form } from 'react-bootstrap';
import { React } from 'react';
import { StatusHelper, handleSelection } from '../../.helpers/MainHelpers';
import { useState } from 'react';
const QuestionSearch = ({ onQuestionSelected }) => {
    const [options, setOptions] = useState([]);

    const handleFieldChange = async (event) => {
        const { value } = event.target;
        if (value !== "") {
            let data = await QuestionService.getQuestionsByTitle(value);
            if (StatusHelper.isOK(data)) {
                if (data && data.count > 0) {
                    const options = data.questions.map((question) => (
                        <option key={question.id} value={question.title}></option>
                    ));
                    setOptions(options);
                }
            } else if (StatusHelper.isError(data)) {
                alert(StatusHelper.getErrorMessage(data));
            } else {
                alert("Error getting data");
            }
        } else {
            setOptions([]);
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
