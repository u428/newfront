import React, { useState } from "react";
import { HistoryOutlined, UsergroupAddOutlined} from '@ant-design/icons';
import Fade from "react-reveal/Fade";
import { Table, Tag, Card, PageHeader, Modal, Row, Col, Button, Space } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import StudentViewGroupModal from "./model/StudentViewGroupModal";
import { getStudentsGroup } from "../../../../redux/student/actions";



const StudentView = () => {

  const {loading, studentGroup, student} = useSelector(state=>state.studentReducer);
  // let history = useHistory();


  // const dispatch = useDispatch();
  const dispatch = useDispatch();
  const [ isModalLoginVisible, setIsModalLoginVisible ] = useState( false );


  const handleOkLogin = () => {
    setIsModalLoginVisible( false );
  };

  const handleCancel = () => {
    setIsModalLoginVisible( false );
  };

  function getGroupStudents (group) {
    dispatch(getStudentsGroup(group.id))
    setIsModalLoginVisible( true );
  }

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
      key: 'status',
      render: tags => (
        <span>
              <Tag color={tags? "green":"volcano"}>
                {tags?"ACTIVE":"DISACTIVE"}
              </Tag>
        </span>
      )
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
              <Button  shape="circle" style={{color: "#399EFF"}} icon={<HistoryOutlined />} />
              <Button shape="circle"  onClick={() => getGroupStudents(data)} style={{color: "#399EFF"}}  icon={<UsergroupAddOutlined />} />
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
      <Modal title="Chreate Teacher" visible={ isModalLoginVisible } onOk={ handleOkLogin } onCancel={ handleCancel } footer={ false }>
        <StudentViewGroupModal  handleOk={ handleOkLogin } handleCancel={ handleCancel } />
      </Modal>
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
         dataSource={ studentGroup && studentGroup} 
         pagination={{position: ["none", "none"]}}
         loading={loading}
         scroll={ { x: "auto" } }
         />
      </Card>
    </Fade>
  );
};

export default StudentView;
