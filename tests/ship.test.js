import Ship from '../src/scripts/Ship.js';

test("Creates Ship with correct initial values", () => {
    const ship = new Ship();

    expect(ship).toBeInstanceOf(Ship);
    expect(ship.length).toBe(3);
    expect(ships.hits).toBe(0);
    expect(ship.isSunk()).toBe(false);
});