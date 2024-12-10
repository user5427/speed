import { Row, Col } from 'react-bootstrap';
import { LineChart } from '@mui/x-charts';
import { dataset } from './basicDataset';
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
        <Col style={{ textAlign: 'center' }}>
          <p>
            <h2>Past month reading speed:</h2>
          </p>
          <p style={{ fontSize: '60px'}}><text style={{ color: 'var(--color-amber-light)' }}>238</text> WPM</p>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
