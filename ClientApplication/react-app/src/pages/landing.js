import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

import { MdArticle } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { FaBookReader } from "react-icons/fa";

const Landing = () => {
    const navigate  = useNavigate();

    const redirectToCategories = () => {
        navigate ('/categories');
    };
    const redirectToArticles = () => {
        navigate ('/articles');
    };
    const redirectToExercise = () => {
        navigate ('/exercise');
    };

   return (
     <div className='mainContainer' style={{backgroundColor:"red !important"}}>
        <Row className='row'>
            <Col xs={12} md={3}>
                <Button className='subjectButtons' size="lg" style={{ backgroundColor: '#9229A4', borderColor: '#9229A4'}} onClick={redirectToCategories}><BiSolidCategory/> Go to Categories</Button>
            </Col>
            <Col xs={12} md={3}>
                <Button className='subjectButtons' size="lg" style={{ backgroundColor: '#6E29A4', borderColor: '#6E29A4'}} onClick={redirectToArticles}><MdArticle/> Go to Articles</Button>
            </Col>
            <Col xs={12} md={3}>
                <Button className='subjectButtons' size="lg" style={{ backgroundColor: '#0086b3', borderColor: '#006080'}} onClick={redirectToExercise}><FaBookReader /> Go to Exercise</Button>
            </Col>
        </Row>
        </div>
    );
    
        
}

export default Landing;