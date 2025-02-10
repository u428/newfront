import React, {useEffect, useState} from 'react'
import { Form, Input, Button, Space, Upload, TreeSelect, DatePicker, Select } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getSubjects, postSubject, putSubject } from '../../../../redux/subject/actions';
import { useTranslation } from "react-i18next";

const ModalSubject = ( { handleOk, handleCancel, count } ) => {

    const { i18n, t } = useTranslation();
    const [ form ] = Form.useForm();
    const dispatch = useDispatch();
    const { TreeNode } = TreeSelect;
    let history = useHistory();

    const {isActive, subject} = useSelector(state => state.subjectReducer);

    useEffect( () => {
        if(count > 0){
            form.setFieldsValue({
                "nameUz":subject.nameUz,
                "nameRu":subject.nameRu,
                "nameEn":subject.nameEn,
                "description":subject.description
            });
        }
    }, [subject] );

    useEffect( () => {
        onReset()
    }, [count] );

    const onFinish = ( values ) => {
        if(count > 0){
            let returns = {
                "id":subject.id,
                "nameUz":values.nameUz,
                "nameRu":values.nameRu,
                "nameEn":values.nameEn,
                "description":values.description
            }
            dispatch(putSubject(history, returns));
        }else{
            let returns = {
            "nameUz":values.nameUz,
            "nameRu":values.nameRu,
            "nameEn":values.nameEn,
            "description":values.description
            }
            dispatch(postSubject(history, returns));
        }
        handleOk()
        onReset()
    };

    const onFinishFailed = ( errorInfo ) => {
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
        name={t("add_subject")} 
        onFinish={ onFinish } 
        onFinishFailed={ onFinishFailed }>

            <Form.Item 
                label={t("name_uz")} 
                name="nameUz"
                rules={ [ { required: true, message: "Iltimos joyni toldiring" }, {min: 3, max: 20 } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="nameRu" 
                label={t("name_ru")} 
                rules={ [ { required: true, message: "Iltimos joyni toldiring" }, {min: 3, max: 20 } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="nameEn" 
                label={t("name_en")} 
                rules={ [ { required: true, message: "Iltimos joyni toldiring" }, {min: 3, max: 20 } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="description" 
                label={t("descryption")} 
                >
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
                   {count>0?t("change"):t("add")}
                  </Button>
                )}
            </Form.Item>

        </Form>


    )
}

export default ModalSubject
