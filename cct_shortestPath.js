/*

Shortest Path in a Grid

You are located in the top-left corner of the following grid:

  [[0,0,0,0,0,0,0,0,0,1],
   [0,0,0,0,0,0,1,0,0,0],
   [0,0,1,0,0,0,0,0,1,1],
   [0,0,1,1,0,1,1,0,0,0],
   [0,0,0,0,0,0,1,1,1,0],
   [0,1,1,0,1,0,0,1,0,0],
   [0,1,1,1,1,0,0,0,0,0],
   [0,1,1,0,0,1,0,0,0,0],
   [1,0,1,1,1,0,0,0,1,0],
   [0,1,0,0,0,0,0,1,0,0],
   [0,0,0,0,0,0,0,0,0,0]]

You are trying to find the shortest path to the bottom-right corner of the grid,
but there are obstacles on the grid that you cannot move onto.
These obstacles are denoted by '1', while empty spaces are denoted by 0.

Determine the shortest path from start to finish, if one exists.
The answer should be given as a string of UDLR characters, indicating the moves along the path

NOTE: If there are multiple equally short paths, any of them is accepted as answer.
If there is no path, the answer should be an empty string.
NOTE: The data returned for this contract is an 2D array of numbers representing the grid.

Examples:

    [[0,1,0,0,0],
     [0,0,0,1,0]]

Answer: 'DRRURRD'

    [[0,1],
     [1,0]]

Answer: ''

*/

export function shortestPathSimple(inp){
  if(inp[0][0] === 1) return ''
  return walkThrough(inp, {x : 0, y : 0}, '') ?? ''
}

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
  }, { letter: 'U', fn: (p, f) => {
      if(p.y - 1 < 0) return false
      if(f[p.y - 1][p.x] === 1) return false
      return {x : p.x, y: p.y - 1}
    }
  }, { letter: 'L', fn: (p, f) => {
      if(p.x - 1 < 0) return false
      if(f[p.y][p.x - 1] === 1) return false
      return {x : p.x - 1, y: p.y}
    }
  }
]

function walkThrough(field, pos, lastDirection, cordHistory = [], cache = {}){
  if(cordHistory.includes(`${pos.x}-${pos.y}`)) return '' // prevent circularity
  if(pos.x === field[0].length - 1 && pos.y === field.length -1) {
    // console.log(`Path found: ${path}`)
    return lastDirection
  } // destination reached


  if(cache.hasOwnProperty(`${pos.x}-${pos.y}`)){
    return lastDirection + cache[`${pos.x}-${pos.y}`]
  }


  let validPathsEndings = []
  directions.forEach(dir => {
    const res = dir.fn(pos, field)
    if(res !== false) {
      let followUp = walkThrough(field, res, dir.letter, [...cordHistory, `${pos.x}-${pos.y}`], cache)
      if(followUp !== '')
        validPathsEndings = [
          ...validPathsEndings,
          followUp
        ]
    }
  })
  if(validPathsEndings.length === 0) return ''
  // console.log(validPaths)
  const shortest = validPathsEndings.sort((a, b) => a.length > b.length ? 1 : -1)[0]
  cache[`${pos.x}-${pos.y}`] = shortest
  return lastDirection + shortest
}


export const testCasesI = [
  {
    input : [[0,1,0,0,0], [0,0,0,1,0]],
    result: 'DRRURRD'
  },{
    input: [
      [0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,1,1],
      [0,0,1,0,0,0,0,0,0],
      [0,0,0,1,1,1,0,1,1],
      [1,0,0,0,0,0,0,0,0],
      [0,1,0,1,0,0,0,0,0],
      [0,0,1,1,0,0,0,1,0],
      [0,1,1,0,0,1,0,0,0],
      [0,0,0,0,0,0,0,0,1],
      [0,1,0,0,0,0,0,1,0],
      [0,0,0,0,0,0,0,0,0]
    ],
    result: 'RDDDDRRRDDDDDDRRRR'
  }, {
    input: [[0,0,0,0,0,0,0,1],
      [0,0,0,0,0,1,0,0],
      [0,0,0,0,0,0,1,0],
      [0,1,0,0,0,0,1,0],
      [0,1,0,0,0,1,1,1],
      [0,0,0,1,1,0,0,0],
      [1,1,0,0,0,0,0,0],
      [0,1,0,0,0,0,0,0],
      [0,1,0,1,0,0,0,0]],
    result: 'DDRRDDDDDRRDRRR'
  }
]
