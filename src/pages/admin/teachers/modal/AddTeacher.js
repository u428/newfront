import React, {useEffect, useRef, useState} from 'react'
import { Form, Input, Button, Space, Upload, TreeSelect, DatePicker, Select, InputNumber } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { postTeacher } from "../../../../redux/teacher/actions";
import {getLanguages} from "../../../../redux/lang/actions";
import { getSubjects } from '../../../../redux/subject/actions';
import moment from 'moment';
import ImgCrop from 'antd-img-crop';
import { EyeInvisibleOutlined, EyeTwoTone, UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { fetchGetCheckLogin } from '../../../../redux/services/api';
import { MaskedInput } from 'antd-mask-input';
import { useTranslation } from "react-i18next";

const options = [{id: 0, value: 'Boshqa' }, {id: 1, value: 'Erkak' }, {id: 2, value: 'Ayol' }];
const AddTeacher = ( { handleOk, handleCancel } ) => {
    const [ form ] = Form.useForm();
    const dispatch = useDispatch();
    const { TreeNode } = TreeSelect;
    let history = useHistory();
    const { i18n, t } = useTranslation();
    let emailRef = useRef()

    const dateFormat = 'DD.MM.YYYY';

    const [dating, setDating] = useState(null);
    const [valid, setValid] = useState();

    const reduce = useSelector(state=>state.languageReducer);
    const reducer = useSelector(state=>state.subjectReducer);

    useEffect( () => {
        console.log("this is a dispatch effect");
        dispatch( getLanguages());
        dispatch( getSubjects());
    }, [dispatch] );
    
 

    

    const onFinish = ( values ) => {
        console.log(values);
        console.log(values.birthDate.dateString);

        let returns = {
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
            "gender":values.gender,
            "dateBirth": dating,
            "password":values.password,
            "fileId":values.images.file.response,
            "subjectIds":values.subjectId,
            "langIds":values.languageId
        }

        console.log(returns);

        dispatch(postTeacher(history, returns));
        handleOk()
        onReset()
    };

    const onFinishFailed = ( errorInfo ) => {
        console.log( 'Failed:', errorInfo );
        onReset()
    };


    const onBlurHandle = ()=>{
        

        console.log(emailRef.current);

        fetchGetCheckLogin(emailRef.current.input.value)
        .then(response => {
            console.log(response.response);
            if(!response.response.data){
                setValid("success");
            }else{
                setValid("error");
            }
        });
    }


    const onReset = () => {
        form.resetFields();
    };

    function onChange(date, dateString) {
        setDating(dateString);
      }

      const onPreview = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
      };

//   const handleInputChange = e => {
//     if (!e.target.value) {
//         emailRef.current.setInputValue("+998(__) ___ __ __");
//     }
//   };

//   const handleFocus = e => {
//     if (!e.target.value) {
//         emailRef.current.setInputValue("+998(__) ___ __ __");
//       const q = e.target;
//       setTimeout(() => q.setSelectionRange(5, 5), 0);
//     }
//   };

//   const handleBlur = e => {
//       console.log(e.target.value.length);
//     if (!e.target.value.length < 11) {
//         emailRef.current.setInputValue("");
//     }
//   };

    return (

        <Form 
        autoComplete='off'
        form={ form } 
        layout="vertical"
        name={t("add_teacher")} 
        onFinish={ onFinish } 
        onFinishFailed={ onFinishFailed }>

            <Form.Item 
                name="firstName" 
                label= {t("first_name")} 
                rules={ [ { required: true, message: "Iltimos ismingizni kiriting" }, {min: 3, max: 20 } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="lastName" 
                label= {t("last_name")}
                rules={ [ { required: true, message: "Iltimos familiyangizni kiriting" }, {min: 3, max: 20 } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="middleName" 
                label= {t("middle_name")}
                rules={ [ { required: true }, {min: 3, max: 20 } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="birthDate" 
                label= {t("birth_date")}
                rules={ [ { required: true }] }>
                <DatePicker 
                    style={{width: "100%"}}
                    defaultValue={moment()}
                    format={dateFormat}
                    onChange={(date, dateString) => onChange(date, dateString)}
                      />
            </Form.Item>
            <Form.Item 
                name="gender" 
                label= {t("gender")}
                rules={ [ { required: true }] }>
                <Select defaultValue="0">
                    <Select.Option value="1">{t("gender_man")}</Select.Option>
                    <Select.Option value="2">{t("gender_woman")}</Select.Option>
                    <Select.Option value="0">{t("gender_other")}</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item 
                name="gmail" 
                label= {t("g_mail")}
                rules={ [ { required: false, type: 'email'  }, {min: 3, max: 40 } ] } hasFeedback>
                <Input />
            </Form.Item>
            <Form.Item 
                name="telNomer" 
                label= {t("tel_number")}
                rules={ [ { 
                    required: true}
                    ] }>
                <MaskedInput
        // isRevealingMask
        // emptyValue="+38(0__)"
        // ref={emailRef}
        mask="+998(00) 000 00 00"
        // onChange={handleInputChange}
        // onFocus={handleFocus}
        // onBlur={handleBlur}
      />
            </Form.Item>
            <Form.Item 
                name="tgLink" 
                label= {t("telegram_link")}
                rules={ [ { required: false }, {min: 3, max: 50 } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="fLink" 
                label= {t("facebook_link")}
                rules={ [ { required: false }, {min: 3, max: 50 } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="inLink" 
                label= {t("instagram_link")}
                rules={ [ { required: false }, {min: 3, max: 50 } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="login" 
                validateStatus = {valid}
                label= {t("login")}
                rules={ [ { required: true }, {min: 3, max: 20 } ] } hasFeedback>
                <Input onBlur={onBlurHandle} ref={emailRef} />
            </Form.Item>
            <Form.Item 
                name="password" 
                label= {t("password")}
                rules={ [ { required: true }, {min: 8, max: 15 } ] }
                hasFeedback
                >
                <Input.Password placeholder="input password" />
            </Form.Item>
            <Form.Item 
                name="repassword" 
                dependencies={['password']} 
                label= {t("re_password")}
                rules={ [ {
                     required: true 
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    }
                }), ] }
                hasFeedback
                >
                <Input.Password placeholder="input password" />
            </Form.Item>

            <Form.Item 
                name="languageId" 
                label= {t("language")}
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
                label= {t("subject")}
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
                name="images" 
                label= {t("choice_image")}
                rules={ [ { required: true }] }>
                <Upload.Dragger 
                maxCount={1}
                name="file"
                listType="picture"
                accept='.png, .jpg, .img'
                method='post'
                action="http://localhost:8080/api/v1/a23d_m23_i23n/add_image"
                onPreview={onPreview}
                >
                    <Button>{t("add_image")}</Button>
                </Upload.Dragger>
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
                  {t("add")}
                  </Button>
                )}
            </Form.Item>

        </Form>


    )
}

export default AddTeacher
