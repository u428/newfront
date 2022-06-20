import { Card, Col, Row, Statistic } from "antd";
import React from "react";
import Fade from "react-reveal/Fade";
import HelmetTitle from "../../../components/helmetTitle/HelmetTitle";
import { UserOutlined } from '@ant-design/icons';
import { TeamOutlined } from '@ant-design/icons';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Chart for Student and Payment',
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

export const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Student number',
      data: [33, 53, 85, 41, 44, 65, 72],
      fill: true,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Payment amount on 1M',
      data: [33, 25, 35, 51, 54, 76, 69],
      fill: true,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      yAxisID: 'y',
    },
  ],
};

const Home = () => {
  return (
    <Fade>
      <HelmetTitle title="Home" />
      <br />

      <Row gutter={12}>
      <Col span={6}>
      <Card>
          <Statistic
            title="Active Students"
            value={11.28}
            valueStyle={{ color: '#3f8600' }}
            prefix={<UserOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={6}>
      <Card>
          <Statistic
            title="Non ACtive Students"
            value={11.28}
            valueStyle={{ color: 'red'}}
            prefix={<UserOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={6}>
      <Card>
          <Statistic
            title="Teachers"
            value={11.28}
            valueStyle={{ color: '#478890' }}
            prefix={<UserOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={6}>
      <Card>
          <Statistic
            title="Groups"
            value={11.28}
            valueStyle={{ color: '#A8A82F' }}
            prefix={<TeamOutlined/>}
            suffix="%"
          />
        </Card>
      </Col>
      </Row>

      <Row justify="center" >
        <Col span={18} >
          <Line options={options} data={data} />
        </Col>
        {/* <Col>Hello</Col> */}
      </Row>
      
    </Fade>
  );
};

export default Home;
