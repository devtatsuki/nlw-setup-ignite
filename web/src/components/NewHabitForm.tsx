import * as Checkbox from '@radix-ui/react-checkbox';

import { api } from '../lib/axios';
import { Check } from 'phosphor-react';
import { FormEvent, useState } from 'react';

const availableWeekDays = [
	'Domingo',
	'Segunda-feira',
	'Terça-feira',
	'Quarta-feira',
	'Quinta-feira',
	'Sexta-feira',
	'Sábado',
];

export function NewHabitForm() {
	const [title, setTitle] = useState<string>('');
	const [weekDays, setWeekDays] = useState<number[]>([]);

	async function createNewHabit(event: FormEvent) {
		event.preventDefault();

		if (!title.trim() || !weekDays.length) {
			return;
		}

		await api.post('habits', {
			title,
			weekDays,
		});

		setTitle('');
		setWeekDays([]);

		alert('Hábito criado com sucesso');
	}

	function handleToggleWeekDay(weekDayIndex: number) {
		if (weekDays.includes(weekDayIndex)) {
			setWeekDays((prevState) => prevState.filter((weekDay) => weekDay !== weekDayIndex));
		} else {
			setWeekDays((prevState) => [...prevState, weekDayIndex]);
		}
	}

	return (
		<form onSubmit={createNewHabit} className="w-full flex flex-col mt-6 ">
			<label htmlFor="title" className="font-semibold leading-tight">
				Qual o seu comprometimento?
			</label>
			<input
				type="text"
				id="title"
				placeholder="ex.: Exercícios, dormir bem, etc..."
				className="p-3 rounded-lg mt-3 bg-zinc-800 text-white placholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
				autoFocus
				value={title}
				onChange={(event) => setTitle(event.target.value)}
			/>

			<label htmlFor="" className="font-semibold leading-tight mt-4">
				Qual a recorrência?
			</label>

			<div className="flex flex-col gap-2 mt-3">
				{availableWeekDays.map((weekDay, i) => (
					<Checkbox.Root
						key={weekDay}
						className="flex items-center gap-2 group focus:outline-none"
						checked={weekDays.includes(i)}
						onCheckedChange={() => handleToggleWeekDay(i)}
					>
						<div className="h-6 w-6 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900">
							<Checkbox.Indicator>
								<Check size={16} className="text-white" />
							</Checkbox.Indicator>
						</div>

						<span className="text-white leading-tight">{weekDay}</span>
					</Checkbox.Root>
				))}
			</div>

			<button
				type="submit"
				className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
			>
				<Check size={20} weight="bold" />
				Confirmar
			</button>
		</form>
	);
}
