import { cn } from "@/utils/cn";

interface CardProps {
	children?: string;
	className?: string
}

const baseStyles =
	"bg-slate-900/60 border border-white/10 backdrop-blur-md " +
	"rounded-2xl p-8 shadow-2xl";

export function Card({ children, className } : CardProps) {
	return `
		<div class="${cn(baseStyles, className)}">
			${children}
		</div>
	`
}
