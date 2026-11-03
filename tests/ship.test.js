import Ship from '../src/scripts/Ship.js';

test("Creates Ship with correct initial values", () => {
    const ship = new Ship(3);

    expect(ship).toBeInstanceOf(Ship);
    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
    expect(ship.isSunk()).toBe(false);
});

test("Hits ship but does not sink", () => {
    const ship = new Ship(3);

    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(2);
    expect(ship.isSunk()).toBe(false);
});

test("Hits ship and sinks", () => {
    const ship = new Ship(3);

    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(3);
    expect(ship.isSunk()).toBe(true);
});