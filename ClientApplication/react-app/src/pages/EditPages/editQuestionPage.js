import React from 'react';
import { useSearchParams } from 'react-router-dom';  // Import hook for query params
import '../../styles/Articles/createArticleStyle.css';
import { CreateEditQuestion, ReturnToArticlesButton } from '../../.components/.MainComponentsExport';
import { Row, Col } from 'react-bootstrap';

const EditQuestion = () => {
    // Get search params from the URL
    const [searchParams] = useSearchParams();

    // Get the articleId from the query string, or default to null if not provided
    const questionId = searchParams.get('questionId');

    return (
        <>
            <ReturnToArticlesButton />

            <div className="create-article-page">
                <h2>Edit Question</h2>
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important" }}>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={6}>
                        {questionId ? (
                            <CreateEditQuestion 
                                existingQuestionId={questionId}
                            />
                        ) : (
                            <p>No question ID provided</p>
                        )}
                    </Col>
                </Row>
            </div>
        </>
    );
}