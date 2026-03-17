import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ylnbfmlrkacuirkhkksl.supabase.co';
const supabaseAnonKey = 'YOUR_ANON_KEY'; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);