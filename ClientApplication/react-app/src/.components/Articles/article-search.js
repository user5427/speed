import { Form } from 'react-bootstrap';
import { React } from 'react';
import { handleSelection } from '../../.helpers/MainHelpers';
import { useState } from 'react';
import { ArticleController } from "../../.controllers/.MainControllersExport";
import { ValidationPatternConstants } from '../../.constants/MainConstants';
const ArticleSearch = ({ onArticleSelected }) => {
    const [options, setOptions] = useState([]);

    // Function to fetch articles based on the user input
    const handleFieldChange = async (event) => {
        const { value } = event.target;
        if (value !== "") {
            try {
                let articlePage = await ArticleController.Search(value);
                if (articlePage.articles.length > 0) {
                    const options = articlePage.articles.map((article) => (
                        <option key={article.id} value={article.title}></option>
                    ));
                    setOptions(options);
                } else {
                    setOptions([]); // Clear options if input is empty
                }
            } catch (error) {
                alert(error);
            }
        }
    };

    // Function to handle user selecting an article from the list
    const handleArticleSelect = (event) => {
        handleSelection(options, event, onArticleSelected);
    };

    return (
        <Form NoValidate>
            <Form.Group controlId="formArticleSearch">
                <Form.Label>Search Articles</Form.Label>
                <Form.Control
                    list="articles"
                    name="articleSearch"
                    required
                    type="text"
                    id="searchBar"
                    placeholder="Enter article title"
                    onChange={handleFieldChange} // Update the options list
                    onInput={handleArticleSelect} // Handle article selection
                    autoComplete="off"
                    patter={ValidationPatternConstants.TitlePattern.source}
                />
                <datalist id="articles">
                    {options}
                </datalist>
                <Form.Control.Feedback type="invalid">
                    Please select an article.
                </Form.Control.Feedback>
            </Form.Group>
        </Form>
    );
};

export default ArticleSearch;
