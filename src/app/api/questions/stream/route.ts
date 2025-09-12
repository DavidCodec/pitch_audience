import { NextRequest } from 'next/server'
import { supabaseServer } from '@src/lib/supabase-server'

export async function GET(request: NextRequest) {
	// Configurar headers para Server-Sent Events
	const headers = new Headers({
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		Connection: 'keep-alive',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Cache-Control',
	})

	const stream = new ReadableStream({
		start(controller) {
			// Función para enviar datos al cliente
			const sendData = (data: unknown) => {
				const message = `data: ${JSON.stringify(data)}\n\n`
				controller.enqueue(new TextEncoder().encode(message))
			}

			// Función para enviar eventos de heartbeat
			const sendHeartbeat = () => {
				sendData({ type: 'heartbeat', timestamp: Date.now() })
			}

			// Enviar heartbeat cada 30 segundos
			const heartbeatInterval = setInterval(sendHeartbeat, 30000)

			// Suscribirse a cambios en tiempo real usando Supabase
			const channel = supabaseServer
				.channel('pitch-questions-stream')
				.on(
					'postgres_changes',
					{
						event: 'INSERT',
						schema: 'public',
						table: 'pitchQuestions',
					},
					(payload) => {
						console.log('Nueva pregunta recibida:', payload.new)
						sendData({
							type: 'new_question',
							data: payload.new,
						})
					},
				)
				.on(
					'postgres_changes',
					{
						event: 'UPDATE',
						schema: 'public',
						table: 'pitchQuestions',
					},
					(payload) => {
						console.log('Pregunta actualizada:', payload.new)
						sendData({
							type: 'updated_question',
							data: payload.new,
						})
					},
				)
				.on(
					'postgres_changes',
					{
						event: 'DELETE',
						schema: 'public',
						table: 'pitchQuestions',
					},
					(payload) => {
						console.log('Pregunta eliminada:', payload.old)
						sendData({
							type: 'deleted_question',
							data: payload.old,
						})
					},
				)
				.subscribe((status) => {
					console.log('Estado de suscripción:', status)
					if (status === 'SUBSCRIBED') {
						console.log('✅ Suscrito a preguntas en tiempo real')
						sendData({ type: 'connected', status: 'subscribed' })
					} else if (status === 'CHANNEL_ERROR') {
						console.error('❌ Error en la suscripción')
						sendData({ type: 'error', message: 'Error de conexión en tiempo real' })
					}
				})

			// Cleanup cuando se cierra la conexión
			request.signal.addEventListener('abort', () => {
				console.log('Conexión cerrada, limpiando suscripción')
				clearInterval(heartbeatInterval)
				supabaseServer.removeChannel(channel)
				controller.close()
			})
		},
	})

	return new Response(stream, { headers })
}
