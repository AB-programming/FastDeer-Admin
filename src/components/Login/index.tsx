import {Button} from "antd";
import {AuthContext} from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate()

    const login = (login: (token: string) => void) => {
        login('hytrix')
        navigate("/")
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
