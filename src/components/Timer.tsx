'use client'

import { useState, useEffect } from 'react'
import { Button } from '@src/components/ui/button'
import { Input } from '@src/components/ui/input'
import { Clock, Play, Pause, RotateCcw, Settings } from 'lucide-react'
import { cn } from '@src/lib/utils'
import { useTimer } from '@src/hooks/useTimer'

interface TimerProps {
	className?: string
	defaultDuration?: number // en segundos
	onTimeUp?: () => void
	showSettings?: boolean
	autoStart?: boolean // para iniciar automáticamente
}

export function Timer({
	className,
	defaultDuration = 3 * 60, // 3 minutos por defecto
	onTimeUp,
	showSettings = true,
	autoStart = false,
}: TimerProps) {
	const [mostrarConfiguracion, setMostrarConfiguracion] = useState(false)
	const [inputTiempo, setInputTiempo] = useState('')
	const [modoCompacto, setModoCompacto] = useState(true)
	const [hovering, setHovering] = useState(false)

	// Usar el hook personalizado para el timer
	const {
		tiempoRestante,
		activo,
		progreso,
		tiempoAgotado,
		tiempoCritico,
		iniciar,
		pausar,
		reiniciar,
		configurarTiempo,
		formatearTiempo,
		segundosATiempo,
		parsearTiempo,
	} = useTimer({
		defaultDuration,
		onTimeUp,
	})

	// Inicializar el input con el tiempo por defecto
	if (!inputTiempo) {
		setInputTiempo(segundosATiempo(defaultDuration))
	}

	// Efecto para iniciar automáticamente el timer
	useEffect(() => {
		if (autoStart) {
			// Reiniciar el timer completamente y luego iniciarlo
			reiniciar()
			// Usar setTimeout para asegurar que el reinicio se complete antes de iniciar
			setTimeout(() => {
				iniciar()
			}, 10)
		}
	}, [autoStart, reiniciar, iniciar])

	// Función para formatear input mientras se escribe
	const formatearInputTiempo = (valor: string): string => {
		// Remover caracteres no numéricos excepto ':'
		let limpio = valor.replace(/[^\d:]/g, '')

		// Si no tiene ':', permitir hasta 2 dígitos
		if (!limpio.includes(':')) {
			if (limpio.length > 2) {
				limpio = limpio.substring(0, 2)
			}
		} else {
			// Si tiene ':', dividir en minutos y segundos
			const [minutos, segundos] = limpio.split(':')
			let minutosLimpio = minutos.substring(0, 2)
			let segundosLimpio = segundos ? segundos.substring(0, 2) : ''

			// Limitar segundos a 59
			if (segundosLimpio && parseInt(segundosLimpio) > 59) {
				segundosLimpio = '59'
			}

			limpio = minutosLimpio + ':' + segundosLimpio
		}

		return limpio
	}

	const aplicarTiempoPersonalizado = () => {
		const tiempoEnSegundos = parsearTiempo(inputTiempo)
		if (tiempoEnSegundos > 0) {
			configurarTiempo(tiempoEnSegundos)
			setMostrarConfiguracion(false)
		}
	}

	const resetearTiempo = () => {
		setInputTiempo(segundosATiempo(defaultDuration))
		configurarTiempo(defaultDuration)
		setMostrarConfiguracion(false)
	}

	// Función para alternar modo compacto
	const toggleModoCompacto = () => {
		setModoCompacto(!modoCompacto)
	}

	return (
		<div className={cn('fixed bottom-4 right-4 z-50', className)}>
			{/* Timer principal */}
			<div
				className={cn(
					'bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg transition-all duration-300',
					tiempoAgotado && 'bg-red-50 border-red-200',
					tiempoCritico && 'bg-orange-50 border-orange-200',
					modoCompacto && !hovering ? 'p-2' : 'p-3',
				)}
				onMouseEnter={() => setHovering(true)}
				onMouseLeave={() => setHovering(false)}
			>
				{/* Modo compacto - solo número */}
				{modoCompacto && !hovering ? (
					<div className="flex items-center justify-center">
						<span
							className={cn(
								'font-mono text-lg font-bold cursor-pointer transition-colors duration-200',
								tiempoAgotado ? 'text-red-600' : tiempoCritico ? 'text-orange-600' : 'text-gray-900',
								'hover:text-blue-600',
							)}
							onClick={toggleModoCompacto}
							title="Click para expandir o hacer hover para controles"
						>
							{formatearTiempo(tiempoRestante)}
						</span>
					</div>
				) : (
					/* Modo expandido - controles completos */
					<div className="space-y-2">
						<div className="flex items-center justify-between gap-2">
							{/* Icono y tiempo */}
							<div className="flex items-center space-x-2">
								<Clock
									className={cn(
										'w-4 h-4',
										tiempoAgotado ? 'text-red-600' : tiempoCritico ? 'text-orange-600' : 'text-gray-600',
									)}
								/>
								<span
									className={cn(
										'font-mono text-lg font-bold',
										tiempoAgotado ? 'text-red-600' : tiempoCritico ? 'text-orange-600' : 'text-gray-900',
									)}
								>
									{formatearTiempo(tiempoRestante)}
								</span>
							</div>

							{/* Controles */}
							<div className="flex items-center space-x-1">
								{!activo ? (
									<Button size="sm" onClick={iniciar} className="h-7 w-7 p-0" disabled={tiempoAgotado}>
										<Play className="w-3 h-3" />
									</Button>
								) : (
									<Button size="sm" variant="outline" onClick={pausar} className="h-7 w-7 p-0">
										<Pause className="w-3 h-3" />
									</Button>
								)}

								<Button size="sm" variant="outline" onClick={reiniciar} className="h-7 w-7 p-0">
									<RotateCcw className="w-3 h-3" />
								</Button>

								{showSettings && (
									<Button
										size="sm"
										variant="outline"
										onClick={() => setMostrarConfiguracion(!mostrarConfiguracion)}
										className="h-7 w-7 p-0"
									>
										<Settings className="w-3 h-3" />
									</Button>
								)}
							</div>
						</div>

						{/* Barra de progreso */}
						<div className="w-full bg-gray-200 rounded-full h-1">
							<div
								className={cn(
									'h-1 rounded-full transition-all duration-1000',
									tiempoAgotado ? 'bg-red-500' : tiempoCritico ? 'bg-orange-500' : 'bg-blue-500',
								)}
								style={{ width: `${progreso}%` }}
							/>
						</div>

						{/* Mensajes de estado */}
						{tiempoAgotado && <div className="text-xs text-red-600 font-medium text-center">⏰ Tiempo agotado</div>}
						{tiempoCritico && !tiempoAgotado && (
							<div className="text-xs text-orange-600 font-medium text-center">⚠️ Último minuto</div>
						)}
					</div>
				)}
			</div>

			{/* Panel de configuración */}
			{mostrarConfiguracion && (
				<div className="absolute bottom-full right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64">
					<div className="flex items-center justify-between mb-3">
						<h3 className="font-medium text-sm">Configurar Tiempo</h3>
					</div>

					<div className="space-y-3">
						<div>
							<label className="text-xs text-gray-600 mb-1 block">Duración (MM:SS)</label>
							<Input
								type="text"
								value={inputTiempo}
								onChange={(e) => {
									const valorFormateado = formatearInputTiempo(e.target.value)
									setInputTiempo(valorFormateado)
								}}
								placeholder="15:00"
								className="text-sm"
								maxLength={5}
							/>
							<div className="text-xs text-gray-500 mt-1">Ejemplos: 5 (5 min), 5:30 (5 min 30 seg)</div>
						</div>

						<div className="flex space-x-2">
							<Button size="sm" onClick={aplicarTiempoPersonalizado} className="flex-1 text-xs">
								Aplicar
							</Button>
							<Button size="sm" variant="outline" onClick={resetearTiempo} className="text-xs">
								Reset
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
