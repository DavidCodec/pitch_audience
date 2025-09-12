'use client'

import { Card, CardContent } from '@src/components/ui/card'
import { Badge } from '@src/components/ui/badge'
import { MessageSquare, User, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { PitchQuestion } from '@src/lib/supabase'

interface QuestionCardProps {
	question: PitchQuestion
	index: number
}

export function QuestionCard({ question, index }: QuestionCardProps) {
	const formatTime = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleTimeString('es-ES', {
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	const getTimeAgo = (dateString: string) => {
		const now = new Date()
		const date = new Date(dateString)
		const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

		if (diffInSeconds < 60) {
			return 'hace un momento'
		} else if (diffInSeconds < 3600) {
			const minutes = Math.floor(diffInSeconds / 60)
			return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`
		} else {
			const hours = Math.floor(diffInSeconds / 3600)
			return `hace ${hours} hora${hours > 1 ? 's' : ''}`
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20, scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{
				duration: 0.5,
				delay: index * 0.1,
				ease: 'easeOut',
			}}
			className="group overflow-hidden"
		>
			<Card className="border-l-4 border-l-primary/50 bg-gradient-to-r from-background to-primary/5">
				<CardContent className="pt-6">
					<div className="space-y-4">
						{/* Header con nombre y tiempo */}
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
									<User className="w-5 h-5 text-primary" />
								</div>
								<div>
									<span className="font-semibold text-sm text-foreground">{question.name}</span>
									<div className="flex items-center space-x-1 text-xs text-muted-foreground">
										<Clock className="w-3 h-3" />
										<span>{formatTime(question.created_at!)}</span>
									</div>
								</div>
							</div>
							<Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
								#{question.id}
							</Badge>
						</div>

						{/* Pregunta */}
						<div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 border border-primary/10">
							<div className="flex items-start space-x-3">
								<MessageSquare className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
								<p className="text-sm leading-relaxed text-foreground font-medium">{question.pregunta}</p>
							</div>
						</div>

						{/* Indicador de tiempo transcurrido */}
						<div className="flex justify-end">
							<span className="text-xs text-muted-foreground">{getTimeAgo(question.created_at!)}</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	)
}
