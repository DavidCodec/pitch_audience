import { useState, useEffect, useRef, useCallback } from 'react'

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
	reconnect: () => void
}

export function useRealtimeQuestions(): UseRealtimeQuestionsReturn {
	const [questions, setQuestions] = useState<PitchQuestion[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [newQuestionCount, setNewQuestionCount] = useState<number>(0)
	const [isConnected, setIsConnected] = useState<boolean>(false)

	const eventSourceRef = useRef<EventSource | null>(null)
	const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
	const reconnectAttemptsRef = useRef<number>(0)
	const maxReconnectAttempts = 5
	const reconnectDelay = 3000 // 3 segundos

	// Detectar si es dispositivo móvil
	const isMobile =
		typeof window !== 'undefined' &&
		(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
			window.innerWidth <= 768)

	// Polling como fallback para móviles
	const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)
	const lastQuestionCountRef = useRef<number>(0)

	// Función para cargar preguntas iniciales
	const loadInitialQuestions = useCallback(async () => {
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
	}, [])

	// Función para polling como fallback
	const startPolling = useCallback(() => {
		if (pollingIntervalRef.current) {
			clearInterval(pollingIntervalRef.current)
		}

		console.log('📱 Iniciando polling como fallback para móvil')
		pollingIntervalRef.current = setInterval(async () => {
			try {
				const response = await fetch('/api/questions')
				const result = await response.json()

				if (response.ok && result.data) {
					const currentCount = result.data.length
					if (currentCount > lastQuestionCountRef.current) {
						// Hay nuevas preguntas
						const newQuestions = result.data.slice(0, currentCount - lastQuestionCountRef.current)
						setQuestions((prev) => [...newQuestions, ...prev])
						setNewQuestionCount((prev) => prev + newQuestions.length)
						lastQuestionCountRef.current = currentCount
					}
				}
			} catch (err) {
				console.error('Error en polling:', err)
			}
		}, 10000) // Polling cada 10 segundos
	}, [])

	// Función para detener polling
	const stopPolling = useCallback(() => {
		if (pollingIntervalRef.current) {
			clearInterval(pollingIntervalRef.current)
			pollingIntervalRef.current = null
		}
	}, [])

	// Función para conectar al realtime
	const connectToRealtime = useCallback(() => {
		if (eventSourceRef.current) {
			eventSourceRef.current.close()
		}

		console.log('🔄 Conectando a preguntas en tiempo real...')
		const eventSource = new EventSource('/api/questions/stream')
		eventSourceRef.current = eventSource

		eventSource.onopen = () => {
			console.log('✅ Conectado a preguntas en tiempo real')
			setIsConnected(true)
			setError(null)
			reconnectAttemptsRef.current = 0
		}

		eventSource.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data)

				switch (data.type) {
					case 'connected':
						console.log('✅ Suscrito a preguntas en tiempo real')
						setIsConnected(true)
						setError(null)
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
						setIsConnected(false)
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
			setIsConnected(false)

			// Intentar reconectar automáticamente
			if (reconnectAttemptsRef.current < maxReconnectAttempts) {
				reconnectAttemptsRef.current++
				const delay = reconnectDelay * Math.pow(2, reconnectAttemptsRef.current - 1) // Backoff exponencial

				console.log(
					`🔄 Reintentando conexión en ${delay}ms (intento ${reconnectAttemptsRef.current}/${maxReconnectAttempts})`,
				)

				reconnectTimeoutRef.current = setTimeout(() => {
					connectToRealtime()
				}, delay)
			} else {
				// Si es móvil y falló la conexión, usar polling como fallback
				if (isMobile) {
					console.log('📱 Activando polling como fallback para móvil')
					startPolling()
					setError('Usando modo de actualización automática (móvil)')
				} else {
					setError('Error de conexión en tiempo real. Toca para reintentar.')
				}
				console.error('❌ Máximo de intentos de reconexión alcanzado')
			}
		}
	}, [isMobile, startPolling])

	// Función para reconectar
	const reconnect = useCallback(() => {
		if (eventSourceRef.current) {
			eventSourceRef.current.close()
		}

		if (reconnectTimeoutRef.current) {
			clearTimeout(reconnectTimeoutRef.current)
		}

		stopPolling()
		reconnectAttemptsRef.current = 0
		setError(null)
		setIsConnected(false)

		// Reconectar inmediatamente
		setTimeout(() => {
			connectToRealtime()
		}, 1000)
	}, [stopPolling, connectToRealtime])

	// Efecto principal
	useEffect(() => {
		loadInitialQuestions()
		connectToRealtime()

		// Detectar cuando la página se vuelve visible (importante para móviles)
		const handleVisibilityChange = () => {
			if (document.visibilityState === 'visible' && !isConnected) {
				console.log('📱 Página visible, reconectando...')
				reconnect()
			}
		}

		document.addEventListener('visibilitychange', handleVisibilityChange)

		// Cleanup al desmontar
		return () => {
			console.log('Desuscribiéndose de preguntas en tiempo real')
			if (eventSourceRef.current) {
				eventSourceRef.current.close()
			}
			if (reconnectTimeoutRef.current) {
				clearTimeout(reconnectTimeoutRef.current)
			}
			stopPolling()
			document.removeEventListener('visibilitychange', handleVisibilityChange)
		}
	}, [loadInitialQuestions, connectToRealtime, isConnected, reconnect, stopPolling])

	return {
		questions,
		isLoading,
		error,
		newQuestionCount,
		reconnect,
	}
}
