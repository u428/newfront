import React, { useState } from "react";
import { HistoryOutlined, UsergroupAddOutlined, DollarCircleOutlined} from '@ant-design/icons';
import Fade from "react-reveal/Fade";
import { Table, Tag, Card, PageHeader, Modal, Row, Col, Button, Space } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getHistoryStudent } from "../../../../redux/student/actions";
import StudentViewAttendaceHistory from "./StudentViewAttendaceHistory";



const StudentViewTeacher = () => {

  const {loading, studentGroup, student} = useSelector(state=>state.studentReducer);
  // let history = useHistory();


  // const dispatch = useDispatch();
  const dispatch = useDispatch();
  const [ isModalLoginVisible, setIsModalLoginVisible ] = useState( false );
  const [ isModalPaymentVisible, setIsModalPaymentVisible ] = useState( false );
  const [ groupPaymentId, setGroupPaymentId ] = useState([]);


  const handleOkLogin = () => {
    setIsModalLoginVisible( false );
  };

  const handleCancel = () => {
    setIsModalLoginVisible( false );
  };

  const handleOkPayment = () => {
    setIsModalPaymentVisible( false );
  };

  const handlepaymentCancel = () => {
    setIsModalPaymentVisible( false );
  };

  function seeHistory (id) {
    dispatch(getHistoryStudent(id, student.id));
    setIsModalLoginVisible( true );
  }

  function getPayment (group) {
    // setGroupPaymentId(group);
    // setIsModalPaymentVisible( true );
  }

  function getGroupStudents (group) {
    // dispatch(getStudentsGroup(group.id))
    // setIsModalLoginVisible( true );
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
              <Button  shape="circle"  onClick={() => seeHistory(data.id)}  style={{color: "#399EFF"}} icon={<HistoryOutlined />} />
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
        <StudentViewAttendaceHistory  handleOk={ handleOkLogin } handleCancel={ handleCancel } />
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

      <Button>Go back</Button>
    </Fade>
  );
};

export default StudentViewTeacher;
