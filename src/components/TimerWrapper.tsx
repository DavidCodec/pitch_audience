'use client'

import { Timer } from './Timer'

interface TimerWrapperProps {
	defaultDuration?: number
	onTimeUp?: () => void
	showSettings?: boolean
	className?: string
	autoStart?: boolean
}

export function TimerWrapper({
	defaultDuration = 3 * 60,
	onTimeUp,
	showSettings = true,
	className,
	autoStart = false,
}: TimerWrapperProps) {
	return (
		<Timer
			defaultDuration={defaultDuration}
			onTimeUp={onTimeUp}
			showSettings={showSettings}
			className={className}
			autoStart={autoStart}
		/>
	)
}
