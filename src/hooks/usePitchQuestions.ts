import { useState, useEffect } from 'react'

interface UsePitchQuestionsReturn {
	userName: string | null
	setUserName: (name: string) => void
	submitQuestion: (question: string) => Promise<{ success: boolean; error?: string }>
	isLoading: boolean
	isInitialized: boolean
}

const STORAGE_KEY = 'pitch-user-name'

export function usePitchQuestions(): UsePitchQuestionsReturn {
	const [userName, setUserNameState] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isInitialized, setIsInitialized] = useState<boolean>(false)

	// Cargar datos del localStorage al montar el componente
	useEffect(() => {
		const storedName = localStorage.getItem(STORAGE_KEY)

		if (storedName) {
			setUserNameState(storedName)
		}

		// Marcar como inicializado después de verificar localStorage
		setIsInitialized(true)
	}, [])

	const setUserName = (name: string) => {
		setUserNameState(name)
		localStorage.setItem(STORAGE_KEY, name)
	}

	const submitQuestion = async (question: string): Promise<{ success: boolean; error?: string }> => {
		if (!question.trim()) {
			return { success: false, error: 'La pregunta no puede estar vacía' }
		}

		setIsLoading(true)

		try {
			console.log('Enviando pregunta:', { name: userName || 'Usuario', pregunta: question.trim() })

			const response = await fetch('/api/questions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: userName || 'Usuario',
					pregunta: question.trim(),
				}),
			})

			const result = await response.json()

			if (!response.ok) {
				console.error('Error al enviar pregunta:', result.error)
				return { success: false, error: result.error || 'Error al enviar la pregunta' }
			}

			console.log('Pregunta enviada exitosamente:', result.data)

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

	return {
		userName,
		setUserName,
		submitQuestion,
		isLoading,
		isInitialized,
	}
}
