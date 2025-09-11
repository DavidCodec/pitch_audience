import { Slide, ContenidoSlide } from '@src/components/Slide'

export function Arquitectura() {
	return (
		<Slide>
			<ContenidoSlide titulo="Arquitectura Técnica">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
					<div className="space-y-3 sm:space-y-4 md:space-y-6">
						<div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
							<h3 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">🌐 Sistema Web Moderno</h3>
							<ul className="text-xs sm:text-sm text-blue-700 space-y-1">
								<li>• React y Next.js para frontend</li>
								<li>• TypeScript para type safety</li>
								<li>• Tailwind CSS para diseño responsive</li>
							</ul>
						</div>

						<div className="bg-green-50 p-3 sm:p-4 rounded-lg">
							<h3 className="font-semibold text-green-900 mb-2 text-sm sm:text-base">🤖 Módulo IA (SolIA)</h3>
							<ul className="text-xs sm:text-sm text-green-700 space-y-1">
								<li>• IA sin retención de datos</li>
								<li>• APIs de terceros con anonimización</li>
								<li>• Parametrizado con datos medicos privados</li>
							</ul>
						</div>

						<div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
							<h3 className="font-semibold text-purple-900 mb-2 text-sm sm:text-base">🏗️ Arquitectura Híbrida</h3>
							<ul className="text-xs sm:text-sm text-purple-700 space-y-1">
								<li>• Funcionamiento local en servidores del cliente</li>
								<li>• Respaldo 24/7 en la nube</li>
								<li>• Sincronización automática y failover</li>
							</ul>
						</div>
					</div>

					<div className="space-y-3 sm:space-y-4 md:space-y-6">
						<div className="bg-orange-50 p-3 sm:p-4 rounded-lg">
							<h3 className="font-semibold text-orange-900 mb-2 text-sm sm:text-base">🔒 Seguridad Avanzada</h3>
							<ul className="text-xs sm:text-sm text-orange-700 space-y-1">
								<li>• Gestión multiusuario con control de permisos</li>
								<li>• Proteccion de examenes medicos a través de QR</li>
								<li>• Cifrado y auditorías periódicas</li>
							</ul>
						</div>

						<div className="bg-red-50 p-3 sm:p-4 rounded-lg">
							<h3 className="font-semibold text-red-900 mb-2 text-sm sm:text-base">📋 Integración</h3>
							<ul className="text-xs sm:text-sm text-red-700 space-y-1">
								<li>• Generacion automatica de informes clinicos</li>
								<li>• Configuración de tasas cambiarias ($, EUR, VES)</li>
								<li>• Envio automatico de informes a los pacientes</li>
							</ul>
						</div>

						<div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
							<h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Base de datos</h3>
							<ul className="text-xs sm:text-sm text-gray-700 space-y-1">
								<li>• Supabase</li>
								<li>• Autenticacion de usuarios</li>
								<li>• Limitación de accesos por roles</li>
							</ul>
						</div>
					</div>
				</div>
			</ContenidoSlide>
		</Slide>
	)
}
