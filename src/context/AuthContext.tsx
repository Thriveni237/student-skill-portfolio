"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  role: string | null;
  loading: boolean;
  isDemo: boolean;
  signOut: () => Promise<void>;
  setDemoMode: (role: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for Demo Mode to prevent errors in components
const MOCK_USER: any = {
  id: '00000000-0000-0000-0000-000000000000',
  email: 'demo@skillport.edu',
  user_metadata: {
    first_name: 'Demo',
    last_name: 'User',
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const savedDemoRole = sessionStorage.getItem('demo_role');
    
    if (savedDemoRole) {
      setRole(savedDemoRole);
      setIsDemo(true);
      setUser({ ...MOCK_USER, user_metadata: { ...MOCK_USER.user_metadata, role: savedDemoRole } });
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!sessionStorage.getItem('demo_role')) {
        setSession(session);
        setUser(session?.user ?? null);
        setRole(session?.user?.user_metadata?.role ?? null);
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!sessionStorage.getItem('demo_role')) {
        setSession(session);
        setUser(session?.user ?? null);
        setRole(session?.user?.user_metadata?.role ?? null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const setDemoMode = (demoRole: string) => {
    sessionStorage.setItem('demo_role', demoRole);
    setRole(demoRole);
    setIsDemo(true);
    setUser({ ...MOCK_USER, user_metadata: { ...MOCK_USER.user_metadata, role: demoRole } });
    setSession(null);
  };

  const signOut = async () => {
    sessionStorage.removeItem('demo_role');
    setIsDemo(false);
    setRole(null);
    setUser(null);
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, user, role, loading, isDemo, signOut, setDemoMode }}>
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