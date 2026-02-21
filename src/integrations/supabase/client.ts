import { createClient } from '@supabase/supabase-js';

// These variables are automatically provided by the Supabase integration in your environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Supabase URL present:", !!supabaseUrl);
console.log("Supabase Key present:", !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("CRITICAL: Supabase credentials missing. Authentication will fail.");
}

// We use a fallback only to prevent the app from crashing on load, 
// but real requests will fail if these are placeholders.
export const supabase = createClient(
  supabaseUrl || 'https://missing-url.supabase.co',
  supabaseAnonKey || 'missing-key'
);
