import React, {createContext, useState} from "react";
import { useLoginStatus } from "./useLoginStatus";

export const AuthContext = createContext<AuthOption>({} as AuthOption);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(useLoginStatus());

    const login = (token: string) => {
        localStorage.setItem(import.meta.env.VITE_TOKEN, token)
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem(import.meta.env.VITE_TOKEN)
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={
            {
                isAuthenticated,
                login,
                logout,
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}