/*
DESCRIPTION

Given an array of intervals, merge all overlapping intervals. An interval
is an array with two numbers, where the first number is always less than
the second (e.g. [1, 5]).

The intervals must be returned in ASCENDING order.

Example:
	[[1, 3], [8, 10], [2, 6], [10, 16]]

merges into [[1, 6], [8, 16]]
*/

export function mergeIntervals(input) {
  let merged = mergeEm(input);
  let oldLength = 0
  do {
    oldLength = merged.length
    merged = mergeEm(merged)
  }while(oldLength != merged.length)

  return merged.sort((a, b) => a[0] > b[0] ? 1 : -1)
}

function mergeEm(input){
  return input
    .reduce((result, arr) => {
        if(result.length === 0){
          return [ arr ]
        }

        let changes = false

        result = result.map(existing => {
          // first number in range?
          if(arr[0] >= existing[0] && arr[0] <= existing[1]){
            changes = true
            // Second number bigger than range end
            if(arr[1] > existing[1])
              return [ existing[0], arr[1] ]
          }else{
            // second number in range?
            if(arr[1] >= existing[0] && arr[1] <= existing[1]){
              changes = true
              // first number smaller than range start
              if(arr[0] < existing[0])
                return [arr[0], existing[1]]
            }
          }
          return existing
        })

        if(! changes){
          result.push(arr)
        }
        return result
      },
      []);
}



export function runMergerTestCases(ns){
  const case1 = [
    [5,7],[18,28],[6,14],[14,22],
    [7,11],[20,26],[5,12],[11,14],
    [17,21],[11,17],[7,16],[15,19],
    [21,26],[7,15],[1,2],[8,16],
    [14,15],[25,30],[1,5]
  ]
  const result1 = [[1, 30]]

  const case2 = [[8, 10], [1, 3], [2, 6], [10, 16]]
  const result2 = [[1, 6], [8, 16]]

  ns.tprint('Test Case 1:')
  testMerger(ns, case1, result1)

  ns.tprint('Test Case 2:')
  testMerger(ns, case2, result2)
}

function testMerger(ns, input, correctResult){
  const result = mergeIntervals(input);
  if(JSON.stringify(result) != JSON.stringify(correctResult)){
    ns.tprint('wrong result')
    ns.tprint(`expected: ${JSON.stringify(correctResult)}`)
    ns.tprint(`received: ${JSON.stringify(result)}`)
  }else{
    ns.tprint('correct result')
  }
}
