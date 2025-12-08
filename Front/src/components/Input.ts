import { cn } from '@/utils/cn'

interface InputProps {
	id: string;
	type?: "text" | "password" | "email" | "number";
	placeholder?: string;
	value?: string;
	className?: string;
}

const baseStyles =
	"w-full px-4 py-3 rounded-xl text-lg bg-black/40 text-white " +
	"border border-cyan-500/50 placeholder-gray-500 outline-none " +
	"transition focus:border-cyan-400 " +
	"focus:shadow-[0_0_10px_rgba(6,182,212,0.2)]";

export function Input({ id, type = "text", placeholder = "", value = "", className}: InputProps) {
	return `
		<input
			id="${id}"
			type="${type}"
			placeholder="${placeholder}"
			value="${value}"
			class="${cn(baseStyles, className)}"
		>
	`;
}
