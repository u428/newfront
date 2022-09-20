import { Button, Card, Col, Row, Space, Statistic } from "antd";
import React, { useEffect } from "react";
import Fade from "react-reveal/Fade";
import HelmetTitle from "../../../components/helmetTitle/HelmetTitle";
import { TeamOutlined, SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
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
import { useDispatch, useSelector } from "react-redux";
import { getStatistics, getStatisticsChart } from "../../../redux/statistic/actions";



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
      borderColor: 'rgb(255, 162, 132)',
      backgroundColor: 'rgba(255, 162, 132, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Payment amount on 1M',
      data: [0, 0, 35, 51, 54, 76, 69],
      fill: true,
      borderColor: 'rgb(180, 162, 235)',
      backgroundColor: 'rgba(180, 162, 235, 0.5)',
      yAxisID: 'y',
    },
  ],
};

const Home = () => {
  const dispatch = useDispatch();
  const {statistic, charts} = useSelector(state=>state.statisticReducer);
  console.log(statistic);
  console.log(charts);
  useEffect( () => {
    dispatch(getStatistics())
    dispatch(getStatisticsChart());
  }, [] );
  
  return (
    <Fade>
      <HelmetTitle title="Home" />
      <br />

      <Row gutter={12}>
      <Col span={6}>
      <Card
      hoverable
      onClick={e=>{console.log("click card");}}
      >
          <Statistic
            title="All Students"
            value={statistic&&statistic.all}
            valueStyle={{ color: '#3f8600' }}
            prefix={<TeamOutlined />}
          />
        </Card>
      </Col>
      <Col span={6}>
      <Card  
      hoverable
      onClick={e=>{console.log("click card");}}
      >
       
          <Statistic
            title="New Students"
            value={statistic&&statistic.new}
            valueStyle={{ color: ''}}
            prefix={<TeamOutlined />}
          />
          
        </Card>
      </Col>
      <Col span={6}>
      <Card
      hoverable
      onClick={e=>{console.log("click card");}}
      >
          <Statistic
            title="Payed"
            value={statistic&&statistic.payed}
            valueStyle={{ color: '#478890' }}
            prefix={<TeamOutlined />}
          />
        </Card>
      </Col>
      <Col span={6}>
      <Card
      onClick={e=>{console.log("click card");}}
      hoverable >

          <Statistic
            title="Not Payed"
            value={statistic&&statistic.not_payed}
            valueStyle={{ color: '#A8A82F' }}
            prefix={<TeamOutlined/>}
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
