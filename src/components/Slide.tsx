'use client'

import { ReactNode } from 'react'

import { motion } from 'framer-motion'

import { cn } from '@src/lib/utils'

interface SlideProps {
	children: ReactNode
	className?: string
	variante?: 'denso' | 'visual' | 'titulo'
	fondo?: string
}

export function Slide({ children, className, variante = 'denso', fondo }: SlideProps) {
	const variantes = {
		denso: 'p-2 sm:p-3 md:p-4 lg:p-6 text-left',
		visual: 'p-2 sm:p-3 md:p-4 text-center flex flex-col items-center justify-center',
		titulo: 'p-3 sm:p-4 md:p-6 lg:p-8 text-center flex flex-col items-center justify-center',
	}

	return (
		<motion.div
			initial={{
				opacity: 0,
				x: 50,
			}}
			animate={{
				opacity: 1,
				x: 0,
			}}
			exit={{
				opacity: 0,
				x: -50,
			}}
			transition={{
				duration: 0.3,
			}}
			className={cn(
				'min-h-screen w-full flex flex-col box-border overflow-y-auto',
				variantes[variante],
				fondo && `bg-gradient-to-br ${fondo}`,
				className,
			)}
		>
			<div className="flex-1 w-full flex flex-col"> {children}</div>
		</motion.div>
	)
}

interface TituloSlideProps {
	children: ReactNode
	subtitulo?: string
	className?: string
}

export function TituloSlide({ children, subtitulo, className }: TituloSlideProps) {
	return (
		<div className={cn('space-y-2 sm:space-y-3 md:space-y-4 flex flex-col justify-center', className)}>
			<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-primary leading-tight">
				{' '}
				{children}
			</h1>
			{subtitulo && (
				<p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-muted-foreground max-w-4xl">
					{' '}
					{subtitulo}
				</p>
			)}
		</div>
	)
}

interface ContenidoSlideProps {
	titulo: string
	children: ReactNode
	className?: string
}

export function ContenidoSlide({ titulo, children, className }: ContenidoSlideProps) {
	return (
		<div className={cn('space-y-2 sm:space-y-3 md:space-y-4 flex flex-col h-full w-full max-w-7xl mx-auto', className)}>
			<h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary border-b-2 border-primary pb-1 sm:pb-2 flex-shrink-0">
				{titulo}
			</h2>
			<div className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed flex-1">
				{children}
			</div>
		</div>
	)
}

interface ListaSlideProps {
	items: string[]
	className?: string
}

export function ListaSlide({ items, className }: ListaSlideProps) {
	return (
		<ul className={cn('space-y-1 sm:space-y-2 md:space-y-3 h-full', className)}>
			{items.map((item: any, index: any) => (
				<motion.li
					key={index}
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: index * 0.1 }}
					className="flex items-start space-x-2 sm:space-x-3 text-sm sm:text-base md:text-lg"
				>
					<span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
						{index + 1}
					</span>
					<span className="leading-tight">{item}</span>
				</motion.li>
			))}
		</ul>
	)
}
