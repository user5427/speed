import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import "../../../styles/Articles/articleItemStyle.css"; // stylesheet
import { MdModeEdit } from "react-icons/md";
const ArticleItem = (props) => {
    const { settings } = props;
    const handleClick = () => {
        // You can handle the click action here, e.g., navigate to a link or trigger something
        console.log('Article clicked!');
    };


    return (
        <>
            <div className="article-item"> {/* Apply the article-item class */}
                <div className="clickable-row" onClick={handleClick}> {/* Apply a clickable row class */}
                    <Row className="row">
                        <Col xs={12} md={10} className="col col-12 col-md-10">
                            <h2>{props.data.title}</h2> {/* Apply heading and bold */}
                        </Col>
                        <Col xs={12} md={2} className="col col-12 col-md-2">
                            <p>{props.data.categoryTitle}</p> {/* Apply paragraph styling */}
                        </Col>

                    </Row>
                </div>
                <div>
                    {settings && settings.showEditButton && (
                        <Row className="row">
                            <Col md={10} className="col col-12 col-md-10"></Col>
                            <Col xs={12} md={2} className="col col-12 col-md-2">
                                <Button className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }}><MdModeEdit /> Edit</Button> {/* Apply a button class */}
                            </Col>
                        </Row>
                    )}
                </div>

            </div>
        </>
    )
}

export default ArticleItem;