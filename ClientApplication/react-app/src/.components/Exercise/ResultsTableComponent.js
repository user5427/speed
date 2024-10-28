import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { MdOutlineCelebration } from 'react-icons/md';
import { IoReturnUpBackSharp } from 'react-icons/io5';
import { TiMinus } from 'react-icons/ti';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import Divider from '@mui/material/Divider';

import { useTranslation } from 'react-i18next'; 

const ResultsTable = ({
  timePerParagraph,
  wordsPerParagraph,
  usersWPM,
  answersCorrectness,
  calculateAverageWPM,
  redirectToCategories
}) => {
  const averageWPM = calculateAverageWPM();

  const { t } = useTranslation();

  return (
    <>
      <div className="mainContainer" style={{ textAlign: 'left', position: 'relative' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ marginBottom: '10px' }}>
            <MdOutlineCelebration color="#ffd633" style={{ marginTop: '-7px' }} /> {t('exercise.results.exerciseCompleted')}{"! "}
            <MdOutlineCelebration color="#ffd633" style={{ marginTop: '-7px' }} />
          </h1>
          <Divider style={{ backgroundColor: '#a6a6a6', borderBottomWidth: 3 }}></Divider>
          <h4 style={{ textAlign: 'left', marginTop: '10px' }}>{t('exercise.results.resultsInner')}{':'}</h4>
          <Table striped bordered hover size="sm" variant="dark">
            <thead>
              <tr>
                <th>{t('exercise.results.paragraphNr')}{'.'}</th>
                <th>{t('exercise.results.words')}</th>
                <th>{t('exercise.results.time')}</th>
                <th style={{ color: '#ce99ff' }}>{t('exercise.results.wpm')}</th>
                <th style={{ color: '#ce99ff' }}>{t('exercise.results.questions')}</th>
              </tr>
            </thead>
            <tbody>
              {timePerParagraph.map((time, index) => {
                const wordsInParagraph = wordsPerParagraph[index];
                const wpm = (wordsInParagraph / (time / 60)).toFixed(0);
                const isAboveUsersWPM = wpm >= usersWPM;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{wordsInParagraph}</td>
                    <td>{time.toFixed(1)}s</td>
                    <td>
                      {answersCorrectness[index] ? (
                        <>
                          {wpm}{' '}
                          {isAboveUsersWPM ? (
                            <span style={{ color: '#99ff33' }}>↑</span>
                          ) : (
                            <span style={{ color: '#ff3300' }}>↓</span>
                          )}
                        </>
                      ) : (
                        <TiMinus />
                      )}
                    </td>
                    <td>
                      {answersCorrectness[index] ? (
                        <FaCheck style={{ color: '#99ff33' }} />
                      ) : (
                        <FaXmark style={{ color: '#ff3300' }} />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <h4 style={{ textAlign: 'left' }}>{t('exercise.results.inConclusion')}{":"}</h4>
          <Table
            striped
            bordered
            hover
            size="sm"
            variant="dark"
            style={{ fontSize: '20px' }}
          >
            <tbody>
              <tr>
                <td>{t('exercise.results.yourCurrentReadingSpeed')}{": "}</td>
                <td>
                  <span style={{ color: '#ce99ff' }}>{usersWPM}</span> {t('exercise.results.wpm')}
                </td>
                <td>{t('exercise.results.yourAverageReadingSpeedDuringExercise')}{':'}</td>
                <td>
                  {averageWPM ? (
                    <>
                      {usersWPM < averageWPM.toFixed(0) ? (
                        <span style={{ color: '#99ff33' }}>{averageWPM.toFixed(0)}</span>
                      ) : (
                        <span style={{ color: '#ff3300' }}>{averageWPM.toFixed(0)}</span>
                      )}{' '}
                      {t('exercise.results.wpm')}
                    </>
                  ) : (
                    <>
                      <TiMinus /> {t('exercise.results.wpm')}
                    </>
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>

        <Button
          className="subjectButtons"
          style={{ backgroundColor: '#8400ff', borderColor: '#6900cc', marginTop: '5px', fontSize: '18px'}}
          onClick={redirectToCategories}
        >
          <IoReturnUpBackSharp style={{ marginTop: '-4px' }} /> {t('exercise.results.goBackToCategories')}
        </Button>
      </div>
    </>
  );
};

export default ResultsTable;
