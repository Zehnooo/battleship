import Player from './Player.js';
import { dom } from './dom.js';

const player = new Player('USER');
const cpu = new Player('COMPUTER');

dom.render(dom.find('#player-section'), dom.build.gameboard(player));
dom.render(dom.find('#computer-section'), dom.build.gameboard(cpu));