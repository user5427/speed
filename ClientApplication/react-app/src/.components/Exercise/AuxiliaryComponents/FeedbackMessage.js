import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { GrFormNextLink } from 'react-icons/gr';
import { GiFinishLine } from 'react-icons/gi';

const FeedbackMessage = ({ feedbackMessage, currentParagraphIndex, paragraphs, handleNextParagraphOrQuestion }) => {
  return (
    <div
      className="mainContainer"
      style={{ color: feedbackMessage.includes('Correct') ? '#a6ff4d' : '#ff6666' }}
    >
      <Row style={{ alignItems: 'center', height: '100%' }}>
        <Col>
          <h4 style={{ display: 'flex', alignItems: 'center', height: '100%', fontSize: '30px' }}>
            {feedbackMessage}
          </h4>
        </Col>
        <Button
          className="subjectButtons"
          size="lg"
          style={{
            marginRight: '12px',
            backgroundColor: '#008fb3',
            borderColor: '#006680',
            width: '200px',
          }}
          onClick={handleNextParagraphOrQuestion}
        >
          {currentParagraphIndex < paragraphs.length - 1 ? (
            <>
              Next paragraph <GrFormNextLink />
            </>
          ) : (
            <>
              Finish <GiFinishLine />
            </>
          )}
        </Button>
      </Row>
    </div>
  );
};

export default FeedbackMessage;
