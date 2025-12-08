import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";

export function get2FAHtml() {
    return `
		<div class="min-h-screen flex justify-center items-center p-5">
			${Card({
				className: "max-w-md w-full text-center",
				children: `
					<h2 class="text-cyan-500 mb-4 text-4xl font-bold">Segurança</h2>

					<p class="text-gray-300 text-md mb-8">
						Digite o código de 6 dígitos do seu autenticador.
					</p>

					${Input({
						id: "input-2fa-code",
						placeholder: "000 000",
						className: "text-center text-3xl tracking-[0.5em] font-mono py-4 mb-8"
					})}

					${Button({ id: "btn-2fa-validate", text: "Validar Código", variant: "primary" })}

					${Button({ id: "btn-2fa-back", text: "Cancelar", variant: "ghost", className: "mt-4 text-sm" })}
				`
			})}
		</div>
	`;
}
