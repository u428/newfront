import React, {useEffect, useState} from 'react'
import {
    Form,
    Input,
    Button,
    Upload,
    TreeSelect,
    DatePicker,
    Select,
    Row,
    Col,
    PageHeader,
    Table,
    Card,
    Space, Tag
} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Fade } from 'react-reveal';
import {groupReducer} from "../../../../redux/group/reducer";
import {studentReducer} from "../../../../redux/student/reducer";
import {DeleteOutlined} from "@ant-design/icons";



const ViewTeacher = ( ) => {

    const {pagination, loading, isActive, studentList} = useSelector(state=>state.studentReducer);
    const [ form ] = Form.useForm();
    const dispatch = useDispatch();
    let history = useHistory();


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

    function deleteStudent(data){
    }

    const onReset = () => {
    };

    function onChange(date, dateString) {
    }

    const columns = [
        {
          title: 'ID',
          dataIndex: 'student',
          key: 'id',
            render: text => <span>{ text.id}</span>,
        },
        {
          title: 'name',
          dataIndex: 'student',
          key: 'name',
            render: text => <span>{text.firstName + " " + text.lastName}</span>
        },
        {
          title: 'price',
          dataIndex: 'price',
          key: 'price'
        },
        {
          title: 'status',
          dataIndex: 'activation',
          key: 'status',
          render: tags => (
            <span>
                  <Tag color={tags? "green":"volcano"}>
                    {tags?"ACTIVE":"DISACTIVE"}
                  </Tag>
            </span>
          )
        },
        {
          title: 'Action',
          key: 'action',
          render: ( data ) => {
            return (
              <Space size="middle">
                  {/*<Button  shape="circle" style={{color: "#399EFF"}} icon={<HistoryOutlined />} />*/}
                  <Button shape="circle"  onClick={() => deleteStudent(data)} danger  icon={<DeleteOutlined />} />
              </Space>
            )
          }
        }
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
            title={"teacher.firstName"+" "+ "teacher.lastName"}
            subTitle={"teacher.telNomer"}
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
         dataSource={ studentList && studentList}
         pagination={{position: ["none", "none"]}}
         loading={loading}
         scroll={ { x: "auto" } }
         />
      </Card>
    </Fade>


    )
}

export default ViewTeacher
