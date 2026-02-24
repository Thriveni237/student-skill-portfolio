"use client";

import { supabase } from "@/integrations/supabase/client";

// This utility now wraps Supabase calls to maintain compatibility with existing code
export const api = {
  get: async (endpoint: string) => {
    const table = endpoint.replace(/^\//, '').split('/')[0];
    const { data, error } = await supabase
      .from(table)
      .select('*');
    
    if (error) throw error;
    return data;
  },

  post: async (endpoint: string, body: any) => {
    const table = endpoint.replace(/^\//, '').split('/')[0];
    
    // Get current user for the user_id field
    const { data: { user } } = await supabase.auth.getUser();
    const dataToInsert = { ...body, user_id: user?.id };

    const { data, error } = await supabase
      .from(table)
      .insert([dataToInsert])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  put: async (endpoint: string, body: any) => {
    const parts = endpoint.replace(/^\//, '').split('/');
    const table = parts[0];
    const id = parts[1];

    const { data, error } = await supabase
      .from(table)
      .update(body)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  delete: async (endpoint: string) => {
    const parts = endpoint.replace(/^\//, '').split('/');
    const table = parts[0];
    const id = parts[1];

    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },
};