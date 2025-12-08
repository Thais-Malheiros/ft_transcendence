import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";

export function getRegisterHtml() {
	return `
		<img src="src/assets/bg-login.png" alt="Background" class="fixed inset-0 w-full h-full object-cover -z-10 opacity-30" />
		<div class="min-h-screen flex justify-center items-center p-5">
			${Card({
				className: "max-w-xl w-full animate-fade-in",
				children: `
					<h2 class="text-cyan-500 mb-2 text-4xl font-bold">Criar Conta</h2>
					<p class="text-gray-400 text-lg mb-8">Junte-se à revolução do Pong.</p>

					<div class="space-y-4">
						${Input({ id: "input-register-name", placeholder: "Nome Completo" })}
						${Input({ id: "input-register-nick", placeholder: "Nick (Usuário)" })}
						${Input({ id: "input-register-email", type: "email", placeholder: "Email" })}
						${Input({ id: "input-register-pass", type: "password", placeholder: "Senha" })}

						${Select({
							id: "select-register-gang",
							placeholder: "Escolha sua aliança...",
							options: [
								{ value: "batatas", label: "🥔 Gangue das Batatas" },
								{ value: "tomates", label: "🍅 Gangue dos Tomates" }
							]
						})}
					</div>

					<div class="flex gap-4 mt-8">
						${Button({ id: "btn-register-back", text: "Voltar", variant: "secondary", className: "w-1/3" })}
						${Button({ id: "btn-register-submit", text: "Cadastrar", variant: "primary", className: "w-2/3" })}
					</div>

					<p id="register-error" class="text-red-400 text-center mt-4 hidden font-bold"></p>
				`
			})}
		</div>
	`;
}
