import React, { useEffect, useState } from "react";

import Fade from "react-reveal/Fade";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Tag, Card, PageHeader, Modal, Row, Col, Button, Space, Tooltip } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import {getGroups, deleteGroup, getSingleGroup, getTeacherGroups } from "../../../redux/group/actions";
import ModalGroup from "./modal/ModalGroup";
import { getStudentsGroup } from "../../../redux/student/actions";
import StudentListGroupModal from "./modal/StudentListGroupModal";
import { useHistory } from "react-router-dom";
import { viewTeacher } from "../../../redux/teacher/actions";



const Groups = () => {

  const {pagination, loading, isActive, groups} = useSelector(state=>state.groupReducer);

  console.log(groups);
  let history = useHistory();
  const dispatch = useDispatch();
  const [ isModalVisible, setIsModalVisible ] = useState( false );
  const [ isStudentVisible, setIsStudentVisible ] = useState( false );
  const [count, setCount] =useState(0);


  
  function deleteGroups (group) {
    Modal.confirm({
      title: "siz shu "+group.name.toUpperCase()+" ni ochirmoqchimisiz",
      okText: "Xa",
      okType:"danger",
      cancelText:"yoq",
      onOk: () =>{
        dispatch(deleteGroup(group.id));
        dispatch( getGroups(pagination));
      }
    })
  }

  const showModal = (id, i) => {
    if(i > 0){
      setIsModalVisible( true );
      dispatch(getSingleGroup(id));
      setCount(i)
    }else{
      setIsModalVisible( true );
      setCount(i)
    }
  };

  function getGroupStudents (group) {
    dispatch(getStudentsGroup(group.id))
    // modal open
    setIsStudentVisible(true);
  }

  function groupTeacher (id) {
    dispatch(viewTeacher(history, id));
  }

  const handleOk = () => {
    setIsModalVisible( false );
  };

  const handleStudentOk = () => {
    setIsStudentVisible( false );
  };

  const handleCancel = () => {
    setIsModalVisible( false );
  };

  const handleStudentCancel = () => {
    setIsStudentVisible( false );
  };

  useEffect( () => {
    dispatch(getGroups(pagination));
  }, [] );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'group',
      key: 'id',
      render: text => <p>{ text.id }</p>
    },
    {
      title: 'name',
      dataIndex: 'group',
      key: 'name',
      render: text => <p>{text.name}</p>
    },
    {
      title: 'price',
      dataIndex: 'group',
      key: 'price',
      render: text => <p>{text.price}</p>
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
      render: text => <p>{text.name}</p>
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: text => <p>{text.nameUz}</p>
    },
    {
      title: 'Teacher',
      dataIndex: 'teacher',
      key: 'fullName',
      render: text => <a onClick={() =>{ groupTeacher(text.id)}}>{text.firstName} {text.lastName} <br /> {text.telNumber}</a>
    },
    {
      title: 'Students',
      key: 'soni',
      render: text => <Button onClick={() =>{getGroupStudents(text.group)}} type="primary" shape="circle">{text.soni}</Button>
    },
    {
      title: 'Action',
      key: 'action',
      render: ( data ) => {
        return (
          <Space size="middle">
              <Button onClick={() => showModal(data.group.id, 1)}  shape="circle" warning icon={<EditOutlined />} />
              <Button onClick={() => deleteGroups(data.group)} shape="circle" danger  icon={<DeleteOutlined />} />
          </Space>
        )
      },
    }
  ];


  const handleTableChange = (pagination) => {
    dispatch( getGroups(pagination) );
  };

  
  return (
    <Fade>
      <Modal title="Chreate Group" visible={ isModalVisible } onOk={ handleOk } onCancel={ handleCancel } footer={ false }>
        <ModalGroup handleOk={ handleOk } handleCancel={ handleCancel } count={count}/>
      </Modal>
{/* 
      <Modal title="Chreate Group" visible={ isModalVisible } onOk={ handleOk } onCancel={ handleCancel } footer={ false }>
        <ModalGroup handleOk={ handleOk } handleCancel={ handleCancel } count={count}/>
      </Modal> */}

      <Modal title="Chreate Group" visible={ isStudentVisible } onOk={ handleStudentOk } onCancel={ handleStudentCancel } footer={ false }>
        <StudentListGroupModal handleOk={ handleStudentOk }/>
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
          <Button type="primary" onClick={()=> showModal({}, 0) }>
            Add Group
          </Button>
        </Col>
      </Row>

      <Card>
        <Table
         columns={ columns } 
         dataSource={ groups && groups} 
         pagination={pagination}
         loading={loading}
         scroll={ { x: "auto" } } 
         onChange={handleTableChange}
         />
      </Card>
    </Fade>
  );
};

export default Groups;
