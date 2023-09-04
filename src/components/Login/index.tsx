import {AuthContext} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { Button, Checkbox, Form, Input } from 'antd';
import {useState} from "react";
import "./index.css"

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onFiledChange = (changeField) => {
        if (changeField[0].name[0] === 'username') {
            setUsername(changeField[0].value)
        } else {
            setPassword(changeField[0].value)
        }
    }

    type FieldType = {
        username?: string;
        password?: string;
        remember?: boolean;
        login?: (token: string) => void
    };

    const login = async (login: (token: string) => void) => {
        if (username === '' || password === '') {
            return;
        }
        try {
            const res = await axios.post(import.meta.env.VITE_END_ADDRESS + '/admin/login', {
                username: username,
                password: password
            });

            const loginRes = res.data as HttpResponse<string>
            console.log(loginRes)
            if (loginRes.code === '200') {
                login(loginRes.data)
                navigate('/')
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <AuthContext.Consumer>
            {
                value => {
                    return <Form
                        className={'form'}
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        style={{maxWidth: 600}}
                        initialValues={{remember: true}}
                        onFieldsChange={onFiledChange}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            label="用户名"
                            name="username"
                            rules={[{required: true, message: '请输入用户名！'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="密码"
                            name="password"
                            rules={[{required: true, message: '请输入密码！'}]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{offset: 8, span: 16}}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit" onClick={() => login(value.login)}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                }
            }
        </AuthContext.Consumer>
    )
}
