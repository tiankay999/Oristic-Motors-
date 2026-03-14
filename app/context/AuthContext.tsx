'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    isAdmin: boolean;
    adminToken: string | null;
    isLoading: boolean;
    login: (token: string, userData: User) => void;
    loginAdmin: (token: string, adminData?: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminToken, setAdminToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is already authenticated
        const storedToken = localStorage.getItem('token');
        const storedAdminToken = localStorage.getItem('adminToken');

        let pending = 0;
        const checkDone = () => {
            pending--;
            if (pending <= 0) setIsLoading(false);
        };

        if (storedToken) {
            pending++;
            setToken(storedToken);
            fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006'}/me`, {
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            })
                .then(res => {
                    if (res.ok) return res.json();
                    throw new Error('Token invalid');
                })
                .then(userData => {
                    setUser(userData);
                    setIsAuthenticated(true);
                })
                .catch(() => {
                    logout();
                })
                .finally(checkDone);
        }

        if (storedAdminToken) {
            pending++;
            setAdminToken(storedAdminToken);
            fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006'}/admin/me`, {
                headers: {
                    'Authorization': `Bearer ${storedAdminToken}`
                }
            })
                .then(res => {
                    if (res.ok) return res.json();
                    throw new Error('Admin token invalid');
                })
                .then(() => {
                    setIsAdmin(true);
                })
                .catch(() => {
                    localStorage.removeItem('adminToken');
                    setAdminToken(null);
                })
                .finally(checkDone);
        }

        if (pending === 0) setIsLoading(false);
    }, []);

    const login = (newToken: string, userData: User) => {
        setIsAuthenticated(true);
        setUser(userData);
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const loginAdmin = (newToken: string, adminData?: any) => {
        setIsAdmin(true);
        setAdminToken(newToken);
        localStorage.setItem('adminToken', newToken);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
        setIsAdmin(false);
        setAdminToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('adminToken');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, isAdmin, adminToken, isLoading, login, loginAdmin, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
