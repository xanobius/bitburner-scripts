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
  const combos = countValidCombos(numbers, -1, target)
  // check for doubles first?
  const strCombos = combos.map((numbers) => {
      return {
        str: numbers.sort((a, b) => a > b ? 1 : -1).join('+'),
        orig : numbers
      }
    })

  return strCombos
    .filter((n, i) => { // remove doublicates
      return strCombos.findIndex(e => e.str === n.str) === i
    })
    .map(e => e.orig) // get original data back
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


/*
 *  Start with one before 0 to make the first element optional as well
 */
function countValidCombos(all, start, target, total = [0]){
  if(start !== -1) total.push(all[start])
  const newTotal = total.reduce((t, a) => t+a, 0)

  if(newTotal === target) return [total.slice(1)] // wrap array in array to allow spreading, also remove leading zero
  if(newTotal > target) return []
  if(start === all.length -1) return []

  let validCombos = []
  for(let i = start + 1; i < all.length; i++){
    validCombos = [ ...validCombos, ...countValidCombos(all, i, target, [...total])]

    // go through possible multiples of the current number

    let t = newTotal + all[start]
    let nTot = [...total, all[start]]
    for(; t < target; t += all[start]) {
      validCombos = [...validCombos, ...countValidCombos(all, i, target, [...nTot])]
      nTot = [...total, all[start]]
    }
    if(t === target){
      validCombos = [...validCombos, nTot.slice(1)]
    }

  }


  return validCombos;
}
