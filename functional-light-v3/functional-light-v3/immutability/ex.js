/** @format */

'use strict';
/*
We have to define `pickNumber` as a pure-function.
* purpose: insert the random number received whereas the number is not already in the list of lucky numbers
* parameters: 
  * `num`: a number, that represents a random number
  * `numbers`: the list of lottery lucky numbers
* return: an array of positive numbers that represents the list of lottery lucky numbers
  
We have to consider this two points:
1. `lotteryNum` is a non-pure function, because it breaks the rule "same input, same output".
2. `luckyLotteryNumbers` is an array. `pickNumber` will update this array. So make sure to make a copy of it.
*/

function lotteryNum() {
  return (Math.round(Math.random() * 100) % 58) + 1;
}

function pickNumber(number, numbers) {
  if (!numbers.includes(number)) {
    // numbers = numbers.slice();
    // numbers.push(number);
    nubers = [...numbers, number]; // make a copy, same operation, but more declarative
    numbers.sort(function asc() {
      return x - y;
    });
  }
  return numbers;
}

var luckyLotteryNumbers = [];
const NUM_COUNT = 6; //

while (luckyLotteryNumbers.length < 6) {
  luckyLotteryNumbers = pickNumber(
    lotteryNum(),
    Object.freeze(luckyLotteryNumbers)
  );
}

console.log(luckyLotteryNumbers);
