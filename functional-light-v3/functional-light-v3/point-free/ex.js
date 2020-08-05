/** @format */

'use strict';

// function output(txt) {
//   console.log(txt);
// }

var output = console.log.bind(console); // compatible shape. add `bind` to be safe

function isShortEnough(str) {
  return str.length <= 5;
}

function not(fn) {
  return function (...args) {
    return !fn(...args);
  };
}

/*
function isLongEnough(str) {
	return !isShortEnough
}
*/
var isLongEnough = not(isShortEnough);
isLongEnough('Hello Mai!');

var msg1 = 'Hello';
var msg2 = msg1 + ' World';

// function printIf(shouldPrintIt) {
//   return function (msg) {
//     if (shouldPrintIt(msg)) {
//       output(msg);
//     }
//   };
// }

function when(fn) {
  return function (predicate) {
    return function (...args) {
      if (predicate(...args)) {
        return fn(...args);
      }
    };
  };
}
// new printIf definition
var printIf = when(output);
printIf(isShortEnough)(msg1); // Hello
printIf(isShortEnough)(msg2);
printIf(isLongEnough)(msg1);
printIf(isLongEnough)(msg2); // Hello World

/*
Look that we define an adapter from `printIf` to `when(output)`
*/
