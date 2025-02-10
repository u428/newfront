import React, {useEffect, useState} from 'react'
import { Form, Input, Button, Space, Upload, TreeSelect, DatePicker, Select } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { postNewStudent, putNewStudent } from '../../../../redux/student/actions';
import moment from 'moment';
import { MaskedInput } from 'antd-mask-input';
import { getSubjects } from '../../../../redux/subject/actions';
import { useTranslation } from "react-i18next";
import { TreeNode } from 'antd/lib/tree-select';

const ModalStudents = ( { handleOk, handleCancel, count } ) => {

    const [ form ] = Form.useForm();
    const dispatch = useDispatch();
    let history = useHistory();
    const dateFormat = 'DD.MM.YYYY';
    const { i18n, t } = useTranslation();
    const [dating, setDating] = useState(null);

    const {isActive, student} = useSelector(state => state.studentReducer);
    const reducer = useSelector(state=>state.subjectReducer);

    useEffect( () => {
        if(count > 0 && isActive){
            form.setFieldsValue({
                "firstName":student.firstName,
                "lastName":student.lastName,
                "birthDate":moment(student.dateBirth, dateFormat),
                "telNumber":student.telNumber,
                "qtelNumber": student.qTelNomer,
                "description": student.description,
                "subjectId": student.subjects.map((item)=> item.id)
            });
        }
        
    }, [isActive] );

    useEffect( () => {
        dispatch( getSubjects());
        onReset()
    }, [count] );

    const onFinish = ( values ) => {
        
        if(count > 0){
            let returns = {
                "id":student.id,
                "firstName":values.firstName,
                "lastName":values.lastName,
                "telNumber":values.telNumber,
                "qTelNumber":values.qtelNumber,
                "birthDate":dating,
                "description":values.description,
                "subjectsId":values.subjectId
            }
            dispatch(putNewStudent(history, returns));
        }else{
            let returns = {
            "firstName":values.firstName,
            "lastName":values.lastName,
            "telNumber":values.telNumber,
            "qTelNumber":values.qtelNumber,
            "birthDate":dating,
            "description":values.description,
            "subjectsId":values.subjectId
            }
            dispatch(postNewStudent(history, returns));
        }
        handleOk()
        onReset()
    };

    const onFinishFailed = ( errorInfo ) => {
        onReset()
    };

    function onChange(date, dateString) {
        setDating(dateString);
    }

    const onReset = () => {
        form.resetFields();
    };

    return (

        <Form 
        form={ form } 
        layout="vertical"
        name={t("student")} 
        fields={[
            {
                name: ["telNumber"],
                value: count>0?student.telNomer:" "

            },
            {
                name: ["qtelNumber"],
                value: count>0?student.qtelNomer:" "
            }
        ]}
        onFinish={ onFinish } 
        onFinishFailed={ onFinishFailed }>

            <Form.Item 
                name="firstName" 
                label="Ismingizni kiriting" 
                rules={ [ { required: true, message: "Iltimos joyni toldiring" }, {min: 3, max: 20 } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="lastName" 
                label="Familyangizni kiriting" 
                rules={ [ { required: true, message: "Iltimos joyni toldiring" }, {min: 3, max: 20 } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="birthDate" 
                label="Tugilgan sana" 
                rules={ [ { required: true }] }>
                <DatePicker 
                    style={{width: "100%"}}
                    defaultValue={moment()}
                    format={dateFormat}
                    onChange={(date, dateString) => onChange(date, dateString)}
                      />
            </Form.Item>
            <Form.Item 
                name="telNumber" 
                label="telefon ramaingiz" 
                rules={ [ { required: true, message: "Iltimos joyni toldiring" }, {min: 3, max: 20 } ] }>
                <MaskedInput
        mask="+998(00) 000 00 00"
        // onChange={handleInputChange}
        // onFocus={handleFocus}
        // onBlur={handleBlur}
      />
            </Form.Item>
            <Form.Item 
                name="qtelNumber" 
                label="qoshimcha telefon ramaingiz" 
                rules={ [ {min: 3, max: 20 } ] }>
                <MaskedInput
        mask="+998(00) 000 00 00"
        // onChange={handleInputChange}
        // onFocus={handleFocus}
        // onBlur={handleBlur}
      />
            </Form.Item>

            <Form.Item 
                name="subjectId" 
                label= {t("interests_subject")}
                rules={ [ { required: true } ] }>
            <TreeSelect
                showSearch
                style={{ width: '100%' }}
                // value={subjects}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                multiple
                treeDefaultExpandAll
                // onChange={() =>{setSubjects()}}
            >
               <>
               {
                   reducer.isActive && reducer.subjects.map(sub =>{
                       return(
                            <TreeNode key={sub.id} value={sub.id} title ={sub.nameUz}></TreeNode>
                       )
                   })
               }
               </>
            </TreeSelect>
            </Form.Item>

            <Form.Item 
                name="description" 
                label="tarif bering">
                 <Input />
            </Form.Item>
            
           <Form.Item shouldUpdate>
                {() => (
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    disabled={
                      !form.isFieldsTouched(true) ||
                      !!form.getFieldsError().filter(({ errors }) => errors.length).length
                    }
                  >
                   Add Student
                  </Button>
                )}
            </Form.Item>

        </Form>


    )
}

export default ModalStudents
