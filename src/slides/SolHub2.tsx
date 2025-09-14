import { Home, Stethoscope, FileText, Users, BarChart3, Play } from 'lucide-react'
import { SlideTitle } from '@src/components/SlideTitle'
import { AnimatedText, AnimatedCard, AnimatedIcon } from '@src/components/AnimatedElements'

export function SolHub2() {
	return (
		<div className="bg-gradient-to-br from-indigo-900 to-indigo-950 w-full min-h-screen flex flex-col p-4 sm:p-6 md:p-8 lg:p-10">
			<SlideTitle title="La fórmula SolHub" gradientColor="from-green-400 to-blue-400" />

			{/* Contenido principal - responsive grid */}
			<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
				{/* Módulo Inicio */}
				<AnimatedCard
					delay={0.2}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[180px] sm:min-h-[200px]"
				>
					<AnimatedIcon delay={0.4}>
						<Home className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400 mb-2 sm:mb-3" />
					</AnimatedIcon>
					<AnimatedText delay={0.6}>
						<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Inicio</h3>
					</AnimatedText>
					<AnimatedText delay={0.8}>
						<p className="text-blue-300 text-sm sm:text-base md:text-lg mt-2">
							Ingresos, casos y tendencias en tiempo real
						</p>
					</AnimatedText>
				</AnimatedCard>

				{/* Módulo Clínico */}
				<AnimatedCard
					delay={0.4}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-green-400/30 hover:border-green-400/50 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[180px] sm:min-h-[200px]"
				>
					<AnimatedIcon delay={0.6}>
						<Stethoscope className="w-12 h-12 sm:w-16 sm:h-16 text-green-400 mb-2 sm:mb-3" />
					</AnimatedIcon>
					<AnimatedText delay={0.8}>
						<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Clínico</h3>
					</AnimatedText>
					<AnimatedText delay={1.0}>
						<p className="text-green-300 text-sm sm:text-base md:text-lg mt-2">Gestiona pacientes y casos</p>
					</AnimatedText>
				</AnimatedCard>

				{/* Módulo Casos */}
				<AnimatedCard
					delay={0.6}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[180px] sm:min-h-[200px]"
				>
					<AnimatedIcon delay={0.8}>
						<FileText className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 mb-2 sm:mb-3" />
					</AnimatedIcon>
					<AnimatedText delay={1.0}>
						<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Casos</h3>
					</AnimatedText>
					<AnimatedText delay={1.2}>
						<p className="text-purple-300 text-sm sm:text-base md:text-lg mt-2">
							Ver, filtrar y generar informes detallados
						</p>
					</AnimatedText>
				</AnimatedCard>

				{/* Módulo Pacientes */}
				<AnimatedCard
					delay={1.8}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-orange-400/30 hover:border-orange-400/50 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[180px] sm:min-h-[200px]"
				>
					<AnimatedIcon delay={2.0}>
						<Users className="w-12 h-12 sm:w-16 sm:h-16 text-orange-400 mb-2 sm:mb-3" />
					</AnimatedIcon>
					<AnimatedText delay={2.2}>
						<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Pacientes</h3>
					</AnimatedText>
					<AnimatedText delay={2.4}>
						<p className="text-orange-300 text-sm sm:text-base md:text-lg mt-2">Busca información completa</p>
					</AnimatedText>
				</AnimatedCard>

				{/* Módulo Análisis */}
				<AnimatedCard
					delay={2.0}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[180px] sm:min-h-[200px]"
				>
					<AnimatedIcon delay={2.2}>
						<BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 mb-2 sm:mb-3" />
					</AnimatedIcon>
					<AnimatedText delay={2.4}>
						<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Análisis</h3>
					</AnimatedText>
					<AnimatedText delay={2.6}>
						<p className="text-yellow-300 text-sm sm:text-base md:text-lg mt-2">Métricas e indicadores interactivos</p>
					</AnimatedText>
				</AnimatedCard>

				{/* Video Demo */}
				<AnimatedCard
					delay={2.2}
					className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-red-400/30 hover:border-red-400/50 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[180px] sm:min-h-[200px]"
				>
					<AnimatedIcon delay={2.4}>
						<Play className="w-12 h-12 sm:w-16 sm:h-16 text-red-400 mb-2 sm:mb-3" />
					</AnimatedIcon>
					<AnimatedText delay={2.6}>
						<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Demo</h3>
					</AnimatedText>
					<AnimatedText delay={2.8}>
						<p className="text-red-300 text-sm sm:text-base md:text-lg mt-2">Tour completo de la plataforma</p>
					</AnimatedText>
				</AnimatedCard>
			</div>

			{/* Resumen final */}
			<AnimatedText delay={1.4} className="max-w-5xl mx-auto">
				<AnimatedCard
					delay={1.6}
					className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20"
				>
					<div className="flex flex-col sm:flex-row items-center justify-center mb-3 sm:mb-4">
						<AnimatedIcon delay={1.8}>
							<Play className="w-6 h-6 sm:w-8 sm:h-8 text-white mb-2 sm:mb-0 sm:mr-2" />
						</AnimatedIcon>
						<AnimatedText delay={2.0}>
							<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center">Módulos Clave</h3>
						</AnimatedText>
					</div>
					<AnimatedText delay={2.2}>
						<p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl text-center leading-relaxed">
							La plataforma cuenta con <span className="text-green-400 font-bold">módulos clave</span> que cubren desde
							el registro hasta el análisis, con un <span className="text-blue-400 font-bold">módulo de reportes</span>{' '}
							que exporta PDFs.
						</p>
					</AnimatedText>
				</AnimatedCard>
			</AnimatedText>

			{/* Elementos decorativos */}
			<div className="absolute top-4 sm:top-20 right-4 sm:right-20 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-green-400/20 rounded-full animate-ping"></div>
			<div className="absolute bottom-4 sm:bottom-20 left-4 sm:left-20 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-blue-400/20 rounded-full animate-pulse"></div>
			<div className="absolute top-1/3 right-2 sm:right-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/10 rounded-full animate-bounce"></div>
		</div>
	)
}
