import React, {useEffect, useState} from 'react'
import { Form, Input, Button, Space, Upload, TreeSelect, DatePicker, Select } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getSubjects, postSubject } from '../../../../redux/subject/actions';
import moment from 'moment';
import ImgCrop from 'antd-img-crop';

const ModalSubject = ( { handleOk, handleCancel } ) => {

    const [ form ] = Form.useForm();
    const dispatch = useDispatch();
    const { TreeNode } = TreeSelect;
    let history = useHistory();


    const {isActiva, subjec} = useSelector(state=>state.subjectReducer);

    // useEffect( () => {
    // }, [] );
    
 

    const onFinish = ( values ) => {
        console.log(values);
        dispatch(postSubject(history, values));
        handleOk()
        onReset()
    };

    const onFinishFailed = ( errorInfo ) => {
        console.log( 'Failed:', errorInfo );
        onReset()
    };


    const onReset = () => {
        form.resetFields();
    };

    return (

        <Form 
        autoComplete='off'
        form={ form } 
        layout="vertical"
        name="subject" 
        onFinish={ onFinish } 
        onFinishFailed={ onFinishFailed }>

            <Form.Item 
                name="nameUz" 
                label="O'zbekcha nomi" 
                rules={ [ { required: true, message: "Iltimos joyni toldiring" }, {min: 3, max: 20 } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="nameRu" 
                label="Ruscha nomi" 
                rules={ [ { required: true, message: "Iltimos joyni toldiring" }, {min: 3, max: 20 } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="nameEn" 
                label="Inglizcha nomi" 
                rules={ [ { required: true, message: "Iltimos joyni toldiring" }, {min: 3, max: 20 } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="description" 
                label="tarif bering">
                 <Input />
            </Form.Item>
            
            <Form.Item>
                  <Button>
                    Submit
                  </Button>
            </Form.Item>

        </Form>


    )
}

export default ModalSubject
