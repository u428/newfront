import React, { useEffect, useState } from "react";

import Fade from "react-reveal/Fade";
import { Table, Tag, Card, PageHeader, Modal, Row, Col, Button, Space, Tooltip } from 'antd';
import { useDispatch, useSelector } from "react-redux";



const StudentView = () => {

  const {pagination, loading, isActive, student} = useSelector(state=>state.studentReducer);
  console.log(student);
  // let history = useHistory();


  // const dispatch = useDispatch();

  const [groups, setGroups] = useState([]);
  
  useEffect( () => {
    
    console.log("this is a open useEffet");
  }, [] );


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'payed',
      dataIndex: 'payed',
      key: 'payed'
    },
    {
      title: 'attendance',
      dataIndex: 'attendance',
      key: 'attendance'
    },
    {
      title: 'Action',
      key: 'action',
      render: ( data ) => {
        return (
          <Space size="middle">
              {/* <Button onClick={() => viewSingleStudent(data)} shape="circle" icon={<InfoCircleOutlined />} style={{color:"#5cdbd3"}} />
              <Button onClick={() => addGroupToStudent(data)} shape="circle" style={{color: "#399EFF"}}  icon={<UsergroupAddOutlined />} /> */}
          </Space>
        )
      }
    }
  ];


  // const handleTableChange = (pagination) => {
  //   dispatch( getStudents(pagination) );
  // };

  
  return (
    <Fade>

      <Row justify="space-between" align="middle">
        <Col>
          <PageHeader
            className="site-page-header"
            // onBack={ () => null }
            title={student.firstName+" "+ student.lastName}
            subTitle={student.telNomer}
          />
        </Col>
        {/* <Col>
          <Button type="primary">
            Add Students Login
          </Button>
        </Col> */}


      </Row>
      <Card>
      <Table
         columns={ columns } 
        //  dataSource={ teachers && teachers} 
        //  pagination={pagination}
        //  loading={loading}
         scroll={ { x: "auto" } } 
        //  onChange={handleTableChange}
         />
      </Card>
    </Fade>
  );
};

export default StudentView;
