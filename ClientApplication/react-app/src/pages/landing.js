import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

import { MdArticle } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import "../styles/landingStyle.css";

const Landing = () => {
    const navigate = useNavigate();

    const redirectToCategories = () => {
        navigate('/categories');
    };
    const redirectToArticles = () => {
        navigate('/articles');
    };

    return (
        <>
            <Row className='row'>
                <Col xs={12} md={6}>
                    <Button className='subjectButtons' size="lg" style={{ backgroundColor: '#9229A4', borderColor: '#9229A4' }} onClick={redirectToCategories}><BiSolidCategory />Go to Categories</Button>
                </Col>
                <Col xs={12} md={6}>
                    <Button className='subjectButtons' size="lg" style={{ backgroundColor: '#6E29A4', borderColor: '#6E29A4' }} onClick={redirectToArticles}><MdArticle />Go to Articles</Button>
                </Col>
            </Row>

            <div className='landing'>
                <h2>Speed reader is a tool that helps you read faster by eliminating subvocalization, or the habit of silently pronouncing words in your head while you read. </h2>
            </div>
        </>
    );


}

export default Landing;