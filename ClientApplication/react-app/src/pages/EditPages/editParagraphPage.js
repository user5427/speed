import React from 'react';
import { useSearchParams } from 'react-router-dom';  // Import hook for query params
import '../../styles/Articles/createArticleStyle.css';
import { CreateEditParagraph, ReturnToArticlesButton } from '../../.components/.MainComponentsExport';
import { Row, Col } from 'react-bootstrap';

const EditParagraph = () => {
    // Get search params from the URL
    const [searchParams] = useSearchParams();

    // Get the articleId from the query string, or default to null if not provided
    const paragraphId = searchParams.get('paragraphId');

    return (
        <>
            <ReturnToArticlesButton />

            <div className="create-article-page">
                <h2>Edit Paragraph</h2>
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important" }}>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={6}>
                        {articleId ? (
                            <CreateEditParagraph 
                                existingParagraphId={paragraphId}
                            />
                        ) : (
                            <p>No paragraph ID provided</p>
                        )}
                    </Col>
                </Row>
            </div>
        </>
    );
}