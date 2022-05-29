import React from 'react'
import { Button, List } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { EyeOutlined} from '@ant-design/icons';
import { getSingleGroupStudent, getSingleStudent } from '../../../../redux/student/actions';

const StudentListGroupModal = ( { handleOk} ) => {

    const dispatch = useDispatch();
    let history = useHistory();
    const { studentsGroup} = useSelector(state=>state.studentReducer);

    function seeStudentById (id) {
        console.log(id);
        dispatch(getSingleGroupStudent(history, id));
        dispatch(getSingleStudent(history, id));
        handleOk()
    }

    return (


                <List
                    size="small"
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={studentsGroup}
                    renderItem={item => 
                    <List.Item
                    actions={[<Button shape="circle"  onClick={() => seeStudentById(item.id)} style={{color: "#399EFF"}}  icon={<EyeOutlined />} ></Button>]}
                    >
                        {item.firstName} {item.lastName} {item.telNomer} 
                    </List.Item>
                
                    }
                />


    )
}

export default StudentListGroupModal;
