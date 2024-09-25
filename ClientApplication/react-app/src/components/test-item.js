import React from 'react';
import { Col, Row } from 'react-bootstrap';
import NoImage from '../no-image.png'
const TestItem = (props) => {
    return (
        <>
            <Row>
                <Col item xs={12} md={10}>
                    <div><b>{props.data.title}</b></div>
                </Col>
                <Col item xs={12} md={2}>
                    <div>{props.data.categoryTitle}</div>
                </Col>
                <Col>
                <hr/>
                </Col>
            </Row>
        </>
    )
}

export default TestItem;