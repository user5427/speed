import { React, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';  // Import hook for query params
import '../../styles/Articles/createArticleStyle.css';
import { CreateEditParagraph, ReturnToArticlesButton, CreateEditQuestion } from '../../.components/.MainComponentsExport';
import { Row, Col } from 'react-bootstrap';
import { QuestionList } from '../../.components/.MainComponentsExport';
const EditParagraphQuestion = () => {
    // Get search params from the URL
    const [searchParams] = useSearchParams();
    const [paragraphId, setParagraphId] = useState(null);
    const [questionId, setQuestionId] = useState(null);

    // Get the articleId from the query string, or default to null if not provided
    // setArticleId(searchParams.get('articleId'));
    useEffect(() => {
        setParagraphId(searchParams.get('paragraphId'));
    }, [searchParams]); // Only runs when searchParams changes

    const getSelectedParagraph = (paragraphId) => {
        setParagraphId(paragraphId);
        setQuestionId(null);
    }

    const getSelectedQuestion = (questionId) => {
        setQuestionId(questionId);
    }

    const receiveParagraphId = (paragraphId) => {
        setParagraphId(paragraphId);
    }

    const receiveQuestionId = (questionId) => {
        setQuestionId(questionId);
    }

    const handleCreateParagraph = () => {
        setParagraphId(null);
        setQuestionId(null);
    }

    const handleCreateQuestion = () => {
        setQuestionId(null);
    }

    return (
        <>
            <ReturnToArticlesButton />

            <div className="create-article-page">
                <h2>Edit Paragraph and Question</h2>
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important" }}>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={4}>
                        {
                            paragraphId ? (
                                <CreateEditParagraph
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
                                    existingQuestionId={questionId}
                                    redirect={false}
                                />
                            ) : paragraphId ? (
                                <CreateEditQuestion
                                    paragraphFromOutsideId={paragraphId}
                                    sendCreatedId={receiveQuestionId}
                                    redirect={false}
                                />
                            ) : (
                                <p>Question editing or creating unavailable</p>
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
                                <Button onClick={handleCreateParagraph} className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }}>Reset Paragraph</Button>
                            ) : (
                                <Button onClick={handleCreateParagraph} className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }} disabled>Reset Paragraph</Button>
                            )
                        }
                    </Col>
                    <Col xs={12} md={4}>
                        {
                            questionId ? (
                                <Button onClick={handleCreateQuestion} className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }}>Reset Question</Button>
                            ) : (
                                <Button onClick={handleCreateQuestion} className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }} disabled>Reset Question</Button>
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
                                    paragraphId={paragraphId}
                                    getSelected={getSelectedQuestion}
                                />
                            ) : (
                                <p>Questions unavailable</p>
                            )
                        }
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default EditParagraphQuestion;
