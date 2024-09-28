import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import "../styles/articleItemStyle.css"; // stylesheet

const ArticleItem = (props) => {
    const handleClick = () => {
        // You can handle the click action here, e.g., navigate to a link or trigger something
        console.log('Article clicked!');
    };


    return (
        <>
            <div className="article-item" onClick={handleClick}> {/* Apply the article-item class */}
                <div className="clickable-row"> {/* Apply a clickable row class */}
                    <Row className="row">
                        <Col xs={12} md={10} className="col col-12 col-md-10">
                            <h2><b>{props.data.title}</b></h2> {/* Apply heading and bold */}
                        </Col>
                        <Col xs={12} md={2} className="col col-12 col-md-2">
                            <p>{props.data.categoryTitle}</p> {/* Apply paragraph styling */}
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default ArticleItem;