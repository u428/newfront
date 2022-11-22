import React, {useEffect} from 'react'
import { Form, Input, Button } from 'antd';
import { useDispatch } from "react-redux";
import { putUserAuthSetting } from '../../../../redux/auth/action';

const ChangePasswords = ( { handleOk3, handleCancel3, changePassId } ) => {
    const [ form ] = Form.useForm();
    const dispatch = useDispatch();
   
    const onFinish = ( values ) => {

        let returns = {
            "password": values.password,
            "authId": changePassId
        }

        console.log(returns);

        dispatch(putUserAuthSetting(returns));
        handleOk3()
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
        name="add-teacher" 
        onFinish={ onFinish }>

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

export default ChangePasswords
