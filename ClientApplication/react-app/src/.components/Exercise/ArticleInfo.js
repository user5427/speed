import React from 'react';
import { Row, Col } from 'react-bootstrap';

const ArticleInfo = ({ title, author, publisher, source }) => {
  return (
    <div>
      <Row style={{ color: 'grey' }}>
        <Col style={{ textAlign: 'right' }}>
          <p style={{ marginBottom: '0px', marginTop: '20px' }}>
            <span style={{ color: '#4d4d4d' }}>Title:</span> {title}
          </p>
          <p>
            <span style={{ color: '#4d4d4d' }}>Author:</span> {author}
          </p>
        </Col>
        <Col style={{ textAlign: 'left' }}>
          <p style={{ marginBottom: '0px', marginTop: '20px' }}>
            <span style={{ color: '#4d4d4d' }}>Publisher:</span> {publisher}
          </p>
          <p>
            <span style={{ color: '#4d4d4d' }}>Link:</span>{' '}
            <a href={source} target="_blank" rel="noopener noreferrer">
              {source}
            </a>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default ArticleInfo;
