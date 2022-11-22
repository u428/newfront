import React, {useEffect, useRef, useState} from 'react'
import { Form, Input, Button, Select } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchGetCheckLogin } from '../../../../redux/services/api';
import { putUserAuth } from '../../../../redux/statistic/actions';


const EditController = ( { handleOk, handleCancel } ) => {
    const [ form ] = Form.useForm();
    const dispatch = useDispatch();
    let history = useHistory();
    const {userAuth, isActive} = useSelector(state=>state.statisticReducer);
    console.log(userAuth);
    let emailRef = useRef()
    const [valid, setValid] = useState();
    

    useEffect(() =>{
        if(isActive){
            form.setFieldsValue({
            "login": userAuth.login,
            "role": userAuth.roles.id
            });
        }
    }, [isActive])

    const onFinish = ( values ) => {
        console.log(values);

        const returns ={
            "id": userAuth.id,
            "login":values.login,
            "password": values.password,
            "roleId": values.role
        }

        console.log(returns);
        dispatch(putUserAuth(returns));
        handleOk()
        onReset()
    };

    const onReset = () => {
        form.resetFields();
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

    return (

        <Form 
        form={ form } 
        layout="vertical"
        name="edit-teacher"
        onFinish={ onFinish }>

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
                name="role" 
                label="Role" 
                rules={ [ { required: true }] }>
                <Select>
                    <Select.Option value={2}>ADMIN</Select.Option>
                    <Select.Option value={3}>MONITORING</Select.Option>
                </Select>
            </Form.Item>
            
            <Form.Item >
                <Button block type="primary" htmlType="submit">
                    Edit
                </Button>
            </Form.Item>

        </Form>


    )
}

export default EditController
