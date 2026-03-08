import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// During build time, env vars may not be available yet.
// createClient requires a valid URL, so we use a placeholder that won't crash the build.
const url = supabaseUrl.startsWith('http') ? supabaseUrl : 'https://placeholder.supabase.co';
const key = supabaseAnonKey || 'placeholder-key';

export const supabase = createClient(url, key);
