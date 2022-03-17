import React, { useEffect, useState } from "react";

import Fade from "react-reveal/Fade";
import { EditOutlined, DeleteOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Table, Tag, Card, PageHeader, Modal, Row, Col, Button, Space, Tooltip } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import {getStudents} from "../../../redux/student/actions";
import ModalStudentsLogin from "./modal/ModalStudentsLogin";
import ModalStudentsGroup from "./modal/ModalStudentsGroup";



const StudentsGroup = () => {

  const {pagination, loading, isActive, students} = useSelector(state=>state.studentReducer);
  console.log(students);


  const dispatch = useDispatch();
  const [ isModalLoginVisible, setIsModalLoginVisible ] = useState( false );
  const [ isModalGroupVisible, setIsModalGroupVisible ] = useState( false );

  
  useEffect( () => {
    dispatch( getStudents(pagination));
  }, [dispatch] );
  
  // function deleteStudents (students) {
  //   Modal.confirm({
  //     title: "siz shu "+students.id+" ni ochirmoqchimisiz",
  //     okText: "Xa",
  //     okType:"danger",
  //     cancelText:"yoq",
  //     onOk: () =>{
  //       dispatch(deleteNewStudent(students.id));
  //       dispatch( getNewStudents(pagination));
  //     }
  //   })
  // }

  function addGroupToStudent (students) {
      console.log(students);
      setIsModalGroupVisible( true );
  }

  const showModalLogin = () => {
    setIsModalLoginVisible( true );
  };
  const showModalGroup = () => {
    setIsModalGroupVisible( true );
  };

  const handleOkLogin = () => {
    setIsModalLoginVisible( false );
    dispatch( getStudents(pagination));
  };
  const handleOkGroup = () => {
    setIsModalGroupVisible( false );
    dispatch( getStudents(pagination));
  };

  const handleCancel = () => {
    setIsModalLoginVisible( false );
  };
  const handleCancelGroup = () => {
    setIsModalGroupVisible( false );
  };


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'firstName',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'lastName',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'Birth day',
      dataIndex: 'dateBirth',
      key: 'dateBirth'
    },
    {
      title: 'telNumber',
      dataIndex: 'telNomer',
      key: 'telNomer'
    },
    {
      title: 'Action',
      key: 'action',
      render: ( data ) => {
        return (
          <Space size="middle">
              {/* <Button onClick={() => showEditModal(data.id)}  shape="circle" warning icon={<EditOutlined />} /> */}
              <Button onClick={() => addGroupToStudent(data)} shape="circle" style={{color: "#63B4B5"}}  icon={<UsergroupAddOutlined />} />
          </Space>
        )
      },
    }
  ];


  const handleTableChange = (pagination) => {
    dispatch( getStudents(pagination) );
  };

  
  return (
    <Fade>
      <Modal title="Chreate Teacher" visible={ isModalLoginVisible } onOk={ handleOkLogin } onCancel={ handleCancel } footer={ false }>
        <ModalStudentsLogin handleOk={ handleOkLogin } handleCancel={ handleCancel } />
      </Modal>
      <Modal title="Chreate Teacher" visible={ isModalGroupVisible } onOk={ handleOkGroup } onCancel={ handleCancelGroup } footer={ false }>
        <ModalStudentsGroup handleOk={ handleOkGroup } handleCancel={ handleCancelGroup } />
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
          <Button type="primary" onClick={ showModalLogin }>
            Add Students Login
          </Button>
        </Col>
      </Row>

      <Card>
        <Table
         columns={ columns } 
         dataSource={ students && students} 
         pagination={pagination}
         loading={loading}
         scroll={ { x: "auto" } } 
         onChange={handleTableChange}
         />
        
      </Card>
    </Fade>
  );
};

export default StudentsGroup;
