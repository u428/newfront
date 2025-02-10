import React, { useEffect, useState } from "react";

import Fade from "react-reveal/Fade";
import { Table, Tag, Card, PageHeader, Modal, Row, Col, Button, Space, Tooltip } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getAllUsers, getUserAuth } from "../../../redux/statistic/actions";
import { EditOutlined, CheckOutlined , InfoOutlined} from '@ant-design/icons';
import EditController from "./modal/EditController";
import AddAdmins from "./modal/AddAdmins";



const Controllers = () => {

  let history = useHistory();

  const {users, loading} = useSelector(state=>state.statisticReducer);

  const dispatch = useDispatch();
  const [ isModalVisible, setIsModalVisible ] = useState( false );
  const [ isEditModalVisible, setIsEditModalVisible ] = useState( false );

  
  function deleteTeachers (teacher) {
    Modal.confirm({
      title: "siz shu "+teacher.firstName.toUpperCase()+" "+teacher.lastName.toUpperCase()+" ni ochirmoqchimisiz",
      okText: "Xa",
      okType:"danger",
      cancelText:"yoq",
      onOk: () =>{
        // dispatch(deleteTeacher(teacher.id));
      }
    })
  }

  const editIt = (id) =>{
    // console.log(id);
    dispatch(getUserAuth(id))
    setIsModalVisible( true );
  }

  const showEditModal = (id) => {
    setIsEditModalVisible( true );
  };

  const showModal = () => {
    setIsModalVisible( true );
  };

  const handleOk = () => {
    setIsModalVisible( false );
  };

  const handleOk2 = () => {
    setIsEditModalVisible( false );
  };

  const handleCancel = () => {
    setIsModalVisible( false );
  };
  const handleEDitModalCancel = () => {
    setIsEditModalVisible( false );
  };

  useEffect( () => {
    dispatch(getAllUsers());
  }, [] );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'teacher',
      key: 'id',
      render: text => <p>{ text.id }</p>,
    },
    {
      title: 'fullName',
      dataIndex: 'teacher',
      key: 'fullName',
      render: text => <p>{ text.firstName +" "+text.lastName }</p>,
    },
    {
      title: 'Auth',
      dataIndex: 'auth',
      key: 'auth',
      render: text => <p>{ text.login }</p>,
    },
    {
      title: 'Role',
      dataIndex: 'auth',
      key: 'role',
      render: text => <p>{ text.roles.name }</p>,
    },
    {
      title: 'Action',
      key: 'action',
      render: ( data ) => {
        return (
          <Space size="middle">
              <Button onClick={() => {editIt(data.teacher.id)}}  shape="circle" warning icon={<EditOutlined />} />
              {/* <Button onClick={() => deleteTeachers(data.teacher)} shape="circle" danger  icon={<DeleteOutlined />} />
              <Button onClick={() => viewTeachers(data.teacher.id)} shape="circle" info  icon={ <EyeOutlined />} /> */}
          </Space>
        )
      },
    }
  ];

  
  return (
    <Fade>
      <Modal title="Chreate Login" visible={ isModalVisible } onOk={ handleOk } onCancel={ handleCancel } footer={ false }>
        <EditController handleOk={ handleOk } handleCancel={ handleCancel } />
      </Modal>
      <Modal title="Add Admins" visible={ isEditModalVisible } onOk={ handleOk2 } onCancel={ handleEDitModalCancel } footer={ false }>
        <AddAdmins handleOk2={ handleOk2 } handleCancel={ handleEDitModalCancel } />
      </Modal>

      <Row justify="space-between" align="middle">
        <Col>
          <PageHeader
            className="site-page-header"
            // onBack={ () => null }
            title="Title"
            subTitle="This is a subtitle"
          />
        </Col>
        <Col>
          <Button type="primary" onClick={ showEditModal }>
            Add Admins
          </Button>
        </Col>
      </Row>

      <Card>
        <Table
         columns={ columns } 
         dataSource={ users && users} 
         pagination={{position: ["none", "none"]}}
         loading={loading}
         scroll={ { x: "auto" } } 
         />
        
      </Card>
    </Fade>
  );
};

export default Controllers;
