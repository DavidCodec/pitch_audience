import { Slide, ContenidoSlide } from '@src/components/Slide'
import { Badge } from '@src/components/ui/badge'
import { Zap } from 'lucide-react'

export function Solucion() {
	return (
		<Slide>
			<ContenidoSlide titulo="Nuestra Solución: SolHub + SolIA">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
					<div className="space-y-2 sm:space-y-3 md:space-y-4 overflow-hidden">
						<div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
							<div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
								<Zap className="text-blue-600" size={16} />
							</div>
							<div>
								<h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-1 sm:mb-2">
									Automatización de Procesos
								</h3>
								<p className="text-xs sm:text-sm md:text-base text-gray-600">
									Registro de pacientes, generación de reportes, cálculos automáticos y conversión de divisas
								</p>
							</div>
						</div>

						<div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
							<div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
								<span className="text-green-600 font-bold text-sm sm:text-base md:text-lg lg:text-xl">📊</span>
							</div>
							<div>
								<h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-1 sm:mb-2">
									Indicadores en Tiempo Real
								</h3>
								<p className="text-xs sm:text-sm md:text-base text-gray-600">
									Métricas personalizables, productividad, casos pendientes y estudios más solicitados
								</p>
							</div>
						</div>

						<div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
							<div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
								<span className="text-purple-600 font-bold text-sm sm:text-base md:text-lg lg:text-xl">🎯</span>
							</div>
							<div>
								<h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-1 sm:mb-2">
									Hiper Personalización
								</h3>
								<p className="text-xs sm:text-sm md:text-base text-gray-600">
									Se adapta a los procesos del cliente y no al revés
								</p>
							</div>
						</div>

						<div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
							<div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
								<span className="text-orange-600 font-bold text-sm sm:text-base md:text-lg lg:text-xl">🤖</span>
							</div>
							<div>
								<h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-1 sm:mb-2">
									Módulo IA (SolIA)
								</h3>
								<p className="text-xs sm:text-sm md:text-base text-gray-600">
									Entrenado con datos validados por Conspat, apoya redacción de informes bajo supervisión médica
								</p>
							</div>
						</div>
					</div>

					<div className="bg-gradient-to-br from-blue-50 to-purple-50 p-2 sm:p-3 md:p-4 rounded-lg overflow-hidden">
						<h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3">Innovaciones Clave</h3>
						<ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
							<li className="flex items-center space-x-2">
								<Badge variant="outline" className="text-xs">
									✓
								</Badge>
								<span>Plantillas estandarizadas como propiedad intelectual</span>
							</li>
							<li className="flex items-center space-x-2">
								<Badge variant="outline" className="text-xs">
									✓
								</Badge>
								<span>Módulo de tasa e impuestos (SENIAT)</span>
							</li>
							<li className="flex items-center space-x-2">
								<Badge variant="outline" className="text-xs">
									✓
								</Badge>
								<span>Arquitectura híbrida (local + cloud)</span>
							</li>
							<li className="flex items-center space-x-2">
								<Badge variant="outline" className="text-xs">
									✓
								</Badge>
								<span>IA segura y local sin retención de datos</span>
							</li>
							<li className="flex items-center space-x-2">
								<Badge variant="outline" className="text-xs">
									✓
								</Badge>
								<span>Migración de datos desde sistemas existentes</span>
							</li>
							<li className="flex items-center space-x-2">
								<Badge variant="outline" className="text-xs">
									✓
								</Badge>
								<span>Seguridad avanzada con control de permisos</span>
							</li>
						</ul>
					</div>
				</div>
			</ContenidoSlide>
		</Slide>
	)
}
