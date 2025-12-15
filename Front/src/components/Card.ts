import { cn } from "@/utils/cn";

interface CardProps {
	children?: string;
	className?: string
	theme?: "default" | "potatoes" | "tomatoes";
}

const baseStyles =
	"bg-slate-900/60 backdrop-blur-md rounded-2xl p-8 shadow-2xl";

const themeDefault = "border border-white/10";
const themePotatoes = "border border-yellow-500/20";
const themeTomatoes = "border border-red-500/20";

export function Card({ children, className, theme = 'default' } : CardProps) {
	let themeClass = themeDefault;
	if (theme === 'potatoes') themeClass = themePotatoes;
	else if (theme === 'tomatoes') themeClass = themeTomatoes;

	return `
		<div class="${cn(baseStyles, themeClass, className)}">
			${children}
		</div>
	`
}
