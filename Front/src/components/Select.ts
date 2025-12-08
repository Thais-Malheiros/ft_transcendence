import { cn } from "@/utils/cn";

interface SelectProps {
	id: string;
	options: { value: string; label: string }[];
	placeholder?: string;
	className?: string;
}

const baseStyles = "w-full px-4 py-3 rounded-xl text-lg bg-black/40 text-white " +
					"border border-cyan-500/50 outline-none transition focus:border-cyan-400 " +
					"focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] appearance-none cursor-pointer";

export function Select({ id, options, placeholder = "Selecione...", className }: SelectProps) {
	const optionsHtml = options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join("");

	return `
		<div class="relative">
			<select id="${id}" class="${cn(baseStyles, className)}">
				<option value="" disabled selected>${placeholder}</option>
				${optionsHtml}
			</select>
			<div class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-cyan-500">
				▼
			</div>
		</div>
	`
}
