import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import "../../../styles/Articles/articleItemStyle.css"; // stylesheet
import { MdModeEdit } from "react-icons/md";

const QuestionItem = (props) => {
    const { settings, selectThis, deleteThis, editThis } = props;

    return (
        <>
            <div className="article-item"> {/* Apply the article-item class */}
                <Row className="row">
                    <Col xs={12} md={10} className="col col-12 col-md-10" style={{marginBottom:"15px"}}>
                        <p className="wrap-text">{props.data.text}</p> {/* Apply heading and bold */}
                    </Col>
                    {/* <Col xs={12} md={2} className="col col-12 col-md-2"> */}
                    {/* <p>{props.data.categoryTitle}</p> Apply paragraph styling */}
                    {/* </Col> */}

                </Row>

                <div>
                    {settings && settings.showSelectButton && (
                        <Row className="row">
                            <Col xs={12} md={2} className="col col-12 col-md-2">
                                <Button onClick={selectThis} className='buttons amber' style={{wordWrap:"normal", width:"auto"}}>Select</Button> {/* Apply a button class */}
                            </Col>
                        </Row>
                    )}

                    {settings && settings.showDeleteButton && (
                        <Row className="row">
                            <Col xs={12} md={2} className="col col-12 col-md-2">
                                <Button onClick={deleteThis} className="editButton" variant="delete" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }}>Select</Button> {/* Apply a button class */}
                            </Col>
                        </Row>
                    )}

                    {settings && settings.showEditButton && (
                        <Row className="row">
                            <Col xs={12} md={2} className="col col-12 col-md-2">
                                <Button onClick={editThis} className="editButton" variant="primary" style={{ backgroundColor: '#294aa4', borderColor: '#294aa4' }}><MdModeEdit /> Edit</Button> {/* Apply a button class */}
                            </Col>
                        </Row>
                    )}
                </div>
            </div>


        </>
    )
}

export default QuestionItem;