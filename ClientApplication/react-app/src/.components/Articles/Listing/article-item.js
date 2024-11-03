import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import "../../../styles/Articles/articleItemStyle.css"; // stylesheet
import { MdModeEdit } from "react-icons/md";
import { useTranslation } from 'react-i18next'; 
import { FaBookOpenReader } from "react-icons/fa6";

const ArticleItem = (props) => {
    const { t } = useTranslation();
    const { settings, selectThis, deleteThis, editThis, playThis } = props;

    return (
        <>
            <div className="article-item">
                <Row className="row">
                    <Col xs={12} md={10} className="col col-12 col-md-10">
                        <h2 className="wrap-title">{props.data.title}</h2>
                    </Col>
                    <Col xs={12} md={2} className="col col-12 col-md-2">
                        <p className="wrap-category">{props.data.categoryTitle}</p>
                    </Col>
                </Row>

                <div style={{ display: 'flex', gap: '10px' }}> {/* Add gap between buttons */}
                    {settings && settings.showSelectButton && (
                        <div className='editButtons'> {/* Flex for each button container */}
                            <Button onClick={selectThis} className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }}>
                                {t('articles.item.select')}
                            </Button>
                        </div>
                    )}

                    {settings && settings.showDeleteButton && (
                        <div>
                            <Button onClick={deleteThis} className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }}>
                                {t('articles.item.delete')}
                            </Button>
                        </div>
                    )}

                    {settings && settings.showEditButton && (
                        <div>
                            <Button onClick={editThis} className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }}>
                                <MdModeEdit className="icons" /> {t('articles.item.edit')}
                            </Button>
                        </div>
                    )}

                    {settings && settings.showPlayButton && (
                        <div>
                            <Button onClick={playThis} className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }}>
                                <FaBookOpenReader className="icons" /> {t('articles.item.read')}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ArticleItem;
