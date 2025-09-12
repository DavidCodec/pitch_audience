import { useState, useEffect } from 'react'

interface UsePitchQuestionsReturn {
	userName: string | null
	questionsCount: number
	setUserName: (name: string) => void
	submitQuestion: (question: string) => Promise<{ success: boolean; error?: string }>
	canSubmitQuestion: boolean
	isLoading: boolean
}

const STORAGE_KEY = 'pitch-user-name'
const QUESTIONS_COUNT_KEY = 'pitch-questions-count'

export function usePitchQuestions(): UsePitchQuestionsReturn {
	const [userName, setUserNameState] = useState<string | null>(null)
	const [questionsCount, setQuestionsCount] = useState<number>(0)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	// Cargar datos del localStorage al montar el componente
	useEffect(() => {
		const storedName = localStorage.getItem(STORAGE_KEY)
		const storedCount = localStorage.getItem(QUESTIONS_COUNT_KEY)

		if (storedName) {
			setUserNameState(storedName)
		}

		if (storedCount) {
			setQuestionsCount(parseInt(storedCount, 10))
		}
	}, [])

	const setUserName = (name: string) => {
		setUserNameState(name)
		localStorage.setItem(STORAGE_KEY, name)
	}

	const submitQuestion = async (question: string): Promise<{ success: boolean; error?: string }> => {
		if (!userName) {
			return { success: false, error: 'Nombre de usuario requerido' }
		}

		if (questionsCount >= 2) {
			return { success: false, error: 'Ya has enviado el máximo de 2 preguntas' }
		}

		if (!question.trim()) {
			return { success: false, error: 'La pregunta no puede estar vacía' }
		}

		setIsLoading(true)

		try {
			console.log('Enviando pregunta:', { name: userName, pregunta: question.trim() })

			const response = await fetch('/api/questions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: userName,
					pregunta: question.trim(),
				}),
			})

			const result = await response.json()

			if (!response.ok) {
				console.error('Error al enviar pregunta:', result.error)
				return { success: false, error: result.error || 'Error al enviar la pregunta' }
			}

			console.log('Pregunta enviada exitosamente:', result.data)

			// Incrementar contador de preguntas
			const newCount = questionsCount + 1
			setQuestionsCount(newCount)
			localStorage.setItem(QUESTIONS_COUNT_KEY, newCount.toString())

			return { success: true }
		} catch (error) {
			console.error('Error inesperado:', error)
			return {
				success: false,
				error: `Error inesperado: ${error instanceof Error ? error.message : 'Error desconocido'}`,
			}
		} finally {
			setIsLoading(false)
		}
	}

	const canSubmitQuestion = userName !== null && questionsCount < 2

	return {
		userName,
		questionsCount,
		setUserName,
		submitQuestion,
		canSubmitQuestion,
		isLoading,
	}
}
