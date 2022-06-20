import { Card, Col, Row, Statistic } from "antd";
import React from "react";
import Fade from "react-reveal/Fade";
import HelmetTitle from "../../../components/helmetTitle/HelmetTitle";
import { UserOutlined } from '@ant-design/icons';
import { TeamOutlined } from '@ant-design/icons';

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
      
    </Fade>
  );
};

export default Home;
