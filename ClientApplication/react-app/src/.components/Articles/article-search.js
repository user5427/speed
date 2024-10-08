import { ArticleService } from "../../.services/MainServices";
import { Form } from 'react-bootstrap';
import { React } from 'react';
import { StatusHelper } from '../../.helpers/MainHelpers';
import { useState } from 'react';

// This is such a brainfuck. I don't know what to do with this. I have to refactor this to make it work.
const ArticleSearch = ({ onArticleSelected }) => {
    const [options, setOptions] = useState([]);
    const [articleId, setArticleId] = useState('');

    const handleFieldChange = async (event) => {
        const value = event.target;
        if (value !== "") {
            let data = await ArticleService.getArticleByTitle(value);

            if (StatusHelper.isOK(data) === true) {
    
                if (data && data.count === 1) {
                    setArticleId(data.articles[0].id);
                    onArticleSelected(data.articles[0].id);
                }
    
                let options = [];
                if (data && data.count > 1) {
                    for (let i = 0; i < data.articles.length; i++) {
                        options.push(<option key={data.articles[i].id} value={data.articles[i].title}></option>);
                    }
                }
                console.log(options);
                setOptions(options);
            } else if (StatusHelper.isError(data) === true) {
                alert(StatusHelper.getErrorMessage(data));
            } else {
                alert("Error getting data");
            }
        }
    };


        return (
            <Form.Group controlId="formHeroSearch">
                <Form.Label>Search Articles</Form.Label>
                <Form.Control
                    list="articles"
                    name="articleSearch"
                    type="text"
                    id="searchBar"
                    placeholder="Enter article title"
                    onChange={handleFieldChange} // Handle state change to update the form data
                    autoComplete="off"
                />
                <datalist id="articles">
                    {
                        options
                    }
                </datalist>
                <Form.Control.Feedback type="invalid">
                    Please select an article.
                </Form.Control.Feedback>
            </Form.Group>
        );
}

export default ArticleSearch;