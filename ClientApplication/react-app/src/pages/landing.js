import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import TestList from '../components/test-list'
import CreateTestModel from '../components/create-test-model'

const Landing = () => {



    return (
        <>
            <Row>
                <Col xs={12} md={10}>
                    <h2>Tests</h2>
                </Col>
                <Col xs={12} md={2} className="align-self-center">
                    <Button className="float-right" onClick={() => {}}>Add New Test</Button>
                </Col>
            </Row>

            <CreateTestModel/>
            <TestList/>
        </>
    )
}

export default Landing;