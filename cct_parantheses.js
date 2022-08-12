/*
Sanitize Parentheses in Expression
You are attempting to solve a Coding Contract.
You have 10 tries remaining, after which the contract will self-destruct.


Given the following string:

((()a()a)()a()()(

remove the minimum number of invalid parentheses in order to validate the string.
If there are multiple minimal ways to validate the string, provide all of the possible results.
The answer should be provided as an array of strings.
If it is impossible to validate the string the result should be an array with only an empty string.

IMPORTANT: The string may contain letters, not just parentheses. Examples:
"()())()" -> [()()(), (())()]
"(a)())()" -> [(a)()(), (a())()]
")(" -> [""]
 */


export function sanitizeParentheses(inp){
  return getValidSolutions(inp)
}

function getValidSolutions(dirty, clean = ''){
  // search open parentheses
  let candidate = ''
  let i = 0
  for(; i < dirty.length - 1; i++){
    if(![')', '('].includes(dirty[i])) candidate += dirty[i]
    if(dirty[i] === '('){
      break
    }
  }
  if(i === dirty.length)return [clean]
  // search closing
  candidate += '('
  let valids = []
  // search all closing parts and continue rek from the end
  for(let j = i + 1; j < dirty.length; j++){
    if(![')', '('].includes(dirty[j])) candidate += dirty[j]

    if(dirty[j] === ')'){
      let inbetweens = getValidSolutions(
          dirty.substr(i+1, j + 1), '')

      inbetweens.forEach(inbet => {
        valids = [
          ...valids,
          ...getValidSolutions(dirty.substr(j + 1), clean + candidate + inbet + ')')
        ]
      })

      valids = [
        ...valids,
        ...getValidSolutions(dirty.substr(j + 1), clean + candidate + ')')
      ]


    }
  }
  return valids
}

export const testCases = [
  {
    input: "()())()",
    result: ['()()()', '(())()']
  },{
    input: "(a)())()",
    result: ['(a)()()', '(a())()']
  },{
    input: ")(",
    result: [""]
  },
]
