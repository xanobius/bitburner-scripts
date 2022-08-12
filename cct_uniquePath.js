/*
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.

You are in a grid with 12 rows and 5 columns, and you are positioned in the top-left corner of that grid.
You are trying to reach the bottom-right corner of the grid, but you can only move down or right on each step.
Determine how many unique paths there are from start to finish.

NOTE: The data returned for this contract is an array with the number of rows and columns:

[12, 5]
*/

const directions = [
  { letter: 'D', fn: (p, f) => {
      if(p.y + 1 >= f.length) return false
      if(f[p.y + 1][p.x] === 1) return false
      return {x : p.x, y: p.y + 1}
    }
  }, { letter: 'R', fn: (p, f) => {
      if(p.x + 1 >= f[0].length) return false
      if(f[p.y][p.x + 1] === 1) return false
      return {x : p.x + 1, y: p.y}
    }
  }
]

export function findUniquePathOne(inp){
  const field = Array.from(Array(inp[0])).map(row => Array(inp[1]).fill(0))
  return getValidWays(field, {x: 0, y: 0})
}

export function findUniquePathTwo(inp){
  return getValidWays(inp, {x: 0, y: 0})
}

function getValidWays(field, pos, cordHistory = []) {
  if(cordHistory.includes(`${pos.x}-${pos.y}`)) return 0
  if(pos.x === field[0].length - 1 && pos.y === field.length -1) {
    return 1
  }

  let validPaths = 0
  directions.forEach(dir => {
    const res = dir.fn(pos, field)
    if(res !== false) {
      validPaths += getValidWays(field, res, [...cordHistory, `${pos.x}-${pos.y}`])
    }
  })
  return validPaths
}

export const testCasesOne = [
  {
    input: [12, 5],
    result: 1365
  }
]

export const testCasesTwo = [
  {
    input: [
      [0,0,0,0,0,1,0,0,0,0,0],
      [1,0,0,0,0,0,0,0,0,0,0]
    ],
    result: 4
  }
]
