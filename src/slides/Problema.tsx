import { Slide, ContenidoSlide } from '@src/components/Slide'
import { Card, CardHeader, CardTitle, CardContent } from '@src/components/ui/card'
import { BarChart3, Clock, TrendingUp } from 'lucide-react'

export function Problema() {
	return (
		<Slide>
			<ContenidoSlide titulo="Situación Actual: Laboratorios en Venezuela">
				<div className="flex flex-col space-y-2 sm:space-y-3 h-full">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 flex-shrink-0">
						<Card className="border-red-200 bg-red-50 col-span-1">
							<CardHeader className="pb-1 sm:pb-2">
								<CardTitle className="flex items-center text-red-700 text-sm sm:text-base">
									<BarChart3 className="mr-1 sm:mr-2" size={12} />
									Sistemas Obsoletos
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-0">
								<div className="space-y-1">
									<div className="text-sm sm:text-base md:text-lg font-bold text-red-600">1.700+</div>
									<div className="text-xs">laboratorios en el país</div>
									<div className="text-sm sm:text-base md:text-lg font-bold text-red-600">Excel/Manual</div>
									<div className="text-xs">Baja proteccion de datos</div>
								</div>
							</CardContent>
						</Card>

						<Card className="border-orange-200 bg-orange-50 col-span-1">
							<CardHeader className="pb-1 sm:pb-2">
								<CardTitle className="flex items-center text-orange-700 text-sm sm:text-base">
									<Clock className="mr-1 sm:mr-2" size={12} />
									Demoras Críticas
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-0">
								<div className="space-y-1">
									<div className="text-sm sm:text-base md:text-lg font-bold text-orange-600">12-15 min</div>
									<div className="text-xs">tiempo manual por caso</div>
									<div className="text-sm sm:text-base md:text-lg font-bold text-orange-600">4-6 min</div>
									<div className="text-xs">tiempo con SolHub</div>
								</div>
							</CardContent>
						</Card>

						<Card className="border-yellow-200 bg-yellow-50 col-span-1">
							<CardHeader className="pb-1 sm:pb-2">
								<CardTitle className="flex items-center text-yellow-700 text-sm sm:text-base">
									<TrendingUp className="mr-1 sm:mr-2" size={12} />
									Sin Indicadores
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-0">
								<div className="space-y-1">
									<div className="text-sm sm:text-base md:text-lg font-bold text-yellow-600">0%</div>
									<div className="text-xs">indicadores en tiempo real</div>
									<div className="text-sm sm:text-base md:text-lg font-bold text-yellow-600">Duplicación</div>
									<div className="text-xs">de tareas administrativas</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="p-2 sm:p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200 overflow-hidden col-span-3">
						<h3 className="text-sm sm:text-base font-semibold text-red-900 mb-1 sm:mb-2">
							Problemas Identificados en 30+ Visitas de Campo
						</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
							<div>
								<p className="font-medium text-red-800">• Demoras en entrega de informes clínicos</p>
								<p className="font-medium text-red-800">• Duplicación de registros y tareas</p>
								<p className="font-medium text-red-800">• Ausencia de integración entre áreas</p>
							</div>
							<div>
								<p className="font-medium text-red-800">• Limitada capacidad de análisis</p>
								<p className="font-medium text-red-800">• Poca adaptabilidad a realidad local</p>
								<p className="font-medium text-red-800">• Falta de cumplimiento SENIAT</p>
							</div>
						</div>
					</div>
				</div>
			</ContenidoSlide>
		</Slide>
	)
}
