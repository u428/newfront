import React, { useState } from "react";
import { HistoryOutlined, UsergroupAddOutlined, DollarCircleOutlined} from '@ant-design/icons';
import Fade from "react-reveal/Fade";
import { Table, Tag, Card, PageHeader, Modal, Row, Col, Button, Space } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import StudentViewGroupModal from "./model/StudentViewGroupModal";
import { getStudentsGroup } from "../../../../redux/student/actions";
import StudentPaymentGroupModal from "./model/StudentPaymentGroupModal";



const StudentView = () => {

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

  function getPayment (group) {
    setGroupPaymentId(group);
    setIsModalPaymentVisible( true );
  }

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
              <Button shape="circle" onClick={() => getPayment(data)} style={{color: "#399EFF"}} icon={<DollarCircleOutlined />} />
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
      <Modal title="Payment" visible={ isModalPaymentVisible } onOk={ handleOkPayment } onCancel={ handlepaymentCancel } footer={ false }>
        <StudentPaymentGroupModal  handleOk={ handleOkPayment } handleCancel={ handlepaymentCancel } group = {groupPaymentId} />
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
