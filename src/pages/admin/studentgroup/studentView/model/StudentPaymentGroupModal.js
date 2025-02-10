import React, {useEffect, useState} from 'react'
import {Button, Checkbox, DatePicker, Form, Input, Tabs, Typography} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {studentPayment} from '../../../../../redux/student/actions';
import {useHistory} from 'react-router-dom';
import Paragraph from "antd/es/skeleton/Paragraph";
import controllers from "../../../../superAdmin/controller/Controllers";

const StudentPaymentGroupModal = ({handleOk, handleCancel, group}) => {

    const {studentGroup, student, isActive} = useSelector(state => state.studentReducer);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    let history = useHistory();
    const {TabPane} = Tabs;
    const {Text} = Typography;

    const [numbers, setNumbers] = useState(0);
    const [ret, setRet] = useState(0);
    const [moneyBack, setMoneyBack] = useState(0);
    const [moneyCenter, setMoneyCenter] = useState(0);
    const [checkTeacher, setCheckTeacher] = useState(false);



    useEffect(() => {
        onReset()
        setRet((group.price * group.deposite) / 12);
        form.resetFields();
    }, []);

    const onFinishStudent = (values) => {

        const payments = {
            summa: values['studentPayment'],
            studentId: student.id,
            groupId: group.id,
            pane:1,
            payTeacher:checkTeacher

        }
        dispatch(studentPayment(history, payments))
        handleOk()
        onReset()
    };

    const onFinishReturn = (values) => {

        const payments = {
            summa: moneyBack,
            studentId: student.id,
            groupId: group.id,
            pane:2,
            payTeacher:checkTeacher
        }
        dispatch(studentPayment(history, payments))
        handleOk()
        onReset()
    };

    const onFinishCenter = (values) => {

        const payments = {
            summa: moneyCenter,
            studentId: student.id,
            groupId: group.id,
            pane:3,
            payTeacher:checkTeacher
        }
        dispatch(studentPayment(history, payments))
        handleOk()
        onReset()
    };

    const onFinishFailed = (errorInfo) => {
        onReset()
    };

    const onReset = () => {
        setNumbers(0)
        setMoneyCenter(0);
        setMoneyBack(0);
        setCheckTeacher(false);
        form.resetFields();
    };

    const moneyBackToStudent = (e) => {
        let num = e.target.value;
        if (num <= ret) {
            setMoneyBack(num);
        }
    };

    const handleChange = (e) => {
        let num = e.target.value;
        setNumbers((num * 12) / group.price);
    };

    const handleChangeCenter = (e) => {
        let num = e.target.value;
        setMoneyCenter(num);
    };

    return (
        <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="O'quvchi" key="1">
                <Form
                    form={form}
                    name="basic"
                    labelCol={{span: 10}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    onFinish={onFinishStudent}
                    onFinishFailed={() => {onReset()}}
                    autoComplete="off"
                >
                    <Form.Item
                        label="O'quvchi to'laydigan pul"
                        name="studentPayment"
                        rules={[{required: true, message: 'Please enter student name'}]}
                    >
                        <Input
                            id="basic_studentPayment"
                            type="number"
                            onChange={handleChange}/>
                    </Form.Item>


                    {/*<Text id="basic_returnDars">DARS: {numbers} </Text>*/}
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '16px'}}>
                        <span style={{flex: '0 0 200px'}}>Guruh to'lov miqdori {group.price} :</span>
                        <span>DARS: {numbers} </span>
                    </div>

                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit" form="basic">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </TabPane>

            <TabPane tab="Qaytim" key="2">

                <Form
                    form={form}
                    name="return"
                    labelCol={{span: 10}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    onFinish={onFinishReturn}
                    onFinishFailed={() => {onReset()}}
                    autoComplete="off"
                >

                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '16px'}}>
                        <span style={{flex: '0 0 200px'}}>O'quvchiga qaytariladigan pul:</span>
                        <span>{ret} - dan ko'p qaytim bera olmaysiz!</span>
                    </div>


                    <Form.Item
                        label="Summa"
                        name="returns"
                        rules={[{required: true, message: 'Please enter price'}]}
                    >
                        <Input
                            id="return_returns"
                            max={ret}
                            type="number"
                            onChange={moneyBackToStudent}
                            placeholder="Enter price in UZS"
                            value={moneyBack}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit" form="return">
                            Save
                        </Button>
                    </Form.Item>

                </Form>
            </TabPane>

            <TabPane tab="O'quv Markaz" key="3">
                <Form
                    form={form}
                    name="center"
                    labelCol={{span: 10}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    onFinish={onFinishCenter}
                    onFinishFailed={() => {onReset()}}
                    autoComplete="off"
                >
                    <Form.Item
                        label="O'quv Markaz to'laydi"
                        name="centerPrice"
                        rules={[{required: true, message: 'Please enter price'}]}
                    >
                        <Input
                            id="center_centerPrice"
                            type="number"
                            onChange={handleChangeCenter}
                            placeholder="Enter price in UZS"
                            value={moneyCenter}
                        />
                    </Form.Item>

                    <Form.Item
                        label="O'qtuvchiga oylik to'lansinmi?"
                        name="payTeacher"
                    >
                        <Checkbox id="center_payTeacher" onChange={() => setCheckTeacher(!checkTeacher)} checked={checkTeacher} />
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit" form="center">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </TabPane>
        </Tabs>
    );

}

export default StudentPaymentGroupModal;
