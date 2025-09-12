import { useState, useEffect } from 'react'
import { supabase, PitchQuestion } from '@src/lib/supabase'

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
		// Cargar preguntas existentes
		const loadInitialQuestions = async () => {
			try {
				const { data, error } = await supabase
					.from('pitchQuestions')
					.select('*')
					.order('created_at', { ascending: false })

				if (error) {
					console.error('Error al cargar preguntas:', error)
					setError('Error al cargar las preguntas')
					return
				}

				setQuestions(data || [])
			} catch (err) {
				console.error('Error inesperado:', err)
				setError('Error inesperado al cargar las preguntas')
			} finally {
				setIsLoading(false)
			}
		}

		loadInitialQuestions()

		// Suscribirse a cambios en tiempo real
		const channel = supabase
			.channel('pitch-questions')
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'pitchQuestions',
				},
				(payload) => {
					console.log('Nueva pregunta recibida:', payload.new)
					const newQuestion = payload.new as PitchQuestion
					setQuestions((prev) => [newQuestion, ...prev])
					setNewQuestionCount((prev) => prev + 1)
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
					const updatedQuestion = payload.new as PitchQuestion
					setQuestions((prev) => prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)))
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
					const deletedQuestion = payload.old as PitchQuestion
					setQuestions((prev) => prev.filter((q) => q.id !== deletedQuestion.id))
				},
			)
			.subscribe((status) => {
				console.log('Estado de suscripción:', status)
				if (status === 'SUBSCRIBED') {
					console.log('✅ Suscrito a preguntas en tiempo real')
				} else if (status === 'CHANNEL_ERROR') {
					console.error('❌ Error en la suscripción')
					setError('Error de conexión en tiempo real')
				}
			})

		// Cleanup al desmontar
		return () => {
			console.log('Desuscribiéndose de preguntas en tiempo real')
			supabase.removeChannel(channel)
		}
	}, [])

	return {
		questions,
		isLoading,
		error,
		newQuestionCount,
	}
}
