import { Slide, ContenidoSlide } from '@src/components/Slide'
import { Card, CardHeader, CardTitle, CardContent } from '@src/components/ui/card'
import { BarChart3, Clock, TrendingUp, Zap, Target, Brain } from 'lucide-react'

export function ResumenProblema() {
	return (
		<Slide>
			<ContenidoSlide titulo="Resumen Ejecutivo & Situación Actual">
				<div className="flex flex-col space-y-4 h-full">
					{/* Sección Resumen - Visual */}
					<div className="flex-shrink-0">
						<h3 className="text-lg font-bold text-primary mb-3">¿Qué hacemos y por qué ahora?</h3>
						<div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
							<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
								<div className="text-center">
									<div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
										<Zap className="text-blue-600" size={24} />
									</div>
									<div className="text-2xl font-bold text-blue-600">75%</div>
									<div className="text-xs text-blue-800">Reducción tiempo</div>
								</div>
								<div className="text-center">
									<div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
										<Target className="text-green-600" size={24} />
									</div>
									<div className="text-2xl font-bold text-green-600">1.700+</div>
									<div className="text-xs text-green-800">Laboratorios</div>
								</div>
								<div className="text-center">
									<div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
										<Brain className="text-purple-600" size={24} />
									</div>
									<div className="text-2xl font-bold text-purple-600">SolIA</div>
									<div className="text-xs text-purple-800">Módulo IA</div>
								</div>
							</div>
							<div className="mt-3 text-center">
								<div className="text-sm font-semibold text-blue-800">
									SolHub: Sistema administrativo web para laboratorios
								</div>
								<div className="text-xs text-blue-600">Centraliza gestión • MVP validado • Hiper personalización</div>
							</div>
						</div>
					</div>

					{/* Sección Problema - Visual */}
					<div className="">
						<h3 className="text-lg font-bold text-red-700 mb-3">Problemas Identificados</h3>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-full">
							<Card className="border-red-200 bg-red-50 text-center">
								<CardHeader className="pb-2">
									<div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
										<BarChart3 className="text-red-600" size={32} />
									</div>
									<CardTitle className="text-red-700 text-base font-bold">Sistemas Obsoletos</CardTitle>
								</CardHeader>
								<CardContent className="pt-0">
									<div className="text-3xl font-bold text-red-600 mb-1">1.700+</div>
									<div className="text-sm text-red-800">Excel/Manual</div>
									<div className="text-xs text-red-600 mt-1">Baja protección</div>
								</CardContent>
							</Card>

							<Card className="border-orange-200 bg-orange-50 text-center">
								<CardHeader className="pb-2">
									<div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
										<Clock className="text-orange-600" size={32} />
									</div>
									<CardTitle className="text-orange-700 text-base font-bold">Demoras Críticas</CardTitle>
								</CardHeader>
								<CardContent className="pt-0">
									<div className="text-3xl font-bold text-orange-600 mb-1">12-15</div>
									<div className="text-sm text-orange-800">min por caso</div>
									<div className="text-xs text-orange-600 mt-1">Demoras informes</div>
								</CardContent>
							</Card>

							<Card className="border-yellow-200 bg-yellow-50 text-center">
								<CardHeader className="pb-2">
									<div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
										<TrendingUp className="text-yellow-600" size={32} />
									</div>
									<CardTitle className="text-yellow-700 text-base font-bold">Sin Indicadores</CardTitle>
								</CardHeader>
								<CardContent className="pt-0">
									<div className="text-3xl font-bold text-yellow-600 mb-1">0%</div>
									<div className="text-sm text-yellow-800">Tiempo real</div>
									<div className="text-xs text-yellow-600 mt-1">Duplicación tareas</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</ContenidoSlide>
		</Slide>
	)
}
