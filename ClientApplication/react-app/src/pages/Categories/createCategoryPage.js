import React from 'react';
import '../../styles/Articles/createArticleStyle.css';
import { CreateEditCategory, ReturnToCategoriesButton } from '../../.components/.MainComponentsExport';
import { Row, Col } from 'react-bootstrap';

import { useTranslation } from 'react-i18next'; 
const CreateCategory = () => {

    const { t } = useTranslation();

    return (
        <>
            <ReturnToCategoriesButton />

            <div className="category-home-page">
                <h2>{t('categories.createCategory')}</h2> 
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important", borderStyle:"dashed", borderWidth:"thick", borderColor:"var(--color-cyan-dark)"}}>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={6}>
                        <CreateEditCategory/>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default CreateCategory;