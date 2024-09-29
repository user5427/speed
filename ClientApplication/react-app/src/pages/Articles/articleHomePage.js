import React from "react";
import { useNavigate } from 'react-router-dom';
import ArticleList from "../../components/Articles/article-list-page";
import "../../styles/Articles/articleHomePage.css";
import { MdCreate } from "react-icons/md";
import { Row, Col, Button } from 'react-bootstrap';


const ArticleHomePage = () => {
    const navigate = useNavigate();

    const redirectToCategories = () => {
        navigate('/create-article');
    }
    
    return (
        <>
            <div className="article-home-page">
                <h2>Article Home Page</h2>
                <div className='mainContainer' style={{ backgroundColor: "red !important" }}>
                    <Row className='row'>
                        <Col xs={12} md={6}>
                            <Button className='subjectButtons' size="lg" style={{ backgroundColor: '#9229A4', borderColor: '#9229A4' }} onClick={redirectToCategories}><MdCreate /> Create Article</Button>
                        </Col>
                    </Row>
                </div>
                <h2>Article list</h2>
            </div>
            <ArticleList/>
        </>

    );
}

export default ArticleHomePage;