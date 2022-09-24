import React, {useEffect, useState} from 'react'
import { Avatar, Button, Checkbox, Divider, Form, Input, List, Skeleton } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Fade } from 'react-reveal';
import { checkStudentTeacher } from '../../../../redux/teacher/actions';

const StudentCheckTeacher = ({handleOk, handleCancel, groupId}) => {
    const [ form ] = Form.useForm();
    

    const dispatch = useDispatch();

    const {loading, isActive, studentsGroup} = useSelector(state=>state.studentReducer);
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    const [checkFree, setCheckFree] = useState(false);

    const [studentCheckIds, setStudentCheckedIds] = useState([]);

    console.log(groupId);


    // const onCheckAllChange = e => {
    //     if(e.target.checked){
    //         let array = [];
    //         studentsGroup.map((student, index) =>{
    //             array[index] = student.id;
    //             console.log(index);
    //         })
    //         setStudentCheckedIds(array);
    //     }else {
    //         setStudentCheckedIds([])
    //     }

    //     setIndeterminate(false);
    //     setCheckAll(e.target.checked);
    //   };
    const saveStudents = () => {
        
        let req ={
            ids: studentCheckIds,
            groupId: Number(groupId),
            freeLesson: checkFree
        }
    
        dispatch(checkStudentTeacher(req));
        console.log("shu yera galdi");
        onReset();
        console.log("ishladi");
        handleOk()

    };

    const onReset = () => {
        setStudentCheckedIds([])
        form.resetFields();
    };

    const onChange = (e) => {
        console.log(checkFree);
        setCheckFree(!checkFree);
    };

      const checkedForBox = (checking, id) => {
        
        let newArr = [...studentCheckIds];
        

        if(checking){
            newArr[newArr.length] = id;
            setStudentCheckedIds(newArr);
        }else{
            let index = newArr.indexOf(id);
            newArr.splice(index, 1);
            setStudentCheckedIds(newArr);
        }

        if(newArr.length == studentsGroup.length){
            setCheckAll(true);
            setIndeterminate(false);
        }
        else if(newArr.length === 0){
            setCheckAll(false);
            setIndeterminate(false);
        }
        else{
            setIndeterminate(true);
        }
        console.log(newArr);
      };

    return (
        
        <Form 
            form={ form }>
            <Form.Item >
                <InfiniteScroll
                    dataLength={studentsGroup?studentsGroup.length:0}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    scrollableTarget="scrollableDiv"
                >
                    <Checkbox checked={checkAll}>
                        Check all
                    </Checkbox>

                    <Checkbox checked={checkFree} onChange={onChange}>
                        Check for free Lesson
                    </Checkbox>
                    <Divider />
                    <List
                        loading ={loading}
                        dataSource={studentsGroup?studentsGroup:[]}
                        renderItem={item => (
                        <List.Item key={item.id}>
                            <List.Item.Meta
                                // avatar={<Avatar src={item.picture.large} />}
                                title={<p>{item.firstName+" "+ item.lastName}</p>}
                                description={item.description}
                            />
                           <Checkbox onChange={(e) => checkedForBox(e.target.checked, item.id)}/>
                        </List.Item>
                        )}
                    />

                   
                </InfiniteScroll>
                 <Button block  type="primary" onClick={ saveStudents }> Save it</Button>
            </Form.Item>
        </Form>

    )
}

export default StudentCheckTeacher
