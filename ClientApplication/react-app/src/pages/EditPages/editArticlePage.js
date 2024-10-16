import React from 'react';
import { useSearchParams } from 'react-router-dom';  // Import hook for query params
import '../../styles/Articles/createArticleStyle.css';
import { CreateEditArticle, ReturnToArticlesButton } from '../../.components/.MainComponentsExport';
import { Row, Col } from 'react-bootstrap';

const EditArticle = () => {
    // Get search params from the URL
    const [searchParams] = useSearchParams();

    // Get the articleId from the query string, or default to null if not provided
    const articleId = searchParams.get('articleId');

    return (
        <>
            <ReturnToArticlesButton />

            <div className="create-article-page">
                <h2>Edit Article</h2>
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important" }}>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={6}>
                        {articleId ? (
                            <CreateEditArticle 
                                existingArticleId={articleId}
                            />
                        ) : (
                            <p>No article ID provided</p>
                        )}
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default EditArticle;
