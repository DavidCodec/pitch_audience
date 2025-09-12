import { NextResponse } from 'next/server'
import { supabaseServer } from '@src/lib/supabase-server'

// GET - Obtener todas las preguntas
export async function GET() {
	try {
		console.log('Obteniendo todas las preguntas...')

		// Verificar que las variables de entorno estén configuradas
		if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
			console.error('Variables de entorno faltantes:', {
				SUPABASE_URL: !!process.env.SUPABASE_URL,
				SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
			})
			return NextResponse.json(
				{
					error: 'Variables de entorno de Supabase no configuradas',
				},
				{ status: 500 },
			)
		}

		const { data, error } = await supabaseServer
			.from('pitchQuestions')
			.select('*')
			.order('created_at', { ascending: false })

		if (error) {
			console.error('Error detallado al obtener preguntas:', {
				message: error.message,
				details: error.details,
				hint: error.hint,
				code: error.code,
			})
			return NextResponse.json(
				{
					error: `Error al obtener las preguntas: ${error.message}`,
				},
				{ status: 500 },
			)
		}

		console.log('Preguntas obtenidas exitosamente:', data?.length || 0)

		return NextResponse.json(
			{
				success: true,
				data,
				count: data?.length || 0,
			},
			{ status: 200 },
		)
	} catch (error) {
		console.error('Error inesperado al obtener preguntas:', error)
		return NextResponse.json(
			{
				error: `Error interno del servidor: ${error instanceof Error ? error.message : 'Error desconocido'}`,
			},
			{ status: 500 },
		)
	}
}

// DELETE - Eliminar todas las preguntas (para pruebas)
export async function DELETE() {
	try {
		console.log('Iniciando eliminación de todas las preguntas...')

		// Verificar que las variables de entorno estén configuradas
		if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
			console.error('Variables de entorno faltantes:', {
				SUPABASE_URL: !!process.env.SUPABASE_URL,
				SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
			})
			return NextResponse.json(
				{
					error: 'Variables de entorno de Supabase no configuradas',
				},
				{ status: 500 },
			)
		}

		const { data, error } = await supabaseServer
			.from('pitchQuestions')
			.delete()
			.neq('id', 0) // WHERE id != 0 (elimina todos los registros)
			.select()

		if (error) {
			console.error('Error detallado al eliminar preguntas:', {
				message: error.message,
				details: error.details,
				hint: error.hint,
				code: error.code,
			})
			return NextResponse.json(
				{
					error: `Error al eliminar las preguntas: ${error.message}`,
				},
				{ status: 500 },
			)
		}

		console.log('Preguntas eliminadas exitosamente:', data?.length || 0)

		return NextResponse.json(
			{
				success: true,
				message: `Se eliminaron ${data?.length || 0} preguntas`,
				deletedCount: data?.length || 0,
			},
			{ status: 200 },
		)
	} catch (error) {
		console.error('Error inesperado al eliminar preguntas:', error)
		return NextResponse.json(
			{
				error: `Error interno del servidor: ${error instanceof Error ? error.message : 'Error desconocido'}`,
			},
			{ status: 500 },
		)
	}
}
