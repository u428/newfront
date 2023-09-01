import React from 'react'
import { Button, List } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import moment from 'moment';
import { EyeOutlined} from '@ant-design/icons';
import { getSingleGroupStudent, getSingleStudent } from '../../../../redux/student/actions';

const StudentViewAttendaceHistory = ( { handleOk, handleCancel} ) => {
    const dateFormat = 'DD.MM.YYYY';
    const dispatch = useDispatch();
    let history = useHistory();
    const { studentHistory } = useSelector(state=>state.studentReducer);
console.log(studentHistory);

    function seeStudentById (id) {
        console.log(id);
        dispatch(getSingleGroupStudent(history, id, "/teacher/view/student"));
        dispatch(getSingleStudent(id));
        handleOk()
    }

    return (


                <List
                    size="small"
                    header={<List.Item>
                            <List.Item.Meta title="LESSONS"  /><div>TIME</div>
                            </List.Item>}
                    bordered
                    dataSource={studentHistory}
                    renderItem={item => 
                    <List.Item
                    >
                        <List.Item.Meta title={item.freeLesson?"FREE":"NOT FREE"}  />
                        <div><p>{item.time}</p></div>
                        
                    </List.Item>
                
                    }
                 />


    )
}

export default StudentViewAttendaceHistory;
