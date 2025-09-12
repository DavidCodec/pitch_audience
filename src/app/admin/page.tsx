'use client'

import { useState, useEffect } from 'react'
import { Button } from '@src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@src/components/ui/card'
import { Badge } from '@src/components/ui/badge'

interface PitchQuestion {
	id: number
	name: string
	pregunta: string
	created_at: string
}

export default function AdminPage() {
	const [questions, setQuestions] = useState<PitchQuestion[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const loadQuestions = async () => {
		try {
			setIsLoading(true)
			const response = await fetch('/api/admin/questions')
			const result = await response.json()

			if (!response.ok) {
				throw new Error(result.error || 'Error al cargar preguntas')
			}

			setQuestions(result.data || [])
			setError(null)
		} catch (err) {
			console.error('Error:', err)
			setError(err instanceof Error ? err.message : 'Error desconocido')
		} finally {
			setIsLoading(false)
		}
	}

	const deleteQuestion = async (id: number) => {
		if (!confirm('¿Estás seguro de que quieres eliminar esta pregunta?')) {
			return
		}

		try {
			const response = await fetch(`/api/admin/questions/${id}`, {
				method: 'DELETE',
			})
			const result = await response.json()

			if (!response.ok) {
				throw new Error(result.error || 'Error al eliminar pregunta')
			}

			// Recargar la lista
			await loadQuestions()
		} catch (err) {
			console.error('Error:', err)
			alert(err instanceof Error ? err.message : 'Error al eliminar pregunta')
		}
	}

	const deleteAllQuestions = async () => {
		if (!confirm('¿Estás seguro de que quieres eliminar TODAS las preguntas? Esta acción no se puede deshacer.')) {
			return
		}

		try {
			const response = await fetch('/api/admin/questions', {
				method: 'DELETE',
			})
			const result = await response.json()

			if (!response.ok) {
				throw new Error(result.error || 'Error al eliminar preguntas')
			}

			alert(`Se eliminaron ${result.deletedCount} preguntas`)
			await loadQuestions()
		} catch (err) {
			console.error('Error:', err)
			alert(err instanceof Error ? err.message : 'Error al eliminar preguntas')
		}
	}

	useEffect(() => {
		loadQuestions()
	}, [])

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleString('es-ES', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		})
	}

	return (
		<div className="min-h-screen bg-gray-50 p-4">
			<div className="max-w-6xl mx-auto">
				<div className="mb-6">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
					<p className="text-gray-600">Gestiona las preguntas del pitch</p>
				</div>

				<div className="mb-6 flex gap-4">
					<Button onClick={loadQuestions} disabled={isLoading}>
						{isLoading ? 'Cargando...' : 'Recargar'}
					</Button>
					<Button onClick={deleteAllQuestions} variant="destructive" disabled={questions.length === 0}>
						Eliminar Todas ({questions.length})
					</Button>
				</div>

				{error && (
					<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
						<p className="text-red-800">{error}</p>
					</div>
				)}

				<div className="grid gap-4">
					{questions.length === 0 ? (
						<Card>
							<CardContent className="p-6 text-center">
								<p className="text-gray-500">No hay preguntas disponibles</p>
							</CardContent>
						</Card>
					) : (
						questions.map((question) => (
							<Card key={question.id}>
								<CardHeader>
									<div className="flex justify-between items-start">
										<div>
											<CardTitle className="text-lg">{question.name}</CardTitle>
											<CardDescription>{formatDate(question.created_at)}</CardDescription>
										</div>
										<div className="flex gap-2">
											<Badge variant="secondary">ID: {question.id}</Badge>
											<Button size="sm" variant="destructive" onClick={() => deleteQuestion(question.id)}>
												Eliminar
											</Button>
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<p className="text-gray-700">{question.pregunta}</p>
								</CardContent>
							</Card>
						))
					)}
				</div>
			</div>
		</div>
	)
}
