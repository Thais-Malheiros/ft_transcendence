import { ModalComponent } from "@/components/Modal";
import { Button } from "@/components/Button";

interface ShowModalOptions {
	title: string;
	message: string;
	type?: "success" | "danger" | "info";
	confirmText?: string;
	cancelText?: string;
	onConfirm?: () => void;
}

export function showModal({
	title,
	message,
	type = "info",
	confirmText = "OK",
	cancelText,
	onConfirm
}: ShowModalOptions) {

	const layer = document.getElementById("modal-layer");
	if (!layer)
		return;

	// 1. Injeta o HTML do Modal
	layer.innerHTML = ModalComponent({ title, message, type });

	// 2. Injeta os botões na área de ações
	const actionsContainer = document.getElementById("modal-actions");

	if (actionsContainer) {
		// Botão Cancelar (Se existir texto)
		if (cancelText) {
			const cancelBtnHTML = Button({
				id: "modal-btn-cancel",
				text: cancelText,
				variant: "secondary",
				className: "flex-1"
			});
			actionsContainer.insertAdjacentHTML('beforeend', cancelBtnHTML);
		}

		// Botão Confirmar
		const confirmBtnHTML = Button({
			id: "modal-btn-confirm",
			text: confirmText,
			variant: type === "danger" ? "danger" : "primary",
			className: "flex-1"
		});
		actionsContainer.insertAdjacentHTML('beforeend', confirmBtnHTML);
	}

	// 3. Adiciona os Event Listeners (Callbacks)

	// Fechar / Cancelar
	document.getElementById("modal-btn-cancel")?.addEventListener("click", () => {
		closeModal();
	});

	// Confirmar
	document.getElementById("modal-btn-confirm")?.addEventListener("click", () => {
		closeModal();
		if (onConfirm)
			onConfirm(); // Executa a ação (ex: ir para login)
	});
}

function closeModal() {
	const layer = document.getElementById("modal-layer");
	if (layer)
		layer.innerHTML = ""; // Limpa o modal da tela
}
