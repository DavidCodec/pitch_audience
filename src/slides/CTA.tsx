import { Globe, Phone, Instagram } from 'lucide-react'
import { FormularioPregunta } from '@src/components/FormularioPregunta'

export function CTA() {
	return (
		<div className="bg-gradient-to-br from-indigo-900/90 to-purple-900/90 w-full h-full flex flex-col items-center justify-center">
			<div className="text-center text-white space-y-8">
				<h1 className="text-white font-sans text-6xl font-bold mt-5">¡Únete a Solware! 🚀</h1>

				<p className="text-2xl text-white/90 max-w-4xl mx-auto">
					Transformemos la gestión administrativa de laboratorios en Venezuela
				</p>

				{/* Contenido principal */}
				<div className="flex flex-col justify-center items-center gap-6 mt-8 w-full">
					{/* Información de contacto */}
					<div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 max-w-md w-full">
						<h3 className="text-2xl font-bold text-white mb-4 text-center mt">Solware Agency</h3>
						<div className="space-y-3">
							<div className="flex items-center justify-left gap-2">
								<Globe className="size-4" />
								<a
									href="https://www.solware.agency"
									target="_blank"
									rel="noopener noreferrer"
									className="text-white hover:text-green-300 transition-colors text-lg"
								>
									solware.agency
								</a>
							</div>
							<div className="flex items-center justify-left gap-2">
								<Phone className="size-4" />
								<a
									href="tel:+584129974533"
									target="_self"
									rel="noopener noreferrer"
									className="text-white hover:text-green-300 transition-colors text-lg"
								>
									+58 412-997-4533
								</a>
							</div>
							<div className="flex items-center justify-left gap-2">
								<Instagram className="size-4" />
								<a
									href="https://www.instagram.com/solware_"
									target="_self"
									rel="noopener noreferrer"
									className="text-white hover:text-green-300 transition-colors text-lg"
								>
									@solware_
								</a>
							</div>
						</div>
						<div className="flex items-center justify-center space-x-3 mt-4">
							<a
								href="https://calendar.app.google/EYruMbWpJwJ82gHr6"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white hover:bg-purple-600 transition-colors text-lg bg-purple-500 p-2 px-4 rounded-md"
							>
								Agendar Cita
							</a>
						</div>
					</div>

					{/* Formulario de pregunta */}
					<FormularioPregunta />
				</div>

				<div className="mt-12 text-xl italic pb-6">Juntos podemos modernizar la gestión de laboratorios en Venezuela</div>
			</div>
		</div>
	)
}
