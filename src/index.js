import Player from './scripts/Player.js';
import { dom } from './scripts/dom.js';
import { router, navigate } from "./scripts/router.js";

import logo from './assets/images/logo.png';

import '@fontsource/rajdhani/400.css';
import '@fontsource/rajdhani/500.css';
import '@fontsource/rajdhani/600.css';
import '@fontsource/rajdhani/700.css';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';

import './reset.css';
import './styles.css';


(() => {
    // setup nav buttons
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[data-link]');
        if (!link) return;

        e.preventDefault();
        navigate(link.getAttribute('href'));
    });

    // handle back and forward buttons
    window.addEventListener('popstate', router);

    // set navbar logo
    dom.find('#sidebar .logo').src = logo;

    // setup navbar collapse
    const toggleBtn = dom.find('#toggle');
    toggleBtn.addEventListener('click', () => {
        const isExpanded = (toggleBtn.getAttribute('aria-expanded') === "true");
        toggleBtn.setAttribute('aria-expanded', !isExpanded);

        isExpanded === true ?
        dom.find('#sidebar').classList.add('collapsed') :
        dom.find('#sidebar').classList.remove('collapsed');
    });

    // init page
    router();
})();

const player = new Player('USER');
const cpu = new Player('COMPUTER');

dom.render(dom.find('#player-section'), dom.build.gameboard(player));
dom.render(dom.find('#computer-section'), dom.build.gameboard(cpu));