
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

