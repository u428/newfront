import React, { useEffect, useState } from "react";

import Fade from "react-reveal/Fade";
import { EditOutlined, DeleteOutlined, EyeOutlined, FormOutlined } from '@ant-design/icons';
import { Table, Tag, Card, PageHeader, Modal, Row, Col, Button, Space, Tooltip } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getTeachers, deleteTeacher, getSingleTeacher, viewTeacher } from "../../../redux/teacher/actions";
import AddTeacher from "./modal/AddTeacher";
import EditTeacher from "./modal/EditTeacher";
import ChangePasswords from "./modal/ChangePasswords";
import { useTranslation } from "react-i18next";


const Teachers = () => {

  let history = useHistory();

  const {pagination, loading, isActive, teachers} = useSelector(state=>state.teacherReducer);
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const [ isModalVisible, setIsModalVisible ] = useState( false );
  const [ isEditModalVisible, setIsEditModalVisible ] = useState( false );
  const [ passwordChange, setChangePassword ] = useState( false );
  const [ changePassId, setChangePassId ] = useState(0);

  
  function deleteTeachers (teacher) {
    Modal.confirm({
      title: "siz shu "+teacher.firstName.toUpperCase()+" "+teacher.lastName.toUpperCase()+" ni ochirmoqchimisiz",
      okText: "Xa",
      okType:"danger",
      cancelText:"yoq",
      onOk: () =>{
        dispatch(deleteTeacher(teacher.id));
      }
    })
  }

  const showModal = () => {
    setIsModalVisible( true );
  };
  const showEditModal = (id) => {
    dispatch(getSingleTeacher(id));
    setIsEditModalVisible( true );
  };

  const viewTeachers = (id) => {
    console.log(id);
    dispatch(viewTeacher(history, id))
  };

  const changePassword = (id) => {
    console.log(id);
    setChangePassId(id);
    setChangePassword(true);
    // dispatch(viewTeacher(history, id))
  };

  const handleOk = () => {
    setIsModalVisible( false );
  };
  const handleOk2 = () => {
    setIsEditModalVisible( false );
  };
  const handleOk3 = () => {
    setChangePassword( false );
  };

  const handleCancel = () => {
    setIsModalVisible( false );
  };
  const handleEDitModalCancel = () => {
    setIsEditModalVisible( false );
  };
  const handleCancel3 = () => {
    setChangePassword( false );
  };

  useEffect( () => {
    dispatch( getTeachers(pagination));
  }, [] );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'teacher',
      key: 'id',
      render: text => <p>{ text.id }</p>,
    },
    {
      title: t("person_full_name"),
      dataIndex: 'teacher',
      key: 'fullName',
      render: text => <p>{ text.firstName +" "+text.lastName }</p>,
    },
    {
      title: t("person_gmail"),
      dataIndex: 'teacher',
      key: 'gmail',
      render: text => <p>{ text.gmail }</p>,
    },
    {
      title: t("person_tel_nomer"),
      dataIndex: 'teacher',
      key: 'telNomer',
      render: text => <p>{ text.telNomer }</p>,
    },
    {
      title: t("language"),
      dataIndex: 'teacher',
      key: 'languages',
      render: text => (
        
        <>
        {
        text.languages.map(lang =>{
          const name = lang.name;
          const id = lang.id;
          return(
            <Tag color="geekblue" key={ id }>
              {name}
            </Tag>
          )
        })
      }
      </>
      )
    },
    {
      title: t("subject"),
      dataIndex: 'teacher',
      key: 'subjects',
      render: text => (
        <>
        {
        text.subjects.map(lang =>{
          const name = lang.nameUz;
          const id = lang.id;
          return(
            <Tag color="geekblue" key={ id }>
              {name}
            </Tag>
          )
        })
      }
      </>
      )
    },
    {
      title: t("login"),
      dataIndex: 'login',
      key: 'telNomerlogin',
      render: text => <p>{ text }</p>,
    },
    {
      title: t("group"),
      dataIndex: 'groups',
      key: 'groups',
      render: text => <Button type="primary" shape="circle">{text}</Button>
    },
    {
      title: t("actions"),
      key: 'action',
      render: ( data ) => {
        return (
          <Space size="middle">
              <Button onClick={() => showEditModal(data.teacher.id)}  shape="circle" warning icon={<EditOutlined />} />
              <Button onClick={() => deleteTeachers(data.teacher)} shape="circle" danger  icon={<DeleteOutlined />} />
              <Button onClick={() => viewTeachers(data.teacher.id)} shape="circle" info  icon={ <EyeOutlined />} />
              <Button onClick={() => changePassword(data.teacher.authId)} shape="circle" info  icon={ <FormOutlined />} />
          </Space>
        )
      },
    }
  ];


  const handleTableChange = (pagination) => {
   
    dispatch( getTeachers(pagination) );
  };

  
  return (
    <Fade>
      <Modal title="Chreate Teacher" visible={ isModalVisible } onOk={ handleOk } onCancel={ handleCancel } footer={ false }>
        <AddTeacher handleOk={ handleOk } handleCancel={ handleCancel } />
      </Modal>
      <Modal title="Change Teacher" visible={ isEditModalVisible } onOk={ handleOk2 } onCancel={ handleEDitModalCancel } footer={ false }>
        <EditTeacher handleOk2={ handleOk2 } handleCancel={ handleEDitModalCancel } />
      </Modal>
      <Modal title="Change Teacher" visible={ passwordChange } onOk={ handleOk3 } onCancel={ handleCancel3 } footer={ false }>
        <ChangePasswords handleOk3={ handleOk3 } handleCancel3={ handleCancel3 } changePassId={changePassId} />
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
          {t("add_teacher")}
          </Button>
        </Col>
      </Row>

      <Card>
        <Table
         columns={ columns } 
         dataSource={ teachers &&teachers} 
         pagination={pagination}
         loading={loading}
         scroll={ { x: "auto" } } 
         onChange={handleTableChange}
         />
        
      </Card>
    </Fade>
  );
};

export default Teachers;
