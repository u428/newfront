import React, {useEffect, useState} from 'react'
import { Form, Input, Button, Upload, TreeSelect, DatePicker, Select, Row, Col, PageHeader, Table, Card } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Fade } from 'react-reveal';



const ViewTeacher = ( ) => {

    const {pagination, loading, isActive, teacherGroup, teacher} = useSelector(state=>state.teacherReducer);
    const [ form ] = Form.useForm();
    const dispatch = useDispatch();
    let history = useHistory();

    console.log(teacher);
    console.log(teacherGroup);

    useEffect( () => {
    }, [] );

    const onFinish = ( values ) => {
    };

    const onFinishFailed = ( errorInfo ) => {
    };

    const handleSearch = (value)=>{

    }

    const handleChange = (value)=>{
       
    }


    const onReset = () => {
    };

    function onChange(date, dateString) {
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
        // {
        //   title: 'status',
        //   dataIndex: 'status',
        //   key: 'status',
        //   render: tags => (
        //     <span>
        //           <Tag color={tags? "green":"volcano"}>
        //             {tags?"ACTIVE":"DISACTIVE"}
        //           </Tag>
        //     </span>
        //   )
        // },
        // {
        //   title: 'attendance',
        //   dataIndex: 'attendance',
        //   key: 'attendance'
        // },
        // {
        //   title: 'Action',
        //   key: 'action',
        //   render: ( data ) => {
        //     return (
        //       <Space size="middle">
        //           <Button  shape="circle" style={{color: "#399EFF"}} icon={<HistoryOutlined />} />
        //           <Button shape="circle"  onClick={() => getGroupStudents(data)} style={{color: "#399EFF"}}  icon={<UsergroupAddOutlined />} />
        //       </Space>
        //     )
        //   }
        // }
      ];


    return (
        <Fade>
      {/* <Modal title="Chreate Teacher" visible={ isModalLoginVisible } onOk={ handleOkLogin } onCancel={ handleCancel } footer={ false }>
        <StudentViewGroupModal  handleOk={ handleOkLogin } handleCancel={ handleCancel } />
      </Modal> */}
      <Row justify="space-between" align="middle">
        <Col>
          <PageHeader
            className="site-page-header"
            // onBack={ () => null }
            title={teacher.firstName+" "+ teacher.lastName}
            subTitle={teacher.telNomer}
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
         dataSource={ teacherGroup && teacherGroup} 
         pagination={{position: ["none", "none"]}}
         loading={loading}
         scroll={ { x: "auto" } }
         />
      </Card>
    </Fade>


    )
}

export default ViewTeacher
