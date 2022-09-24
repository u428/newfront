import React, { useEffect, useState } from "react";

import Fade from "react-reveal/Fade";
import { Table, Tag, Card, PageHeader, Modal, Row, Col, Button, Space, Tooltip } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getAllUsers } from "../../../redux/statistic/actions";



const Controllers = () => {

  let history = useHistory();

  const {users, loading} = useSelector(state=>state.statisticReducer);
  console.log(users);

  const dispatch = useDispatch();
  const [ isModalVisible, setIsModalVisible ] = useState( false );

  
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

  const showModal = () => {
    setIsModalVisible( true );
  };

  const handleOk = () => {
    setIsModalVisible( false );
  };

  const handleCancel = () => {
    setIsModalVisible( false );
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
      title: 'gmail',
      dataIndex: 'teacher',
      key: 'gmail',
      render: text => <p>{ text.gmail }</p>,
    },
    {
      title: 'telNumber',
      dataIndex: 'teacher',
      key: 'telNomer',
      render: text => <p>{ text.telNomer }</p>,
    },
    {
      title: 'Action',
      key: 'action',
      render: ( data ) => {
        return (
          <Space size="middle">
              {/* <Button onClick={() => showEditModal(data.teacher.id)}  shape="circle" warning icon={<EditOutlined />} />
              <Button onClick={() => deleteTeachers(data.teacher)} shape="circle" danger  icon={<DeleteOutlined />} />
              <Button onClick={() => viewTeachers(data.teacher.id)} shape="circle" info  icon={ <EyeOutlined />} /> */}
          </Space>
        )
      },
    }
  ];

  
  return (
    <Fade>
      <Modal title="Chreate Teacher" visible={ isModalVisible } onOk={ handleOk } onCancel={ handleCancel } footer={ false }>
        {/* <AddTeacher handleOk={ handleOk } handleCancel={ handleCancel } /> */}
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
          <Button type="primary" onClick={ showModal }>
            Add teacher
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
