/*
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.

A prime factor is a factor that is a prime number. What is the largest prime factor of 344765978?
*/

export function findLargestPrimeFactor(inp){
  const primes = [2]
  let number = inp
  while(number / primes[primes.length - 1] !== 1){
    while(number % primes[primes.length - 1] === 0){
      number = number / primes[primes.length - 1]
      if(number === 1)break;
    }
    // get new Prime or be finished!
    if(number === 1)break;
    if(isPrime(number))return number
    primes.push(addAPrime(primes, number))
  }
  return primes[primes.length - 1]
}

function isPrime(num) {
  if (num === 2 || num === 3)
    return true;
  if (num <= 1 || num % 2 === 0 || num % 3 === 0)
    return false;
  for (let i = 5; i * i <= num ; i+=6)
    if (num % i === 0 || num % (i + 2) === 0)
      return false;
  return true;
}

function addAPrime(primes, max){
  let newPrime = primes[primes.length - 1] + 1
  while(primes.filter(a => newPrime % a === 0).length > 0){
    newPrime++
  }
  return newPrime
}
