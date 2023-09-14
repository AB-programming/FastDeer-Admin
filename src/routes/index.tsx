import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import {Auth} from "../authMiddleware.tsx";
import UserList from "../pages/UserList";
import Home from "../pages/Home";
import PostList from "../pages/PostList";
import Feedback from "../pages/Feedback";

export default [
    {
        path: '/',
        element: Auth(<Dashboard />),
        children: [
            {
                path: '/',
                name: '首页',
                element: Auth(<Home />)
            },
            {
                path: '/userList',
                name: '用户列表',
                element: Auth(<UserList />)
            },
            {
                path: '/postList',
                name: '帖子列表',
                element: Auth(<PostList />)
            },
            {
                path: '/feedback',
                element: Auth(<Feedback />)
            }
        ]
    },
    {
        path: '/login',
        element: <Login />,
    },
]