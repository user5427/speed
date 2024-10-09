import React from 'react';
import '../../styles/Articles/createArticleStyle.css';
import { CreateEditArticle, ReturnToArticlesButton } from '../../.components/.MainComponentsExport';
import { Row, Col } from 'react-bootstrap';

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
                        <CreateEditArticle />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default CreateArticle;