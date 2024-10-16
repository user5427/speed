import { QuestionService } from "../../.services/MainServices";
import { Form } from 'react-bootstrap';
import { React } from 'react';
import { handleSelection } from '../../.helpers/MainHelpers';
import { useState } from 'react';
import { QuestionController } from '../../.controllers/.MainControllersExport';
import ErrorPopup from "../.common-components/ErrorPopup";
import { ValidationPatternConstants } from "../../.constants/MainConstants";
const QuestionSearch = ({ onQuestionSelected, questionFromOutside }) => {
    const [options, setOptions] = useState([]);

    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal
    const [searchValue, setSearchValue] = useState("");

    const handleFieldChange = async (event) => {
        const { value } = event.target;
        if (value !== "") {
            setSearchValue(value);
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
                setErrorMessage(error.message); // Set error message
                setShowErrorModal(true); // Show modal
            }
        }
    };

    const handleQuestionSelect = (event) => {
        handleSelection(options, event, onQuestionSelected);
    };

    // Function to close the error modal
    const closeErrorModal = () => {
        setShowErrorModal(false);
    };

    return (
        <>
            <Form NoValidate>
                <Form.Group controlId="searchBar">
                    <Form.Label>Search Questions</Form.Label>
                    <Form.Control
                        value={questionFromOutside && questionFromOutside.title || searchValue}
                        list="questions"
                        name="questionSearch"
                        required
                        type="text"
                        placeholder="Enter question title"
                        onChange={handleFieldChange}
                        onInput={handleQuestionSelect}
                        autoComplete="off"
                        patter={ValidationPatternConstants.TitlePattern.source}
                    />
                    <datalist id="questions">
                        {options}
                    </datalist>
                    <Form.Control.Feedback type="invalid">
                        Please select a question.
                    </Form.Control.Feedback>
                </Form.Group>
            </Form>

            {/* Error Popup */}
            <ErrorPopup
                showErrorModal={showErrorModal}
                errorMessage={errorMessage}
                onClose={closeErrorModal}
            />
        </>

    );
};

export default QuestionSearch;
