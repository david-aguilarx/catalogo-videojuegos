// src/config/supabaseClient.js
// Cliente de Supabase para hacer peticiones desde React

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('URL:', supabaseUrl); // línea temporal para depurar
console.log('KEY:', supabaseAnonKey ? 'presente' : 'AUSENTE'); // línea temporal

export const supabase = createClient(supabaseUrl, supabaseAnonKey);