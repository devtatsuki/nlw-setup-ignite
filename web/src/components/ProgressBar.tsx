import * as Progress from '@radix-ui/react-progress';

interface ProgressBarProps {
	progress: number;
}

export function ProgressBar(props: ProgressBarProps) {
	return (
		<Progress.Root
			className="relative overflow-hidden w-full h-2 rounded-xl bg-zinc-700 mt-4"
			value={props.progress}
		>
			<Progress.Indicator
				className="ProgressIndicator h-2 rounded-xl bg-violet-600"
				style={{ width: `${props.progress}%` }}
			/>
		</Progress.Root>
	);
}
