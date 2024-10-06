import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import Divider from '@mui/material/Divider';


const QuestionComponent = ({ onSubmit }) => (
    <div className="questionContainer" style={{ marginTop: "px" }}>
             <Row >
                 <Col>
                     <h3>What part of a plant is responsible for photosynthesis?</h3>
                 </Col>
             </Row>
        <Divider variant="middle" style={{ margin: '20px 0', backgroundColor: '#ccc', borderBottomWidth: 4}} />
        <ul style={{ listStyleType: 'none', paddingLeft: 0, marginLeft: "15px"}}>
            <li><input type="radio" name="answer" value="roots" /> Roots</li>
            <li><input type="radio" name="answer" value="leaves" /> Leaves</li>
            <li><input type="radio" name="answer" value="stem" /> Stem</li>
            <li><input type="radio" name="answer" value="flowers" /> Flowers</li>
        </ul>
        <Button
            className='subjectButtons'
            size="lg"
            style={{ marginTop:"10px", backgroundColor: '#2eb8b8', borderColor: '#248f8f' }}
            onClick={onSubmit} // Call the onSubmit function passed from Exercise
        >
            Submit Answer
        </Button>
    </div>
);

export default QuestionComponent;
