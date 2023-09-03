import React from "react";
import {Navigate} from "react-router-dom";
import {AuthContext} from "./hooks/useAuth";

export const Auth = (element: React.ReactNode) => {
    return <AuthContext.Consumer>
        {
            value => {
                return value.isAuthenticated ? element : <Navigate to='/login'/>
            }
        }
    </AuthContext.Consumer>
}