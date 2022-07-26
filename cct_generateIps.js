

export function generateIp(inp){
  return crawlIpParts('', inp.toString())
}

function crawlIpParts(head, tail, parts = 0){
  if(parts === 4) {
    if(tail === '') return [head] // valid ip
    return [] // too long
  }
  if(tail[0] === '0') return [] // part starts with zero

  let length = 1
  let ips = []
  while(parseInt(tail.substr(0, length)) <= 255){
    ips = [
      ...ips,
      ...crawlIpParts(
        head + tail.substr(0, length) + ( parts < 3 ? '.' : ''),
        tail.substr(length),
        parts + 1
      )
    ]
    if(tail.length === length) break
    length++
  }
  return ips
}

export const testCases = [
  {
    input: 25525511135,
    result: ['255.255.11.135', '255.255.111.35']
  },{
    input: 1938718066,
    result: ['193.87.180.66']
  },{
    input: 256256256256,
    result: []
  }
]
