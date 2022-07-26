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
  }while(oldLength !== merged.length)

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

export const testCases = [
  {
    input: [[5,7],[18,28],[6,14],[14,22],[7,11],[20,26],[5,12],[11,14],[17,21],[11,17],[7,16],[15,19],[21,26],[7,15],[1,2],[8,16],[14,15],[25,30],[1,5]],
    result: [[1, 30]]
  },{
    input: [[8, 10], [1, 3], [2, 6], [10, 16]],
    result: [[1, 6], [8, 16]]
  }
]
