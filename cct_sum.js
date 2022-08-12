/*
Total Ways to Sum I

Given a number, how many different ways can that number be written as
a sum of at least two positive integers?
 */


export function solveSum(number){
  if(number === 1) return 0;
  if(number === 2) return 1;
  const literal = getSummandsRek(number, 1)

  return literal;
}

function getSummandsRek(number, start) {
  let summands = 0;
  for(let i = start; i <= Math.floor(number / 2 ); i++){
    summands++;
    summands += getSummandsRek(number - i, i)
  }
  return summands;
}

/*
Total Ways to Sum II
You are attempting to solve a Coding Contract.
You have 10 tries remaining, after which the contract will self-destruct.

How many different distinct ways can the number 40 be written as a sum of integers contained in the set:

[2,5,7,11,12,14,17,18]?

You may use each integer in the set zero or more times.
 */

function factorialize (num){
  if (num < 0)
    return -1;
  else if (num === 0)
    return 1;
  else {
    return (num * factorialize(num - 1));
  }
}

export function solveSumTwo(input){
  const target = input[0]
  const numbers = input[1]

  // let combos = BigInt(0)
  // const cache = {}
  // for(let i = 0; i < numbers.length; i++){
  //   combos = combos + countValidCombosV4(numbers, i, target, [], cache)
  // }
  let combos = 0
  for(let i = 0; i < numbers.length; i++){
    combos = combos + countValidCombosWOPermutation(numbers, i, target, 0)
  }
  return combos;
    //combos.push(countValidCombosV2(numbers, i, target))
  // check for doubles first?
  const strCombos = combos.map((numbers) => {
      return {
        str: numbers.split('+').sort((a, b) => a > b ? 1 : -1).join('+'),
        orig : numbers.split('+').map(a => parseInt(a))
      }
    })

  return strCombos
    .filter((n, i) => { // remove doublicates
      return strCombos.findIndex(e => e.str === n.str) === i
    })
    .map(e => e.orig).length // get original data back
    /*
    .reduce((tot, combo, i) => {
        // Permutations of a combo
      return tot +
        factorialize(combo.length) /
        combo
          .map(number => {
            return {
              number : number,
              appearances : combo.filter(a => a === number).length
            }
          })
          .filter((a, i) => combo.findIndex(b => b === a.number) === i )
          .reduce((num, el) => {
            return num * factorialize(el.appearances)
          }, 1)
    },0) /* */
}

function countValidCombosV3(numbers, n, remaining, summands = []){
  if(remaining < n) return []
  if(remaining === n) {
    summands.push(n)
    // console.log(`Result I found ${summands.join('+')}`)
    return [summands]
  }

  let valids = []
  // is a multiple possible
  if(remaining % n === 0){
    const sClone = [...summands]
    for(let i = 0; i < (remaining / n); i++){
      sClone.push(n)
    }
    // console.log(`Result II found ${sClone.join('+')} (${remaining})`)
    valids.push(sClone)
  }
  summands.push(n)
  for(let i = 0; i < numbers.length; i++){
    if(numbers[i] === n)continue // skip, this would apply on multiply, reduce one recursion
    valids = [
      ...valids,
      ...countValidCombosV3(numbers,
           numbers[i],
      remaining - n,
          [...summands]
      )]
  }
  return valids
}

function countValidCombosWOPermutation(numbers, index, target, total = 0) {
  const newTotal = total + numbers[index]
  if(newTotal > target) return 0
  if(newTotal === target) {
    return 1
  }
  let solutions = 0
  for(let i = index; i < numbers.length; i++){
    solutions += countValidCombosWOPermutation(numbers, i, target, newTotal)
  }
  return solutions
}

//
function countValidCombosWithPermutations(all, index, remaining, total = [], cache) {
  if(cache.hasOwnProperty(Number(remaining - all[index])))
    return cache[Number(remaining - all[index])]

  total.push(all[index])
  if(all[index] > remaining) return BigInt(0)
  if(all[index] === remaining){
    //console.log(`Result found, add 1`)
    return BigInt(1)
  }

  let validCombos = BigInt(0)
  for(let i = 0; i < all.length; i++){
    validCombos = validCombos + countValidCombosWithPermutations(all, i, remaining - all[index], [...total], cache)
  }
  if(!cache.hasOwnProperty(Number(remaining - all[index])))
    cache[Number(remaining - all[index])] = validCombos
  return validCombos
}

/*
Subarray with Maximum Sum
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


Given the following integer array, find the contiguous subarray (containing at least one number)
which has the largest sum and return that sum. 'Sum' refers to the sum of all the numbers in the subarray.
0,1,-10,5,-7,4,-5,-7,3,5,9,1,-3,1,-10,3,-10,0,-4,-7,7,5,-8,4,-5
 */
const sumReducer = (tot, a) => tot + a

export function subArraySums(inp){
  let sum = inp[0]
  let finalArr = [inp[0]]
  for(let i = 0; i < inp.length; i++){
    for(let j = inp.length; j >= i; j--){
      let newSum = inp.slice(i, j).reduce(sumReducer, 0)
      if(newSum > sum){
        sum = newSum
        finalArr = inp.slice(i, j)
      }
    }
  }
  return finalArr
}




