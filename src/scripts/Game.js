import Player from './Player.js';

export default class Game {
    constructor(){
        this.players = {
            P1: new Player('USER'),
            P2: new Player('COMPUTER')
        }
    }
    getPlayers() {
        return this.players;
    }
}