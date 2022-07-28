export function getValidMathExpressions(inp){

  // const [ ,digits, target] = inp.match(/digits = "(\d+)", target = (\d+)/)
  const [digits, target] = inp
  let results = []
  let length = 1
  while(digits.substr(0, length).length < digits.length){
    results = [...results, ...crawlPossibilities(
      digits.substr(length),
      digits.substr(0, length),
      parseInt(target)
      )
    ]
    length++
  }
  return results;
}

const operators = ['+', '-', '*']

function crawlPossibilities(remaining, expr, target){
  let expressions = []
  // test with full remaining as one part
  if(! (remaining.length > 1 && remaining[0] === '0')){

    if(remaining === '04'){
      console.log('here we are')
      return []
    }
    expressions = operators
      .map(op => {
        //if(op === '/' && remaining === '0') return '' // prevent division by zero
        if(parseInt(eval(`${expr}${op}${remaining}`)) === target){
          return `${expr}${op}${remaining}`
        }
        return ''
      }).filter(a => a !== '') // remove empty strings
    if(remaining.length === 1) return expressions
  }

  // test remaining in multiple parts
  let length = 1
  while(remaining.substr(length).length > 0){
    if(remaining.substr(0, length).startsWith('0') && length > 1){
      length++
      continue
    }

    expressions = [...expressions,
      ...operators.map(op => {
        return crawlPossibilities(
          remaining.substr(length),
          `${expr}${op}${remaining.substr(0, length)}`,
          target)
      }).flat()
    ]
    length++
  }
  return expressions
}

export const testCases = [
  {
    input: ["123", 6],
    result: ['1+2+3', '1*2*3']
  },{
    input: ["105", 5],
    result: ['1*0+5', '10-5']
  },{
    input: ["8758923041", -41],
    result : []
  }
]
