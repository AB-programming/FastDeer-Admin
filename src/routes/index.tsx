import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import {Auth} from "../authMiddleware.tsx";
import UserList from "../pages/UserList";
import Home from "../pages/Home";

export default [
    {
        path: '/',
        element: Auth(<Dashboard />),
        children: [
            {
                path: '/',
                element: Auth(<Home />)
            },
            {
                path: '/userList',
                element: Auth(<UserList />)
            }
        ]
    },
    {
        path: '/login',
        element: <Login />,
    },
]