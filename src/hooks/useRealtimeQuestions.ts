import { useState, useEffect } from 'react'

export interface PitchQuestion {
	id?: number
	name: string
	pregunta: string
	created_at?: string
}

interface UseRealtimeQuestionsReturn {
	questions: PitchQuestion[]
	isLoading: boolean
	error: string | null
	newQuestionCount: number
}

export function useRealtimeQuestions(): UseRealtimeQuestionsReturn {
	const [questions, setQuestions] = useState<PitchQuestion[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [newQuestionCount, setNewQuestionCount] = useState<number>(0)

	useEffect(() => {
		// Cargar preguntas existentes desde API route
		const loadInitialQuestions = async () => {
			try {
				const response = await fetch('/api/questions')
				const result = await response.json()

				if (!response.ok) {
					console.error('Error al cargar preguntas:', result.error)
					setError('Error al cargar las preguntas')
					return
				}

				setQuestions(result.data || [])
			} catch (err) {
				console.error('Error inesperado:', err)
				setError('Error inesperado al cargar las preguntas')
			} finally {
				setIsLoading(false)
			}
		}

		loadInitialQuestions()

		// Suscribirse a cambios en tiempo real usando Server-Sent Events
		const eventSource = new EventSource('/api/questions/stream')

		eventSource.onopen = () => {
			console.log('✅ Conectado a preguntas en tiempo real')
		}

		eventSource.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data)

				switch (data.type) {
					case 'connected':
						console.log('✅ Suscrito a preguntas en tiempo real')
						break
					case 'new_question':
						console.log('Nueva pregunta recibida:', data.data)
						const newQuestion = data.data as PitchQuestion
						setQuestions((prev) => [newQuestion, ...prev])
						setNewQuestionCount((prev) => prev + 1)
						break
					case 'updated_question':
						console.log('Pregunta actualizada:', data.data)
						const updatedQuestion = data.data as PitchQuestion
						setQuestions((prev) => prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)))
						break
					case 'deleted_question':
						console.log('Pregunta eliminada:', data.data)
						const deletedQuestion = data.data as PitchQuestion
						setQuestions((prev) => prev.filter((q) => q.id !== deletedQuestion.id))
						break
					case 'error':
						console.error('❌ Error en la suscripción:', data.message)
						setError('Error de conexión en tiempo real')
						break
					case 'heartbeat':
						// Mantener conexión viva
						break
					default:
						console.log('Evento desconocido:', data)
				}
			} catch (err) {
				console.error('Error al procesar evento:', err)
			}
		}

		eventSource.onerror = (error) => {
			console.error('❌ Error en EventSource:', error)
			setError('Error de conexión en tiempo real')
		}

		// Cleanup al desmontar
		return () => {
			console.log('Desuscribiéndose de preguntas en tiempo real')
			eventSource.close()
		}
	}, [])

	return {
		questions,
		isLoading,
		error,
		newQuestionCount,
	}
}
