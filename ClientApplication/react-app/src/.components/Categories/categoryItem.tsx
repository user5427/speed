import { ValidationPatternConstants } from '../../.constants/MainConstants';
import { useState, useEffect } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { MdDelete } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";

import { useTranslation } from 'react-i18next';
import React from 'react';

import { CategoryController } from "../../.controllers/.MainControllersExport";
import { Category } from '../../.entities/.MainEntitiesExport';

const CategoryItem = ({ index, title, deleteCategory }) => {

    const { t } = useTranslation();

    const [validated, setValidated] = useState(false);
    const [text, setText] = useState(""); //\


    return (
        <>
            <Row style={{ marginBottom: '10px', marginTop: '10px' }} >
                <Col xs={12} md={12} >
                    <p>{title}</p>
                </Col>
            </Row>
            <Row className="no-gutters d-flex justify-content-between align-items-center" style={{ marginBottom: '10px', marginTop: '10px' }}>
                <Col xs="auto">
                    <Button className='buttons pink' style={{ width: "auto" }} onClick={() => deleteCategory(index)}>
                        <MdDelete className='icons' /> {t('questions.answerItem.delete')}
                    </Button>
                </Col>
            </Row>

        </>
    );
}

export default CategoryItem;