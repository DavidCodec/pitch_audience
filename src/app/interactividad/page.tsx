'use client'

import { useState, useEffect } from 'react'
import { Button } from '@src/components/ui/button'
import { Input } from '@src/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@src/components/ui/card'
import { Badge } from '@src/components/ui/badge'
import { MessageSquare, ThumbsUp, BarChart3, UserPen, Send, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePitchQuestions } from '@src/hooks/usePitchQuestions'
import { UserNameModal } from '@src/components/UserNameModal'
import { RealtimeQuestionsList } from '@src/components/RealtimeQuestionsList'

export default function InteractividadPage() {
	const [pestanaActiva, setPestanaActiva] = useState<'preguntas' | 'encuestas' | 'contactos'>('preguntas')
	const [nuevaPregunta, setNuevaPregunta] = useState('')
	const [showUserNameModal, setShowUserNameModal] = useState(false)
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

	const { userName, questionsCount, setUserName, submitQuestion, canSubmitQuestion, isLoading } = usePitchQuestions()

	// Mostrar modal si no hay nombre de usuario
	useEffect(() => {
		if (!userName) {
			setShowUserNameModal(true)
		}
	}, [userName])

	const manejarEnviarPregunta = async () => {
		if (!nuevaPregunta.trim()) return

		const result = await submitQuestion(nuevaPregunta)

		if (result.success) {
			setNuevaPregunta('')
			setMessage({ type: 'success', text: '¡Pregunta enviada correctamente!' })
			setTimeout(() => setMessage(null), 3000)
		} else {
			setMessage({ type: 'error', text: result.error || 'Error al enviar la pregunta' })
			setTimeout(() => setMessage(null), 5000)
		}
	}

	const handleUserNameSubmit = (name: string) => {
		setUserName(name)
		setShowUserNameModal(false)
	}

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<div className="border-b bg-card">
				<div className="container mx-auto px-4 py-3 sm:py-4">
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
						<div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
							<Link href="/">
								<Button variant="ghost" size="sm" className="shrink-0">
									<ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
									<span className="hidden sm:inline">Volver</span>
								</Button>
							</Link>
							<h1 className="text-lg sm:text-xl lg:text-2xl font-bold truncate">Panel de Interactividad</h1>
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-4 sm:py-6">
				{/* Pestañas */}
				<div className="flex border-b mb-4 sm:mb-6 overflow-x-auto">
					{[
						{ id: 'preguntas', label: 'Preguntas', icon: MessageSquare, shortLabel: 'Preguntas' },
						{ id: 'encuestas', label: 'Encuestas', icon: BarChart3, shortLabel: 'Encuestas' },
						{ id: 'contactos', label: 'Contactos', icon: UserPen, shortLabel: 'Contactos' },
					].map(({ id, label, icon: Icon, shortLabel }) => (
						<button
							key={id}
							onClick={() => setPestanaActiva(id as 'preguntas' | 'encuestas' | 'contactos')}
							className={`flex-1 min-w-0 flex items-center justify-center space-x-1 sm:space-x-2 py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
								pestanaActiva === id
									? 'text-primary border-b-2 border-primary'
									: 'text-muted-foreground hover:text-foreground'
							}`}
						>
							<Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
							<span className="hidden xs:inline sm:inline">{label}</span>
							<span className="xs:hidden sm:hidden">{shortLabel}</span>
						</button>
					))}
				</div>

				{/* Contenido */}
				<motion.div
					key={pestanaActiva}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="max-w-4xl mx-auto"
				>
					{pestanaActiva === 'preguntas' && (
						<div className="space-y-4 sm:space-y-6">
							{/* Información del usuario */}
							{userName && (
								<Card className="bg-primary/5 border-primary/20">
									<CardContent className="pt-6">
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-2">
												<UserPen className="w-5 h-5 text-primary" />
												<span className="font-medium">Hola, {userName}</span>
											</div>
											<Badge variant="secondary" className="bg-primary/10 text-primary">
												{questionsCount}/2 preguntas
											</Badge>
										</div>
									</CardContent>
								</Card>
							)}

							{/* Mensaje de estado */}
							{message && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									className={`p-4 rounded-lg flex items-center space-x-2 ${
										message.type === 'success'
											? 'bg-green-50 text-green-700 border border-green-200'
											: 'bg-red-50 text-red-700 border border-red-200'
									}`}
								>
									{message.type === 'success' ? (
										<CheckCircle className="w-5 h-5" />
									) : (
										<AlertCircle className="w-5 h-5" />
									)}
									<span className="text-sm font-medium">{message.text}</span>
								</motion.div>
							)}

							{/* Formulario nueva pregunta */}
							<Card>
								<CardHeader className="pb-3 sm:pb-6">
									<CardTitle className="text-lg sm:text-xl">Hacer una pregunta</CardTitle>
									{!canSubmitQuestion && questionsCount >= 2 && (
										<p className="text-sm text-muted-foreground">Has alcanzado el límite de 2 preguntas</p>
									)}
								</CardHeader>
								<CardContent className="space-y-3 sm:space-y-4">
									<div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
										<Input
											placeholder="Escribe tu pregunta..."
											value={nuevaPregunta}
											onChange={(e) => setNuevaPregunta(e.target.value)}
											onKeyPress={(e) => e.key === 'Enter' && canSubmitQuestion && manejarEnviarPregunta()}
											className="flex-1"
											disabled={!canSubmitQuestion || isLoading}
											maxLength={500}
										/>
										<Button
											onClick={manejarEnviarPregunta}
											className="w-full sm:w-auto"
											disabled={!canSubmitQuestion || isLoading || !nuevaPregunta.trim()}
										>
											{isLoading ? (
												<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
											) : (
												<Send className="w-4 h-4 mr-2" />
											)}
											<span className="hidden sm:inline">{isLoading ? 'Enviando...' : 'Enviar'}</span>
										</Button>
									</div>
									<div className="flex justify-between items-center text-xs text-muted-foreground">
										<span>{nuevaPregunta.length}/500 caracteres</span>
										<span>{2 - questionsCount} preguntas restantes</span>
									</div>
								</CardContent>
							</Card>
						</div>
					)}

					{pestanaActiva === 'encuestas' && (
						<div className="space-y-4 sm:space-y-6">
							<div className="text-center space-y-2">
								<h2 className="text-lg sm:text-xl font-semibold">Preguntas en Vivo</h2>
								<p className="text-muted-foreground text-sm">
									Ve las preguntas que llegan en tiempo real durante el pitch
								</p>
							</div>
							<RealtimeQuestionsList />
						</div>
					)}

					{pestanaActiva === 'contactos' && (
						<div className="space-y-4 sm:space-y-6">
							<h2 className="text-lg sm:text-xl font-semibold">Contáctanos</h2>
							<Card>
								<CardContent className="pt-6">
									<div className="space-y-4">
										<div>
											<h3 className="font-medium text-sm sm:text-base mb-2">Información de contacto</h3>
											<p className="text-muted-foreground text-sm sm:text-base">
												¿Tienes alguna pregunta o sugerencia? ¡Nos encantaría escucharte!
											</p>
										</div>
										<div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
											<Button variant="outline" className="w-full sm:w-auto">
												<MessageSquare className="w-4 h-4 mr-2" />
												Enviar mensaje
											</Button>
											<Button variant="outline" className="w-full sm:w-auto">
												<ThumbsUp className="w-4 h-4 mr-2" />
												Dar feedback
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					)}
				</motion.div>
			</div>

			{/* Modal para capturar nombre de usuario */}
			<UserNameModal isOpen={showUserNameModal} onSubmit={handleUserNameSubmit} />
		</div>
	)
}
