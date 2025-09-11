'use client'

import { useState } from 'react'
import { Button } from '@src/components/ui/button'
import { Input } from '@src/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@src/components/ui/card'
import { Badge } from '@src/components/ui/badge'
import { MessageSquare, ThumbsUp, BarChart3, UserPen, Send, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function InteractividadPage() {
	const [pestanaActiva, setPestanaActiva] = useState<'preguntas' | 'encuestas' | 'contactos'>('contactos')
	const [nuevaPregunta, setNuevaPregunta] = useState('')
	const [nombreUsuario, setNombreUsuario] = useState('')

	const manejarEnviarPregunta = () => {
		if (nuevaPregunta.trim() && nombreUsuario.trim()) {
			console.log('Pregunta enviada:', { pregunta: nuevaPregunta, autor: nombreUsuario })
			setNuevaPregunta('')
		}
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
							{/* Formulario nueva pregunta */}
							<Card>
								<CardHeader className="pb-3 sm:pb-6">
									<CardTitle className="text-lg sm:text-xl">Hacer una pregunta</CardTitle>
								</CardHeader>
								<CardContent className="space-y-3 sm:space-y-4">
									<Input
										placeholder="Tu nombre"
										value={nombreUsuario}
										onChange={(e) => setNombreUsuario(e.target.value)}
										className="w-full"
									/>
									<div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
										<Input
											placeholder="Escribe tu pregunta..."
											value={nuevaPregunta}
											onChange={(e) => setNuevaPregunta(e.target.value)}
											onKeyPress={(e) => e.key === 'Enter' && manejarEnviarPregunta()}
											className="flex-1"
										/>
										<Button onClick={manejarEnviarPregunta} className="w-full sm:w-auto">
											<Send className="w-4 h-4 mr-2" />
											<span className="hidden sm:inline">Enviar</span>
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					)}

					{pestanaActiva === 'encuestas' && (
						<div className="space-y-4 sm:space-y-6">
							<h2 className="text-lg sm:text-xl font-semibold">Encuestas en vivo</h2>
							<Card>
								<CardContent className="pt-6">
									<p className="text-muted-foreground text-sm sm:text-base">
										Las encuestas en vivo aparecerán aquí cuando estén disponibles.
									</p>
								</CardContent>
							</Card>
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
		</div>
	)
}
