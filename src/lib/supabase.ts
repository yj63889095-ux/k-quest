import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// 빌드 타임이나 환경 변수가 없을 때 에러 방지
export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {} as any;

// Server-side client with service role key (admin privileges)
const supabaseServiceKey = process.env.SUPABASE_KEY || ''

export const supabaseAdmin = (typeof window === 'undefined' && supabaseUrl && supabaseServiceKey)
    ? createClient(supabaseUrl, supabaseServiceKey)
    : {} as any;
