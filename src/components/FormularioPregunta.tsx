'use client'

import { useState, useEffect } from 'react'
import { Send, CheckCircle, AlertCircle, User } from 'lucide-react'
import { usePitchQuestions } from '@src/hooks/usePitchQuestions'

export function FormularioPregunta() {
	const [nombre, setNombre] = useState('')
	const [pregunta, setPregunta] = useState('')
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const { submitQuestion } = usePitchQuestions()

	// Cargar nombre guardado del localStorage
	useEffect(() => {
		const storedName = localStorage.getItem('pitch-user-name')
		if (storedName) {
			setNombre(storedName)
		}
	}, [])

	const manejarEnviarPregunta = async () => {
		if (!nombre.trim() || !pregunta.trim()) {
			setMessage({ type: 'error', text: 'Por favor completa todos los campos' })
			setTimeout(() => setMessage(null), 3000)
			return
		}

		setIsLoading(true)

		try {
			// Guardar nombre en localStorage
			localStorage.setItem('pitch-user-name', nombre.trim())

			const result = await submitQuestion(pregunta.trim())

			if (result.success) {
				setPregunta('')
				setMessage({ type: 'success', text: '¡Pregunta enviada correctamente!' })
				setTimeout(() => setMessage(null), 3000)
			} else {
				setMessage({ type: 'error', text: result.error || 'Error al enviar la pregunta' })
				setTimeout(() => setMessage(null), 5000)
			}
		} catch {
			setMessage({ type: 'error', text: 'Error inesperado al enviar la pregunta' })
			setTimeout(() => setMessage(null), 5000)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 max-w-md w-full">
			<h3 className="text-2xl font-bold text-white mb-4 text-center">Haz tu pregunta</h3>

			{/* Mensaje de estado */}
			{message && (
				<div
					className={`mb-4 p-3 rounded-lg flex items-center space-x-2 ${
						message.type === 'success'
							? 'bg-green-500/20 text-green-200 border border-green-400/30'
							: 'bg-red-500/20 text-red-200 border border-red-400/30'
					}`}
				>
					{message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
					<span className="text-sm font-medium">{message.text}</span>
				</div>
			)}

			<div className="space-y-4">
				{/* Campo de nombre */}
				<div>
					<label className="block text-white text-sm font-medium mb-2">Tu nombre</label>
					<div className="relative">
						<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
						<input
							type="text"
							value={nombre}
							onChange={(e) => setNombre(e.target.value)}
							placeholder="Escribe tu nombre"
							className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
						/>
					</div>
				</div>

				{/* Campo de pregunta */}
				<div>
					<label className="block text-white text-sm font-medium mb-2">Tu pregunta</label>
					<textarea
						value={pregunta}
						onChange={(e) => setPregunta(e.target.value)}
						placeholder="¿Qué te gustaría saber sobre Solhub?"
						rows={4}
						maxLength={500}
						className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
					/>
					<div className="text-right text-white/60 text-xs mt-1">{pregunta.length}/500 caracteres</div>
				</div>

				{/* Botón de envío */}
				<button
					onClick={manejarEnviarPregunta}
					disabled={!nombre.trim() || !pregunta.trim() || isLoading}
					className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
				>
					{isLoading ? (
						<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
					) : (
						<Send className="w-4 h-4" />
					)}
					<span>{isLoading ? 'Enviando...' : 'Enviar Pregunta'}</span>
				</button>
			</div>
		</div>
	)
}
