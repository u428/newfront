import React, {useEffect, useRef, useState} from 'react'
import { Form, Row, Col, PageHeader, Card, Avatar, Image, Space, Divider, Tabs, Input, Button, DatePicker, Select, Upload } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Fade } from 'react-reveal';
import { UserOutlined, CheckOutlined , InfoOutlined} from '@ant-design/icons';
import { MaskedInput } from 'antd-mask-input';
import { putUserAuthSetting } from '../../../redux/auth/action';

const options = [{ id: 3, value: 'Boshqa' }, {id: 1, value: 'Erkak' }, {id: 2, value: 'Ayol' }];
const TeacherSetting = ( ) => {

    const {loading, userData} = useSelector(state=>state.authReducer);
    console.log(userData);
    const [ form ] = Form.useForm();
    const [form2] = Form.useForm();
    const dispatch = useDispatch();
    let history = useHistory();
    const [dating, setDating] = useState("");
    let emailRef = useRef()
    const dateFormat = 'YYYY-MM-DD';
    const imageURL = "https://qorakol-ilm-ziyo.uz/api/v1/static/images?id=";


    useEffect( () => {
    }, [] );


    const onFinish = ( values ) => {
      console.log(values);

      const valid = {
        password: values.password,
        authId: userData.user.authId
      }

      dispatch(putUserAuthSetting(valid));
      onReset()
    };

  const onFinishAbout = ( values ) => {
    console.log(values);

   
    // dispatch(putUserAuth(returns));
    onReset()
};

  const onReset = () => {
      form.resetFields();
      form2.resetFields();
  };
  function onChange(date, dateString) {
    setDating(dateString);
}



    return (
      <Fade>

      <Row justify="space-between" align="middle">
        <Col>
          <PageHeader
            className="site-page-header"
            // onBack={ () => null }
            title={userData.user.firstName+" "+ userData.user.lastName}
            subTitle={userData.user.telNomer}
          />
        </Col>
      </Row>
      <Row justify='space-between'>
        <Col span={6} offset={1} >
          <Card style={{ height: 700}}>
            <Row justify='center' align="middle" >
              <Col style={{padding: 8, textAlign: 'center'}}>

              <Avatar size={{ xs: 20, sm: 30, md: 80, lg: 120, xl: 200, xxl: 250 }} src={imageURL+ userData.user.imagesId&&'data:image/png;base64,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'} />

              <p style={{margin:10}}><span style={{fontSize:22, fontWeight: 'bold'}}>{userData.user.firstName} {userData.user.lastName}</span></p>
              </Col>
            </Row>
            <div style={{fontSize: 17}}>
            <div>
              <Space align='center' style={{margin: 0}} >{userData.role.name}</Space>
            </div>
            <Divider />
            <div>
            <><span>date of birth:  </span> {userData.user.dateBirth} </>
            </div>
            <div>
            <><span>Tel:  </span> {userData.user.telNomer} </>
            </div>
            <div>
            <><span>facebook link:  </span> {userData.user.flink} </>
            </div>
            <div>
            <><span>Instagram link:  </span> {userData.user.inLink} </>
            </div>
            <div>
            <><span>Telegram link:  </span> {userData.user.tgLink} </>
            </div>
            <div>
            <><span>Gmail:  </span> {userData.user.gmail} </>
            </div>
            </div>
          </Card>
        </Col>  


        <Col span={14} >
        <Card>
            <div>
            <Tabs defaultActiveKey="1">
  <Tabs.TabPane tab="About" key="1">
  <Form 
        form={ form } 
        layout="vertical"
        name="Change about"
        onFinish={ onFinishAbout }>

            <Form.Item name="firstName" label="Ismingiz" rules={ [ { required: true, message: "Iltimos ismingizni kiriting" } ] }>
                <Input />
            </Form.Item>
            <Form.Item name="lastName" label="Familiyangiz" rules={ [ { required: true, message: "Iltimos familiyangizni kiriting" } ] }>
                <Input />
            </Form.Item>
            <Form.Item name="middleName" label="Otangizni ismi" rules={ [ { required: true } ] }>
                <Input />
            </Form.Item>
            <Form.Item 
                name="birthDate" 
                label="Tugilgan sana">
                <DatePicker 
                    style={{width: "100%"}}
                    format={dateFormat}
                    onChange={(date, dateString) => onChange(date, dateString)}
                      />
            </Form.Item>
            <Form.Item 
                name="gender" 
                label="Jinsingiz" 
                rules={ [ { required: true }] }>
                <Select>
                    <>
                    {
                        options.map(item =>{
                            
                            return(
                                <Select.Option value={item.id}> {item.value}</Select.Option>
                            )
                            
                        })
                    }
                    </>
                </Select>
            </Form.Item>
            <Form.Item name="gmail" label="G-mail" rules={ [ { required: false } ] }>
                <Input />
            </Form.Item>
            <Form.Item name="telNomer" label="Telefon nomer" rules={ [ { required: true } ] }>
                <MaskedInput
        ref={emailRef}
        mask="+998(00) 000 00 00"
        // onChange={handleInputChange}
        // onFocus={handleFocus}
        // onBlur={handleBlur}
      />
            </Form.Item>
            <Form.Item name="tgLink" label="Telegram link" rules={ [ { required: false } ] }>
                <Input />
            </Form.Item>
            <Form.Item name="fLink" label="Facebook link" rules={ [ { required: false } ] }>
                <Input />
            </Form.Item>
            <Form.Item name="inLink" label="Instagram link" rules={ [ { required: false } ] }>
                <Input />
            </Form.Item>
            <Form.Item >
                <Button block type="primary" htmlType="submit">
                    Change about
                </Button>
            </Form.Item>

        </Form>
  </Tabs.TabPane>


  <Tabs.TabPane tab="Security" key="2">
  <Form 
        form={ form2 } 
        layout="vertical"
        name="edit-password"
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
            
            <Form.Item >
                <Button block type="primary" htmlType="submit">
                    Change password
                </Button>
            </Form.Item>

        </Form>
  </Tabs.TabPane>

  <Tabs.TabPane tab="Change Avatar" key="3">
    <div>
      <div>
  <Upload.Dragger 
                maxCount={1}
                name="file"
                listType="picture"
                accept='.png, .jpg, .img'
                method='post'
                action="https://qorakol-ilm-ziyo.uz/api/v1/a23d_m23_i23n/add_image"
                >
                    <Button>Imageni yuklash</Button>
                </Upload.Dragger>
                </div>
                <div style={{marginTop: 20}}>
                <Button block type="primary">
                    Change image
                </Button>
                </div>  
          </div>
    </Tabs.TabPane>
</Tabs>
            </div>
          </Card>

        </Col>

        <Col span={1}>
        </Col>
      </Row>
      
    </Fade>


    )
}

export default TeacherSetting
