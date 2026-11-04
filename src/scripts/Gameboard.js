import Ship from './Ship.js';

const BOARD_SIZE = 10;
const isOutside = (val, min = 1, max = 10) => { return val < min || val > max; }

export default class Gameboard {
    constructor() {
        this.board = this.#createBoard();
        this.missedAttacks = [];
    }
    #createBoard() {
        const board = [];
        for (let i = 1; i <= BOARD_SIZE; i++) {
            const row = [];
            for (let j = 1; j <= BOARD_SIZE; j++) {
                row.push({
                    shipName: null,
                    hasShip: false,
                    isHit: false,
                    isMiss: false,
                    row: i,
                    col: j,
                });
            }
            board.push(row);
        }
        return board;
    }
    placeShip(shipType, row, col) {
        if (isOutside(row) || isOutside(col)) { throw new RangeError('Not a valid coordinate (1 - 10)'); }
    const ship = new Ship(shipType);
    const placements = this.#getPlacements(ship.length, [row, col] );

    if (placements.length === 0) { throw new Error('No valid ship placements'); }

    const defaultPlacement = placements[0];

    for (const [r, c] of defaultPlacement) {
        const tile = this.board[r - 1][c - 1];
        tile.shipName = ship.name;
        tile.hasShip = true;
    }

    return placements;
    }

    #getPlacements(length, startCoords) {
        const [startRow, startCol] = startCoords;
        if (this.board[startRow - 1][startCol - 1].hasShip) { throw new Error('Ship exists in this location'); }
        if (length === 1) { return [[startCoords]]; }

        const directions = [
            [1, 0], // Down
            [-1, 0], // Up
            [0, 1], // Right
            [0, -1] // Left
        ]
        const placements = [];

        for (const [rowStep, colStep] of directions) {
            const path = [];

            for (let i = 0; i < length; i++) {
                const row = startRow + rowStep * i;
                const col = startCol + colStep * i;

                // skip path if coord falls off board or if a ship occupies that tile
                if (
                    isOutside(row) ||
                    isOutside(col) ||
                    this.board[row - 1][col - 1].hasShip
                ) { break; }

                path.push([row, col]);
            }

            if (path.length === length) { placements.push(path); }
        }

        return placements;
    }

    receiveAttack(row, col) {
        if (isOutside(row) || isOutside(col)) { throw new RangeError('Not a valid coordinate (1 - 10)'); }
        const target = this.board[row - 1][col - 1];
        console.log(target);
    }

    returnTile(row, col) {
        return this.board[row - 1][col - 1];
    }
    returnBoard() {
        let str = '';
        this.board.forEach(row => {
            let temp = '';
            row.forEach(tile => {
                // Print ship initial if tile has one, else prints 'X'
                temp += `[ ${tile.hasShip ? `${String(tile.shipName).charAt(0)}` : '\u2716'} ]`
            });
            str += temp + '\n'
        });
        return str;
    }
}