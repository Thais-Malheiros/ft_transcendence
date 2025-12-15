import { cn } from "@/utils/cn";

interface SelectProps {
    id: string;
    options: { value: string; label: string }[];
    placeholder?: string;
    className?: string;
}

const triggerStyles = "w-full px-4 py-3 rounded-xl text-lg bg-black/40 text-white " +
                    "border border-cyan-500/50 outline-none transition-all focus:border-cyan-400 " +
                    "focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] cursor-pointer flex justify-between items-center group";

export function Select({ id, options, placeholder = "Selecione...", className }: SelectProps) {
    const optionsHtml = options.map(opt => `
        <div
            class="custom-option px-4 py-3 cursor-pointer hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors text-gray-300 flex items-center gap-2 border-b border-white/5 last:border-0"
            data-value="${opt.value}"
        >
            ${opt.label}
        </div>
    `).join("");

    return `
        <div class="relative w-full custom-select-wrapper" id="wrapper-${id}">
            <input type="hidden" id="${id}" value="" />

            <button type="button" id="trigger-${id}" class="${cn(triggerStyles, className)}">
                <span id="label-${id}" class="text-gray-400 pointer-events-none">${placeholder}</span>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-cyan-500 transition-transform duration-300 pointer-events-none" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>

            <div
                id="dropdown-${id}"
                class="absolute left-0 w-full mt-2 bg-[#0f172a] border border-cyan-500/30 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] hidden z-50 overflow-hidden"
            >
                ${optionsHtml}
            </div>
        </div>
    `
}
