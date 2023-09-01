import React, {useEffect, useRef, useState} from 'react'
import { Form, Input, Button, Space, Upload, TreeSelect, DatePicker, Select, Option  } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { postTeacher, getSingleTeacher, putTeacher } from "../../../../redux/teacher/actions";
import {getLanguages} from "../../../../redux/lang/actions";
import { getSubjects } from '../../../../redux/subject/actions';
import moment from 'moment';
import { EyeInvisibleOutlined, EyeTwoTone, UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { MaskedInput } from 'antd-mask-input';
import { useTranslation } from "react-i18next";

const options = [{ id: 3, value: 'Boshqa' }, {id: 1, value: 'Erkak' }, {id: 2, value: 'Ayol' }];
const EditTeacher = ( { handleOk2, handleEDitModalCancel } ) => {
    const [ form ] = Form.useForm();
    const dispatch = useDispatch();
    const { TreeNode } = TreeSelect;
    let history = useHistory();
    const { i18n, t } = useTranslation();

    const [initValue, setInitValue] = useState({});

    const reduce = useSelector(state=>state.languageReducer);
    const reducer = useSelector(state=>state.subjectReducer);
    const {teacher, isActive} = useSelector(state=>state.teacherReducer);
    const dateFormat = 'DD.MM.YYYY';
    const [dating, setDating] = useState("");

    useEffect( () => {
        dispatch( getLanguages());
        dispatch( getSubjects());
    }, [] );

    function changeDate(dating){
        return 
    }

    useEffect(() =>{
        console.log(teacher.telNomer);
        if(isActive){
            form.setFieldsValue({
            "firstName": teacher.firstName,
            "lastName": teacher.lastName,
            "middleName":teacher.middleName,
            "telNomer": teacher.telNomer,
            "tgLink":teacher.tgLink,
            "inLink":teacher.inLink,
            "fLink":teacher.flink,
            "gmail":teacher.gmail,
            "description":teacher.description,
            "birthDate":moment(teacher.dateBirth, dateFormat),
            "password":teacher.password,
            "subjectId":teacher.subjects.map((item)=> item.id),
            "languageId":teacher.languages.map((item) => item.id),
            "images": teacher.imagesId,
            "gender": teacher.gender
            });
        }
       
    }, [isActive])

    const onFinish = ( values ) => {
        let imageId;
        console.log(values);
        console.log(values.images.file);
        if(values.images.file){
            imageId = values.images.file.response;
        }else{
            imageId = values.images;
        }
        console.log(imageId);

        let returns = {
            "id":teacher.id,
            "firstName": values.firstName,
            "lastName": values.lastName,
            "middleName":values.middleName,
            "telNomer":values.telNomer,
            "tgLink":values.tgLink,
            "inLink":values.inLink,
            "fLink":values.fLink,
            "gmail":values.gmail,
            "description":values.description,
            "login":values.login,
            "password":values.password,
            "subjectIds":values.subjectId,
            "langIds":values.languageId,
            "fileId":imageId,
            "dateBirth": dating,
            "gender": values.gender
        }

        console.log(returns);

        dispatch(putTeacher(history, returns));
        handleOk2()
        onReset()
    };

    const onFinishFailed = ( errorInfo ) => {
        console.log( 'Failed:', errorInfo );
    };


    const onReset = () => {
        form.resetFields();
    };

    function onChange(date, dateString) {
        setDating(dateString);
    }

    return (

        <Form 
        form={ form } 
        layout="vertical"
        name={t("edit_teacher")} 
        fields={[
            {
                name: ["telNomer"],
                value: isActive?teacher.telNomer:" "
            }
        ]}
        onFinish={ onFinish } 
        onFinishFailed={ onFinishFailed }>

            <Form.Item 
                name="firstName" 
                label={t("first_name")} 
                rules={ [ { required: true, message: "Iltimos ismingizni kiriting" } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="lastName" 
                label={t("last_name")} 
                rules={ [ { required: true, message: "Iltimos familiyangizni kiriting" } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="middleName" 
                label={t("middle_name")} 
                rules={ [ { required: true } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="birthDate" 
                label={t("birth_date")} 
                >
                <DatePicker 
                    style={{width: "100%"}}
                    format={dateFormat}
                    onChange={(date, dateString) => onChange(date, dateString)}
                      />
            </Form.Item>
            <Form.Item 
                name="gender" 
                label={t("gender")} 
                rules={ [ { required: true }] }>
                <Select>
                    <>
                    {
                        options.map(item =>{
                            
                            return(
                                <Select.Option value={item.id}> {item.value}</Select.Option>
                            )
                            
                        })
                    }
                    </>
                </Select>
            </Form.Item>
            <Form.Item 
                name="gmail" 
                label={t("g_mail")} 
                rules={ [ { required: false } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="telNomer"
                label={t("tel_number")} 
                rules={ [ { required: true, message: "Iltimos joyni toldiring" }, {min: 3, max: 20 } ] }>
                <MaskedInput
        mask="+998(00) 000 00 00"
        // onChange={handleInputChange}
        // onFocus={handleFocus}
        // onBlur={handleBlur}
      />
            </Form.Item>
            <Form.Item 
                name="tgLink" 
                label={t("telegram_link")} 
                rules={ [ { required: false } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="fLink" 
                label={t("facebook_link")} 
                rules={ [ { required: false } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="inLink" 
                label={t("instagram_link")} 
                rules={ [ { required: false } ] }>
                <Input />
            </Form.Item>

            <Form.Item 
                name="languageId" 
                label={t("language")} 
                rules={ [ { required: true } ] }>
            <TreeSelect
                showSearch
                style={{ width: '100%' }}
                // value={languages}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                multiple
                treeDefaultExpandAll
                // onChange={()=>{setLanguages()}}
            >
               <>
               {
                   reduce.isActive && reduce.language.map(lang =>{
                       return(
                            <TreeNode key={lang.id} value={lang.id} title ={lang.name}></TreeNode>
                       )
                   })
               }
               </>
            </TreeSelect>
            </Form.Item>

            <Form.Item 
                name="subjectId" 
                label={t("subject")} 
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
                   reducer.subjects.map(lang =>{
                       return(
                            <TreeNode key={lang.id} value={lang.id} title ={lang.nameUz}></TreeNode>
                       )
                   })
               }
               </>
            </TreeSelect>
            </Form.Item>
            <Form.Item 
                name="images" 
                label={t("choice_image")} 
                >
                <Upload.Dragger 
                maxCount={1}
                name="file"
                listType="picture"
                accept='.png, .jpg, .img'
                method='post'
                action="https://qorakol-ilm-ziyo.uz/api/v1/a23d_m23_i23n/add_image"
                >
                     <Button>{t("add_image")}</Button>
                </Upload.Dragger>
            </Form.Item>
            
            <Form.Item >
                <Button block type="primary" htmlType="submit">
                    {t("change")}
                </Button>
            </Form.Item>

        </Form>


    )
}

export default EditTeacher
