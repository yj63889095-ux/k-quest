import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role key (admin privileges)
const supabaseServiceKey = process.env.SUPABASE_KEY || ''

export const supabaseAdmin = typeof window === 'undefined'
    ? createClient(supabaseUrl, supabaseServiceKey)
    : supabase
