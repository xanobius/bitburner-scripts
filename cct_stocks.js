/*
Algorithmic Stock Trader I

You are given the following array of stock prices (which are numbers) where the i-th element represents
the stock price on day i:

170,49,183,140,190,190,140,26,93,186,61,143,106,73,73,73,11,195,194,56,91,51,76,9,49,66,188,174,148,135,106,102,192,16,143,1,168

Determine the maximum possible profit you can earn using at most one transaction
(i.e. you can only buy and sell the stock once).
If no profit can be made then the answer should be 0.
Note that you have to buy the stock before you can sell it
*/

export function stockTradeV1(inp){
  return inp.map((elem, i) => {
    if(i === inp.length) return 0
    return inp.slice(i + 1)
      .filter(v => v > elem)
      .reduce((biggest, current) => {
        return biggest < current - elem ? current - elem : biggest
      }, 0)
  }).reduce((biggest, current) => {
    return biggest < current ? current : biggest
  }, 0)
}

export const v1TestCases = [
  {
    input: [99,88,77,11,1],
    result: 0
  },{
    input: [1,2,3,4,5,6,7],
    result: 6
  },{
    input: [20,80,21,90],
    result: 70
  }
]

/*
Algorithmic Stock Trader II

You are given the following array of stock prices (which are numbers) where the i-th element represents the stock price on day i:

131,38,173,1,88,126,195,83,17,27,113,58,191,6,36

131,38,173,1,88,126,195,83,10,27,113,58,191,6,36


Determine the maximum possible profit you can earn using as many transactions as you'd like.
A transaction is defined as buying and then selling one share of the stock.
Note that you cannot engage in multiple transactions at once.
In other words, you must sell the stock before you buy it again.

If no profit can be made, then the answer should be 0
*/

export function stockTradeV2(inp){

  let earnings = 0
  for(let i = 0; i < inp.length - 1; i++){
    // Search a number whos next number is bigger, buy it
    if(inp[i + 1] > inp[i]){
      // buy !
      let found = false
      // search next number with a smaller predecessor, a peak
      for(let j = i + 1; j < inp.length; j++){
        if(inp[j + 1] < inp[j]){
          earnings += inp[j] - inp[i];
          i = j // i should be at j + 1 at next run, with continue i++ will executed, so set to j
          found = true
          break;
        }
      }
      if(found) continue
        // no peak found? Take the last!
      earnings += inp[inp.length -1 ] - inp[i]
      break;
    }
  }
  return earnings;
}

export const v2TestCases = [
  {
    input: [99,88,77,11,1],
    result: 0
  },{
    input: [1,6,7],
    result: 6
  },{
    input: [20,80,21,90],
    result: 129
  }
]

/*
Algorithmic Stock Trader III

You are given the following array of stock prices (which are numbers) where the i-th element represents
the stock price on day i:

155,86,173,55,93,185,18,140,101,191,90,111,21,93,6,94,54,38,42,47,28,126,194,25,72,70,92,194,199,158,58,133,153,139,91,100,105,74,136,127,15,143

Determine the maximum possible profit you can earn using at most two transactions.
A transaction is defined as buying and then selling one share of the stock.
Note that you cannot engage in multiple transactions at once.
In other words, you must sell the stock before you buy it again.

If no profit can be made, then the answer should be 0
*/

export function stockTradeV3(inp){
  return stockTradeXTransacts(2, inp);
}


export const v3TestCases = [
  {
    input: [99,88,77,11,1],
    result: 0
  },{
    input: [1, 6 , 7, 2, 20, 24, 0],
    result: 28
  },{
    input: [200,158,147,148,22,41,107,10,160,21],
    result: 235
  }
]


/*
----
Algorithmic Stock Trader IV

You are given the following array with two elements:

[3, [70,159,1,32,19,112,93,150,187,141,173,194,130,110,169]]

The first element is an integer k. The second element is an array of stock prices (which are numbers)
where the i-th element represents the stock price on day i.

Determine the maximum possible profit you can earn using at most k transactions.
A transaction is defined as buying and then selling one share of the stock.
Note that you cannot engage in multiple transactions at once. In other words,
you must sell the stock before you can buy it again.

If no profit can be made, then the answer should be 0.

*/

export function stockTradeV4(inp){
  return stockTradeXTransacts(inp[0], inp[1]);
}

function stockTradeXTransacts(transacts, days){
  const allStarts = []
  for(let i = 0; i < days.length; i++)
    allStarts.push(tradeRekSumsMinimized(days, i, transacts))
  return allStarts.sort((a, b) => a < b ? 1 : -1)[0]
  /*
  const allResults = tradeRekSums(days, 0)

  console.log(allResults)

  const bestResult = allResults
    .map(sol => {
      let sorted = sol.sort((a, b) => a < b ? 1 : - 1)
      return sorted
        .splice(0, transacts)
        .reduce((t, a) => t + a,0)
    })
    .sort((a, b) => a < b ? 1 : -1)
  return bestResult.length >= 1 ? bestResult[0] : 0
   */
}

function tradeRekSumsMinimized(days, start, transactions, profit = 0) {
  // no more transaction possible, last element / no more transactions
  if(start >= days.length - 1 || transactions === 0){
    return profit
  }

  // Search next valley/low point
  let buyIndex = -1;
  for(let i = start; i < days.length - 1; i++){
    if(days[i + 1] > days[i]){
      buyIndex = i;
      break;
    }
  }
  // no more valleys, return profit so far
  if(buyIndex === -1) return profit

  const possibleProfits = []
  for(let i = buyIndex + 1; i < days.length; i++){
    if(days[i] <= days[buyIndex]){
      // no win, but maybe the better valley?
      possibleProfits.push(
        tradeRekSumsMinimized(days, i + 1, transactions, profit)
      )
      continue
    } // no win
    const win = days[i] - days[buyIndex]
      // transaction with last day
    if(i === days.length - 1){
      possibleProfits.push(profit + win)
    }else{
      possibleProfits.push(
        tradeRekSumsMinimized(days, i + 1, transactions - 1, profit + win)
      )
    }
  }
  // console.log(possibleProfits.join(','))
  return possibleProfits.sort((a, b) => a < b ? 1 : -1)[0]
}

function tradeRekSums(days, start, profits = []) {
  let childSums = []
  // return a complete path
  if(start >= days.length -1 ){
    return [profits]
  }

  // Search next valley/low point
  let buyIndex = -1;
  for(let i = start; i < days.length - 1; i++){
    if(days[i + 1] > days[i]){
      buyIndex = i;
      break;
    }
  }

  // no more valley, return existing solution/path
  if(buyIndex === -1) {
    return [profits]
  }

  for(let i = buyIndex + 1; i < days.length; i++){
    if(days[i] <= days[buyIndex]){
      continue
    } // no win

    if(i === days.length - 1){
      // add an element to the possible solutions
      childSums = [
        ...childSums,
        [
          ...profits, days[i] - days[buyIndex]
        ]
      ]
    }else{
      childSums = [
        ...childSums,
        ...tradeRekSums(days, i + 1, [...profits, days[i] - days[buyIndex]])
      ]
    }
  }
  return childSums
}

export const v4TestCases = [
  {
    input: [ 3, [99,88,77,11,1]],
    result: 0
  },{
    input: [5, [1, 13, 33, 53, 73, 93, 113, 123, 153]],
    result: 152
  }
]
