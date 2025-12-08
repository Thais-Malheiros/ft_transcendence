import { cn } from "@/utils/cn";

interface ButtonProps {
	id?: string;
	text: string;
	type?: "button" | "submit";
	variant?: "primary" | "secondary" | "danger" | "ghost";
	className?: string;
	onClick?: string;
}

const baseStyles =
	"w-full py-3 px-6 rounded-xl font-bold transition-all " +
	"duration-300 cursor-pointer text-center block shadow-lg";

const variants = {
	primary: "bg-cyan-500 text-black hover:bg-cyan-400 active:bg-cyan-600 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]",
	secondary: "bg-transparent text-cyan-500 border border-cyan-500 hover:bg-cyan-500/10 active:bg-cyan-700/10 shadow-none",
	danger: "bg-transparent text-red-500 border border-red-500 hover:bg-red-500 hover:text-white active:bg-red-700 active:text-white",
	ghost: "bg-transparent text-gray-400 hover:text-white shadow-none hover:bg-white/5 active:bg-white/10"
};

export function Button({ id = "", text, variant = "primary", className }: ButtonProps) {
	return `
		<button
			${id ? `id="${id}"` : ""}
			class="${cn(baseStyles, variants[variant], className)}"
		>
			${text}
		</button>
	`
}
