import { dom } from './dom.js';
import Game from './Game.js';
import { storage } from './storage.js';

const routes = {
    "/": {
        title: 'Home',
        render: () => dom.build.home_page(),
    },

    "/play": {
        title: 'Play',
        render: () => dom.build.game_page(new Game()),
    },

    "/settings": {
        title: 'Settings',
        render: () => dom.build.settings_page(),
    },

    "/error": {
        title: 'Not Found',
        render: () => dom.build.error_page(),
    }
}

const router = () => {
    const app = dom.find('#content');
    const hash = window.location.pathname;

    if (hash === '/play') {
        window.addEventListener('hashchange', () => {
            const confirmed = window.confirm('Are you sure you want to leave? Game progress will be lost.');
            if (!confirmed) { return; }
        });
    }
    storage.set('last-hash', hash);


    let page = routes[hash] || routes['/error'];
    let content = page.render();

    if (content == null) {
        page = routes['/error'];
        content = page.render();
    }

    app.replaceChildren(content);
    document.title = `Battleship - ${page.title}`;
}

const navigate = (path) => {
    window.history.pushState({}, "", path);
    router();
}

export { router, navigate };