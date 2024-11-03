import { React, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';  // Import hook for query params
import '../../styles/Articles/createArticleStyle.css';
import { CreateEditParagraph, ReturnToArticlesButton, CreateEditQuestion } from '../../.components/.MainComponentsExport';
import { Row, Col } from 'react-bootstrap';
import { QuestionList } from '../../.components/.MainComponentsExport';

import { useTranslation } from 'react-i18next';

const EditParagraphQuestion = () => {

    const { t } = useTranslation();

    // Get search params from the URL
    const [searchParams] = useSearchParams();
    const [paragraphId, setParagraphId] = useState(null);
    const [questionId, setQuestionId] = useState(null);

    const [updateQuestionList, setUpdateQuestionList] = useState(false);

    // Get the articleId from the query string, or default to null if not provided
    // setArticleId(searchParams.get('articleId'));
    useEffect(() => {
        setParagraphId(searchParams.get('paragraphId'));
    }, [searchParams]); // Only runs when searchParams changes

    const getSelectedParagraph = (paragraphId) => {
        setParagraphId(paragraphId);
        setQuestionId(null);
        setUpdateQuestionList(!updateQuestionList);
    }

    const getSelectedQuestion = (questionId) => {
        setQuestionId(questionId);
    }

    const receiveParagraphId = (paragraphId) => {
        setParagraphId(paragraphId);
        setUpdateQuestionList(!updateQuestionList);
    }

    const receiveQuestionId = (questionId) => {
        setQuestionId(questionId);
        setUpdateQuestionList(!updateQuestionList);
    }

    const handleResetParagraph = () => {
        setParagraphId(null);
        setQuestionId(null);
    }

    const handleResetQuestion = () => {
        setQuestionId(null);
    }

    const triggerUpdateQuestionList = () => {
        setUpdateQuestionList(!updateQuestionList)
    }

    return (
        <>
            <ReturnToArticlesButton />

            <div className="create-article-page">
                <h2>{t('editPages.paragraphs.editParAndQ')}</h2>
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important" }}>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={4}>
                        {
                            paragraphId ? (
                                <CreateEditParagraph
                                    key={`edit-${paragraphId}`}
                                    existingParagraphId={paragraphId}
                                    redirect={false}
                                />
                            ) : (
                                <CreateEditParagraph
                                    sendCreatedId={receiveParagraphId}
                                    redirect={false}
                                />
                            )
                        }
                    </Col>
                    <Col xs={12} md={4}>
                        {
                            questionId ? (
                                <CreateEditQuestion
                                    key={`edit-${questionId}`}
                                    existingQuestionId={questionId}
                                    redirect={false}
                                    sendUpdate={triggerUpdateQuestionList}
                                />
                            ) : paragraphId ? (
                                <CreateEditQuestion
                                    paragraphFromOutsideId={paragraphId}
                                    sendCreatedId={receiveQuestionId}
                                    redirect={false}
                                    sendUpdate={triggerUpdateQuestionList}
                                />
                            ) : (
                                <p>{t('editPages.paragraphs.qEditingorCreating')}</p>
                            )
                        }
                    </Col>
                </Row>
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important" }}>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={4}>
                        
                    </Col>
                    <Col xs={12} md={4}>
                        {
                            questionId ? (
                                <Button onClick={handleResetQuestion} className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }}>{t('editPages.paragraphs.resetQuest')}</Button>
                            ) : (
                                <Button onClick={handleResetQuestion} className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }} disabled>{t('editPages.paragraphs.resetQuest')}</Button>
                            )
                        }
                    </Col>
                </Row>
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important" }}>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={4}>
                        {
                            paragraphId ? (
                                <QuestionList
                                    settings={{ showSelectButton: true }}
                                    paragraphId={paragraphId}
                                    getSelected={getSelectedQuestion}
                                    update={updateQuestionList}
                                />
                            ) : (
                                <p>{t('editPages.paragraphs.questUnavailable')}</p>
                            )
                        }
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default EditParagraphQuestion;
