
import Gameboard from '../src/scripts/Gameboard.js';

describe('Gameboard initialization', () => {
    test('creates a 10x10 board', () => {
        const gb = new Gameboard();

        expect(gb.board).toHaveLength(10);
        expect(gb.board.every(row => row.length === 10)).toBe(true);
    });

    test('initializes tiles with correct properties and coordinates', () => {
        const gb = new Gameboard();

        expect(gb.returnTile(1, 1)).toMatchObject({
            shipName: null,
            hasShip: false,
            isHit: false,
            isMiss: false,
            row: 1,
            col: 1
        });

        expect(gb.returnTile(10, 10)).toMatchObject({
            row: 10,
            col: 10
        });

        expect(gb.ships).toEqual([]);
        expect(gb.missedAttacks).toEqual([]);
    });
});

describe('Ship placement options', () => {
    test('returns valid placements from the top-left corner', () => {
        const gb = new Gameboard();

        const options = gb.getPlacementOptions('DESTROYER', 1, 1);

        expect(options).toEqual({
            defaultPlacement: [
                [1, 1], [2, 1], [3, 1]
            ],
            allPlacements: [
                [[1, 1], [2, 1], [3, 1]],
                [[1, 1], [1, 2], [1, 3]]
            ]
        });
    });

    test('returns valid placements near the board edge', () => {
        const gb = new Gameboard();

        const options = gb.getPlacementOptions('DESTROYER', 9, 9);

        expect(options.allPlacements).toEqual([
            [[9, 9], [8, 9], [7, 9]],
            [[9, 9], [9, 8], [9, 7]]
        ]);
    });

    test('getting placement options does not modify the board', () => {
        const gb = new Gameboard();

        gb.getPlacementOptions('DESTROYER', 1, 1);

        expect(gb.returnTile(1, 1).hasShip).toBe(false);
        expect(gb.ships).toHaveLength(0);
    });

    test('excludes placements that overlap existing ships', () => {
        const gb = new Gameboard();

        gb.placeShip('PATROL_BOAT', 2, 1);

        const options = gb.getPlacementOptions('DESTROYER', 1, 1);

        expect(options.allPlacements).toEqual([
            [[1, 1], [1, 2], [1, 3]]
        ]);
    });

    test('rejects placement on an occupied starting tile', () => {
        const gb = new Gameboard();

        gb.placeShip('DESTROYER', 1, 1);

        expect(() => {
            gb.getPlacementOptions('PATROL_BOAT', 1, 1);
        }).toThrow('Ship exists in this location');
    });

    test('rejects invalid starting coordinates', () => {
        const gb = new Gameboard();

        const invalidCoords = [
            [0, 1],
            [11, 1],
            [1, 0],
            [1, 11]
        ];

        for (const [row, col] of invalidCoords) {
            expect(() => {
                gb.getPlacementOptions('DESTROYER', row, col);
            }).toThrow(RangeError);
        }
    });

    test('rejects invalid ship types', () => {
        const gb = new Gameboard();

        expect(() => {
            gb.getPlacementOptions('INVALID_SHIP', 1, 1);
        }).toThrow('Invalid ship type');
    });

    test('throws when no valid placements exist', () => {
        const gb = new Gameboard();

        // Block all four directions around [5, 5]
        gb.placeShip('PATROL_BOAT', 4, 5, 1);
        gb.placeShip('DESTROYER', 6, 5);
        gb.placeShip('SUBMARINE', 5, 6);
        gb.placeShip('BATTLESHIP', 5, 4);

        expect(() => {
            gb.getPlacementOptions('DESTROYER', 5, 5);
        }).toThrow('No valid ship placements');
    });
});

