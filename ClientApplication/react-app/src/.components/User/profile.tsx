import { Row, Col } from 'react-bootstrap';
import { LineChart, BarChart } from '@mui/x-charts';
import { dataset } from './basicDataset';
import { barDataset } from './barDataset';
import '../../styles/profileStyle.css';
import Divider from '@mui/material/Divider';

const Profile = ({ loggedInUser }) => {
  return (
    <>
      <Row>
        <Col>
          <p><h1 style={{color:"var(--color-lime-light)"}}>{loggedInUser ? `${loggedInUser.username}` : 'NO USER'}</h1>
           <text style={{fontSize:"20px"}}>Personal statistics</text></p>
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
              dataset={dataset}
              xAxis={[
                {
                  dataKey: 'x',
                  label: 'Time',
                },
              ]}
              yAxis={[
                {
                  label: 'Average reading speed',
                },
              ]}
              series={[
                {
                  dataKey: 'y',
                },
              ]}
              height={300}
              margin={{ left: 50, right: 30, top: 30, bottom: 50 }}
              grid={{
                vertical: true,
                horizontal: true,
              }}
            />
          </div>
        </Col>
        <Col style={{ textAlign: 'center' }} xs={12} md={4}>
          <Row style={{marginTop:"25px"}}>
            <h2>Average reading speed:</h2>
          </Row>
          <Row style={{marginBottom:"0px"}}>
           <text style={{ color: 'var(--color-amber-light)', fontSize: '120px'}}>238</text>
          </Row>
          <Row>
          <h2>WPM</h2>
          </Row>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop:"20px",
          backgroundColor: '#a6a6a6',
          borderBottomWidth: 3,
          marginBottom: '20px',
        }}
      />
      <Row>
      <Col style={{ textAlign: 'center' }} xs={12} md={4}>
          <Row style={{marginTop:"25px"}}>
            <h2>Past month answer correctness:</h2>
          </Row>
          <Row>
           <p style={{ fontSize: '120px'}}><text style={{ color: 'var(--color-lime)' }}>70%</text></p>
          </Row>
        </Col>

          <Col xs={12} md={8}>
          <div  style={{
              width: '100%',
              overflowX: 'auto',
              backgroundColor: '#0e0e13',
              padding: '20px',
              borderRadius: '8px',
            }}>
            <BarChart
              dataset={barDataset} // Corrected to `dataset`
              xAxis={[
                {
                  dataKey: 'date',
                  label: 'Date',
                  scaleType: 'band',

                },
              ]}
              yAxis={[
                {
                  label: 'Answer correctness (%)',
                },
              ]}
              series={[
                { dataKey: 'correct'},
                { dataKey: 'incorrect'},
              ]}
              height={300}
              margin={{ left: 50, right: 30, top: 30, bottom: 50 }}
              grid={{
                vertical: true,
                horizontal: true,
              }}
              colors={['var(--color-lime)', 'var(--color-red)']}
            />
</div>
          </Col>
      </Row>

      <Divider
        style={{
          marginTop:"20px",
          backgroundColor: '#a6a6a6',
          borderBottomWidth: 3,
          marginBottom: '20px',
        }}
      />

      <Row>
      <Col style={{ textAlign: 'center' }} xs={12} md={6}>
          <Row style={{marginTop:"15px"}}>
            <h2>Last exercise average reading speed:</h2>
          </Row>
          <Row style={{marginBottom:"0px"}}>
           <text style={{ color: 'var(--color-cyan-light)', fontSize: '120px'}}>315</text>
          </Row>
          <Row>
          <h2>WPM</h2>
          </Row>
        </Col>

        <Col style={{ textAlign: 'center' }} xs={12} md={6}>
          <Row style={{marginTop:"15px"}}>
            <h2>Last exercise answer correctness:</h2>
          </Row>
          <Row>
           <p style={{ fontSize: '120px'}}><text style={{ color: 'var(--color-red)' }}>32%</text></p>
          </Row>
        </Col>

      </Row>
    </>
  );
};

export default Profile;
