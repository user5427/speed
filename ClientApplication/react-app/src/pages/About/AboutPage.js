import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import { MdArticle } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import "../../styles/About/About.css";
import { FaBookReader } from "react-icons/fa";

import { useTranslation } from 'react-i18next'; 

const About = () => {

    const { t } = useTranslation();



    return (
        <>
            <div className="about-page">
                <h2>About</h2>
            </div>
            <div className='mainContainer' style={{ backgroundColor: "red !important" }}>
                <Row className='row'>
                     <Col>HEllo</Col>
                </Row>
            </div>
            

        </>
    );
}

export default About;