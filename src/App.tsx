import React from "react";
import "./App.css";
import {useRoutes} from "react-router-dom";
import routes from "./routes";
import {AuthProvider} from "./hooks/useAuth.tsx";

const App: React.FC = () => {
    const element = useRoutes(routes)
    return (
        <AuthProvider>
            {element}
        </AuthProvider>
    );
};

export default App;