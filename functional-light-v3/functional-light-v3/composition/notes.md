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

# immutability

This is not about things that can not change. It does not make sense to the purpose of the program. _Changes needs to be intentional, not accidentaly!!_

> How do we control changes?

## immutability.assigment

You can declare a variable as variable (`var`) or constant (`const`). That means that you want the label do or do not reassigned.
Functional programmers try to avoid assigment, instead they use composition.
Why is better to avoid defining variables? Why do functional programmers prefer composition instead of declaring variables?
A variable get reassigned, and its value can change and this change leads us to do not have real control over the variables. Instead, a pure function is predictable.

## immutability.const

There is an assigment that it is not going to change. It means: `const` is the final assigment of the variable. The main purpose of using `const` is to communicate to the reader that the label is not going to be reassigned in the code.

### immutability.const.reassignment

1. using `const`
2. not reassigning, that means: don not assign at all.

```
1. const str = 'mai' //
2. str = 'mai mai mai' // TypeError: Assignment to constant variable.
3. const str = 'mai'
4. const obj = { name: 'Mai', nextStep: 'New York, New York'}
5. obj = str // TypeError: Assignment to constant variable.
6. obj.name = 'Maira Diaz Marraffini' // { name: 'Maira Diaz Marraffini', nextStep: 'New York, New York' }
```

We are not reassigning `obj`! We are changing the value of one of the property! Try to use `const` with primitive types!

## immutability.value

Functional programmers avoid bugs with patterns when they see a possible bug is going to happend. Passgin an object by reference into a function. What would you expect to happen? The object might change inside the function.

```
const orderDetails = {
    id: 42,
    total: 1500
};
processOrder(orderDetails);
```

> How can you be sure the object is not going to change insede the function?

What do we need here? Do we need an immutability data structure? We want to say that the value is `read-only`! Do not get confused with this concept: in this case we do not need an immutability data structure, we need a read only data. The solution is with `Object.freeze`:

```
const orderDetails = {
    id: 42,
    total: 1500
}
processOrder(Object.freeze(orderDetails));
```

What is the point with this solution? **I am communicating to the reader: "you dont have to worry, the object is not going to be modify, it is read-only"**

## immutability, dont mutate, make a copy

When a function takes a data structure as an argument, follow this steps:

1. treat it as if it is read-only
2. make a copy of it
3. make changes to the local copy

```
function processOrder(order) { // remember, objects are variables passed by reference
    var processedOrder = {...order} // make a copy!
    if (!("status" in order)) {
        processOrder.status = "completed"; //make change to the local copy!
    }
    saveToDatabase(processOrder);
}
```
