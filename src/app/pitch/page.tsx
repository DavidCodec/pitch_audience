'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DeckControls } from '@src/components/DeckControls'
import {
	Portada,
	ResumenProblema,
	Solucion,
	Mercado,
	Negocio,
	Traccion,
	Roadmap,
	Riesgos,
	Equipo,
	CTA,
} from '@src/slides'

const slides = [
	// Slide 1: Portada
	{
		id: 'portada',
		component: Portada,
	},

	// Slide 2: Resumen Ejecutivo
	{
		id: 'resumen',
		component: ResumenProblema,
	},

	// Slide 4: Solución
	{
		id: 'solucion',
		component: Solucion,
	},

	// Slide 6: Mercado
	{
		id: 'mercado',
		component: Mercado,
	},

	// Slide 8: Negocio
	{
		id: 'negocio',
		component: Negocio,
	},

	// Slide 9: Tracción
	{
		id: 'traccion',
		component: Traccion,
	},

	// Slide 10: Roadmap
	{
		id: 'roadmap',
		component: Roadmap,
	},

	// Slide 11: Riesgos
	{
		id: 'riesgos',
		component: Riesgos,
	},

	// Slide 12: Equipo
	{
		id: 'equipo',
		component: Equipo,
	},

	// Slide 13: CTA
	{
		id: 'cta',
		component: CTA,
	},
]

export default function SlidesPage() {
	const [slideActual, setSlideActual] = useState(0)

	const totalSlides = slides.length

	const cambiarSlide = (nuevoSlide: number) => {
		if (nuevoSlide >= 0 && nuevoSlide < totalSlides) {
			setSlideActual(nuevoSlide)
		}
	}

	return (
		<div className="min-h-screen w-full">
			<DeckControls slideActual={slideActual} totalSlides={totalSlides} onCambiarSlide={cambiarSlide} />

			<div>
				<AnimatePresence mode="wait">
					<motion.div key={slideActual} className="w-full">
						{slides[slideActual].component()}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	)
}
