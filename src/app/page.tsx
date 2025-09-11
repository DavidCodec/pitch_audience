import Link from 'next/link'
import { Button } from '@src/components/ui/button'
import { MessageSquare, Presentation } from 'lucide-react'

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-900/90 to-purple-900/90 flex items-center justify-center">
			<div className="text-center space-y-8 max-w-2xl mx-auto px-4">
				<h1 className="text-4xl md:text-6xl font-bold text-white">Pitch Spectators</h1>
				<p className="text-xl text-white/90">Plataforma de presentaciones interactivas para laboratorios y clínicas</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link href="/pitch">
						<Button size="lg" className="w-full sm:w-auto cursor-pointer">
							<Presentation className="w-5 h-5 mr-2" />
							Ver Presentación
						</Button>
					</Link>

					<Link href="/interactividad">
						<Button
							size="lg"
							variant="outline"
							className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20 cursor-pointer"
						>
							<MessageSquare className="w-5 h-5 mr-2" />
							Panel Interactivo
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
