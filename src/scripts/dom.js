import largeLogo from '../assets/images/logo-large.png';

export const dom = {

    "find": (selector) => {
        return document.querySelector(selector) ?? undefined;
    },

    "create": (type, id = null, text = null, classes = []) => {
        const x = document.createElement(type);
        if (id !== null) x.id = id;
        if (text !== null) x.textContent = text;
        if (classes.length !== 0) { classes.forEach(c => x.classList.add(c)); }
        return x;
    },

    "render": (container, content) => {
        if (container === undefined) return null;
        container.replaceChildren(content);
        return container;
    },

    "build": {
        "gameboard": (player) => {
            const p = {...player}
            const boardData = p.gameboard.board;
            const con = dom.create('div', `${p.type}-board-container`, null, ['board-con']);
            const board = dom.create('div', `${p.type}-board`, null, ['board-grid']);

            const playerName = dom.create('div', null, null, ['player-con']);
            playerName.append(dom.create('h4', null, String(player.type === 'user' ? 'YOU' : 'CPU'), ['player-name']));

            board.append(playerName);
            board.append(dom.build.axis_row([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'y-axis'));
            board.append(dom.build.axis_row([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'x-axis'));

            for (let i = 1; i <= boardData.length; i++) {
                const rowEl = dom.build.game_row(boardData[i - 1], i);
                board.appendChild(rowEl);
            }


            con.append(board);
            return con;
        },

        "game_row": (rowData, rowNum) => {
            const rowEl = dom.create('div', `row-${rowNum}`, null, ['board-row']);

            rowData.forEach(tileData => {
                const tileEl = dom.build.game_tile(tileData);
                rowEl.appendChild(tileEl);
            });

            return rowEl;
        },

        "game_tile": (tileData) => {
            const tileEl = dom.create('div', null, null, ['tile-con', 'game-tile']);
            const tile = dom.create('div', null, null, ['tile', 'blank']);
            const span = dom.create('span', null, null);

            tile.appendChild(span);

            tileEl.appendChild(tile);
            return tileEl;
        },

        "axis_row": (nums, axis) => {
            const rowEl = dom.create('div', String(axis), null, ['axis-row']);

            nums.forEach(num => {
                const tileEl = dom.build.axis_tile(num);
                rowEl.appendChild(tileEl);
            });

            return rowEl;
        },

        "axis_tile": (num) => {
            const tileEl = dom.create('div', null, null, ['tile-con']);
            const tile = dom.create('div', null, null, ['tile']);
            const span = dom.create('span', null, String(num));

            tile.appendChild(span);
            tileEl.appendChild(tile);
            return tileEl;
        },

        "home_page": () => {
            const div = dom.create('div', 'home', null, ['page']);

            const logoFig = dom.create('figure');

            const logo = dom.create('img', null, null, ['logo']);
            logo.src = largeLogo;


            const link = dom.create('a', null, 'Start Game');
            link.dataset.link = '';
            link.href = '/play';


            logoFig.append(logo);

            div.append(logoFig, link);

            return div;
        },

        "error_page": () => {
            const container = dom.create('div', null, null, ['error-page', 'page']);

            const title = dom.create('h1', null, '404 - Page Not Found');
            const message = dom.create('p', null, "The page you're looking for doesn't exist.");
            const homeLink = dom.create('a', null, 'Return to Home', ['error-page-link']);

            homeLink.href = '/';
            homeLink.dataset.link = '';

            container.append(title, message, homeLink);

            return container;
        },

        "game_page": () => {
            return null;
        },

        "settings_page": () => {
            return null;
        }
    }
}
