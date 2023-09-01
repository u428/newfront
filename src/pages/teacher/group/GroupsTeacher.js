import React, { useEffect, useState } from "react";

import Fade from "react-reveal/Fade";
import { EditOutlined, CheckOutlined , InfoOutlined, UsergroupAddOutlined} from '@ant-design/icons';
import { Table, Tag, Card, PageHeader, Modal, Row, Col, Button, Space, Tooltip } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getGroupsTeacher } from "../../../redux/group/actions";
import { getStudentsGroup } from "../../../redux/student/actions";
import StudentCheckTeacher from "./page/StudentCheckTeacher";
import StudentViewGroupTeacherModal from "./page/StudentViewGroupTeacherModal";



const GroupsTeacher = () => {

  const [isModalVisible, setIsModalVisible] =useState(false);
  const [studentIds, setStudentIds] = useState(0);
  const [ isModalLoginVisible, setIsModalLoginVisible ] = useState( false );
  const {loading, isActive, groups} = useSelector(state=>state.groupReducer);
  const {userData} = useSelector(state=>state.authReducer);
  const dispatch = useDispatch();

  const handleOkLogin = () => {
    setIsModalLoginVisible( false );
  };
  
  function studentCheck (id) {
    setStudentIds(id);
    dispatch(getStudentsGroup(id));
    setIsModalVisible(true);
  }

  function getGroupStudents (id) {
   dispatch(getStudentsGroup(id));
   setIsModalLoginVisible(true);
  }


  const handleOk = () => {
    setIsModalVisible( false );
  };

  const handleCancel = () => {
    setIsModalVisible( false );
  };

  const handleModalCancel = () => {
    setIsModalLoginVisible( false );
  };

  useEffect( () => {
    dispatch( getGroupsTeacher());
  }, [dispatch] );

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
      key: 'price',
    },
    {
      title: 'students',
      dataIndex: 'students',
      key: 'students',
    },
    {
      title: 'Action',
      key: 'action',
      render: ( data ) => {
        return (
          <Space size="middle">
              <Button onClick={() => studentCheck(data.id)} shape="circle" warning icon={<CheckOutlined />} />
              <Button shape="circle"  onClick={() => getGroupStudents(data.id)} style={{color: "#399EFF"}}  icon={<UsergroupAddOutlined />} />
          </Space>
        )
      },
    }
  ];


  // const handleTableChange = (pagination) => {
  //   dispatch( getGroups(pagination) );
  // };

  
  return (
    <Fade>
      <Modal destroyOnClose={true} forceRender={true} title="Attendance Students" visible={ isModalVisible } onOk={ handleOk } onCancel={ handleCancel } footer={ false }>
        <StudentCheckTeacher handleOk={ handleOk } handleCancel={ handleCancel } groupId={studentIds} />
      </Modal>

      <Modal title="Chreate Teacher" visible={ isModalLoginVisible } onOk={ handleOkLogin } onCancel={ handleModalCancel } footer={ false }>
        <StudentViewGroupTeacherModal  handleOk={ handleOkLogin } handleCancel={ handleCancel } />
      </Modal>


      <Row justify="space-between" align="middle">
      <Col>
          <PageHeader
            className="site-page-header"
            // onBack={ () => null }
            title={userData.user.firstName+" "+ userData.user.lastName}
            subTitle={userData.user.telNomer}
          />
        </Col>
      </Row>

      <Card>
        <Table
         columns={ columns } 
         dataSource={ groups && groups} 
         pagination={{position: ["none", "none"]}}
         loading={loading}
         scroll={ { x: "auto" } }
         />
      </Card>
    </Fade>
  );
};

export default GroupsTeacher;
