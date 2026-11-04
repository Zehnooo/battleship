import Ship from '../src/scripts/Ship.js';
import { SHIP_TYPES } from '../src/scripts/Ship.js';

test("Creates Ship with correct initial values", () => {
    const type = 'DESTROYER'
    const ship = new Ship(type);

    expect(ship).toBeInstanceOf(Ship);

    expect(ship.length).toBe(SHIP_TYPES[type].length);
    expect(ship.hits).toBe(0);
    expect(ship.isSunk()).toBe(false);
});

test("Hits ship but does not sink", () => {
    const ship = new Ship('CARRIER');

    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(2);
    expect(ship.isSunk()).toBe(false);
});

test("Hits ship and sinks", () => {
    const ship = new Ship('SUBMARINE');

    for (let i = 0; i < ship.length; i++) { ship.hit(); }
    expect(ship.hits).toBe(ship.length);
    expect(ship.isSunk()).toBe(true);
});