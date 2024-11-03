import React from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import Divider from '@mui/material/Divider';

import { GiFallingStar } from "react-icons/gi";
import { GiMicroscope } from "react-icons/gi";
import { GiBookmark } from "react-icons/gi";
import { GiBlackKnightHelm } from "react-icons/gi";

import { useTranslation } from 'react-i18next'; 

const Categories = () => {

    const { t } = useTranslation();

    return (
        <div className='mainContainer'>
             <Row style={{marginBottom: '10px'}} >
                 <Col xs={12} md={10} >
                     <h2>{t('categories.subjects')}</h2>
                 </Col>
             </Row>
             <Divider style={{ backgroundColor: '#ccc', borderBottomWidth: 4}}></Divider>
              
             <Row className='rowCategories' style={{marginTop: '25px'}}>
                 <Col xs={12} md={2}>
                  <Button className='subjectButtons' size="lg" style={{ backgroundColor: '#739900', borderColor: '#608000'}} onClick={() => {}}><GiMicroscope className="icons"/>  {t('categories.biology')}</Button>
                 </Col>
                 <Col className='categories'>{t('categories.bCategories')}</Col>
             </Row >    
 
             <Row className='rowCategories'>
 
             <Col xs={12} md={2}>
                  <Button className='subjectButtons' size="lg" style={{ backgroundColor: '#0044cc', borderColor: '#003399'}} onClick={() => {}}><GiFallingStar className="icons"/>  {t('categories.astronomy')}</Button>
                 </Col>
                 <Col className='categories'>{t('categories.aCategories')}</Col>
             </Row>
 
             <Row className='rowCategories'>
                 <Col xs={12} md={2}>
                  <Button className='subjectButtons' size="lg" style={{ backgroundColor: '#b38600', borderColor: '#806000'}} onClick={() => {}}><GiBlackKnightHelm className="icons"/> {t('categories.history')}</Button>
                 </Col>
                 <Col className='categories'>{t('categories.hCategories')}</Col>
             </Row>
 
             <Row className='rowCategories'>
                 <Col xs={12} md={2}>
                  <Button className='subjectButtons' size="lg" style={{ backgroundColor: '#b30059', borderColor: '#800040'}} onClick={() => {}}><GiBookmark className="icons"/> {t('categories.literature')}</Button>
                  </Col>
                 <Col className='categories'>{t('categories.lCategories')}</Col>
             </Row>
 
         </div>
     )
}

export default Categories;