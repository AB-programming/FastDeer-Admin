import Dashboard from "../components/Dashboard";
import Preferences from "../components/Preferences";
import Login from "../components/Login";
import {Auth} from "../authMiddleware.tsx";

export default [
    {
        path: '/',
        element: Auth(<Dashboard />),
        children: [
            {
                path: '/preference',
                element: Auth(<Preferences />)
            }
        ]
    },
    {
        path: '/login',
        element: <Login />,
    },
]