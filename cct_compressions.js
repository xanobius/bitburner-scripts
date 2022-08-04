
export function compressRle(inp){
  return inp
    .split('')
    .reduce((result, elem, i) => {
      if(i === 0) return {...result,  count: 1}

      if(elem === inp[i - 1]) {
        if (result.count === 9) {
          result = { compressed: result.compressed + result.count + inp[i - 1], count: 1}
        } else {
          result = {...result, count: result.count + 1}
        }
      }else{
        result = {
          compressed: result.compressed + result.count + inp[i - 1],
          count: 1
        }
      }

      if(i === inp.length - 1){
        return {...result, compressed: result.compressed + result.count + elem}
      }
      return result
    }, { count: 0, compressed: '' })
    .compressed;
}

export const rleTestCases = [
  {
    input: 'aaaaabccc',
    result: '5a1b3c'
  },{
    input: 'aAaAaA',
    result: '1a1A1a1A1a1A'
  },{
    input: '111112333',
    result: '511233'
  },{
    input: 'zzzzzzzzzzzzzzzzzzz',
    result: '9z9z1z'
  },
]

/*
 Compression II: LZ Decompression
 You are attempting to solve a Coding Contract. You have 8 tries remaining, after which the contract will self-destruct.


 Lempel-Ziv (LZ) compression is a data compression technique which encodes data using references to earlier parts of the data. In this variant of LZ, data is encoded in two types of chunk. Each chunk begins with a length L, encoded as a single ASCII digit from 1 to 9, followed by the chunk data, which is either:

 1. Exactly L characters, which are to be copied directly into the uncompressed data.
 2. A reference to an earlier part of the uncompressed data. To do this, the length is followed by a second ASCII digit X: each of the L output characters is a copy of the character X places before it in the uncompressed data.

 For both chunk types, a length of 0 instead means the chunk ends immediately, and the next character is the start of a new chunk. The two chunk types alternate, starting with type 1, and the final chunk may be of either type.

 You are given the following LZ-encoded string:
 7xzNMPEV133xjo557ryphhas915ssswo823c1Y466nlyttV34
 Decode it and output the original string.
 */

export function decompressLZ(inp){
  return inp
    .split('')
    .reduce((res, elem, i) => {
      if(res.skip !== 0) return {...res, skip: --res.skip}
      if(Number.isInteger(parseInt(elem))){
        if(parseInt(elem) === 0) return res
        // ref or concrete
        if(Number.isInteger(parseInt(inp[i + 1]))){
          let part = res.uncompressed.substr(
            res.uncompressed.length -  parseInt(inp[i + 1]),
            (res.uncompressed.length -  parseInt(inp[i + 1])) + parseInt(elem)
          )

          let fillCounter = 0;
          while(part.length < parseInt(elem)){
            part += part[fillCounter]
            fillCounter++
          }
          // ref: skip = 1, search ref
          return {
            uncompressed: res.uncompressed + part,
            skip: 1
          }
        }
          // concrete: skip: distance to next int
        return {
          uncompressed: res.uncompressed + inp.substr(i + 1,  i + parseInt(elem)),
          skip: parseInt(elem)
        }
      }
    }, { uncompressed: '', skip : 0 })
    .uncompressed
}

export const lzDecompressTestCases = [
  {
    input: '5aaabb450723abb',
    result: 'aaabbaaababababaabb'
  }

]

export function compressLZ(inp){

}

export const lzCompressTestCases = [
  {
    input: 'abracadabra',
    result: 'aaaaaaaaaaaaaa'
  },{
    input: 'mississippi',
    result: '4miss433ppi'
  },{
    input: 'aAAaAAaAaAA',
    result: '3aAA53035'
  },{
    input: '2718281828',
    result: '627182844'
  },{
    input: 'abcdefghijk',
    result: '9abcdefghi02jk'
  },{
    input: 'aaaaaaaaaaaa',
    result: '3aaa91'
  },{
    input: 'aaaaaaaaaaaaa',
    result: '1a91031'
  },{
    input: 'aaaaaaaaaaaaaa',
    result: '1a91041'
  },

]

