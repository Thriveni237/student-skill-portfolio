"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface AuthContextType {
  user: any | null;
  role: string | null;
  loading: boolean;
  isDemo: boolean;
  signOut: () => void;
  setDemoMode: (role: string) => void;
  login: (credentials: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      const demoRole = sessionStorage.getItem('demo_role');

      if (demoRole) {
        setDemoMode(demoRole);
        setLoading(false);
        return;
      }

      if (token) {
        try {
          // In a real app, you'd have a /me endpoint to verify the token
          // const userData = await api.get('/auth/me');
          // setUser(userData);
          // setRole(userData.role);
        } catch (err) {
          localStorage.removeItem('auth_token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: any) => {
    // This would call your local MySQL-backed API
    // const { user, token } = await api.post('/auth/login', credentials);
    // localStorage.setItem('auth_token', token);
    // setUser(user);
    // setRole(user.role);
  };

  const setDemoMode = (demoRole: string) => {
    sessionStorage.setItem('demo_role', demoRole);
    setRole(demoRole);
    setIsDemo(true);
    setUser({ id: 'demo', first_name: 'Demo', last_name: 'User', role: demoRole });
  };

  const signOut = () => {
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('demo_role');
    setUser(null);
    setRole(null);
    setIsDemo(false);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, isDemo, signOut, setDemoMode, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};