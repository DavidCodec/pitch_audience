import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@src/lib/supabase-server'

// DELETE - Eliminar una pregunta específica
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id: idParam } = await params
		const id = parseInt(idParam)

		if (isNaN(id)) {
			return NextResponse.json({ error: 'ID de pregunta inválido' }, { status: 400 })
		}

		const { data, error } = await supabaseServer.from('pitchQuestions').delete().eq('id', id).select()

		if (error) {
			console.error('Error al eliminar pregunta:', error)
			return NextResponse.json({ error: 'Error al eliminar la pregunta' }, { status: 500 })
		}

		if (!data || data.length === 0) {
			return NextResponse.json({ error: 'Pregunta no encontrada' }, { status: 404 })
		}

		return NextResponse.json(
			{
				success: true,
				message: 'Pregunta eliminada correctamente',
				deletedQuestion: data[0],
			},
			{ status: 200 },
		)
	} catch (error) {
		console.error('Error inesperado:', error)
		return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
	}
}
