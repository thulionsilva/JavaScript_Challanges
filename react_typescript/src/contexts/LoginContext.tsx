import React, { useState, ReactNode } from 'react';
import { createContext, useContext } from 'react';

// login_data = {
//     user: "Thulio",
//     login: () => void,
//     logout: () => void,
// }

type UserType = {
    user: string | null;
    login: (userData: string) => void;
    logout: () => void;
}
const AuthContext = createContext<UserType | undefined>(undefined);

export const LoginContext: React.FC<{children: ReactNode}> = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    }
    );

    const login = (userData: string) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    }
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    }
    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

