import React, {useEffect, useState} from 'react'
import { Button, Form, Input } from 'antd';
import { useSelector } from "react-redux";

const StudentPaymentGroupModal = ( { handleOk, handleCancel, group} ) => {

    const { studentGroup, student} = useSelector(state=>state.studentReducer);
    console.log(student);
    console.log(studentGroup);
    const [ form ] = Form.useForm();
    console.log(group);
    const [numbers, setNumbers] = useState(0);

    // useEffect( () => {
    //     onReset()
    // }, [] );

    const onFinish = ( values ) => {
        
        handleOk()
        onReset()
    };

    const onFinishFailed = ( errorInfo ) => {
        console.log( 'Failed:', errorInfo );
        onReset()
    };

    const onReset = () => {
        setNumbers(0)
        form.resetFields();
    };

    const handleChange = (e) => {
        console.log(e.target.value);
        let num = e.target.value;
        setNumbers(num/group.price);
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
                name="Price"
                label="price" 
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
