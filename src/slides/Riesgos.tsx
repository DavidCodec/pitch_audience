import { Slide, ContenidoSlide } from '@src/components/Slide'
import { Card, CardHeader, CardTitle, CardContent } from '@src/components/ui/card'

export function Riesgos() {
  return (
    <Slide>
				<ContenidoSlide titulo="Riesgos y Mitigaciones">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
						{[
							{
								riesgo: 'Regulaciones Legales',
								descripcion: 'Cambios de leyes e impuestos venezolanos',
								mitigacion: 'Asesoría contable especializada',
								color: 'pink',
								bg: 'bg-pink-600/10',
								border: 'border-pink-300',
							},
							{
								riesgo: 'Seguridad de Datos',
								descripcion: 'Fuga de información médica sensible',
								mitigacion: 'Arquitectura híbrida local, cifrado end-to-end, auditorías',
								color: 'purple',
								bg: 'bg-purple-600/10',
								border: 'border-purple-300',
							},
							{
								riesgo: 'Adopción del Mercado',
								descripcion: 'Resistencia al cambio en laboratorios tradicionales',
								mitigacion: 'Demostracion gratuita y ROI demostrable',
								color: 'blue',
								bg: 'bg-blue-600/10',
								border: 'border-blue-300',
							},
							// {
							// 	riesgo: 'Competencia Internacional',
							// 	descripcion: 'Entrada de soluciones extranjeras al mercado',
							// 	mitigacion: 'Especialización local, conocimiento del mercado venezolano',
							// 	color: 'blue',
							// },
							{
								riesgo: 'Dependencia de Talento',
								descripcion: 'Escasez de desarrolladores especializados en Venezuela',
								mitigacion: 'Equipo remoto, capacitación interna, equity atractivo',
								color: 'green',
								bg: 'bg-green-600/10',
								border: 'border-green-300',
							},
							// {
							// 	riesgo: 'Escalabilidad Económica',
							// 	descripcion: 'Costos de infraestructura vs ingresos en USD',
							// 	mitigacion: 'Modelo híbrido, optimización de recursos, precios competitivos',
							// 	color: 'green',
							// },
						].map((item, index) => (
							<div key={index} className={`border ${item.border} ${item.bg} p-3 sm:p-4 rounded-lg`}>
								<div>
									<h3 className={`text-black text-sm sm:text-base md:text-lg font-bold mb-2`}>⚖️ {item.riesgo}</h3>
								</div>
								<div className="flex flex-col gap-2">
									<div>
										<span className="font-medium text-xs sm:text-sm">Riesgo:</span>
										<p className={`text-xs sm:text-sm text-${item.color}-700`}>{item.descripcion}</p>
									</div>
									<div>
										<span className="font-medium text-xs sm:text-sm">Mitigación:</span>
										<p className={`text-xs sm:text-sm text-${item.color}-700`}>{item.mitigacion}</p>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="mt-4 sm:mt-6 md:mt-8">
						<Card className="bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300">
							<CardHeader className="pb-2">
								<CardTitle className="text-gray-900 text-sm sm:text-base">🛡️ Plan de Contingencia</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
									<div>
										<div className="text-lg sm:text-xl font-bold text-gray-700">12 meses</div>
										<div className="text-xs sm:text-sm text-gray-600">Reserva de efectivo</div>
									</div>
									<div>
										<div className="text-lg sm:text-xl font-bold text-gray-700">Conspat</div>
										<div className="text-xs sm:text-sm text-gray-600">Partnership estratégico</div>
									</div>
									<div>
										<div className="text-lg sm:text-xl font-bold text-gray-700">MVP</div>
										<div className="text-xs sm:text-sm text-gray-600">Respaldo en local y en la nube</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</ContenidoSlide>
			</Slide>
  )
}