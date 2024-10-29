import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import "../../../styles/Articles/articleItemStyle.css"; // stylesheet
import { MdModeEdit } from "react-icons/md";

import { useTranslation } from 'react-i18next'; 

const ParagraphItem = (props) => {

    const { t } = useTranslation();

    const { settings, selectThis, deleteThis, editThis } = props;
    return (
        <>
            <div className="article-item"> {/* Apply the article-item class */}
                <Row className="row">
                    <Col xs={12} md={10} className="col col-12 col-md-10">
                        <h2 className="wrap-title">{props.data.title}</h2> {/* Apply heading and bold */}
                    </Col>
                </Row>

                <div>
                    {settings && settings.showSelectButton && (
                        <Row className="row">
                            <Col xs={12} md={2} className="col col-12 col-md-2">
                                <Button onClick={selectThis} className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }}>{t('paragraphs.item.select')}</Button> {/* Apply a button class */}
                            </Col>
                        </Row>
                    )}

                    {settings && settings.showDeleteButton && (
                        <Row className="row">
                            <Col xs={12} md={2} className="col col-12 col-md-2">
                                <Button onClick={deleteThis} className="editButton" variant="delete" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }}>{t('paragraphs.item.delete')}</Button> {/* Apply a button class */}
                            </Col>
                        </Row>
                    )}

                    {settings && settings.showEditButton && (
                        <Row className="row">
                            <Col xs={12} md={2} className="col col-12 col-md-2">
                                <Button onClick={editThis} className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }}><MdModeEdit /> {t('paragraphs.item.edit')}</Button> {/* Apply a button class */}
                            </Col>
                        </Row>
                    )}

                </div>
            </div>
        </>
    )
}

export default ParagraphItem;

