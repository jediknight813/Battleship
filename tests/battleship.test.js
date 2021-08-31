const { test, expect } = require('@jest/globals');


const gameboard = require('/Users/connor/VS CODE PROJECTS/Battleship/scripts/battleship.js');

test('created ship length should = 4', () => {
    expect(gameboard()).toBe(
       //pass
      );
  });

