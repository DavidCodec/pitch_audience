'use client'

import { useState, useEffect } from 'react'
import { Button } from '@src/components/ui/button'
import { Progress } from '@src/components/ui/progress'
import { ChevronLeft, ChevronRight, Home, Maximize, Minimize, Menu, ArrowLeft } from 'lucide-react'
import { cn } from '@src/lib/utils'
import Link from 'next/link'

interface DeckControlsProps {
	slideActual: number
	totalSlides: number
	onCambiarSlide: (slide: number) => void
}

const secciones = [
	{ nombre: 'Portada', slide: 0 },
	{ nombre: 'Problema', slide: 2 },
	{ nombre: 'Solución', slide: 4 },
	{ nombre: 'Mercado', slide: 7 },
	{ nombre: 'Negocio', slide: 9 },
	{ nombre: 'Equipo', slide: 12 },
]

export function DeckControls({ slideActual, totalSlides, onCambiarSlide }: DeckControlsProps) {
	const [pantallaCompleta, setPantallaCompleta] = useState(false)
	const [mostrarMiniMapa, setMostrarMiniMapa] = useState(false)

	const progreso = ((slideActual + 1) / totalSlides) * 100

	// Navegación por teclado
	useEffect(() => {
		const manejarTecla = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'ArrowLeft':
					if (slideActual > 0) onCambiarSlide(slideActual - 1)
					break
				case 'ArrowRight':
				case ' ': // Tecla espacio
					e.preventDefault()
					if (slideActual < totalSlides - 1) onCambiarSlide(slideActual + 1)
					break
				case 'Home':
					onCambiarSlide(0)
					break
				case 'End':
					onCambiarSlide(totalSlides - 1)
					break
				case 'f':
				case 'F11':
					e.preventDefault()
					togglePantallaCompleta()
					break
			}
		}

		window.addEventListener('keydown', manejarTecla)
		return () => window.removeEventListener('keydown', manejarTecla)
	}, [slideActual, totalSlides, onCambiarSlide])

	const togglePantallaCompleta = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen()
			setPantallaCompleta(true)
		} else {
			document.exitFullscreen()
			setPantallaCompleta(false)
		}
	}

	return (
		<>
			{/* Contenedor con hover para mostrar barra superior */}
			{/* Barra de progreso superior - aparece con hover */}
			<div className="top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
				<Progress value={progreso} className="h-1 rounded-none" />
				<div className="flex items-center justify-between px-2 sm:px-4 py-2">
					<div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
						<Link href="/">
							<Button variant="ghost" size="sm" className="text-xs sm:text-sm">
								<ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
								<span className="hidden sm:inline">Volver</span>
							</Button>
						</Link>
						<span className="text-xs sm:text-sm font-medium hidden sm:inline">
							{slideActual + 1} / {totalSlides}
						</span>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setMostrarMiniMapa(!mostrarMiniMapa)}
							className="p-1 sm:p-2"
						>
							<Menu className="w-3 h-3 sm:w-4 sm:h-4" />
						</Button>
					</div>

					<div className="flex items-center space-x-1 sm:space-x-2">
						<div className="flex items-center rounded-md">
							<Button
								variant="ghost"
								size="sm"
								onClick={() => onCambiarSlide(0)}
								disabled={slideActual === 0}
								className="p-1 sm:p-2"
							>
								<Home className="w-3 h-3 sm:w-4 sm:h-4" />
							</Button>

							<Button
								variant="ghost"
								size="sm"
								onClick={() => onCambiarSlide(slideActual - 1)}
								disabled={slideActual === 0}
								className="p-1 sm:p-2"
							>
								<ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
							</Button>

							<span className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium min-w-[60px] sm:min-w-[80px] text-center">
								{slideActual + 1} / {totalSlides}
							</span>

							<Button
								variant="ghost"
								size="sm"
								onClick={() => onCambiarSlide(slideActual + 1)}
								disabled={slideActual === totalSlides - 1}
								className="p-1 sm:p-2"
							>
								<ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
							</Button>
						</div>
						<Button variant="ghost" size="sm" onClick={togglePantallaCompleta} className="p-1 sm:p-2">
							{pantallaCompleta ? (
								<Minimize className="w-3 h-3 sm:w-4 sm:h-4" />
							) : (
								<Maximize className="w-3 h-3 sm:w-4 sm:h-4" />
							)}
						</Button>
					</div>
				</div>
			</div>

			{/* Mini-mapa de secciones */}
			{mostrarMiniMapa && (
				<div className="fixed top-12 sm:top-16 left-2 sm:left-4 right-2 sm:right-auto z-50 bg-card border rounded-lg shadow-lg p-3 sm:p-4 w-auto sm:w-64">
					<h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Secciones</h3>
					<div className="space-y-1 sm:space-y-2">
						{secciones.map((seccion) => (
							<button
								key={seccion.slide}
								onClick={() => {
									onCambiarSlide(seccion.slide)
									setMostrarMiniMapa(false)
								}}
								className={cn(
									'w-full text-left px-2 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm transition-colors',
									slideActual >= seccion.slide &&
										slideActual < (secciones[secciones.indexOf(seccion) + 1]?.slide || totalSlides)
										? 'bg-primary text-primary-foreground'
										: 'hover:bg-muted',
								)}
							>
								{seccion.nombre}
							</button>
						))}
					</div>
				</div>
			)}
		</>
	)
}
