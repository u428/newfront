import { Col, PageHeader, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Fade from "react-reveal/Fade";

const Home = () => {

  const {loading, userData} = useSelector(state=>state.authReducer);


  return (
    <Fade>
       <Row justify="space-between" align="middle">
        <Col>
          <PageHeader
            className="site-page-header"
            // onBack={ () => null }
            title={userData.user.firstName+" "+ userData.user.lastName}
            subTitle={userData.user.telNomer}
          />
        </Col>
        {/* <Col>
          <Button type="primary">
            Add Students Login
          </Button>
        </Col> */}


      </Row>


      <br></br>
      This is a Teacher      
    </Fade>
  );
};

export default Home;
