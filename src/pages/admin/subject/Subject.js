import React, { useEffect, useState } from "react";

import Fade from "react-reveal/Fade";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Tag, Card, PageHeader, Modal, Row, Col, Button, Space, Tooltip } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getSubjects, deleteSubject, getSingleSubject } from "../../../redux/subject/actions";
import ModalSubject from "./modal/ModalSubject";
import { useTranslation } from "react-i18next";

const Subject = () => {
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const [ isModalVisible, setIsModalVisible ] = useState( false );
  const [ modalData, setModalData ] = useState( {} );
  const [count, setCount] =useState(0);

const {isActive, loading, subjects} = useSelector(state => state.subjectReducer);
  
  function deleteSubjects (subject) {
    Modal.confirm({
      title: t("del_title1")+"<"+subject.id+">"+t("del_title2"),
      okText: t("yes"),
      okType:"danger",
      cancelText:t("no"),
      onOk: () =>{
        dispatch(deleteSubject(subject.id));
      }
    })
  }

  const showModal = (id, i) => {
    if(i > 0){
      setIsModalVisible( true );
      dispatch(getSingleSubject(id));
      setCount(i)
    }else{
      setIsModalVisible( true );
      setCount(i)
    }
  };


  const handleOk = () => {
    setIsModalVisible( false );
  };

  const handleCancel = () => {
    setIsModalVisible( false );
  };

  useEffect( () => {
    dispatch( getSubjects());
  }, [] );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t("name_uz") ,
      dataIndex: 'nameUz',
      key: 'nameUz',
    },
    {
      title: t("name_ru"),
      dataIndex: 'nameRu',
      key: 'nameRu',
    },
    {
      title: t("name_en"),
      dataIndex: 'nameEn',
      key: 'nameEn',
    },
    {
      title: t("descryption"),
      dataIndex: 'description',
      key: 'description',
      // render: text => <p>{ text.telNomer }</p>,
    },
    {
      title: t("action"),
      key: 'action',
      render: ( data ) => {
        return (
          <Space size="middle">
              <Tooltip placement="topLeft" title={t("sys_edit")}>
                <Button onClick={() => showModal(data.id, 1)}  shape="circle" warning icon={<EditOutlined />} />
              </Tooltip>
              <Tooltip placement="topLeft" title={t("sys_delete")}>
                <Button onClick={() => deleteSubjects(data)} shape="circle" danger  icon={<DeleteOutlined />} />
              </Tooltip>
          </Space>
        )  
      },
    }
  ];

  
  return (
    <Fade>
      <Modal title="Chreate Subject" visible={ isModalVisible } onOk={ handleOk } onCancel={ handleCancel } footer={ false }>
        <ModalSubject handleOk={ handleOk } handleCancel={ handleCancel } count={count} modalData={modalData} />
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
          {t("add_subject")}
          </Button>
        </Col>
      </Row>

      <Card>
        <Table
         columns={ columns } 
         dataSource={subjects &&subjects } 
         loading={loading}
         scroll={ { x: "auto" } }
         />
      </Card>
    </Fade>
  );
};

export default Subject;
