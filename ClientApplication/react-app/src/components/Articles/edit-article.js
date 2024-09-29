import { React, useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import AsyncSelect from 'react-select'


import NoImage from '../../no-image.png'

const EditArticle = () =>
{
    const [article, setArticle] = useState(null);
    const [paragraphs, setParagraphs] = useState(null);
    const [validated, setValidated] = useState(false);


    const handleFileUpload = (event) => {
        event.preventDefault();
        var file = event.target.files[0];
        const form = new FormData();
        form.append("imageFile", file);

        fetch(process.env.REACT_APP_API_URL + "Articles/upload-test-image", {
            method: "POST",
            body: form
        })
        .then(res => res.json())    
        .then(res => {
            var newArticle = article;
            newArticle.coverImage = res.profileImage;

            setArticle(oldData => {return{...oldData, ...newArticle};});
        })
        .catch(err => alert("Error in file upload"));
    }

    const handleSave = (event) => {
        event.preventDefault(); // we do not want the page to reload.
        const form = event.currentTarget;
        if (form.checkValidity() === false){
            event.stopPropagation();
            setValidated(true);
        }

        let articleToPost = article;
        articleToPost.paragraphs = articleToPost.paragraphs.map(x => x.id);

        if (article && article.id > 0){
            // update
            fetch(process.env.REACT_APP_API_URL + "Articles", {
                method: "PUT",
                headers: {
                    'Accept:': 'application/json',
                    'Content:': 'application/json',
                },
                body: JSON.stringify(articleToPost)
            })
            .then(res => res.json())
            .then(res => {
                if (res.ok){
                    setArticle(res.data);
                    alert('updates successfully.')
                }
        })
        .catch(err => alert("Error in getting data"));
        } else {
            // create
            fetch(process.env.REACT_APP_API_URL + "Articles", {
                method: "POST",
                headers: {
                    'Accept:': 'application/json',
                    'Content:': 'application/json',
                },
                body: JSON.stringify(articleToPost)
            })
            .then(res => res.json())
            .then(res => {
                if (res.ok){
                    setArticle(res.data);
                    alert('created successfully.')
                }
        })
        .catch(err => alert("Error in getting data"));
        }
    }

    const handleFieldChange = (event) => {
        var da = article;
        da[event.target.name] = event.target.value;

        setArticle(oldData => {return{...oldData, ...da};});
    }

    const promiseOptions = (inputValue) => {
        return fetch(process.env.REACT_APP_API_URL + "Paragraphs/" + inputValue)
        .then(res => res.json())
        .then(res => {
            if(res.ok && res.data.length > 0) {
                return res.data.map(x => {return {value: x.id, label: x.text}});
            }

            if (res.data.count === 0){
                alert("there is no paragraph matching this id")
            }
        })
        .catch(err => alert("Error getting data"));
    }

    const multiSelectchange = (data) => {
        setParagraphs(data);

        var paragraphs = data.map(x => {return {id: x.value, text: x.text}})
        var da = article;
        da.paragraphs = paragraphs;

        setArticle(oldData => {return{...oldData, ...da};});
    }

    // the visuals
    return (
        <>
            <Form NoValidate validated={validated} onSubmint={handleSave}>
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
                    <Form.Label>Article Title</Form.Label>
                    <Form.Control name="categoryTitle" value={article && article.categoryTitle || ''} required type="text" placeholder="Enter Article Category" onChange={handleFieldChange} />
                    <Form.Control.Feedback type="invalid">
                        Please enter article category.
                    </Form.Control.Feedback>
                </Form.Group>


                <Form.Group controlId="formtestCategory">
                    <Form.Label>Paragraphs</Form.Label>
                    <AsyncSelect cacheOptions isMulti value={paragraphs} loadOptions={promiseOptions} onChange={multiSelectchange} />
                </Form.Group>
                <Button type="submit">{article && article.id > 0 ? "Update" : "Create"}</Button> 
            </Form>
        </>
    )
}

export default EditArticle;