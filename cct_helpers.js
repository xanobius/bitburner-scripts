/**
 *
 * @param fn
 * @param ns
 * @param array cases
 */

export function testStuff(fn, ns, cases){
  cases.forEach(c => {
    testCase(fn, ns, c.input, c.result)
  });
}

function testCase(fn, ns, input, correctResult){
  const result = fn(input);
  if(JSON.stringify(result) != JSON.stringify(correctResult)){
    ns.tprint('wrong result')
    ns.tprint(`input: ${JSON.stringify(input)}`)
    ns.tprint(`expected: ${JSON.stringify(correctResult)}`)
    ns.tprint(`received: ${JSON.stringify(result)}`)
  }else{
    ns.tprint('correct result')
  }
}
