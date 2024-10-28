import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

import { MdArticle } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import "../../styles/HomePage/homePage.css";
import { FaBookReader } from "react-icons/fa";

import FlashingText from '../../.components/HomePage/FlashingText';

import { useTranslation } from 'react-i18next'; 

const Landing = () => {

    const { t } = useTranslation();

    const navigate = useNavigate();

    const redirectToCategories = () => {
        navigate('/categories');
    };
    const redirectToArticles = () => {
        navigate('/articles');
    };
    const redirectToExercise = () => {
        navigate('/exercise');
    };

    return (
        <>
            <div className='mainContainer' style={{ backgroundColor: "red !important" }}>
                <Row className='row'>
                    <Col xs={12} md={3}>
                        <Button className='subjectButtons' size="lg" style={{ backgroundColor: '#9229A4', borderColor: '#9229A4' }} onClick={redirectToCategories}><BiSolidCategory /> {t('homepage.goToCategories')}</Button>
                    </Col>
                    <Col xs={12} md={3}>
                        <Button className='subjectButtons' size="lg" style={{ backgroundColor: '#6E29A4', borderColor: '#6E29A4' }} onClick={redirectToArticles}><MdArticle /> {t('homepage.goToArticles')}</Button>
                    </Col>
                    <Col xs={12} md={3}>
                        <Button className='subjectButtons' size="lg" style={{ backgroundColor: '#0086b3', borderColor: '#006080' }} onClick={redirectToExercise}><FaBookReader /> {t('homepage.goToExercise')}</Button>
                    </Col>
                </Row>
            </div>
            
            <FlashingText sentence={t('homepage.flashingSentence')}/>

        </>
    );
}

export default Landing;