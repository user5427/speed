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

    const [updateParagraphList, setUpdateParagraphList] = useState(false);
    const [updateQuestionList, setUpdateQuestionList] = useState(false);

    // Get the articleId from the query string, or default to null if not provided
    useEffect(() => {
        setArticleId(searchParams.get('articleId'));
    }, [searchParams]); // Only runs when searchParams changes

    const getSelectedArticle = (articleId) => {
        setArticleId(articleId);
        setParagraphId(null);
        setQuestionId(null);
        setUpdateParagraphList(!updateParagraphList);
    }

    const getSelectedParagraph = (paragraphId) => {
        setParagraphId(paragraphId);
        setQuestionId(null);
        setUpdateQuestionList(!updateQuestionList);
    }

    const getSelectedQuestion = (questionId) => {
        setQuestionId(questionId);
    }

    const receiveArticleId = (articleId) => {
        setArticleId(articleId);
        setUpdateParagraphList(!updateParagraphList);
    }

    const receiveParagraphId = (paragraphId) => {
        setParagraphId(paragraphId);
        setUpdateParagraphList(!updateParagraphList);
        setUpdateQuestionList(!updateQuestionList);
    }

    const receiveQuestionId = (questionId) => {
        setQuestionId(questionId);
        setUpdateQuestionList(!updateQuestionList);
    }

    const resetArticleId = () => {
        setArticleId(null);
        setParagraphId(null);
        setQuestionId(null);
    }

    const resetParagraphId = () => {
        setParagraphId(null);
        setQuestionId(null);
    }

    const resetQuestionId = () => {
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
                                    key={`edit-${articleId}`}
                                    existingArticleId={articleId}
                                    redirect={false}
                                />
                            ) : (
                                <CreateEditArticle
                                    sendCreatedId={receiveArticleId}
                                    redirect={false}
                                />
                            )}
                    </Col>
                    <Col xs={12} md={4}>
                        {
                            paragraphId ? (
                                <CreateEditParagraph
                                    key={`edit-${paragraphId}`}
                                    existingParagraphId={paragraphId}
                                    redirect={false}
                                />
                            ) : articleId ? (
                                <CreateEditParagraph
                                    articleFromOutsideId={articleId}
                                    sendCreatedId={receiveParagraphId}
                                    redirect={false}
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
                                    key={`edit-${questionId}`}
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
                            articleId ? (
                                <Button onClick={resetArticleId} className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }}>Reset Article</Button>
                            ) : (
                                <Button onClick={resetArticleId} className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }} disabled>Reset Article</Button>
                            )
                        }
                    </Col>
                    <Col xs={12} md={4}>
                        {
                            paragraphId ? (
                                <Button onClick={resetParagraphId} className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }}>Reset Paragraph</Button>
                            ) : (
                                <Button onClick={resetParagraphId} className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }} disabled>Reset Paragraph</Button>
                            )
                        }
                    </Col>
                    <Col xs={12} md={4}>
                        {
                            questionId ? (
                                <Button onClick={resetQuestionId} className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }}>Reset Question</Button>
                            ) : (
                                <Button onClick={resetQuestionId} className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }} disabled>Reset Question</Button>
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
                                    update={updateParagraphList}
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
                                    update={updateQuestionList}
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
