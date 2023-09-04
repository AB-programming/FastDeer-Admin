import {Button} from "antd";
import {AuthContext} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate()

    const login = async (login: (token: string) => void) => {
        try {
            const res = await axios.post(import.meta.env.VITE_END_ADDRESS + '/admin/login', {
                username: 'user',
                password: '123'
            });

            const loginRes = res.data as HttpResponse<string>
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
                    return <Button type='primary' onClick={() => login(value.login)}>Login</Button>
                }
            }
        </AuthContext.Consumer>
    )
}
