import React from 'react';
import '../../styles/Articles/createArticleStyle.css';
import { Row, Col } from 'react-bootstrap';

import { CreateEditParagraph, ReturnToArticlesButton } from '../../.components/.MainComponentsExport';

const CreateParagraph = () => {

    return (
        <>
            <ReturnToArticlesButton />

            <div className="create-article-page">
                <h2>Create paragraph</h2>
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important" }}>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={6}>
                        <CreateEditParagraph />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default CreateParagraph;