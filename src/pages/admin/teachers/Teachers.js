import React, { useEffect, useState } from "react";

import Fade from "react-reveal/Fade";
import { Table, Tag, Card, PageHeader, Modal, Row, Col, Button } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getTeachers } from "../../../redux/teacher/actions";
import AddTeacher from "./modal/AddTeacher";



const Teachers = () => {
  const dispatch = useDispatch();
  const [ isModalVisible, setIsModalVisible ] = useState( false );

  

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
    console.log("use Effect ishladi");
    dispatch( getTeachers() );
  }, [dispatch] );

  const reducer = useSelector(state=>state.teacherReducer)
  console.log(reducer);


  // const showButtonInput = (id)=>{
  //   // dispatch(getSingleTeacher(history, id))
  //   console.log(id);
  // }

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
      title: 'language',
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
      title: 'subjects',
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
      title: 'groups',
      dataIndex: 'groups',
      key: 'groups',
      render: text => <Button type="primary" shape="circle">{text}</Button>
    }
    // {
    //   title: 'languages',
    //   key: 'languages',
    //   dataIndex: 'teacher.languages',
    //   render: tags => (
    //     <>
    //       { tags.map( tag => {
    //         // let color = tag.length > 5 ? 'geekblue' : 'green';
    //         // if ( tag === 'loser' ) {
    //         //   color = 'volcano';
    //         // }
    //         let color = 'geekblue'
    //         return (
    //           <Tag color={ color } key={ tag.id }>
    //             { tag.name }
    //           </Tag>
    //         );
    //       } ) }
    //     </>
    //   ),
    // },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: ( text, record ) => {
    //     // console.log( record.key );
    //     return (
    //       <Space size="middle">

    //       </Space>
    //     )
    //   },
    // },
  ];

  
  return (
    <Fade>
      <Modal title="Basic Modal" visible={ isModalVisible } onOk={ handleOk } onCancel={ handleCancel } footer={ false }>
        <AddTeacher handleOk={ handleOk } handleCancel={ handleCancel } />
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
            Open Modal
          </Button>
        </Col>
      </Row>

      <Card>
        <Table columns={ columns } dataSource={ reducer.teachers && reducer.teachers.returns }  scroll={ { x: "auto" } } />
      </Card>
    </Fade>
  );
};

export default Teachers;
