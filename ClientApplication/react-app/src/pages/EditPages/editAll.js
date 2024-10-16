import { React, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';  // Import hook for query params
import '../../styles/Articles/createArticleStyle.css';
import { CreateEditArticle, CreateEditParagraph, ReturnToArticlesButton, CreateEditQuestion } from '../../.components/.MainComponentsExport';
import { Row, Col } from 'react-bootstrap';
import { ParagraphList, QuestionList, ArticleList } from '../../.components/.MainComponentsExport';
const EditArticleParagraphQuestion = () => {
    // Get search params from the URL
    const [searchParams] = useSearchParams();
    const [articleId, setArticleId] = useState(null);
    const [paragraphId, setParagraphId] = useState(null);
    const [questionId, setQuestionId] = useState(null);

    // Get the articleId from the query string, or default to null if not provided
    // setArticleId(searchParams.get('articleId'));

    const getSelectedArticle = (articleId) => {
        setArticleId(articleId);
        setParagraphId(null);
        setQuestionId(null);
    }

    const getSelectedParagraph = (paragraphId) => {
        setParagraphId(paragraphId);
        setQuestionId(null);
    }

    const getSelectedQuestion = (questionId) => {
        setQuestionId(questionId);
    }

    const receiveArticleId = (articleId) => {
        setArticleId(articleId);
    }

    const receiveParagraphId = (paragraphId) => {
        setParagraphId(paragraphId);
    }

    const receiveQuestionId = (questionId) => {
        setQuestionId(questionId);
    }

    const handleCreateArticle = () => {
        setArticleId(null);
        setParagraphId(null);
        setQuestionId(null);
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
                <h2>Edit All</h2>
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important" }}>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={4}>
                        {
                            articleId ? (
                                <CreateEditArticle
                                    existingArticleId={articleId}
                                />
                            ) : (
                                <CreateEditArticle
                                    sendCreatedId={receiveArticleId}
                                />
                            )}
                    </Col>
                    <Col xs={12} md={4}>
                        {
                            paragraphId ? (
                                <CreateEditParagraph
                                    existingParagraphId={paragraphId}
                                />
                            ) : articleId ? (
                                <CreateEditParagraph
                                    articleFromOutsideId={articleId}
                                    sendCreatedId={receiveParagraphId}
                                />
                            ) : (
                                <p>Paragraph editing or creating unavailable</p>
                            )
                        }
                    </Col>
                    <Col xs={12} md={4}>
                        {
                            questionId ? (
                                <CreateEditQuestion
                                    existingQuestionId={questionId}
                                />
                            ) : paragraphId ? (
                                <CreateEditQuestion
                                    paragraphFromOutsideId={paragraphId}
                                    sendCreatedId={receiveQuestionId}
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
                            articleId ? (
                                <Button onClick={handleCreateArticle} className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }}>Reset Article</Button>
                            ) : (
                                <Button onClick={handleCreateArticle} className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }} disabled>Reset Article</Button>
                            )
                        }
                    </Col>
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
                        <ArticleList
                            settings={{ showEditButton: false, showSelectButton: true }}
                            getSelected={getSelectedArticle}
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        {
                            articleId ? (
                                <ParagraphList
                                    articleId={articleId}
                                    getSelected={getSelectedParagraph}
                                />
                            ) : (
                                <p>Paragraphs unavailable</p>
                            )
                        }
                    </Col>
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

export default EditArticleParagraphQuestion;
