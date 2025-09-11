import { Slide, ContenidoSlide, ListaSlide } from '@src/components/Slide'

export function Resumen() {
	return (
		<Slide>
			<ContenidoSlide titulo="Resumen Ejecutivo">
				<div className="flex flex-col space-y-2 h-full">
					<h3 className="text-sm sm:text-base md:text-lg font-semibold text-primary flex-shrink-0">
						¿Qué hacemos y por qué ahora?
					</h3>
					<div className="flex-1 overflow-hidden">
						<ListaSlide
							items={[
								'Solware desarrolla SolHub: sistema administrativo web para laboratorios y clínicas',
								'Centraliza gestión de pacientes, casos, pagos, reportes y analítica en una plataforma',
								'Reducción del 75% en tiempo de tareas administrativas (2 min → 30 seg)',
								'MVP validado en Laboratorios Conspat con resultados reales',
								'Mercado objetivo: 1.700+ laboratorios y clínicas en Venezuela',
								'Diferencial: hiper personalización + módulo IA opcional (SolIA) con datos locales',
							]}
						/>
					</div>
				</div>
			</ContenidoSlide>
		</Slide>
	)
}
