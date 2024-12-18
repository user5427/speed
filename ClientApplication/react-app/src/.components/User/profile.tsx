import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { LineChart, BarChart } from '@mui/x-charts';
import { barDataset } from './barDataset';
import '../../styles/profileStyle.css';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';

import { ArticleSessionController } from '../../.controllers/.MainControllersExport';

const calculateAverage = (data, key) => {
  if (!data || data.length === 0) return 0;
  const sum = data.reduce((acc, item) => acc + (item[key] ?? 0), 0);
  return Math.round(sum / data.length);
};

const getLastData = (data, key) => {
  return data && data.length > 0 ? data[data.length - 1][key] : 0;
};

// Generate date range for a given start and end date
function generateDateRange(startDateStr, endDateStr) {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  const days = [];
  let current = new Date(start);
  while (current <= end) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return days;
}

const Profile = ({ loggedInUser }) => {

  const { t } = useTranslation();

  const [lineData, setLineData] = useState([]);
  const [loadingLineData, setLoadingLineData] = useState(true);
  const [error, setError] = useState(null);

  // Determine current month and year
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // month is zero-based, so add 1
  const lastDay = new Date(year, month, 0).getDate(); // last day of current month

  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const endDate = `${year}-${String(month).padStart(2, '0')}-${lastDay}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingLineData(true);
        setError(null);

        const articleSessionPage = await ArticleSessionController.Get(startDate, endDate);
        const sessions = articleSessionPage.getArticleSessions();

        // Map date to average WPM
        const wpmMap = new Map();

        sessions.forEach(session => {
          const paragraphSessions = session.getParagraphSessions();
          if (!paragraphSessions || paragraphSessions.length === 0) return;

          const totalWpm = paragraphSessions.reduce((sum, p) => sum + p.getWpm().valueOf(), 0);
          const avgWpm = totalWpm / paragraphSessions.length;

          const dateStr = session.getStartedAt();
          const date = new Date(dateStr);

          const dayKey = date.toDateString();
          wpmMap.set(dayKey, Math.round(avgWpm));
        });

        // Generate all days and fill with actual WPM or null
        const allDays = generateDateRange(startDate, endDate);
        const sessionData = allDays.map(d => {
          const dayKey = d.toDateString();
          const wpm = wpmMap.has(dayKey) ? wpmMap.get(dayKey) : null;
          return { x: d, y: wpm };
        });

        setLineData(sessionData);
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoadingLineData(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const filteredLineData = lineData.filter(d => d.y != null);
  const averageReadingSpeed = calculateAverage(filteredLineData, 'y');
  const averageCorrectness = calculateAverage(barDataset, 'correct');
  const lastReadingSpeed = getLastData(filteredLineData, 'y');
  const lastCorrectness = getLastData(barDataset, 'correct');

  if (loadingLineData) {
    return <p>Loading line chart data...</p>;
  }

  if (error) {
    return <p>Error loading line chart data: {error}</p>;
  }

  // Dynamically create a label for the X-axis using the current month name and year
  const monthName = now.toLocaleString('default', { month: 'long' }); 
  const xAxisLabel = `${monthName} ${year}`;

  return (
    <>
      <Row>
        <Col>
          <p>
            <h1 style={{ color: "var(--color-lime-light)" }}>
              {loggedInUser ? `${loggedInUser.username}` : 'NO USER'}
            </h1>
            <text style={{ fontSize: "20px" }}>{t('profile.personalStatystics')}</text>
          </p>
        </Col>
      </Row>

      <Divider
        style={{
          backgroundColor: '#a6a6a6',
          borderBottomWidth: 3,
          marginBottom: '15px',
        }}
      />

      <Row>
        <Col xs={12} md={8}>
          <div
            className="chart-container"
            style={{
              width: '100%',
              overflowX: 'auto',
              backgroundColor: '#0e0e13',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <LineChart
              dataset={lineData}
              xAxis={[
                {
                  dataKey: 'x',
                  label: xAxisLabel, 
                  scaleType: 'time',
                  valueFormatter: (value) => {
                    const date = new Date(value);
                    return `${date.getDate()}`;
                  },
                },
              ]}
              yAxis={[
                {
                  //label: 'Reading Speed (WPM)',
                },
              ]}
              series={[{ dataKey: 'y'}]}
              height={300}
              margin={{ left: 50, right: 30, top: 30, bottom: 50 }}
              grid={{ vertical: true, horizontal: true }}
            />
          </div>
        </Col>

        <Col style={{ textAlign: 'center' }} xs={12} md={4}>
          <Row style={{ marginTop: "25px" }}>
            <h2>{t('profile.averageReadingSpeed')}</h2>
          </Row>
          <Row style={{ marginBottom: "0px" }}>
            <text style={{ color: 'var(--color-amber-light)', fontSize: '120px' }}>
              {averageReadingSpeed}
            </text>
          </Row>
          <Row>
            <h2>{t('profile.wpm')}</h2>
          </Row>
        </Col>
      </Row>

      <Divider
        style={{
          marginTop: "20px",
          backgroundColor: '#a6a6a6',
          borderBottomWidth: 3,
          marginBottom: '20px',
        }}
      />

      <Row>
        <Col style={{ textAlign: 'center' }} xs={12} md={4}>
          <Row style={{ marginTop: "25px" }}>
            <h2>{t('profile.answerCorrectnessThisMonth')}</h2>
          </Row>
          <Row>
            <p style={{ fontSize: '120px' }}>
              <text style={{ color: 'var(--color-lime)' }}>{averageCorrectness}%</text>
            </p>
          </Row>
        </Col>

        <Col xs={12} md={8}>
          <div
            style={{
              width: '100%',
              overflowX: 'auto',
              backgroundColor: '#0e0e13',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <BarChart
              dataset={barDataset}
              xAxis={[
                {
                  dataKey: 'x',
                  scaleType: 'band',
                  label: xAxisLabel,
                  valueFormatter: (value) => {
                    const date = new Date(value);
                    return `${date.getDate()}`;
                  },
                },
              ]}
              yAxis={[{ 
              //  label: 'Answer correctness (%)' 
              }]}
              series={[
                { dataKey: 'correct', 
                //  label: 'Correct' 
                },
                { dataKey: 'incorrect', 
                  //label: 'Incorrect' 
                },
              ]}
              height={300}
              margin={{ left: 50, right: 30, top: 30, bottom: 50 }}
              grid={{ vertical: true, horizontal: true }}
              colors={['var(--color-lime)', 'var(--color-red)']}
            />
          </div>
        </Col>
      </Row>

      <Divider
        style={{
          marginTop: "20px",
          backgroundColor: '#a6a6a6',
          borderBottomWidth: 3,
          marginBottom: '20px',
        }}
      />

      <Row>
        <Col style={{ textAlign: 'center' }} xs={12} md={6}>
          <Row style={{ marginTop: "15px" }}>
            <h2>{t('profile.lastExerciseAverageReadingSpeed')}{':'}</h2>
          </Row>
          <Row style={{ marginBottom: "0px" }}>
            <text style={{ color: 'var(--color-orange)', fontSize: '120px' }}>
              {lastReadingSpeed}
            </text>
          </Row>
          <Row>
            <h2>{t('profile.wpm')}</h2>
          </Row>
        </Col>

        <Col style={{ textAlign: 'center' }} xs={12} md={6}>
          <Row style={{ marginTop: "15px" }}>
            <h2>{t('profile.lastExerciseAnswerCorrectness')}{':'}</h2>
          </Row>
          <Row>
            <p style={{ fontSize: '120px' }}>
              <text style={{ color: 'var(--color-teal)' }}>{lastCorrectness}%</text>
            </p>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
