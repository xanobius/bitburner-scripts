export function solveSum(number){
  if(number === 1) return 0;
  if(number === 2) return 1;
  const mem = [{ number: 1, summands : [[1]] }]
  const memStr = [{ number: 1, summands : ['1'] }]


  const literal = getSummandsRek(number, 1)



  // const lits = getSummansRekString(number, memStr, 1)
  // console.table(memStr)

  // memStr[7].summands.forEach(s => {
  //   console.log(s)
  // })

  return literal;
  return lits.length;

  // mem[10].summands.forEach(s => {
  //   console.log(s.join(','))
  // })

  // return literal.filter((s, i) => literal.indexOf(s) === i).length
}

function getSummansRekString(number, mem, start){
  // const memres = mem.filter(e => e.number === number);
  // if(memres.length)return memres[0].summands;

  let summands = [];
  for(let i = start; i <= Math.floor(number / 2 ); i++){
    // Base
    summands.push(`${i}.${number - i}`)

    getSummansRekString(number - i, mem, i).
    forEach(s => {
      summands.push(`${i}.${s}`)
    })
  }

  // mem.push({ number: number, summands: summands.filter((s, i) => summands.indexOf(s) === i)})
  return summands;
}

function getSummandsRek(number, start) {
    // performance cache
  // const memres = mem.filter(e => e.number === number);
  // if(memres.length)return memres[0].summands;


  let summands = 0;
  for(let i = start; i <= Math.floor(number / 2 ); i++){
    // Base
    // summands.push([i, number - i])
    summands++;
    summands += getSummandsRek(number - i, mem, i)
  }
  // Cleand summands before pushint into memory
  // let literal = summands.map(s => s.join('-'))

  // mem.push({ number: number, summands: literal.filter((s, i) => literal.indexOf(s) === i).map(s => s.split('-')) })
  return summands;
}
