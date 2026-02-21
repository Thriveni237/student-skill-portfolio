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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    // Check if there's a demo role in session storage
    const savedDemoRole = sessionStorage.getItem('demo_role');
    if (savedDemoRole) {
      setRole(savedDemoRole);
      setIsDemo(true);
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setRole(session?.user?.user_metadata?.role ?? null);
      setLoading(false);
    });

    // Listen for auth changes
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
    setSession(null);
    setUser(null);
  };

  const signOut = async () => {
    sessionStorage.removeItem('demo_role');
    setIsDemo(false);
    setRole(null);
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