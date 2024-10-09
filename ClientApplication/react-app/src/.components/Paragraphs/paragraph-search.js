import { ParagraphService } from "../../.services/MainServices";
import { Form } from 'react-bootstrap';
import { React } from 'react';
import { StatusHelper, handleSelection } from '../../.helpers/MainHelpers';
import { useState } from 'react';

const ParagraphSearch = ({ onParagraphSelected }) => {
    const [options, setOptions] = useState([]);

    const handleFieldChange = async (event) => {
        const { value } = event.target;
        if (value !== "") {
            let data = await ParagraphService.getParagraphByTitle(value);
            if (StatusHelper.isOK(data)) {
                if (data && data.count > 0) {
                    const options = data.paragraphs.map((paragraph) => (
                        <option key={paragraph.id} value={paragraph.title}></option>
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
