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
import { useTranslation } from "react-i18next";


const Groups = () => {
  const { i18n, t } = useTranslation();
  const {pagination, loading, groups} = useSelector(state=>state.groupReducer);

  console.log(groups);
  let history = useHistory();
  const dispatch = useDispatch();
  const [ isModalVisible, setIsModalVisible ] = useState( false );
  const [ isStudentVisible, setIsStudentVisible ] = useState( false );
  const [count, setCount] =useState(0);


  
  function deleteGroups (group) {
    Modal.confirm({
      title: t("del_title1")+"<"+group.name.toUpperCase()+">"+t("del_title2"),
      okText: t("yes"),
      okType:"danger",
      cancelText:t("no"),
      onOk: () =>{
        dispatch(deleteGroup(group.id));
        dispatch( getGroups(pagination));
      }
    })
  }

  const showModal = (id, i) => {
    if(i > 0){
      setCount(i)
      setIsModalVisible( true );
      dispatch(getSingleGroup(id));
    }else{
      setCount(i)
      setIsModalVisible( true );
      
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
      title: t("group_name"),
      dataIndex: 'group',
      key: 'name',
      render: text => <p>{text.name}</p>
    },
    {
      title: t("price"),
      dataIndex: 'group',
      key: 'price',
      render: text => <p>{text.price}</p>
    },
    {
      title: t("language"),
      dataIndex: 'language',
      key: 'language',
      render: text => <p>{text.name}</p>
    },
    {
      title: t("subject"),
      dataIndex: 'subject',
      key: 'subject',
      render: text => <p>{text.nameUz}</p>
    },
    {
      title: t("teacher_name"),
      dataIndex: 'teacher',
      key: 'fullName',
      render: text => <a onClick={() =>{ groupTeacher(text.id)}}>{text.firstName} {text.lastName} <br /> {text.telNumber}</a>
    },
    {
      title: t("students_quantity"),
      key: 'soni',
      render: text => <Button onClick={() =>{getGroupStudents(text.group)}} type="primary" shape="circle">{text.soni}</Button>
    },
    {
      title: t("action"),
      key: 'action',
      render: ( data ) => {
        return (
          <Space size="middle">
              <Tooltip placement="topLeft" title={t("sys_view")}>
                <Button onClick={() => showModal(data.group.id, 1)}  shape="circle" warning icon={<EditOutlined />} />
              </Tooltip>
              <Tooltip placement="topLeft" title={t("sys_delete")}>
                <Button onClick={() => deleteGroups(data.group)} shape="circle" danger  icon={<DeleteOutlined />} />
              </Tooltip>
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
      <Modal title={count==0?t("group_add"):t("group_change")} visible={ isModalVisible } onOk={ handleOk } onCancel={ handleCancel } footer={ false }>
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
            {t("add_group")}
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
