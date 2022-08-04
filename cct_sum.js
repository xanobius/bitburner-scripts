/*
Total Ways to Sum II
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


How many different distinct ways can the number 140 be written as a sum of integers contained in the set:

[3,5,6,8,11,13,16,18,22,23,26]?

You may use each integer in the set zero or more times.
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
