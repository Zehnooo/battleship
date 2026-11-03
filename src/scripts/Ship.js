
export default class Ship {
    constructor(length) {
        if (!Number.isInteger(length) || length <= 0) { throw new RangeError('Ship length must be a positive integer.'); }
        this.length = length;
        this.hits = 0;
    }
    hit() { this.hits++; }
    isSunk() { return this.hits === this.length; }
}