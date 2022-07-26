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
