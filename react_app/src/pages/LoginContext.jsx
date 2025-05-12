import {useState } from 'react';
import { createContext, useContext } from 'react';

// login_data = {
//     user: "Thulio",
//     login: () => void,
//     logout: () => void,
// }
const AuthContext = createContext();
export const LoginContext = ({children}) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : 'admin';
    }
    );

    const login = (userData) => {
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

