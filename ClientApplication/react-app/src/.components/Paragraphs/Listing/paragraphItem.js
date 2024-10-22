import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import "../../../styles/Articles/articleItemStyle.css"; // stylesheet
import { MdModeEdit } from "react-icons/md";

const ParagraphItem = (props) => {
    const { editThis } = props;
    return (
        <>
            <div className="article-item"> {/* Apply the article-item class */}
                <Row className="row">
                    <Col xs={12} md={10} className="col col-12 col-md-10">
                        <h2>{props.data.title}</h2> {/* Apply heading and bold */}
                    </Col>
                </Row>

                <div>
                    <Row className="row">
                        <Col md={10} className="col col-12 col-md-10"></Col>
                        <Col xs={12} md={2} className="col col-12 col-md-2">
                            <Button onClick={editThis} className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }}>Select</Button> {/* Apply a button class */}
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default ParagraphItem;

