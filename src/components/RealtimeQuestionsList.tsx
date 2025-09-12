'use client'

import { useRealtimeQuestions } from '@src/hooks/useRealtimeQuestions'
import { QuestionCard } from '@src/components/QuestionCard'
import { Card, CardContent, CardHeader, CardTitle } from '@src/components/ui/card'
import { Badge } from '@src/components/ui/badge'
import { MessageSquare, Wifi, WifiOff, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function RealtimeQuestionsList() {
	const { questions, isLoading, error, newQuestionCount } = useRealtimeQuestions()

	if (isLoading) {
		return (
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<MessageSquare className="w-5 h-5" />
						<span>Preguntas en Vivo</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-center py-8">
						<div className="flex items-center space-x-2 text-muted-foreground">
							<Loader2 className="w-5 h-5 animate-spin" />
							<span>Cargando preguntas...</span>
						</div>
					</div>
				</CardContent>
			</Card>
		)
	}

	if (error) {
		return (
			<Card className="border-red-200 bg-red-50">
				<CardHeader>
					<CardTitle className="flex items-center space-x-2 text-red-700">
						<WifiOff className="w-5 h-5" />
						<span>Error de Conexión</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-red-600 text-sm">{error}</p>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Wifi className="w-5 h-5 text-green-500" />
						<span>Preguntas en Vivo</span>
						{newQuestionCount > 0 && (
							<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2 h-2 bg-red-500 rounded-full" />
						)}
					</div>
					<div className="flex items-center space-x-2">
						{newQuestionCount > 0 && (
							<Badge variant="destructive" className="animate-pulse">
								+{newQuestionCount} nueva{newQuestionCount > 1 ? 's' : ''}
							</Badge>
						)}
						<Badge variant="secondary" className="bg-green-100 text-green-700">
							{questions.length} pregunta{questions.length !== 1 ? 's' : ''}
						</Badge>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				{questions.length === 0 ? (
					<div className="text-center py-8">
						<MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
						<p className="text-muted-foreground">No hay preguntas aún. ¡Sé el primero en preguntar!</p>
					</div>
				) : (
					<div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
						<AnimatePresence mode="popLayout">
							{questions.map((question, index) => (
								<QuestionCard key={question.id} question={question} index={index} />
							))}
						</AnimatePresence>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
