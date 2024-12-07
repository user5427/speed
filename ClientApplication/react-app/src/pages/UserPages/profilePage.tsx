import React from 'react';
import '../../styles/Articles/createArticleStyle.css';
import { Profile } from '../../.components/.MainComponentsExport';
import { Row, Col } from 'react-bootstrap';

import { useTranslation } from 'react-i18next'; 

const ProfilePage = () => {

    const { t } = useTranslation();

    return (
        <>
            <div className="category-home-page">
                <h2>PROFILE {t('login.logIn')}</h2> 
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important", borderStyle:"dashed", borderWidth:"thick", borderColor:"var(--color-orange-dark)"}}>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={6}>
                        <Profile/>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ProfilePage;