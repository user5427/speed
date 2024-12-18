import { useSearchParams } from 'react-router-dom';  // Import hook for query params
import '../../styles/Articles/createArticleStyle.css';
import { CreateEditQuestion, ReturnToArticlesButton } from '../../.components/.MainComponentsExport';
import { Row, Col } from 'react-bootstrap';
import { React, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

const EditQuestion = () => {

    const { t } = useTranslation();

    // Get search params from the URL
    const [searchParams] = useSearchParams();
    const [questionId, setQuestionId] = useState(null);

    // Get the articleId from the query string, or default to null if not provided
    useEffect(() => {
        setQuestionId(searchParams.get('questionId'));
    }, [searchParams]); // Only runs when searchParams changes

    const receiveQuestionId = (questionId) => {
        setQuestionId(questionId);
    }

    const handleCreateQuestion = () => {
        setQuestionId(null);
    }

    const noQuestionFound = () => {
        window.location.href = `/edit-question`;
    }

    return (
        <>
            <ReturnToArticlesButton />

            <div className="create-article-page">
                <h2>{t('editPages.questions.editQuestion')}</h2>
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important" }}>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={4}>
                        {
                            questionId ? (
                                <CreateEditQuestion
                                    key={`edit-${questionId}`}
                                    existingQuestionId={questionId}
                                    noQuestionFound={noQuestionFound}
                                    redirect={false}
                                />
                            ) : (
                                <CreateEditQuestion
                                    sendCreatedId={receiveQuestionId}
                                    redirect={false}
                                />
                            )
                        }
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default EditQuestion;