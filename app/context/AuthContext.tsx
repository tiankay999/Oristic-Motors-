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
    login: (token: string, userData: User) => void;
    loginAdmin: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check if user is already authenticated
        const storedToken = localStorage.getItem('token');
        const storedAdminToken = localStorage.getItem('adminToken');

        if (storedToken) {
            setToken(storedToken);
            // Verify token and fetch user details
            fetch('http://localhost:5006/me', {
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error('Token invalid');
                })
                .then(userData => {
                    setUser(userData);
                    setIsAuthenticated(true);
                })
                .catch(() => {
                    // Token invalid or expired
                    logout();
                });
        }

        if (storedAdminToken) {
            fetch('http://localhost:5006/admin/me', {
                headers: {
                    'Authorization': `Bearer ${storedAdminToken}`
                }
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error('Admin token invalid');
                })
                .then(adminData => {
                    // You might want to store admin data separately if needed
                    // For now, we can reuse the user state or add a specific admin state
                    // But typically admin and user are separate.
                    // Let's add isAdmin to the context.
                    console.log('Admin verified', adminData);
                })
                .catch(() => {
                    localStorage.removeItem('adminToken');
                });
        }
    }, []);

    const login = (newToken: string, userData: User) => {
        setIsAuthenticated(true);
        setUser(userData);
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const loginAdmin = (newToken: string) => {
        setIsAdmin(true);
        localStorage.setItem('adminToken', newToken);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('adminToken');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, isAdmin, login, loginAdmin, logout }}>
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
