import './style.css';
import { showModal } from './utils/modalManager';
import { getDashboardHtml } from './views/dashboard';

import { getLoginHtml } from './views/login';
import { getProfileHtml } from './views/profile';
import { getRegisterHtml } from './views/register';

type Route = 'login' | 'register' | '2fa' | 'dashboard' | 'game' | 'profile';

const state = {
	user: null as string | null,
	isAuthenticated: false
}

interface User {
	username: string;
	gang: 'batatas' | 'tomates';
	isAnonymous: boolean
}

const app = document.querySelector<HTMLDivElement>('#app')!;

function navigateTo(route: Route) {
	if (route === 'dashboard' || route === 'profile' || route == 'game') {
		if (!state.isAuthenticated) {
			navigateTo('login');
			return ;
		}
	}

	switch (route) {
		case 'login':
			app.innerHTML = getLoginHtml();
			setupLoginEvents();
			break;

		case 'register':
			app.innerHTML = getRegisterHtml();
			setupRegisterEvents();
			break;

// 		case '2fa':
// 			app.innerHTML = get2faHtml();
// 			setup2faEvents();
// 			break;

		case 'dashboard':
			app.innerHTML = getDashboardHtml();
			setupDashboardEvents();
			break;

// 		case 'game':
// 			app.innerHTML = getGameHtml();
// 			setupGameEvents();
// 			break;

		case 'profile':
			// if (user.isAnonymous) {
			// 	navigateTo("dashboard")
			// 	return;
			// }

			app.innerHTML = getProfileHtml();
			setupProfileEvents();
			break;

		default:
			navigateTo('login');
	}
}

function setupLoginEvents() {
	document.getElementById('btn-login-user')?.addEventListener('click', () => {
		const user = (document.getElementById('input-login-user') as HTMLInputElement).value;
		const pass = (document.getElementById('input-login-pass') as HTMLInputElement).value;

		if (user && pass) {
			// alert(`Tentando logar com usuário: ${user} e senha: ${pass}`);
			state.isAuthenticated = true;
			state.user = user;
			navigateTo('dashboard');
		}
	})

	document.getElementById('btn-login-guest')?.addEventListener('click', () => {
		const userAnonymous = (document.getElementById('input-login-guest') as HTMLInputElement).value;

		if (userAnonymous) {
			alert(`Tentando logar como visitante com a senha: ${userAnonymous}`);
		}
	})

	document.getElementById('btn-register')?.addEventListener('click', () => {
		navigateTo('register');
	})
}

function setupRegisterEvents() {
	document.getElementById('btn-register-back')?.addEventListener('click', () => {
		navigateTo('login');
	})

	document.getElementById('btn-register-submit')?.addEventListener('click', () => {
		const name = (document.getElementById('input-register-name') as HTMLInputElement).value;
		const nick = (document.getElementById('input-register-nick') as HTMLInputElement).value;
		const email = (document.getElementById('input-register-email') as HTMLInputElement).value;
		const pass = (document.getElementById('input-register-pass') as HTMLInputElement).value;
		const gang = (document.getElementById('select-register-gang') as HTMLSelectElement).value;

		if (name && nick && email && pass && gang) {
			showModal({
				title: "Bem-vindo!",
				message: `A conta de ${name} foi criada com sucesso. Prepare-se para a batalha!`,
				type: "success",
				confirmText: "Ir para Login",
				onConfirm: () => {
					navigateTo('login'); // Só navega quando o usuário clica no botão do modal
				}
			});
		} else {
			showModal({
				title: "Erro no cadastro",
				message: "Por favor, preencha todos os campos para criar sua conta.",
				type: "danger",
				confirmText: "Tentar novamente"
			});
		}
	})
}

function setup2faEvents() {

}

function setupDashboardEvents() {
	document.getElementById('btn-dashboard-logout')?.addEventListener('click', () => {
		showModal({
			title: "Sair do Sistema",
			message: "Tem certeza que deseja abandonar a arena? Seu progresso não salvo será perdido.",
			type: "danger",
			confirmText: "Sim, Sair",
			cancelText: "Cancelar",
			onConfirm: () => {
				state.user = null;
				state.isAuthenticated = false;
				navigateTo('login');
			}
		});
	})

	document.getElementById('btn-dashboard-profile')?.addEventListener('click', () => {
		navigateTo('profile');
	})
}

function setupGameEvents() {

}

function setupProfileEvents() {
	document.getElementById('btn-profile-back')?.addEventListener('click', () => {
		navigateTo('dashboard');
	})

	document.getElementById('btn-profile-save')?.addEventListener('click', () => {
		const name = (document.getElementById('input-profile-name') as HTMLInputElement).value;

		if (name) {
			showModal({
				title: "Perfil Atualizado",
				message: `Seu nome de exibição foi alterado para ${name}. Continue dominando a arena!`,
				type: "success",
				confirmText: "Voltar ao Menu",
				onConfirm: () => {
					navigateTo('dashboard'); // Só navega quando o usuário clica no botão do modal
				}
			});
		}
	})
}

navigateTo('login');
