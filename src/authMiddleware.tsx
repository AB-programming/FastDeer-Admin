import React from "react";
import {AuthContext} from "./hooks/useAuth";
import {Suspense} from "react";
import Login from "./components/Login";

export const Auth = (element: React.ReactNode) => {
    return <AuthContext.Consumer>
        {
            value =>
                (
                    <Suspense fallback={<h1>Loading...</h1>}>
                        {value.isAuthenticated ? element : <Login />}
                    </Suspense>
                )
        }
    </AuthContext.Consumer>
}
