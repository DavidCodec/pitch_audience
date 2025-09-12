import { createClient } from '@supabase/supabase-js'

// Variables de servidor (privadas)
const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
	throw new Error('Missing SUPABASE_URL environment variable')
}

if (!supabaseServiceKey) {
	throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
}

// Cliente de Supabase para el servidor con service role key
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
	auth: {
		autoRefreshToken: false,
		persistSession: false,
	},
})

export interface PitchQuestion {
	id?: number
	name: string
	pregunta: string
	created_at?: string
}
