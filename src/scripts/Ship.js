
export const SHIP_TYPES = {
    'CARRIER': {
        name: 'Carrier',
        length: 5
    },
    'BATTLESHIP': {
        name: 'Battleship',
        length: 4
    },
    'DESTROYER': {
        name: 'Destroyer',
        length: 3,
    },
    'SUBMARINE': {
        name: 'Submarine',
        length: 3,
    },
    'PATROL_BOAT': {
        name: 'Patrol Boat',
        length: 2,
    }
}

export default class Ship {
    constructor(type) {
        if (!SHIP_TYPES[type]) { throw new Error('Invalid ship type'); }
        this.name = SHIP_TYPES[type].name;
        this.length = SHIP_TYPES[type].length;
        this.hits = 0;
    }
    hit() { this.hits++; }
    isSunk() { return this.hits === this.length; }
}