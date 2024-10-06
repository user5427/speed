import React from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import Divider from '@mui/material/Divider';

import { GiFallingStar } from "react-icons/gi";
import { GiMicroscope } from "react-icons/gi";
import { GiBookmark } from "react-icons/gi";
import { GiBlackKnightHelm } from "react-icons/gi";

const Categories = () => {


    return (
        <div className='mainContainer'>
             <Row style={{marginBottom: '10px'}} >
                 <Col xs={12} md={10} >
                     <h2>Subjects</h2>
                 </Col>
             </Row>
             <Divider style={{ backgroundColor: '#ccc', borderBottomWidth: 4}}></Divider>
              
             <Row className='row' style={{marginTop: '25px'}}>
                 <Col xs={12} md={2}>
                  <Button className='subjectButtons' size="lg" style={{ backgroundColor: '#739900', borderColor: '#608000'}} onClick={() => {}}><GiMicroscope />  Biology</Button>
                 </Col>
                 <Col className='categories'>Plants, molecules, animals</Col>
             </Row >    
 
             <Row className='row'>
 
             <Col xs={12} md={2}>
                  <Button className='subjectButtons' size="lg" style={{ backgroundColor: '#0044cc', borderColor: '#003399'}} onClick={() => {}}><GiFallingStar />  Astronomy</Button>
                 </Col>
                 <Col className='categories'>Milky Way Galaxy, Closest star systems, Black holes</Col>
             </Row>
 
             <Row className='row'>
                 <Col xs={12} md={2}>
                  <Button className='subjectButtons' size="lg" style={{ backgroundColor: '#b38600', borderColor: '#806000'}} onClick={() => {}}><GiBlackKnightHelm /> History</Button>
                 </Col>
                 <Col className='categories'>Ancient Egypt, Middle Ages, WW I, WW II</Col>
             </Row>
 
             <Row className='row'>
                 <Col xs={12} md={2}>
                  <Button className='subjectButtons' size="lg" style={{ backgroundColor: '#b30059', borderColor: '#800040'}} onClick={() => {}}><GiBookmark /> Literature</Button>
                  </Col>
                 <Col className='categories'>William Shakespeare, Alexandre Dumas, Victor Hugo</Col>
             </Row>
 
         </div>
     )
}

export default Categories;