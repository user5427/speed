import { React, useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import AsyncSelect from 'react-select'


import NoImage from '../../no-image.png'
import ArticleService from '../.services/Articles/article-service';

const EditArticle = () => {
    const [article, setArticle] = useState({});
    const [paragraphs, setParagraphs] = useState(null);
    const [validated, setValidated] = useState(false);

    /**
     * Handle file upload
     */
    const handleFileUpload = (event) => {
        event.preventDefault();
        var file = event.target.files[0];
        const form = new FormData();
        form.append("imageFile", file);

        fetch(process.env.REACT_APP_API_URL + "Articles/upload-test-image", {
            method: "POST",
            body: form
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`Failed to save image. Status code: ${res.status}`);
            }
        }).then(res => {
            var newArticle = article;
                newArticle.coverImage = res.profileImage;

                setArticle(oldData => { return { ...oldData, ...newArticle }; });
        }).catch(err => alert("Error in file upload"));
    }

    const handleSave = async (event) => {
        event.preventDefault(); // we do not want the page to reload.
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;  // stop execution if the form is not valid
        }

        let articleToPost = article;
        // Ensure that paragraphIds is an array before mapping
        if (articleToPost.paragraphIds && Array.isArray(articleToPost.paragraphIds)) {
            articleToPost.paragraphIds = articleToPost.paragraphIds.map(x => x.id);
        } else {
            articleToPost.paragraphIds = [];  // Set to an empty array if undefined
        }

        let data = "";
        if (article && article.id > 0) {
            data = await ArticleService.putArticle(articleToPost);
        } else {
            data = await ArticleService.postArticle(articleToPost);
        }

        if (data && data.article) {
            setArticle(data.article);
            alert(article && article.id > 0 ? 'Updated article successfully.' : 'Created article successfully.');
        } else {
            alert("Error getting data");
        }
    }

    const handleFieldChange = (event) => {
        const { name, value } = event.target;

        setArticle(prevArticle => ({ ...prevArticle, [name]: value }));
    }

    return (
        <>
            <Form NoValidate validated={validated} onSubmit={handleSave}>
                <Form.Group className="d-flex justify-content-center">
                    <Image width="200" height="200" src={article && article.coverImage || NoImage} />
                </Form.Group>
                <Form.Group className="d-flex justify-content-center">
                    <div><input type="file" onChange={handleFileUpload} /> </div>
                </Form.Group>
                <Form.Group controlId="formtestTitle">
                    <Form.Label>Article Title</Form.Label>
                    <Form.Control name="title" value={article && article.title || ''} required type="text" autoComplete='off' placeholder="Enter Article Title" onChange={handleFieldChange} />
                    <Form.Control.Feedback type="invalid">
                        Please enter article title.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formtestCategory">
                    <Form.Label>Article Category</Form.Label>
                    <Form.Control name="categoryTitle" value={article && article.categoryTitle || ''} required type="text" placeholder="Enter Article Category" onChange={handleFieldChange} />
                    <Form.Control.Feedback type="invalid">
                        Please enter article category.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit">{article && article.id > 0 ? "Update" : "Create"}</Button>
            </Form>
        </>
    )
}

export default EditArticle;