import Gameboard from './Gameboard.js';

const PLAYER_TYPES = {
    'USER': 'user',
    'COMPUTER': 'computer'
}

export default class Player {
    constructor(player) {
        this.type = PLAYER_TYPES[player];
        this.gameboard = new Gameboard();
    }
}