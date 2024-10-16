import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

import React from 'react';

const ReturnToArticlesButton = () => {
    const navigate = useNavigate();
    const redirectToArticlePage = () => {
        navigate('/articles');
    }

    return (
        <div className='create-article-page'>
            <Row className='row'>
                <Col xs={4} md={3}>
                    <Button className='subjectButtons' size="lg" style={{ backgroundColor: '#9229A4', borderColor: '#9229A4' }} onClick={redirectToArticlePage}><IoReturnUpBack /> Articles</Button>
                </Col>
            </Row>
        </div>
    );

}

export default ReturnToArticlesButton