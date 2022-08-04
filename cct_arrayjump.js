/*
Array Jumping Game

You are given the following array of integers:

6,4,9,3,3,7,10,0,8,3,7,7,2,10,6,6,0,0,0,7

Each element in the array represents your MAXIMUM jump length at that position.
This means that if you are at position i and your maximum jump length is n,
you can jump to any position from i to i+n.

Assuming you are initially positioned at the start of the array,
determine whether you are able to reach the last index.

Your answer should be submitted as 1 or 0, representing true and false respectively

*/
export function arrayJumper(arr) {
  return wayFinder(arr, 0, []) ? 1 : 0
}

export function arrayJumperV2(arr){
  let res = wayFinderV2(arr, 0, [], true);
  return res ?? 0
}

function wayFinder(arr, position, history, safety){
  // add myself to the history, DRY
  history.push(position)
  //did i reached the end?
  if(position === arr.length - 1) return true;

  // Safety-Mechanism for recursions
  if(safety > 20){
    console.log('safety kicked')
    return false
  }

  let foundSolution = false
  const fIndx = position + arr[position]
  const bIndx = position - arr[position]

  if(fIndx <= arr.length - 1 && ! history.includes(fIndx))
    foundSolution = wayFinder(arr, fIndx, history,  safety + 1) ? true : foundSolution;

  if(bIndx > 0 && ! history.includes(bIndx))
    foundSolution = wayFinder(arr, bIndx, history, safety + 1) ? true: foundSolution;

  return foundSolution;
}

function wayFinderV2(arr, position, history, v2 = false, safety = 0){
  // add myself to the history, DRY
  history.push(position)
  //did i reached the end?
  if(position === arr.length - 1) return safety;

  // Safety-Mechanism for recursions (should, because of the history, never happen)
  if(safety > 20){
    console.log('safety kicked')
    return false
  }

  let solutions = []

  for(let i = arr[position]; i >= 0; i--){
    const fIndx = position + i
    const bIndx = position - i

    if(fIndx <= arr.length - 1 && ! history.includes(fIndx)) {
      let steps = wayFinderV2(arr, fIndx, [...history], v2, safety + 1)
      if (steps){
        solutions.push(steps)
      }
    }

    if(bIndx > 0 && ! history.includes(bIndx)){
      let steps = wayFinderV2(arr, bIndx, [...history], v2, safety + 1)
      if(steps)
        solutions.push(steps)
    }
  }

  return solutions.length !== 0 ?
    solutions.sort((a, b) => a > b ? 1 : -1)[0] :
    false;
}

export const testCases = [
  {
    input : [1, 0],
    result : 1
  },{
    input : [2, 5, 1, 7, 2],
    result : 0
  },{
    input: [6,4,9,3,3,7,10,0,8,3,7,7,2,10,6,6,0,0,0,7],
    result: 0
  },{
    input: [1,0,8,0],
    result: 0
  }
]

export const testCasesV2 = [
  {
    input : [2, 1, 0],
    result : 1
  },{
    input : [3, 0, 2, 0, 2, 0, 1],
    result : 3
  },{
    input: [1,1,2,4,3,5,2,0,1,1,3,1,1,6,2,3,0,0,3,0,3,5],
    result: 8
  }
]
