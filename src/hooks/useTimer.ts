'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface UseTimerOptions {
	defaultDuration?: number // en segundos
	onTimeUp?: () => void
}

export function useTimer({ defaultDuration = 180, onTimeUp }: UseTimerOptions = {}) {
	const [tiempoRestante, setTiempoRestante] = useState(defaultDuration)
	const [tiempoInicial, setTiempoInicial] = useState(defaultDuration)
	const [activo, setActivo] = useState(false)
	const [tiempoPersonalizado, setTiempoPersonalizado] = useState(defaultDuration)

	// Usar useRef para mantener referencias estables que no causen re-renders
	const intervaloRef = useRef<NodeJS.Timeout | null>(null)
	const ultimoTiempoRef = useRef<number>(Date.now())
	const tiempoInicialRef = useRef<number>(defaultDuration)
	const activoRef = useRef<boolean>(false)

	// Función para limpiar el intervalo
	const limpiarIntervalo = useCallback(() => {
		if (intervaloRef.current) {
			clearInterval(intervaloRef.current)
			intervaloRef.current = null
		}
	}, [])

	// Función para iniciar el timer
	const iniciar = useCallback(() => {
		activoRef.current = true
		setActivo(true)
		ultimoTiempoRef.current = Date.now()
	}, [])

	// Función para pausar el timer
	const pausar = useCallback(() => {
		activoRef.current = false
		setActivo(false)
		limpiarIntervalo()
	}, [])

	// Función para reiniciar el timer
	const reiniciar = useCallback(() => {
		activoRef.current = false
		setActivo(false)
		setTiempoRestante(tiempoInicialRef.current)
		limpiarIntervalo()
	}, [])

	// Función para configurar tiempo personalizado
	const configurarTiempo = useCallback(
		(nuevoTiempo: number) => {
			if (nuevoTiempo > 0) {
				tiempoInicialRef.current = nuevoTiempo
				setTiempoInicial(nuevoTiempo)
				setTiempoRestante(nuevoTiempo)
				setTiempoPersonalizado(nuevoTiempo)
				activoRef.current = false
				setActivo(false)
				limpiarIntervalo()
			}
		},
		[limpiarIntervalo],
	)

	// Timer principal con alta precisión
	useEffect(() => {
		if (activo && tiempoRestante > 0) {
			// Limpiar cualquier intervalo existente
			limpiarIntervalo()

			// Usar requestAnimationFrame para mayor precisión
			const actualizarTimer = () => {
				if (!activoRef.current || tiempoRestante <= 0) {
					limpiarIntervalo()
					return
				}

				const ahora = Date.now()
				const tiempoTranscurrido = (ahora - ultimoTiempoRef.current) / 1000

				if (tiempoTranscurrido >= 1) {
					setTiempoRestante((prev) => {
						const nuevoTiempo = prev - Math.floor(tiempoTranscurrido)

						if (nuevoTiempo <= 0) {
							activoRef.current = false
							setActivo(false)
							onTimeUp?.()
							limpiarIntervalo()
							return 0
						}

						ultimoTiempoRef.current = ahora
						return nuevoTiempo
					})
				}

				// Programar la siguiente actualización
				intervaloRef.current = setTimeout(actualizarTimer, 100)
			}

			// Iniciar el timer
			actualizarTimer()
		} else {
			limpiarIntervalo()
		}

		return limpiarIntervalo
	}, [activo, tiempoRestante, onTimeUp, limpiarIntervalo])

	// Limpiar al desmontar
	useEffect(() => {
		return limpiarIntervalo
	}, [limpiarIntervalo])

	// Función para formatear tiempo (MM:SS)
	const formatearTiempo = useCallback((segundos: number): string => {
		const minutos = Math.floor(segundos / 60)
		const segs = segundos % 60
		return `${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`
	}, [])

	// Función para convertir segundos a formato MM:SS
	const segundosATiempo = useCallback((segundos: number): string => {
		const minutos = Math.floor(segundos / 60)
		const segs = segundos % 60
		return `${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`
	}, [])

	// Función para convertir tiempo de input (MM:SS) a segundos
	const parsearTiempo = useCallback((tiempoStr: string): number => {
		if (!tiempoStr || tiempoStr === '') return 0
		const partes = tiempoStr.split(':')
		if (partes.length === 1) {
			// Solo minutos
			return parseInt(partes[0]) * 60
		}
		const minutos = parseInt(partes[0]) || 0
		const segundos = parseInt(partes[1]) || 0
		return minutos * 60 + segundos
	}, [])

	const progreso = ((tiempoInicial - tiempoRestante) / tiempoInicial) * 100
	const tiempoAgotado = tiempoRestante === 0
	const tiempoCritico = tiempoRestante <= 60 && tiempoRestante > 0

	return {
		// Estado
		tiempoRestante,
		tiempoInicial,
		activo,
		tiempoPersonalizado,
		progreso,
		tiempoAgotado,
		tiempoCritico,

		// Acciones
		iniciar,
		pausar,
		reiniciar,
		configurarTiempo,

		// Utilidades
		formatearTiempo,
		segundosATiempo,
		parsearTiempo,
	}
}
