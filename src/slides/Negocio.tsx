import { Slide, ContenidoSlide } from '@src/components/Slide'
import { Card, CardHeader, CardTitle, CardContent } from '@src/components/ui/card'
import { Badge } from '@src/components/ui/badge'

export function Negocio() {
  return (
    <Slide>
				<ContenidoSlide titulo="Modelo de Negocio">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
						<Card className="bg-blue-50 border-blue-200">
							<CardHeader className="pb-2">
								<CardTitle className="text-blue-900 text-sm sm:text-base">💰 Setup Inicial</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-2">$1K-6K</div>
								<ul className="text-xs sm:text-sm text-blue-700 space-y-1">
									<li>• Implementación completa</li>
									<li>• Migración de datos</li>
									<li>• Entrenamiento equipo</li>
									<li>• Personalización</li>
								</ul>
							</CardContent>
						</Card>

						<Card className="bg-green-50 border-green-200">
							<CardHeader className="pb-2">
								<CardTitle className="text-green-900 text-sm sm:text-base">📅 SaaS Mensual</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-2">$150-500</div>
								<ul className="text-xs sm:text-sm text-green-700 space-y-1">
									<li>• Basado en usuarios</li>
									<li>• Actualizaciones automáticas</li>
									<li>• Soporte continuo</li>
									<li>• Backup y seguridad</li>
								</ul>
							</CardContent>
						</Card>

						<Card className="bg-purple-50 border-purple-200 sm:col-span-2 lg:col-span-1">
							<CardHeader className="pb-2">
								<CardTitle className="text-purple-900 text-sm sm:text-base">🤖 Módulo IA</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600 mb-2">+$100</div>
								<ul className="text-xs sm:text-sm text-purple-700 space-y-1">
									<li>• SolIA opcional</li>
									<li>• Entrenamiento personalizado</li>
									<li>• Soporte especializado</li>
									<li>• Actualizaciones IA</li>
								</ul>
							</CardContent>
						</Card>
					</div>

					<div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
						<div>
							<h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">Planes de Suscripción</h3>
							<div className="space-y-2 sm:space-y-3 md:space-y-4">
								<div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
									<div className="flex justify-between items-center mb-2">
										<span className="font-medium text-sm sm:text-base">Plan 1 (10 usuarios)</span>
										<span className="text-base sm:text-lg font-bold">$150/mes</span>
									</div>
									<div className="text-xs sm:text-sm text-gray-600">Setup: $1,000-1,200</div>
								</div>
								<div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
									<div className="flex justify-between items-center mb-2">
										<span className="font-medium text-sm sm:text-base">Plan 2 (50 usuarios)</span>
										<span className="text-base sm:text-lg font-bold">$250/mes</span>
									</div>
									<div className="text-xs sm:text-sm text-gray-600">Setup: $2,000-2,500</div>
								</div>
								<div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
									<div className="flex justify-between items-center mb-2">
										<span className="font-medium text-sm sm:text-base">Plan 3 (100 usuarios)</span>
										<span className="text-base sm:text-lg font-bold">$500/mes</span>
									</div>
									<div className="text-xs sm:text-sm text-gray-600">Setup: $4,000-6,000</div>
								</div>
							</div>
						</div>

						<div>
							<h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">Servicios Adicionales</h3>
							<div className="space-y-2 sm:space-y-3">
								<div className="flex items-center justify-between p-2 sm:p-3 bg-blue-50 rounded">
									<span className="text-sm sm:text-base">Asesoramiento</span>
									<Badge className="text-xs">$100/mes</Badge>
								</div>
								<div className="flex items-center justify-between p-2 sm:p-3 bg-green-50 rounded">
									<span className="text-sm sm:text-base">Desarrollo Web</span>
									<Badge className="text-xs">$1,200</Badge>
								</div>
								<div className="flex items-center justify-between p-2 sm:p-3 bg-purple-50 rounded">
									<span className="text-sm sm:text-base">Agentes IA</span>
									<Badge className="text-xs">$100/mes</Badge>
								</div>
								<div className="flex items-center justify-between p-2 sm:p-3 bg-orange-50 rounded">
									<span className="text-sm sm:text-base">Automatizaciones</span>
									<Badge className="text-xs">$500</Badge>
								</div>
							</div>
						</div>
					</div>

					{/* <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
						<h3 className="text-xl font-semibold text-green-900 mb-4">Propuesta de Valor</h3>
						<div className="grid md:grid-cols-3 gap-4 text-sm">
							<div>
								<h4 className="font-semibold text-green-800 mb-2">💡 Costo-Beneficio</h4>
								<p className="text-green-700">~$0.69 USD por caso procesado en un año</p>
							</div>
							<div>
								<h4 className="font-semibold text-green-800 mb-2">⚡ ROI Rápido</h4>
								<p className="text-green-700">Reducción 75% tiempo tareas (2 min → 30 seg)</p>
							</div>
							<div>
								<h4 className="font-semibold text-green-800 mb-2">🔄 Modelo Recurrente</h4>
								<p className="text-green-700">Suscripción mensual con actualizaciones continuas</p>
							</div>
						</div>
					</div> */}
				</ContenidoSlide>
			</Slide>
  )
}