import React from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';

import { GiFallingStar } from "react-icons/gi";
import { GiMicroscope } from "react-icons/gi";
import { GiBookmark } from "react-icons/gi";
import { GiBlackKnightHelm } from "react-icons/gi";
import { FaPlusSquare } from "react-icons/fa";

import { useTranslation } from 'react-i18next';
import '../../styles/Categories/categories.css';

const Categories = () => {

    const { t } = useTranslation();

    const navigate = useNavigate();

    const redirectToCreateCategory = () => {
        navigate('/create-category');
    }

    return (
        <>
            <div className="category-home-page">
                <h2>Categories</h2>
            </div>
            <div>
                <div className='mainContainer' style={{ backgroundColor: "red !important" }}>
                    <Row className='row'>
                        <Col xs={12} md={4}>
                            <Button size="lg" className='buttons cyan' onClick={redirectToCreateCategory}><FaPlusSquare className="icons"/> {t('categories.createCategory')}</Button>
                        </Col>
                    </Row>
                </div>
            </div>

            <div className='mainContainer'>
                <Row className='rowCategories'>
                    <Col xs={12} md={2}>
                        <Button size="lg" className='buttons lime' onClick={() => { }}><GiMicroscope className="icons" />  {t('categories.biology')}</Button>
                    </Col>
                    <Col className='categories'>{t('categories.bCategories')}{'...'}</Col>
                </Row >

                <Row className='rowCategories'>

                    <Col xs={12} md={2}>
                        <Button size="lg" className='buttons indigo' onClick={() => { }}><GiFallingStar className="icons" />  {t('categories.astronomy')}</Button>
                    </Col>
                    <Col className='categories'>{t('categories.aCategories')}{'...'}</Col>
                </Row>

                <Row className='rowCategories'>
                    <Col xs={12} md={2}>
                        <Button size="lg" className='buttons yellow' onClick={() => { }}><GiBlackKnightHelm className="icons" /> {t('categories.history')}</Button>
                    </Col>
                    <Col className='categories'>{t('categories.hCategories')}{'...'}</Col>
                </Row>

                <Row>
                    <Col xs={12} md={2}>
                        <Button size="lg" className='buttons pink' onClick={() => { }}><GiBookmark className="icons" /> {t('categories.literature')}</Button>
                    </Col>
                    <Col className='categories'>{t('categories.lCategories')}{'...'}</Col>
                </Row>

            </div>
        </>

    )
}

export default Categories;