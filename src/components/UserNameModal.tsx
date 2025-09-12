'use client'

import { useState } from 'react'
import { Button } from '@src/components/ui/button'
import { Input } from '@src/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@src/components/ui/card'
import { User, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface UserNameModalProps {
	isOpen: boolean
	onSubmit: (name: string) => void
}

export function UserNameModal({ isOpen, onSubmit }: UserNameModalProps) {
	const [name, setName] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (name.trim()) {
			onSubmit(name.trim())
		}
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.95 }}
				transition={{ duration: 0.2 }}
			>
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
							<User className="w-6 h-6 text-primary" />
						</div>
						<CardTitle className="text-xl">¡Bienvenido!</CardTitle>
						<p className="text-muted-foreground text-sm">Para participar en el pitch, necesitamos tu nombre</p>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<Input
									placeholder="Tu nombre completo"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="w-full"
									autoFocus
									maxLength={50}
								/>
								<p className="text-xs text-muted-foreground mt-1">Podrás enviar hasta 2 preguntas durante el pitch</p>
							</div>
							<Button type="submit" className="w-full" disabled={!name.trim()}>
								Continuar
								<ArrowRight className="w-4 h-4 ml-2" />
							</Button>
						</form>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	)
}
