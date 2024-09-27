import React from 'react';
import { Form, Image } from 'react-bootstrap';
import AsyncSelect from 'react-select'


import NoImage from '../no-image.png'

const EditMovie = () =>
{
    const [test, setTest] = useState(null);
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
            var da = test;
            da.coverImage = res.profileImage;

            setTest(oldData => {return{...oldData, ...da};});
        })
        .catch(err => alert("Error in file upload"));
    }

    const handleFieldChange = (event) => {
        var da = test;
        da[event.target.name] = event.target.value;

        setTest(oldData => {return{...oldData, ...da};});
    }

    const promiseOptions = (inputValue) => {
        return fetch(process.env.REACT_APP_API_URL + "Paragraphs/")
    }

    return (
        <>
            <Form NoValidate validated={validated}>
                <Form.Group className="d-flex justify-content-center">
                    <Image width="200" height="200" src={test && test.coverImage || NoImage} />
                </Form.Group>
                <Form.Group className="d-flex justify-content-center">
                    <div><input type="file" onChange={handleFileUpload} /> </div>
                </Form.Group>
                <Form.Group controlId="formtestTitle">
                    <Form.Label>Article Title</Form.Label>
                    <Form.Control name="title" value={test && test.title || ''} required type="text" autoComplete='off' placeholder="Enter Article Title" onChange={handleFieldChange} />
                    <Form.Control.Feedback type="invalid">
                        Please enter article title.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formtestCategory">
                    <Form.Label>Movie Title</Form.Label>
                    <Form.Control name="categoryTitle" value={test && test.categoryTitle || ''} required type="text" placeholder="Enter Article Category" onChange={handleFieldChange} />
                    <Form.Control.Feedback type="invalid">
                        Please enter article category.
                    </Form.Control.Feedback>
                </Form.Group>


                <Form.Group controlId="formtestCategory">
                    <Form.Label>Paragraphs</Form.Label>
                    <AsyncSelect cacheOptions isMulti value={paragraphs} loadOptions={promiseOptions}
                </Form.Group>
            </Form>
        </>
    )
}

export default EditMovie;