import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@src/lib/supabase-server'

export async function GET(request: NextRequest) {
	try {
		console.log('Verificando salud de la conexión a Supabase...')

		// Verificar variables de entorno
		const envCheck = {
			SUPABASE_URL: !!process.env.SUPABASE_URL,
			SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
			SUPABASE_URL_VALUE: process.env.SUPABASE_URL ? 'Configurada' : 'No configurada',
			SERVICE_KEY_LENGTH: process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0,
		}

		console.log('Estado de variables de entorno:', envCheck)

		if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
			return NextResponse.json(
				{
					status: 'error',
					message: 'Variables de entorno faltantes',
					envCheck,
				},
				{ status: 500 },
			)
		}

		// Probar conexión simple
		const { data, error } = await supabaseServer.from('pitchQuestions').select('count').limit(1)

		if (error) {
			console.error('Error de conexión a Supabase:', error)
			return NextResponse.json(
				{
					status: 'error',
					message: 'Error de conexión a Supabase',
					error: {
						message: error.message,
						code: error.code,
						details: error.details,
					},
					envCheck,
				},
				{ status: 500 },
			)
		}

		console.log('Conexión a Supabase exitosa')

		return NextResponse.json(
			{
				status: 'ok',
				message: 'Conexión a Supabase exitosa',
				envCheck,
				timestamp: new Date().toISOString(),
			},
			{ status: 200 },
		)
	} catch (error) {
		console.error('Error inesperado en health check:', error)
		return NextResponse.json(
			{
				status: 'error',
				message: 'Error inesperado',
				error: error instanceof Error ? error.message : 'Error desconocido',
			},
			{ status: 500 },
		)
	}
}
