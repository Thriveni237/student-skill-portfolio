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
  login: (user: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('user');
      const demoRole = sessionStorage.getItem('demo_role');

      if (demoRole) {
        setDemoMode(demoRole);
      } else if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setRole(userData.role);
        setIsDemo(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData: any) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setRole(userData.role);
    setIsDemo(false);
    sessionStorage.removeItem('demo_role');
  };

  const setDemoMode = (demoRole: string) => {
    sessionStorage.setItem('demo_role', demoRole);
    setRole(demoRole);
    setIsDemo(true);
    setUser({ id: 'demo', firstName: 'Demo', lastName: 'User', role: demoRole });
    localStorage.removeItem('user');
  };

  const signOut = () => {
    localStorage.removeItem('user');
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