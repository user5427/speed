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

  // Add these states if not already present
  const [lastExerciseWpm, setLastExerciseWpm] = useState(0);
  const [lastExerciseCorrectness, setLastExerciseCorrectness] = useState(0);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; 
  const lastDay = new Date(year, month, 0).getDate();

  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const endDate = `${year}-${String(month).padStart(2, '0')}-${lastDay}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingLineData(true);
        setError(null);

        const articleSessionPage = await ArticleSessionController.Get(startDate, endDate);
        const sessions = articleSessionPage.getArticleSessions();

        console.log('Fetched sessions:', sessions.map(s => s.getStartedAt()));

        // Map date to average WPM for the line chart
        const wpmMap = new Map();
        sessions.forEach(session => {
          const paragraphSessions = session.getParagraphSessions();
          if (!paragraphSessions || paragraphSessions.length === 0) return;

          const totalWpm = paragraphSessions.reduce((sum, p) => sum + p.getWpm().valueOf(), 0);
          const avgWpm = totalWpm / paragraphSessions.length;

          const dateStr = session.getStartedAt();
          const date = new Date(dateStr);

          const dayKey = date.toISOString().split('T')[0];
          if (!wpmMap.has(dayKey)) {
            wpmMap.set(dayKey, { totalWpm: Math.round(avgWpm), count: 1 });
          } else {
            const data = wpmMap.get(dayKey);
            data.totalWpm += Math.round(avgWpm);
            data.count += 1;
            wpmMap.set(dayKey, data);
          }
        });

        const allDays = generateDateRange(startDate, endDate);
        const sessionData = allDays.map(d => {
          const dayKey = d.toISOString().split('T')[0];
          const data = wpmMap.get(dayKey);
          const wpm = data ? Math.round(data.totalWpm / data.count) : null;
          return { x: d, y: wpm };
        });

        setLineData(sessionData);

        // Now compute today's last exercise data
        const todayStr = new Date().toISOString().split('T')[0];
        const todaysSessions = sessions.filter(session => {
          const sessionDate = new Date(session.getStartedAt());
          const sessionDateStr = sessionDate.toISOString().split('T')[0];
          return sessionDateStr === todayStr;
        });

        const lastSession = todaysSessions.length > 0 
          ? todaysSessions[todaysSessions.length - 1] 
          : sessions[sessions.length - 1]; // fallback to last overall if no today's session

        let lastSessionWpm = 0;
        let lastSessionCorrectness = 0;
        if (lastSession) {
          const pSessions = lastSession.getParagraphSessions() || [];
          if (pSessions.length > 0) {
            const totalWpm = pSessions.reduce((sum, p) => sum + p.getWpm().valueOf(), 0);
            lastSessionWpm = Math.round(totalWpm / pSessions.length);
          }

          let correctCount = 0;
          let questionCount = 0;
          pSessions.forEach(p => {
            const qSessions = p.getQuestionSessions() || [];
            qSessions.forEach(q => {
              questionCount++;
              if (q.getCorrect()) correctCount++;
            });
          });
          lastSessionCorrectness = questionCount > 0 ? Math.round((correctCount / questionCount) * 100) : 0;
        }

        setLastExerciseWpm(lastSessionWpm);
        setLastExerciseCorrectness(lastSessionCorrectness);

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

  const monthName = now.toLocaleString('default', { month: 'long' }); 
  const xAxisLabel = `${monthName} ${year}`;

  return (
    <>
      {/* The existing rendering code for your charts and stats stays the same */}
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
          {/* LineChart Code */}
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
          {/* BarChart Code */}
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
              yAxis={[{}]}
              series={[
                { dataKey: 'correct' },
                { dataKey: 'incorrect' },
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
            {/* Use the lastReadingSpeed from line chart data or switch to lastExerciseWpm if you prefer */}
            <text style={{ color: 'var(--color-orange)', fontSize: '120px' }}>
              {lastExerciseWpm}
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
              <text style={{ color: 'var(--color-teal)' }}>{lastExerciseCorrectness}%</text>
            </p>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
