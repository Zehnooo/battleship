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
            const con = dom.create('div', `${p.type}-board-container`);
            const board = dom.create('div', `${p.type}-board-container`);

            for (let i = 1; i <= boardData.length; i++) {
                const rowEl = dom.build.game_row(boardData[i - 1], i);
                board.appendChild(rowEl);
            }


            con.append(board);
            return con;
        },

        "game_row": (rowData, rowNum) => {
            const rowEl = dom.create('div', `row-${rowNum}`);

            rowData.forEach(tileData => {
                const tileEl = dom.build.game_tile(tileData);
                rowEl.appendChild(tileEl);
            })
            return rowEl;
        },

        "game_tile": (tileData) => {
            const tileEl = dom.create('div');
            const tile = dom.create('div');
            const span = dom.create('span', null, null, ['tile', 'blank']);

            tile.appendChild(span);
            console.log(tileData);

            return tileEl;
        }
    }
}
