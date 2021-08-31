const { test, expect } = require('@jest/globals');


const ship = require('/Users/connor/VS CODE PROJECTS/Battleship/scripts/ship.js');

test('created ship length should = 4', () => {
    expect(x = new ship(4, [{"A" : 1 }] )).toEqual( {"length": 4, "postion": [{"A": 1}]}
      );
  });

