import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { MdOutlineCelebration } from 'react-icons/md';
import { IoReturnUpBackSharp } from 'react-icons/io5';
import { TiMinus } from 'react-icons/ti';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import Divider from '@mui/material/Divider';

const ResultsTable = ({
  timePerParagraph,
  wordsPerParagraph,
  usersWPM,
  answersCorrectness,
  calculateAverageWPM,
  redirectToCategories
}) => {
  const averageWPM = calculateAverageWPM();

  return (
    <>
      <div className="mainContainer" style={{ textAlign: 'left', position: 'relative' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ marginBottom: '10px' }}>
            <MdOutlineCelebration color="#ffd633" style={{ marginTop: '-7px' }} /> Exercise
            Completed!{' '}
            <MdOutlineCelebration color="#ffd633" style={{ marginTop: '-7px' }} />
          </h1>
          <Divider style={{ backgroundColor: '#a6a6a6', borderBottomWidth: 3 }}></Divider>
          <h4 style={{ textAlign: 'left', marginTop: '10px' }}>Results:</h4>
          <Table striped bordered hover size="sm" variant="dark">
            <thead>
              <tr>
                <th>Paragraph nr.</th>
                <th>Words</th>
                <th>Time</th>
                <th style={{ color: '#ce99ff' }}>WPM</th>
                <th style={{ color: '#ce99ff' }}>Questions</th>
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
          <h4 style={{ textAlign: 'left' }}>In conclusion:</h4>
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
                <td>Your current reading speed: </td>
                <td>
                  <span style={{ color: '#ce99ff' }}>{usersWPM}</span> WPM
                </td>
                <td>Your reading speed during exercise:</td>
                <td>
                  {averageWPM ? (
                    <>
                      {usersWPM < averageWPM.toFixed(0) ? (
                        <span style={{ color: '#99ff33' }}>{averageWPM.toFixed(0)}</span>
                      ) : (
                        <span style={{ color: '#ff3300' }}>{averageWPM.toFixed(0)}</span>
                      )}{' '}
                      WPM
                    </>
                  ) : (
                    <>
                      <TiMinus /> WPM
                    </>
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>

        <Button
          className="subjectButtons"
          style={{ backgroundColor: '#8400ff', borderColor: '#6900cc', marginTop: '5px' }}
          onClick={redirectToCategories}
        >
          <IoReturnUpBackSharp style={{ marginTop: '-4px' }} /> Go back to categories
        </Button>
      </div>
    </>
  );
};

export default ResultsTable;
