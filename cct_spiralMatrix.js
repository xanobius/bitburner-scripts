/**
 DESCRIPTION

 Given an array of array of numbers representing a 2D matrix, return the
 elements of that matrix in clockwise spiral order.

 Example: The spiral order of

 [1, 2, 3, 4]
 [5, 6, 7, 8]
 [9, 10, 11, 12]

 is [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
 */


export function spiralizeMatrix(input)
{
  let speed 	= { x: 1, y: 0}
  const pos 	= { x: 0, y: 0}
  let boundaries = {
    xStart: 0, xEnd: input[0].length-1,
    yStart: 0, yEnd: input.length-1
  }
  const result = []
  const totalLength = input
    .map(a => a.length)
    .reduce((t, d) => t + d, 0)

  while(result.length < totalLength){
    result.push(input[pos.y][pos.x])
    const {x, y} = {x: pos.x + speed.x, y: pos.y + speed.y}

    if(!isMovePossible({x,y}, boundaries)){
      let newInf = changeDirection(speed, boundaries)
      speed = newInf.speed
      boundaries = newInf.boundaries
    }
    pos.x = pos.x + speed.x
    pos.y = pos.y + speed.y
  }

  return result
}

function isMovePossible(pos, boundaries){
  return pos.x >= boundaries.xStart && pos.x <= boundaries.xEnd &&
    pos.y >= boundaries.yStart && pos.y <= boundaries.yEnd;
}

function changeDirection(speed, boundaries){
  if(speed.x === 1 && speed.y === 0){ // from right to down
    return {
      speed : {x: 0, y: 1},
      boundaries: {...boundaries, yStart: boundaries.yStart + 1}
    }
  }
  if(speed.x === 0 && speed.y === 1){ // from down to left
    return {
      speed : {x: -1, y: 0},
      boundaries: {...boundaries, xEnd: boundaries.xEnd - 1}
    }
  }
  if(speed.x === -1 && speed.y === 0){ // from left to up
    return {
      speed : {x: 0, y: -1},
      boundaries: {...boundaries, yEnd: boundaries.yEnd - 1}
    }
  }
  if(speed.x === 0 && speed.y === -1){ // from up to right
    return {
      speed : {x: 1, y: 0},
      boundaries: {...boundaries, xStart: boundaries.xStart + 1}
    }
  }
}


export function runSpiralizeMatrixTestCases(ns){
  const case1 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ]
  const result1 = [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]

  const case2 = [
    [1, 2, 3],
    [4, 1, 6],
    [7, 8, 9],
  ]
  const result2 = [1, 2, 3, 6, 9, 8 ,7, 4, 1]

  const case3 = [
    [1,  2,  3,  4],
    [5,  6,  7,  8],
    [9, 10, 11, 12],
  ]

  const result3 = [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]

  // actual contract!
  const case4 =[
    [39,32,10,42,30,27,18,27,49,27,1,9],
    [14,34,10,32,33,35,3,19,34,1,2,17],
    [6,6,12,25,41,43,36,4,49,35,31,44],
    [9,1,46,45,12,44,30,28,32,43,3,2],
    [46,11,15,47,32,40,25,17,35,41,42,32],
    [47,43,36,13,19,15,27,37,30,14,18,43],
    [37,41,23,10,40,10,2,36,20,29,32,32],
    [30,5,34,6,18,45,36,40,21,37,48,21],
    [40,27,24,12,26,29,47,30,21,9,31,41],
    [39,25,35,41,8,11,42,29,39,42,24,46],
    [17,15,25,31,50,40,48,23,1,9,41,34],
    [7,20,12,17,5,48,5,23,17,35,22,3],
    [3,4,24,20,8,4,40,25,3,22,8,46],
    [12,4,5,1,16,45,17,21,7,48,46,41]
  ]

  const result4 = [39,32,10,42,30,27,18,27,49,27,1,9,17,44,2,32,43,32,21,41,46,34,3,46,41,46,48,7,21,17,45,16,1,5,4,12,3,7,17,39,40,30,37,47,46,9,6,14,34,10,32,33,35,3,19,34,1,2,31,3,42,18,32,48,31,24,41,22,8,22,3,25,40,4,8,20,24,4,20,15,25,27,5,41,43,11,1,6,12,25,41,43,36,4,49,35,43,41,14,29,37,9,42,9,35,17,23,5,48,5,17,12,25,35,24,34,23,36,15,46,45,12,44,30,28,32,35,30,20,21,21,39,1,23,48,40,50,31,41,12,6,10,13,47,32,40,25,17,37,36,40,30,29,42,11,8,26,18,40,19,15,27,2,36,47,29,45,10]

  ns.tprint('Test Case 1:')
  testSpiralizeMatrix(ns, case1, result1)
  ns.tprint('Test Case 2:')
  testSpiralizeMatrix(ns, case2, result2)
  ns.tprint('Test Case 3:')
  testSpiralizeMatrix(ns, case3, result3)
  ns.tprint('Test Case 4:')
  testSpiralizeMatrix(ns, case4, result4)
}

function testSpiralizeMatrix(ns, input, correctResult){
  const result = spiralizeMatrix(input);
  if(JSON.stringify(result) != JSON.stringify(correctResult)){
    ns.tprint('wrong result')
    ns.tprint(`expected: ${JSON.stringify(correctResult)}`)
    ns.tprint(`received: ${JSON.stringify(result)}`)
  }else{
    ns.tprint('correct result')
  }
}



/*
[
	[39,32,10,42,30,27,18,27,49,27,1,9],
	[14,34,10,32,33,35,3,19,34,1,2,17],
	[6,6,12,25,41,43,36,4,49,35,31,44],
	[9,1,46,45,12,44,30,28,32,43,3,2],
	[46,11,15,47,32,40,25,17,35,41,42,32],
	[47,43,36,13,19,15,27,37,30,14,18,43],
	[37,41,23,10,40,10,2,36,20,29,32,32],
	[30,5,34,6,18,45,36,40,21,37,48,21],
	[40,27,24,12,26,29,47,30,21,9,31,41],
	[39,25,35,41,8,11,42,29,39,42,24,46],
	[17,15,25,31,50,40,48,23,1,9,41,34],
	[7,20,12,17,5,48,5,23,17,35,22,3],
	[3,4,24,20,8,4,40,25,3,22,8,46],
	[12,4,5,1,16,45,17,21,7,48,46,41]
]

[39,32,10,42,30,27,18,3,36,43,41,25,12,6,34,10,12,46,15,11,1,46,45,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47,13,36,15,47]


 */
