/** @format */

'use strict';

function increment(x) {
  return x + 1;
}
function decrement(x) {
  return x - 1;
}
function double(x) {
  return x * 2;
}
function half(x) {
  return x / 2;
}

/*
vos tenes algo que no te genera alegria
y se lo vendés a otro
otro lo ve, compra y paga
*/

function pipe2(...fns) {
  return function (v) {
    var fnTotal = fns[0](v);
    for (let i = 1; i < fns.length; i++) {
      let fn = fns[i];
      fnTotal = fn(fnTotal);
    }
    return fnTotal;
  };
}

function pipe(...fns) {
  return function (v) {
    for (let fn of fns) {
      v = fn(v);
    }
    return v;
  };
}

function compose(...fns) {
  var reverse = fns.reverse();
  return pipe(...reverse);
}
var f1 = compose(increment, decrement);
var f2 = pipe(decrement, increment);
var f3 = compose(decrement, double, increment, half);
var f4 = pipe(half, increment, double, decrement);
var f5 = compose(increment);
var f6 = pipe(increment);

console.log(f1(3) === 3);
console.log(f1(3) === f2(3));
console.log(f3(3) === 4);
console.log(f3(3) === f4(3));
console.log(f5(3) === 4);
console.log(f5(3) === f6(3));
