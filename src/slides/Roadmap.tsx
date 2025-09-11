import { Slide, ContenidoSlide } from '@src/components/Slide'
import { Card, CardHeader, CardTitle, CardContent } from '@src/components/ui/card'

export function Roadmap() {
	return (
		<Slide>
			<ContenidoSlide titulo="Roadmap de Desarrollo">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
					<Card className="bg-blue-50 border-blue-200">
						<CardHeader className="pb-2">
							<CardTitle className="text-blue-900 text-sm sm:text-base">Q1 2025</CardTitle>
							<div className="text-xs sm:text-sm text-blue-700">Consolidación Regional</div>
						</CardHeader>
						<CardContent>
							<ul className="text-xs sm:text-sm space-y-1 list-disc">
								<li>10 laboratorios satisfechos</li>
								<li>Versión 2.0 con mejoras UX</li>
								<li>Módulo de facturacion completo</li>
								<li>Oficina en Caracas</li>
							</ul>
						</CardContent>
					</Card>

					<Card className="bg-green-50 border-green-200">
						<CardHeader className="pb-2">
							<CardTitle className="text-green-900 text-sm sm:text-base">Q2 2025</CardTitle>
							<div className="text-xs sm:text-sm text-green-700">Expansión Técnica</div>
						</CardHeader>
						<CardContent>
							<ul className="text-xs sm:text-sm space-y-1 list-disc">
								<li>Módulo SolIA avanzado</li>
								<li>API para integraciones</li>
								<li>Dashboard analítico mejorado</li>
								<li>Infraestructura híbrida (local + cloud)</li>
							</ul>
						</CardContent>
					</Card>

					<Card className="bg-purple-50 border-purple-200">
						<CardHeader className="pb-2">
							<CardTitle className="text-purple-900 text-sm sm:text-base">Q3 2026</CardTitle>
							<div className="text-xs sm:text-sm text-purple-700">Expansión Venezuela</div>
						</CardHeader>
						<CardContent>
							<ul className="text-xs sm:text-sm space-y-1 list-disc">
								<li>Entrada en toda Venezuela</li>
								<li>Adaptación a regulaciones locales</li>
								<li>Open Talks</li>
								<li>Modulo financiero</li>
							</ul>
						</CardContent>
					</Card>

					<Card className="bg-orange-50 border-orange-200">
						<CardHeader className="pb-2">
							<CardTitle className="text-orange-900 text-sm sm:text-base">Q4 2026</CardTitle>
							<div className="text-xs sm:text-sm text-orange-700">Escalamiento</div>
						</CardHeader>
						<CardContent>
							<ul className="text-xs sm:text-sm space-y-1 list-disc">
								<li>Modulo de voz para SolIA</li>
								<li>Reestructuracion de planes</li>
								<li>Equipo 15 personas</li>
								<li>Analisis de informes con IA</li>
							</ul>
						</CardContent>
					</Card>
				</div>

				<div className="mt-4 sm:mt-6 md:mt-8">
					<Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
						<CardHeader className="pb-2">
							<CardTitle className="text-yellow-900 text-sm sm:text-base">🏆 2026 - Liderazgo Regional</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
								<div>
									<div className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-600">Colombia + Brasil</div>
									<div className="text-xs sm:text-sm text-yellow-700">Nuevos mercados</div>
								</div>
								<div>
									<div className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-600">+50</div>
									<div className="text-xs sm:text-sm text-yellow-700">Clientes activos</div>
								</div>
								<div>
									<div className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-600">$1.2M</div>
									<div className="text-xs sm:text-sm text-yellow-700">ARR objetivo</div>
								</div>
								<div>
									<div className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-600">Educacion Virtual</div>
									<div className="text-xs sm:text-sm text-yellow-700">Webinars</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</ContenidoSlide>
		</Slide>
	)
}
