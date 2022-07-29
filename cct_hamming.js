/*

HammingCodes: Integer to Encoded Binary

You are attempting to solve a Coding Contract.
You have 10 tries remaining, after which the contract will self-destruct.


You are given the following decimal Value:
101
Convert it into a binary string and encode it as a 'Hamming-Code'. eg:
Value 8 will result into binary '1000', which will be encoded
with the pattern 'pppdpddd', where p is a paritybit and d a databit,
or '10101' (Value 21) will result into (pppdpdddpd) '1001101011'.

NOTE: You need an parity Bit on Index 0 as an 'overall'-paritybit.
NOTE 2: You should watch the HammingCode-video from 3Blue1Brown,
which explains the 'rule' of encoding, including the first Index parity-bit mentioned on the first note.

Now the only one rule for this encoding:
It's not allowed to add additional leading '0's to the binary value
That means, the binary value has to be encoded as it is

*/

export function encodeHamming(inp){
  const remaining = parseInt(inp).toString(2).split('').reverse()
  const maxPowersOfTwo = Math.floor(Math.log2(remaining.length))
  // 1100101 -> 1010011
  let withParities = [ 0, 0, 0 ]

  for(let i = 3; remaining.length != 0; i++){
    // is a power of two
    if((i & (i - 1)) === 0){
      withParities.push(0)
    }else{
      withParities.push(parseInt(remaining.pop()))
    }
  }

  for(let i = 0; i <= maxPowersOfTwo; i++){
    const power = Math.pow(2, i)

    let sum = withParities
      .filter((v, i) => (i & power) === power)
      .reduce((total, elem) => {
        return elem === 1 ? total + 1 : total
      }, 0)

    // add one if its not even
    if(sum % 2 !== 0) {
      withParities[power] = 1
    }
  }
  // create global parity
  let sum = withParities
    .reduce((total, elem) => {
      return elem === 1 ? total + 1 : total
    }, 0)

  // add one if its not even
  if(sum % 2 !== 0) {
    withParities[0] = 1
  }

  return withParities.join('')
}

/*
HammingCodes: Encoded Binary to Integer
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are given the following encoded binary string:
'1101100100111101011111110011111000'
The string is a Hamming code with 1 'possible' error on a random index.
If there is an error, find the bit that is an error and fix it.
Extract the encoded decimal value and return a string with that value.

NOTE: The length of the binary string is dynamic.
NOTE 2: Index 0 is an 'overall' parity bit. Watch the Hamming code video from 3Blue1Brown for more information.
NOTE 3: There's approximately a 55% chance for an altered bit. So... MAYBE there is an altered bit 😉
NOTE 4: Return the decimal value as a string.

"1101100100111101011111110011111000"
home/ctrSolver.js:18 "79560316"
home/ctrSolver.js:16 Input and Result for contract-442147-TianDiHui.cct
home/ctrSolver.js:17 "11010000010100100101000100011110111100"
home/ctrSolver.js:18 "1159865308"

 */
export function decodeHamming(inp) {
  let res = inp.split('')
  const xorData = res
    // .filter(e => e === '1') <- NOPE, creates a new array, destroys indexes
    .reduce((res, elem, i) => elem === '0' ? res : res ^ i, 0)

  if(xorData !== 0){
    res[xorData] = (res[xorData] === '0' ? '1' : '0')
  }
  // remove parity bits from message
  res = res.map((e, i) => Math.floor(Math.log2(i)) === Math.log2(i) ? '' : e)
  return parseInt(res.join(''), 2).toString()
}

export const encodeTestCases = [
  {
    input : 21,
    result : '1001101011'
  }
]
export const decodeTestCases = [
  /*{
    input : '1001101011',
    result : '21'
  },*/{
    input : '1101100100111101011111110011111000',
    result : '79560316'
  },{
    input : '1101100100111101011111110011111100',
    result : '79560316'
  },

   /*
  {
    input : '11010000010100100101000100011110111100',
    result : '1159865308' // WRONG
  }*/
]
