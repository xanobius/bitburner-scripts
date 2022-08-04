/*
Minimum Path Sum in a Triangle
You are attempting to solve a Coding Contract.
You have 10 tries remaining, after which the contract will self-destruct.

Given a triangle, find the minimum path sum from top to bottom.
In each step of the path, you may only move to adjacent numbers in the row below.
The triangle is represented as a 2D array of numbers:

[
    [8],
   [9,2],
  [6,8,3]
]

Example: If you are given the following triangle:

[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]

The minimum path sum is 11 (2 -> 3 -> 5 -> 1).
 */

export function getMinTriangleSum(inp){
  console.table(getPath(inp, 0, 0))
}

const sumReducer = (tot, el) => tot + el

function getPath(triangle, depth, index, path = []) {
  path.push(triangle[depth][index])
  if(depth === triangle.length - 1){
    return path;
  }

  const paths = [
    getPath(triangle, depth + 1, index, [...path]),
    getPath(triangle, depth + 1, index + 1, [...path])
  ]
  return paths.
    sort((a, b) => {
      return a.reduce(sumReducer) > b.reduce(sumReducer) ? 1 : -1
  })[0]
}
