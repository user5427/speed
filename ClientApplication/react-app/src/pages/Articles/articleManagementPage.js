import React from "react";
import { useNavigate } from 'react-router-dom';
import {ArticleList} from "../../.components/.MainComponentsExport";
import "../../styles/Articles/articleManagementPage.css";
import { Row, Col, Button } from 'react-bootstrap';
import { FaPlusSquare } from "react-icons/fa";

import { useTranslation } from 'react-i18next'; 

const ArticleHomePage = () => {

    const { t } = useTranslation();

    const navigate = useNavigate();

    const redirectToCreateArticle = () => {
        navigate('/create-article');
    }

    const redirectToCreateParagraph = () => {
        navigate('/create-paragraph');
    }

    const redirectToCreateQuestion = () => {
        navigate('/create-question');
    }

    const getSelectedArticle = (articleId) => {
        window.location.href = `/edit-all?articleId=${articleId}`;

    }

    const getPlayArticle = (articleId) => {
        window.location.href = `/exercise?articleId=${articleId}`;
    }
    
    
    const settings = {
        showEditButton: true,
        showPlayButton: true
    };

    return (
        <>
            <div className="article-home-page">
                <h2>{t('articleManagmentPage.articleHomePage')}</h2>
                <div className='mainContainer' style={{ backgroundColor: "red !important" }}>
                    <Row className='row'>
                        <Col xs={12} md={4}>
                            <Button className='subjectButtons' size="lg" style={{ backgroundColor: '#2992a4', borderColor: '#2992a4' }} onClick={redirectToCreateArticle}><FaPlusSquare /> {t('articleManagmentPage.createArticle')}</Button>
                        </Col>
                        <Col xs={12} md={4}>
                            <Button className='subjectButtons' size="lg" style={{ backgroundColor: '#2992a4', borderColor: '#2992a4' }} onClick={redirectToCreateParagraph}><FaPlusSquare /> {t('articleManagmentPage.createParagraph')}</Button>
                        </Col>
                        <Col xs={12} md={4}>
                            <Button className='subjectButtons' size="lg" style={{ backgroundColor: '#2992a4', borderColor: '#2992a4' }} onClick={redirectToCreateQuestion}><FaPlusSquare /> {t('articleManagmentPage.createQuestion')}</Button>
                        </Col>
                    </Row>
                </div>
                <h2>{t('articleManagmentPage.articleList')}</h2>
            </div>

            <ArticleList 
                settings={settings}
                getEditing={getSelectedArticle}
                getPlay={getPlayArticle}
            />
        </>

    );
}

export default ArticleHomePage;