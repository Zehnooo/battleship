import Gameboard from '../src/scripts/Gameboard.js';


test('Init gameboard and verify proper row and col count', () => {
    const gb = new Gameboard();
    const b = gb.board;
    expect(gb).toBeInstanceOf(Gameboard);
    expect(b.length).toBe(10);
    expect(b.every(row => row.length === 10)).toBe(true);
});

test('Init gameboard and place all ships', () => {
    const gb = new Gameboard();
    gb.placeShip('CARRIER', 1, 1);
    gb.placeShip('BATTLESHIP', 3, 3);
    gb.placeShip('DESTROYER', 8, 2);
    gb.placeShip('SUBMARINE', 9, 9);
    gb.placeShip('PATROL_BOAT', 5, 4);
    console.log(gb.returnBoard());
});