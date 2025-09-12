import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@src/lib/supabase-server'

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { name, pregunta } = body

		// Validaciones
		if (!name || !pregunta) {
			return NextResponse.json({ error: 'Nombre y pregunta son requeridos' }, { status: 400 })
		}

		if (typeof name !== 'string' || typeof pregunta !== 'string') {
			return NextResponse.json({ error: 'Nombre y pregunta deben ser strings' }, { status: 400 })
		}

		if (name.trim().length === 0 || pregunta.trim().length === 0) {
			return NextResponse.json({ error: 'Nombre y pregunta no pueden estar vacíos' }, { status: 400 })
		}

		// Insertar en la base de datos
		const { data, error } = await supabaseServer
			.from('pitchQuestions')
			.insert([
				{
					name: name.trim(),
					pregunta: pregunta.trim(),
				},
			])
			.select()

		if (error) {
			console.error('Error al insertar pregunta:', error)
			return NextResponse.json({ error: 'Error al guardar la pregunta' }, { status: 500 })
		}

		return NextResponse.json({ success: true, data }, { status: 201 })
	} catch (error) {
		console.error('Error inesperado:', error)
		return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
	}
}

export async function GET() {
	try {
		const { data, error } = await supabaseServer
			.from('pitchQuestions')
			.select('*')
			.order('created_at', { ascending: false })

		if (error) {
			console.error('Error al obtener preguntas:', error)
			return NextResponse.json({ error: 'Error al obtener las preguntas' }, { status: 500 })
		}

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		console.error('Error inesperado:', error)
		return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
	}
}