describe('Placing ships', () => {
    test('places a ship using the default placement', () => {
        const gb = new Gameboard();

        const ship = gb.placeShip('DESTROYER', 1, 1);

        expect(gb.returnTile(1, 1).hasShip).toBe(true);
        expect(gb.returnTile(2, 1).hasShip).toBe(true);
        expect(gb.returnTile(3, 1).hasShip).toBe(true);

        expect(gb.returnTile(1, 1).shipName).toBe('Destroyer');

        // All occupied tiles reference the same Ship instance
        expect(gb.returnTile(1, 1).ship).toBe(ship);
        expect(gb.returnTile(2, 1).ship).toBe(ship);
        expect(gb.returnTile(3, 1).ship).toBe(ship);

        expect(gb.ships).toContain(ship);
    });

    test('places a ship using an alternative placement index', () => {
        const gb = new Gameboard();

        gb.placeShip('DESTROYER', 1, 1, 1);

        expect(gb.returnTile(1, 1).hasShip).toBe(true);
        expect(gb.returnTile(1, 2).hasShip).toBe(true);
        expect(gb.returnTile(1, 3).hasShip).toBe(true);

        expect(gb.returnTile(2, 1).hasShip).toBe(false);
    });

    test('rejects invalid placement indices', () => {
        const gb = new Gameboard();

        for (const index of [-1, 2, 0.5, '1']) {
            expect(() => {
                gb.placeShip('DESTROYER', 1, 1, index);
            }).toThrow(RangeError);
        }

        expect(gb.ships).toHaveLength(0);
    });

    test('places all five ship types correctly', () => {
        const gb = new Gameboard();

        gb.placeShip('CARRIER', 1, 1);
        gb.placeShip('BATTLESHIP', 3, 3);
        gb.placeShip('DESTROYER', 8, 2);
        gb.placeShip('SUBMARINE', 9, 9);
        gb.placeShip('PATROL_BOAT', 5, 4);

        expect(gb.ships).toHaveLength(5);

        expect(gb.returnTile(5, 1).shipName).toBe('Carrier');
        expect(gb.returnTile(6, 3).shipName).toBe('Battleship');
        expect(gb.returnTile(10, 2).shipName).toBe('Destroyer');
        expect(gb.returnTile(7, 9).shipName).toBe('Submarine');
        expect(gb.returnTile(6, 4).shipName).toBe('Patrol Boat');

        expect(gb.returnTile(1, 2).hasShip).toBe(false);
    });
});

describe('Receiving attacks', () => {
    test('registers a successful hit', () => {
        const gb = new Gameboard();
        const ship = gb.placeShip('DESTROYER', 1, 1);

        const result = gb.receiveAttack(1, 1);

        expect(ship.hits).toBe(1);
        expect(result.isHit).toBe(true);
        expect(result.isMiss).toBe(false);
        expect(gb.missedAttacks).toHaveLength(0);
    });

    test('registers a missed attack', () => {
        const gb = new Gameboard();

        const result = gb.receiveAttack(5, 5);

        expect(result.isMiss).toBe(true);
        expect(result.isHit).toBe(false);
        expect(gb.missedAttacks).toEqual([[5, 5]]);
    });

    test('prevents attacking the same ship tile twice', () => {
        const gb = new Gameboard();
        const ship = gb.placeShip('DESTROYER', 1, 1);

        gb.receiveAttack(1, 1);

        expect(() => {
            gb.receiveAttack(1, 1);
        }).toThrow('Tile has already been attacked.');

        expect(ship.hits).toBe(1);
    });

    test('prevents attacking the same empty tile twice', () => {
        const gb = new Gameboard();

        gb.receiveAttack(5, 5);

        expect(() => {
            gb.receiveAttack(5, 5);
        }).toThrow('Tile has already been attacked.');

        expect(gb.missedAttacks).toEqual([[5, 5]]);
    });

    test('rejects attacks outside the board', () => {
        const gb = new Gameboard();

        const invalidCoords = [
            [0, 1],
            [11, 1],
            [1, 0],
            [1, 11]
        ];

        for (const [row, col] of invalidCoords) {
            expect(() => {
                gb.receiveAttack(row, col);
            }).toThrow(RangeError);
        }
    });
});

describe('Sinking ships', () => {
    test('tracks whether all placed ships have sunk', () => {
        const gb = new Gameboard();

        const patrol = gb.placeShip('PATROL_BOAT', 1, 1);
        const destroyer = gb.placeShip('DESTROYER', 5, 5);

        expect(gb.areAllSunk()).toBe(false);

        // Sink the Patrol Boat
        gb.receiveAttack(1, 1);
        gb.receiveAttack(2, 1);

        expect(patrol.isSunk()).toBe(true);
        expect(destroyer.isSunk()).toBe(false);
        expect(gb.areAllSunk()).toBe(false);

        // Sink the Destroyer
        gb.receiveAttack(5, 5);
        gb.receiveAttack(6, 5);
        gb.receiveAttack(7, 5);

        expect(destroyer.isSunk()).toBe(true);
        expect(gb.areAllSunk()).toBe(true);
    });

    test('an empty board should not count as all ships sunk', () => {
        const gb = new Gameboard();

        expect(gb.areAllSunk()).toBe(false);
    });
});

describe('Board output', () => {
    test('returns a printable 10x10 board', () => {
        const gb = new Gameboard();

        const output = gb.returnBoard();
        const rows = output.trim().split('\n');

        expect(rows).toHaveLength(10);
        expect(rows[0].match(/\[ ✖ \]/g)).toHaveLength(10);
    });
});
