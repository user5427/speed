import React from 'react';
import '../../styles/Articles/createArticleStyle.css';
import EditArticle from '../../components/Articles/edit-article';
import { Row, Col, Button } from 'react-bootstrap';

const CreateArticle = () => {
    return (
        <>
            <div className="create-article-page">
                <h2>Create Article</h2>
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important" }}>
                <Row className='row'>
                    <Col xs={12} md={4}>
                        <EditArticle/>
                    </Col>
                </Row>
            </div>
        </>

    )
}

export default CreateArticle;