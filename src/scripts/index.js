import Player from './Player.js';
import { dom } from './dom.js';

const player = new Player('USER');
const cpu = new Player('COMPUTER');

dom.render(dom.find('#player-board'), dom.build.gameboard(player));