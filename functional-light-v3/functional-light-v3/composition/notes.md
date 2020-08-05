<!-- @format -->

# composition

The output of a function is the input of another function.

> How do we make composition?

1. defining _temporal variables_, but we wast too much space

```
function multiplyBy2(x) { return x * 2; }
function add3(x) { return x + 3; }
function divideBy4(x) { return x / 4; }

var tmp = multiplyBy2(10);
tmp = add3(tmp);
totalCost = basePrice + divideBy4(tmp);
```

2. _nest function call_ take the output of a function call and make it the input of another function call

```
function multiplyBy2(x) { return x * 2; }
function add3(x) { return x + 3; }
function divideBy4(x) { return x / 4; }

totalCost = basePrice + divideBy4(add3(multipliBy2(10)));
```

This solution focus on the **how to compute** the shipping rate.

3. _abstraction_ more semanticaly separate and in a more cleaner way

```
function multiplyBy2(x) { return x * 2; }
function add3(x) { return x + 3; }
function divideBy4(x) { return x / 4; }

function shippingRate(x) {
    return divideBy4(add3(multipliBy2(x)));
}

totalCost = basePrice + shippingRate(x);
```

This solution focus on **the what to do** with the shipping rate.

4. _declarative data flow_ with `point free`

```
function multiplyBy2(x) { return x * 2; }
function add3(x) { return x + 3; }
function divideBy4(x) { return x / 4; }

function composeThree(f3,f2,f1) {
    return function composed(v) {
        return (f3(f2(f1(v))));
    }
}

var shippingRate = composeThree(divideBy4, add3, multipliBy2);

totalCost = basePrice + shippingRate(x);
```

In this solution, we can reuse `shippingRate`.

# abstraction

When we have two things intertwined together and we can to separate so we can understand them.

# data flow

**The entire program is a serie of data flow** or (a series of state transition managed data flow). To make a program more readable.

> Is the data easy to track? Easy to follow? (as the 4th solution)

if no, redesign it to make `data flow`

> How do we make a declarative program?

Declaring my data flow in a clear and obvious way rather than having my data implicitly linked.

# compose and pipe

1. compose: from right to left

```
function composeThree(f1,f2,f3) {
    return function(v) {
        return f3(f2(f1(v)));
    }
}
```

2. pipe: from left to right

```
function composeThree(f1,f2,f3) {
    return function(v) {
        return f1(f2(f3(v)));
    }
}
```

# associativity

Composition has the property of associativity

```
function multiplyBy2(x) { return x * 2; }
function add3(x) { return x + 3; }
function divideBy4(x) { return x / 4; }

function composeTwo(f1,f2) {
    return function composed(v) {
        return f2(f1(v));
    }
}

var f = composeTwo(multiplyBy2, composeTwo(add3, divideBy4));
var g = composeTwo(composeTwo(multiplyBy2, add3), divideBy4);

f(4) // 2.75
g(4) // 2.75
```

# composing with currying

When composing, we use _unary functions_.

> What if we want to compose enary function? We can apply `currying`!

```
function add(x,y) { return x + y };
function multiplyBy2(x) { return x * 2 };
function minus(x,y) { return x - y };

function composeThree(f1, f2, f3) {
    return function composed(v) {
        return f3(f2(f1(v));
    }
}

// from this way
add(5, minus(8, multiplyBy2(2))) // 20

// to this more declarative way
var addCurry = curry(add);
var minusCurry = curry(minus)
composeThree(addCurry(5), minusCurry(8), multiplyBy2)(2);
```

Currying allow me to reshape this functions from binary to unary

# point-free

Redefining `isOdd` removing the input and using `composeTwo`

```
function eq(x) { return function(y) { return x == y; }};
function mod(x) { return function(y) { return y % x }};
function composeTwo(f1,f2) {
    return function composed(v) {
        return f1(f2(v));
    }
}

var isOdd = composeTwo(eq(1), mod(2))
isOdd(3) // true
```
