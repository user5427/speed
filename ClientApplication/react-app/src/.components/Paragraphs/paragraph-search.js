import { Form } from 'react-bootstrap';
import { React } from 'react';
import { handleSelection } from '../../.helpers/MainHelpers';
import { useState } from 'react';
import { ParagraphController } from "../../.controllers/.MainControllersExport";
import { ValidationPatternConstants } from '../../.constants/MainConstants';

const ParagraphSearch = ({ onParagraphSelected }) => {
    const [options, setOptions] = useState([]);

    const handleFieldChange = async (event) => {
        const { value } = event.target;
        if (value !== "") {
            try {
                let paragraphPage = await ParagraphController.Search(value);
                if (paragraphPage.paragraphs.length > 0) {
                    const options = paragraphPage.paragraphs.map((paragraph) => (
                        <option key={paragraph.id} value={paragraph.title}></option>
                    ));
                    setOptions(options);

                } else {
                    setOptions([]);
                }
            } catch (error) {
                alert(error);
            }
        };
    };

    const handleParagraphSelect = (event) => {
        handleSelection(options, event, onParagraphSelected);
    };

    return (
        <Form NoValidate>
            <Form.Group controlId="formParagraphSearch">
                <Form.Label>Search Paragraphs</Form.Label>
                <Form.Control
                    list="paragraphs"
                    name="paragraphSearch"
                    required
                    type="text"
                    id="searchBar"
                    placeholder="Enter paragraph title"
                    onChange={handleFieldChange}
                    onInput={handleParagraphSelect}
                    autoComplete="off"
                    patter={ValidationPatternConstants.TitlePattern.source}
                />
                <datalist id="paragraphs">
                    {options}
                </datalist>
                <Form.Control.Feedback type="invalid">
                    Please select a paragraph.
                </Form.Control.Feedback>
            </Form.Group>
        </Form>
    );
};

export default ParagraphSearch;
