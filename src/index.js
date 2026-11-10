import Player from './scripts/Player.js';
import { dom } from './scripts/dom.js';
import { router, navigate } from "./scripts/router.js";


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

        // back and forward buttons
        window.addEventListener('popstate', router);

        // init page
        router();
})();

const player = new Player('USER');
const cpu = new Player('COMPUTER');

dom.render(dom.find('#player-section'), dom.build.gameboard(player));
dom.render(dom.find('#computer-section'), dom.build.gameboard(cpu));