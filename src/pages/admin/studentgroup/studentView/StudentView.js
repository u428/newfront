import React, { useState, useEffect } from "react";
import {
    HistoryOutlined,
    UsergroupAddOutlined,
    DollarCircleOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import Fade from "react-reveal/Fade";
import { Table, Tag, Card, PageHeader, Modal, Row, Col, Button, Space } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import StudentViewGroupModal from "./model/StudentViewGroupModal";
import {
    deleteStudentFromGroup,
    getStudentsGroup
} from "../../../../redux/student/actions";
import StudentPaymentGroupModal from "./model/StudentPaymentGroupModal";

const StudentView = () => {
    const dispatch = useDispatch();
    const { loading, studentGroup, student } = useSelector(state => state.studentReducer);
    const [isTableReady, setIsTableReady] = useState(false);
    useEffect(() => {
        setTimeout(() => setIsTableReady(true), 300);
    }, []);

    const [modalState, setModalState] = useState({
        loginVisible: false,
        paymentVisible: false,
        selectedGroup: null
    });

    const handleModalToggle = (type, group = null) => {
        setModalState(prevState => ({
            ...prevState,
            [type]: !prevState[type],
            selectedGroup: group || prevState.selectedGroup // Ensure group is set correctly
        }));
    };

    const confirmDeleteStudent = (group) => {
        Modal.confirm({
            title: `Are you sure you want to remove ${student.firstName} ${student.lastName} from ${group.name}?`,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: () => dispatch(deleteStudentFromGroup(student.id, group.id))
        });
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status ? "green" : "volcano"}>
                    {status ? "ACTIVE" : "DISACTIVE"}
                </Tag>
            )
        },
        { title: 'Attendance', dataIndex: 'attendance', key: 'attendance' },
        { title: 'Deposit', dataIndex: 'deposite', key: 'deposite' },
        {
            title: 'Actions',
            key: 'actions',
            render: (group) => (
                <Space size="middle">
                    <Button shape="circle" style={{ color: "#399EFF" }} icon={<HistoryOutlined />} />
                    <Button
                        shape="circle"
                        onClick={() => handleModalToggle('loginVisible', group)}
                        style={{ color: "#399EFF" }}
                        icon={<UsergroupAddOutlined />}
                    />
                    <Button
                        shape="circle"
                        onClick={() => handleModalToggle('paymentVisible', group)}
                        style={{ color: "#399EFF" }}
                        icon={<DollarCircleOutlined />}
                    />
                    <Button
                        onClick={() => confirmDeleteStudent(group)}
                        shape="circle"
                        danger
                        icon={<DeleteOutlined />}
                    />
                </Space>
            )
        }
    ];

    return (
        <Fade>
            <Modal
                title="Create Teacher"
                open={modalState.loginVisible}
                onCancel={() => handleModalToggle('loginVisible')}
                footer={null}
                destroyOnClose
            >
                {modalState.loginVisible && (
                    <StudentViewGroupModal
                        handleOk={() => handleModalToggle('loginVisible')}
                        handleCancel={() => handleModalToggle('loginVisible')}
                    />
                )}
            </Modal>

            <Modal
                title="Payment Methods"
                open={modalState.paymentVisible}
                onCancel={() => handleModalToggle('paymentVisible')}
                footer={null}
                destroyOnClose
            >
                {modalState.paymentVisible && modalState.selectedGroup && (
                    <StudentPaymentGroupModal
                        handleOk={() => handleModalToggle('paymentVisible')}
                        handleCancel={() => handleModalToggle('paymentVisible')}
                        group={modalState.selectedGroup}
                    />
                )}
            </Modal>


            <Row justify="space-between" align="middle">
                <Col>
                    <PageHeader
                        className="site-page-header"
                        title={`${student?.firstName || ""} ${student?.lastName || ""}`}
                        subTitle={student?.telNomer || ""}
                    />
                </Col>
            </Row>

            <Card>
                {isTableReady && (
                    <Table
                        key={modalState.paymentVisible ? "visible" : "hidden"}
                        columns={columns}
                        dataSource={studentGroup?.map(group => ({ ...group, key: group.id })) || []}
                        pagination={false}
                        loading={loading}
                        scroll={{ x: "max-content"}}
                    />
                )}


            </Card>
        </Fade>
    );
};

export default StudentView;