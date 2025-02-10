import React, {useEffect, useRef, useState} from 'react'
import { Form, Input, Button, TreeSelect,  Select } from 'antd';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { fetchGetCheckLogin } from '../../../../redux/services/api';
import { MaskedInput } from 'antd-mask-input';
import { addUserAuth } from '../../../../redux/statistic/actions';

const options = [{id: 0, value: 'Boshqa' }, {id: 1, value: 'Erkak' }, {id: 2, value: 'Ayol' }];
const AddAdmins = ( { handleOk2, handleCancel } ) => {
    const [ form ] = Form.useForm();
    const dispatch = useDispatch();
    let emailRef = useRef()
  
    const [valid, setValid] = useState();


    const onFinish = ( values ) => {

        dispatch(addUserAuth(values));
        handleOk2()
        onReset()
    };

    const onFinishFailed = ( errorInfo ) => {
        onReset()
    };


    const onBlurHandle = ()=>{

        fetchGetCheckLogin(emailRef.current.input.value)
        .then(response => {
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

    return (

        <Form 
        autoComplete='off'
        form={ form } 
        layout="vertical"
        name="add-teacher" 
        onFinish={ onFinish } 
        onFinishFailed={ onFinishFailed }>

            <Form.Item 
                name="firstName" 
                label="Ismingiz" 
                rules={ [ { required: true, message: "Iltimos ismingizni kiriting" }, {min: 3, max: 20 } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="lastName" 
                label="Familiyangiz" 
                rules={ [ { required: true, message: "Iltimos familiyangizni kiriting" }, {min: 3, max: 20 } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="telNomer" 
                label="Telefon nomer" 
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
                name="login" 
                validateStatus = {valid}
                label="Login" 
                rules={ [ { required: true }, {min: 3, max: 20 } ] } hasFeedback>
                <Input onBlur={onBlurHandle} ref={emailRef} />
            </Form.Item>
            <Form.Item 
                name="password" 
                label="Parol"  
                rules={ [ { required: true }, {min: 5, max: 15 } ] }
                hasFeedback
                >
                <Input.Password placeholder="input password" />
            </Form.Item>
            <Form.Item 
                name="repassword" 
                dependencies={['password']} 
                label="Parolni Takrorlang" 
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
                name="roleId" 
                label="Role" 
                rules={ [ { required: true }] }>
                <Select>
                    <Select.Option value={2}>ADMIN</Select.Option>
                    <Select.Option value={3}>MONITORING</Select.Option>
                </Select>
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
                   Add Teacher
                  </Button>
                )}
            </Form.Item>

        </Form>


    )
}

export default AddAdmins
