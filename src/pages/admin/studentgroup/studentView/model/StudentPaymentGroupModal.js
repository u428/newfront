import React, {useEffect, useState} from 'react'
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { studentPayment } from '../../../../../redux/student/actions';
import { useHistory } from 'react-router-dom';

const StudentPaymentGroupModal = ( { handleOk, handleCancel, group} ) => {

    const { studentGroup, student, isActive} = useSelector(state=>state.studentReducer);
    const [ form ] = Form.useForm();
    const dispatch = useDispatch();
    let history = useHistory();
    const [numbers, setNumbers] = useState(0);

    useEffect( () => {
        onReset()
        form.resetFields();
    }, [] );

    const onFinish = ( values ) => {

        const payments = {
            summa: values['price'],
            studentId: student.id,
            groupId: group.id
        }
        console.log(payments);
        dispatch(studentPayment(history, payments))
        handleOk()
        onReset()
    };

    const onFinishFailed = ( errorInfo ) => {
        onReset()
    };

    const onReset = () => {
        setNumbers(0)
        form.resetFields();
    };

    const handleChange = (e) => {
        let num = e.target.value;
        setNumbers((num*12)/group.price);
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
                name="price"
                label="Price" 
                rules={ [ { required: true }, {min: 1, max: 40 } ] } hasFeedback>
                <Input type="number" controls={false} onChange = {handleChange} />
            </Form.Item>
            
            <Form.Item 
                name="Numbers"
                >
                <p>{numbers}  --  Darsga pul tolanyabdi</p>
            </Form.Item>
            
            
           <Form.Item shouldUpdate>
                {() => (
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    disabled={
                      !!form.getFieldsError().filter(({ errors }) => errors.length).length
                    }
                  >
                   Save
                  </Button>
                )}
            </Form.Item>

        </Form>
                


    )
}

export default StudentPaymentGroupModal;
