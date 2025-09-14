import Link from 'next/link'
import { Button } from '@src/components/ui/button'
import { Presentation } from 'lucide-react'

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-900/90 to-purple-900/90 flex items-center justify-center">
			<div className="text-center space-y-8 max-w-2xl mx-auto px-4">
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link href="/pitch">
						<Button size="lg" className="w-full sm:w-auto cursor-pointer text-2xl">
							<Presentation className="w-8 h-8 mr-2" />
							Ver Presentación
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
