import React, {useEffect, useState} from 'react'
import { Form, Input, Button, UploadFile, Upload, TreeSelect, DatePicker, Select } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchGetTeachersListSearch, fetchGetSingleTeacher } from '../../../../redux/services/api';
import moment from 'moment';
import { postGroup, putGroup } from '../../../../redux/group/actions';
import { useTranslation } from "react-i18next";


const ModalGroup = ( { handleOk, handleCancel, count } ) => {
    const { i18n, t } = useTranslation();
    const [ form ] = Form.useForm();
    const dispatch = useDispatch();
    const { TreeNode } = TreeSelect;
    const { Option } = Select;
    let history = useHistory();
    const { RangePicker } = DatePicker;
    const dateFormat = 'HH:mm';

    const [dating, setDating] = useState([]);
    const [listTeacher, setListTeacher]= useState([])
    const [optionList, setOptionList] =useState([])
    const [languages, setLanguages] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [defaultData, setDefaultData]=useState([]);
    const [fileLists, setFileLists] = useState({});

    const imageURL = 'http://localhost:8080/api/v1/static/images?id=';

    const {isActive, group} = useSelector(state=>state.groupReducer);   

    useEffect( () => {
        if(count > 0 && Object.keys(group).length !== 0){
            fetchGetSingleTeacher(group.teacherId).then(response =>{
                const {teacher} = response.response.data;
                setListTeacher(teacher);
                setOptionList(<Option key={teacher.id}>{teacher.firstName} {teacher.lastName} -{teacher.telNomer.substring(teacher.telNomer.length-5)}</Option>);
                
                form.setFieldsValue({
                    "name": group.name,
                    "price": group.price,
                    "description":group.description,
                    "date":[moment(group.begin, 'HH:mm:ss'), moment(group.finish, 'HH:mm:ss')],
                    'teacher': teacher.firstName+" " +teacher.lastName+" "+teacher.telNomer.substring(teacher.telNomer.length-5),
                    "languageId": group.languageId,
                    "subjectId": group.subjectId
                });
                setLanguages(teacher.languages.map(lang=> <TreeNode key={lang.id} value={lang.id} title ={lang.name}></TreeNode>));
                setSubjects(teacher.subjects.map(sub=><TreeNode key={sub.id} value={sub.id} title ={sub.nameUz}></TreeNode>));
            })

            setFileLists({
                uid: group.imagesId,
                name: 'name.jpg' +count,
                status: 'done',
                url: imageURL + group.imagesId,
                thumbUrl: imageURL+ group.imagesId
            })
        }
    }, [group] );

    useEffect( () => {
        onReset()
        setFileLists({});
    }, [count] );
    
 

    const onFinish = ( values ) => {

        if(count>0){
            let returns = {
                "name": values.name,
                "price":values.price+"",
                "teacherId":values.teacher,
                "subjectId":values.subjectId,
                "languageId":values.languageId,
                "description":values.description,
                "begin":dating[0],
                "finish":dating[1],
                "filesId":values.images.file.response
            }

            // dispatch(putGroup(returns));
        }else{

        let returns = {
            "name": values.name,
            "price":Number(values.price),
            "teacherId":values.teacher,
            "subjectId":values.subjectId,
            "languageId":values.languageId,
            "description":values.description,
            "begin":dating[0],
            "finish":dating[1],
            "filesId":values.images.file.response
        }
        dispatch(postGroup(history, returns));
    }
        setFileLists({});
        handleOk()
        onReset()
    };

    const onFinishFailed = ( errorInfo ) => {
        onReset()
    };
    const handleSearch = (value)=>{

        if(value.length > 2){

        const returns = fetchGetTeachersListSearch(value);

        returns.then(response =>{
            setListTeacher(response.data);
            setOptionList(response.data.map(d => <Option key={d.id}>{d.firstName} {d.lastName} -{d.telNomer.substring(d.telNomer.length-5)}</Option>));
        })
    }
    }

    const handleChange = (value)=>{
        const data = listTeacher.filter((red)=>red.id == value);
        setLanguages(data[0].languages.map(lang=> <TreeNode key={lang.id} value={lang.id} title ={lang.name}></TreeNode>));
        setSubjects(data[0].subjects.map(sub=><TreeNode key={sub.id} value={sub.id} title ={sub.nameUz}></TreeNode>));
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

    return (
        <Form 
        autoComplete='off'
        form={ form } 
        layout="vertical"
        onFinish={ onFinish } 
        onFinishFailed={ onFinishFailed }>

            <Form.Item 
                name="name" 
                label= {t("group_name")} 
                rules={ [ { required: true, message: "Iltimos" }, {min: 3, max: 20 } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="price"
                label= {t("price")} 
                rules={ [ { required: true, message: "Iltimos" }, {min: 3, max: 20 } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="description"
                label= {t("description")} 
                >
                <Input />
            </Form.Item>
            <Form.Item 
                name="date" 
                label= {t("start_finish_date")} 
                rules={ [ { required: true }] }>
                <RangePicker
                    style={{width: "100%"}}
                    picker="time"
                    format={dateFormat}
                    defaultValue={defaultData}
                    onChange={(date, dateString) => onChange(date, dateString)}
                />
            </Form.Item>
            <Form.Item 
                name="teacher" 
                label= {t("choice_teacher")} 
                rules={ [ { required: true } ] }>
            <Select
                showSearch
                placeholder={t("write_teacher_name")}
                style={{width: "100%"}}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleChange}
                notFoundContent={null}
            >
        {optionList}
      </Select>
            </Form.Item>

            <Form.Item 
                name="subjectId" 
                label= {t("choice_subject")} 
                rules={ [ { required: true } ] }>
            <TreeSelect
                showSearch
                style={{ width: '100%' }}
                // value={subjects}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                treeDefaultExpandAll
                // onChange={() =>{setSubjects()}}
            >
              {subjects}
            </TreeSelect>
            </Form.Item>
            <Form.Item 
                name="languageId" 
                label= {t("choice_language")} 
                rules={ [ { required: true } ] }>
            <TreeSelect
                showSearch
                style={{ width: '100%' }}
                // value={subjects}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                treeDefaultExpandAll
                // onChange={() =>{setSubjects()}}
            >
              {languages}
            </TreeSelect>
            </Form.Item>

            <Form.Item 
                name="images" 
                label= {t("choice_image")} 
                rules={ [ { required: true }] }>
                    <Upload.Dragger 
                        maxCount={1}
                        name="file"
                        defaultFileList={[fileLists]}
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
                   {count>0?t("change"):t("add")}
                  </Button>
                )}
            </Form.Item>

        </Form>


    )
}

export default ModalGroup
