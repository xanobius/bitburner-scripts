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

export function decodeHamming(inp) {

}

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



export const testCases = [
  {
    input : 21,
    result : '1001101011'
  }
]
