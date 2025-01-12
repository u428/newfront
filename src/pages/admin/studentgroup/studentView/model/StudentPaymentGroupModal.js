import React, {useEffect, useState} from 'react'
import {Button, DatePicker, Form, Input, Tabs} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { studentPayment } from '../../../../../redux/student/actions';
import { useHistory } from 'react-router-dom';

const StudentPaymentGroupModal = ( { handleOk, handleCancel, group} ) => {

    const { studentGroup, student, isActive} = useSelector(state=>state.studentReducer);
    const [ form ] = Form.useForm();
    const dispatch = useDispatch();
    let history = useHistory();
    const [numbers, setNumbers] = useState(0);

    const { TabPane } = Tabs;

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
        <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="Student Information" key="1">
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Student Name"
                        name="studentName"
                        rules={[{ required: true, message: 'Please enter student name' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Return Date" name="returnDate">
                        <DatePicker />
                    </Form.Item>

                    {/* Add more student-related fields here */}
                </Form>
            </TabPane>

            <TabPane tab="Payment Details" key="2">
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please enter price' }]}
                >
                    <Input type="number" placeholder="Enter price in UZS" />
                </Form.Item>

                {/* Add more payment-related fields here */}

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </TabPane>
        </Tabs>
    );
    

    // return (
    //
    //     <Tabs>
    //         <TabPane tab="O'quvchi" key="1">
    //             <Form
    //                 autoComplete='off'
    //                 form={ form }
    //                 layout="vertical"
    //                 name="payment"
    //                 onFinish={ onFinish }
    //                 onFinishFailed={ onFinishFailed }>
    //
    //
    //                 <Form.Item
    //                     name="price"
    //                     label="Price"
    //                     rules={ [ { required: true }, {min: 1, max: 40 } ] } hasFeedback>
    //                     <Input type="number" controls={false} onChange = {handleChange} />
    //                 </Form.Item>
    //
    //                 <Form.Item
    //                     name="Numbers"
    //                 >
    //                     <p>{numbers}  --  Darsga pul tolanyabdi</p>
    //                 </Form.Item>
    //
    //
    //                 <Form.Item shouldUpdate>
    //                     {() => (
    //                         <Button
    //                             block
    //                             type="primary"
    //                             htmlType="submit"
    //                             disabled={
    //                                 !!form.getFieldsError().filter(({ errors }) => errors.length).length
    //                             }
    //                         >
    //                             Save
    //                         </Button>
    //                     )}
    //                 </Form.Item>
    //
    //             </Form>
    //         </TabPane>
    //         <TabPane tab="Qaytim" key="2">
    //             <Form
    //                 autoComplete='off'
    //                 form={ form }
    //                 layout="vertical"
    //                 name="payment"
    //                 onFinish={ onFinish }
    //                 onFinishFailed={ onFinishFailed }>
    //
    //
    //                 <Form.Item
    //                     name="price"
    //                     label="Price"
    //                     rules={ [ { required: true }, {min: 1, max: 40 } ] } hasFeedback>
    //                     <Input type="number" controls={false} onChange = {handleChange} />
    //                 </Form.Item>
    //
    //                 <Form.Item
    //                     name="Numbers"
    //                 >
    //                     <p>O'quvchiga qaytib beriladigan pul</p>
    //                 </Form.Item>
    //
    //
    //                 <Form.Item shouldUpdate>
    //                     {() => (
    //                         <Button
    //                             block
    //                             type="primary"
    //                             htmlType="submit"
    //                             disabled={
    //                                 !!form.getFieldsError().filter(({ errors }) => errors.length).length
    //                             }
    //                         >
    //                             Save
    //                         </Button>
    //                     )}
    //                 </Form.Item>
    //
    //             </Form>
    //         </TabPane>
    //         <TabPane tab="O'quvchiga" key="3">
    //             <Form
    //                 autoComplete='off'
    //                 form={ form }
    //                 layout="vertical"
    //                 name="payment"
    //                 onFinish={ onFinish }
    //                 onFinishFailed={ onFinishFailed }>
    //
    //
    //                 <Form.Item
    //                     name="price"
    //                     label="Price"
    //                     rules={ [ { required: true }, {min: 1, max: 40 } ] } hasFeedback>
    //                     <Input type="number" controls={false} onChange = {handleChange} />
    //                 </Form.Item>
    //
    //                 <Form.Item
    //                     name="Numbers"
    //                 >
    //                     <p>O'quvchi uchun O'quv markaz to'laydigan pul</p>
    //                 </Form.Item>
    //
    //
    //                 <Form.Item shouldUpdate>
    //                     {() => (
    //                         <Button
    //                             block
    //                             type="primary"
    //                             htmlType="submit"
    //                             disabled={
    //                                 !!form.getFieldsError().filter(({ errors }) => errors.length).length
    //                             }
    //                         >
    //                             Save
    //                         </Button>
    //                     )}
    //                 </Form.Item>
    //
    //             </Form>
    //         </TabPane>
    //     </Tabs>
    //
    //
    //
    // )
}

export default StudentPaymentGroupModal;
