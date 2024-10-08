import React from 'react';
import '../../styles/Articles/createArticleStyle.css';
import EditArticle from '../../.components/Articles/create-edit-article';
import { Row, Col } from 'react-bootstrap';

import ReturnToArticlesButton from '../../.components/Articles/return-to-articles-button';

const CreateArticle = () => {

    return (
        <>
            <ReturnToArticlesButton />

            <div className="create-article-page">
                <h2>Create Article</h2>
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important" }}>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={6}>
                        <EditArticle />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default CreateArticle;