import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PUBLIC_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Инициализация безопасного клиента для фронтенда
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
