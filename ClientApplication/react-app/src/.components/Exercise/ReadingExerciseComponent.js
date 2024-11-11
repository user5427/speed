// ReadingExercise.js
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Slider from '@mui/material/Slider';
import { VscDebugStart } from 'react-icons/vsc';
import { FaQuestion} from 'react-icons/fa6';

import { useTranslation } from 'react-i18next'; 

const ReadingExerciseComponent = ({
  subject,
  title,
  currentParagraphIndex,
  paragraphs,
  words,
  started,
  finished,
  currentWordIndex,
  handleStart,
  handleShowQuestion,
  inputValue,
  setInputValue,
  logToLinear,
  linearToLog,
  worldRecordWPM,
  valuetext,
  questionButtonClicked
}) => {

  const { t } = useTranslation();

  return (
    <div className="mainContainer">
      <Row style={{ marginTop: '10px', marginBottom: '10px', color: 'grey' }}>
        <Col>
          <h3>{subject}</h3>
        </Col>
        <Col style={{ textAlign: 'center', color: '#d9d9d9' }}>
          <h3>{title}</h3>
        </Col>
        <Col>
          <h3 style={{ textAlign: 'right' }}>
            {currentParagraphIndex + 1}/{paragraphs.length}
          </h3>
        </Col>
      </Row>

      <div className="exerciseWindow">
        <p className="singleWord">
          {started ? (
            <>
              {words[currentWordIndex]}
              {finished && (
                <>
                  {' '}
                  <span>{t('exercise.reading.endOfParagraph')}</span>
                  {' '}
                  <div className="yellowCircle" style={{ marginLeft: '3px' }}>
                    {currentParagraphIndex + 1}
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {t('exercise.reading.pressStartToBeginPar')}{' '}
              <div className="yellowCircle">
                {currentParagraphIndex + 1}
              </div>
            </>
          )}
        </p>
      </div>

      <Row style={{ marginTop: '18px', marginBottom: '0px' }}>
        <Col xs={12} md={2}>
          <Button
            className="buttons lime"
            size="lg"
            onClick={handleStart}
            disabled={started}
          >
            {t('exercise.reading.start')}<VscDebugStart className="icons"/>
          </Button>
        </Col>

        <Col>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
            <Slider
              aria-label="WPM Slider"
              value={logToLinear(inputValue)}
              onChange={(e, newValue) =>
                setInputValue(Math.min(linearToLog(newValue), worldRecordWPM))
              }
              getAriaValueText={valuetext}
              color="secondary"
              min={logToLinear(50)}
              max={logToLinear(worldRecordWPM)}
              style={{ marginRight: '20px' }}
            />
            <input
              type="number"
              value={inputValue}
              onChange={(e) =>
                setInputValue(
                  Math.min(Math.max(Math.round(e.target.value), 50), worldRecordWPM)
                )
              }
              className="form-control darkInput"
              disabled={started}
              style={{ marginLeft: '5px', width: '100px' }}
            />
            <span style={{ marginLeft: '10px' }}>{t('commonUIelements.wpm')}</span>
          </div>
        </Col>

        <Col>
          <Button
            className="buttons orange"
            size="lg"
            onClick={handleShowQuestion}
            disabled={!finished || questionButtonClicked}
          >
            <FaQuestion className="icons" /> {t('exercise.reading.goToQuestion')}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ReadingExerciseComponent;