type ViewId = 'login-view' | 'dashboard-view' | 'game-view' | 'profile-view' | 'twofa-view' | 'register-view'
| 'multiplayer-view' | 'solo-view' | 'campeonato-view'| 'friends-view';

const routes: Record<string, ViewId> = {
    '/': 'login-view',
    '/login': 'login-view',
    '/dashboard': 'dashboard-view',
    '/game': 'game-view',
    '/profile' : 'profile-view',
    '/twofactor' : 'twofa-view',
    '/register': 'register-view',
    '/dashboard/multiplayer': 'multiplayer-view',
    '/dashboard/solo': 'solo-view',
    '/dashboard/campeonato': 'campeonato-view',
    '/dashboard/friends' : 'friends-view',

};

const views: Record<ViewId, HTMLElement | null> = {
    'login-view': document.getElementById('login-view'),
    'dashboard-view': document.getElementById('dashboard-view'),
    'game-view': document.getElementById('game-view'),
    'profile-view': document.getElementById('profile-view'),
    'twofa-view': document.getElementById('twofa-view'),
    'register-view': document.getElementById('register-view'),
    'multiplayer-view': document.getElementById('multiplayer-view'),
    'solo-view': document.getElementById('solo-view'),
    'campeonato-view': document.getElementById('campeonato-view'),
    'friends-view' : document.getElementById('friends-view'),
};

function showView(viewId: ViewId): void {
    for (const id in views) {
        const view = views[id as ViewId];
        if (view) {
            view.classList.add('hidden');
        }
    }

    const view = views[viewId];
    if (view) {
        view.classList.remove('hidden');
    } else {
        const loginView = views['login-view'];
        if (loginView) {
            loginView.classList.remove('hidden');
        }
    }
}

export function navigateTo(path: string): void {
    window.history.pushState(null, '', path);
    handleRoute();
}

function handleRoute(): void {
    const path = window.location.pathname;
    const viewId = routes[path] || 'login-view';
    showView(viewId);

    const event = new CustomEvent('routeChange', { detail: { viewId } });
    document.dispatchEvent(event);
}

window.addEventListener('popstate', handleRoute);

document.addEventListener('DOMContentLoaded', () => {
    handleRoute();
});
