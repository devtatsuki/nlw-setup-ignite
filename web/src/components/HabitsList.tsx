import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import dayjs from 'dayjs';

interface HabitsListProps {
	date: Date;
	onCompletedChanged: (completed: number) => void;
}

interface HabitsInfo {
	possibleHabits: {
		id: string;
		title: string;
		created_at: string;
	}[];
	completedHabits: string[];
}

export function HabitsList({ date, onCompletedChanged }: HabitsListProps) {
	const [habitInfos, setHabitInfos] = useState<HabitsInfo>();

	useEffect(() => {
		api
			.get('day', {
				params: {
					date: date.toISOString(),
				},
			})
			.then((response) => {
				setHabitInfos(response.data);
			});
	}, []);

	async function handleToggleHabit(habitId: string) {
		await api.patch(`habits/${habitId}/toggle`);

		const isHabitAlreadyCompleted = habitInfos!.completedHabits.includes(habitId);

		let completedHabits: string[] = [];

		if (isHabitAlreadyCompleted) {
			completedHabits = habitInfos!.completedHabits.filter((id) => id !== habitId);
		} else {
			completedHabits = [...habitInfos!.completedHabits, habitId];
		}
		setHabitInfos({
			possibleHabits: habitInfos!.possibleHabits,
			completedHabits,
		});

		onCompletedChanged(completedHabits.length);
	}

	const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

	return (
		<div className="mt-6 flex flex-col gap-3">
			{habitInfos?.possibleHabits.map((habit) => {
				return (
					<Checkbox.Root
						key={habit.id}
						onCheckedChange={() => handleToggleHabit(habit.id)}
						checked={habitInfos.completedHabits.includes(habit.id)}
						disabled={isDateInPast}
						className="flex items-center gap-2 group focus:outline-none disabled:cursor-not-allowed"
					>
						<div className="h-6 w-6 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
							<Checkbox.Indicator>
								<Check size={16} className="text-white" />
							</Checkbox.Indicator>
						</div>

						<span className="font-semibold text-lg text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 group-data-[disabled]:text-zinc-400">
							{habit.title}
						</span>
					</Checkbox.Root>
				);
			})}
		</div>
	);
}
