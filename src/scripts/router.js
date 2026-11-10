import { dom } from './dom.js';

const routes = {
    "/": {
        title: 'Home',
        render: dom.build.home_page(),
    },

    "/play": {
        title: 'Play',
        render: dom.build.game_page(),
    },

    "/settings": {
        title: 'Settings',
        render: dom.build.settings_page(),
    },

    "/error": {
        title: 'Not Found',
        render: dom.build.error_page(),
    }
}

const router = () => {
    const app = dom.find('#content');
    let page = routes[window.location.pathname];

    if (!page || page.render == null) { page = routes['/error']; }

    app.replaceChildren(page.render);
    document.title = `Battleship - ${page.title}`;
}

const navigate = (path) => {
    window.history.pushState({}, "", path);
    router();
}

export { router, navigate };