<!-- @format -->

# functional programming with JS

> "Functional programming is not all about the `function` keyword", Kyle

## Imperative and declarative style

Both are focused on the reader.

> 'Who is particular good at executing code? the computer'

> 'Who is not so great at executing code? our brains'

## imperative

Focused on the `what`

The reader has to read the whole code to understand what is going on.

Hard to read -> hard to mainten or to improve, or

Every time

## declarative

Focused on the `how`

> "Code need to teel a story, it needs to communicate" Kyle

# functions and procedures

- Am I defining a function or a procedure?
  It is not a function just for using the `function` keyword. It could be both. So, how do we figure out? First of all, a function takes some inputs and returns some outputs. When a "function" does not have the `return` keyword, it is not a functions, it is a procedure.

- Are there principles to be aware of?
  Yes! functions can only call other functions. Instead, functions turns into procedure.

- Are function names importants? Yes!
  The `name` of the function tell you the semantic relationship between the inputs and the corresponding outputs.

- `Side effects` invalid the idea of a function! What that means?
  When the inputs are not directly related with the outputs

- `function calls` should avoid side effects.

## side effects or non-pure stuff

What are side effects? When you write a function, you are writing code with no side effects. When this happens, it is a procedures. These are some side effects that might happens in JS:

1. variables outside the functions
2. I/O (console, files, etc)
3. Database storage
4. Network calls
5. Timestamp
6. Random numbers
7. DOM
8. CPU heat
9. CPU time delay

- Should I take care of side effects?
  You should distinguish when you write code with side effects and with no side effects. And follow this Kyle's rule: "Avoid them where possible, make them obvious otherwise"

- Why you should minimize and also make them more obvious?
  Because you will have impredictable behaviour and it is more difficult to find a bug.

- How does a side effect live together with functions?
  First of all, distinguish between a functions and a procedure (which has side effect). Then, you can develop your program in this way as a sphere:

## pragmatic approach

1. core: pure functions
2. outer shield: non-pure stuff, side effects

Make different files for each approach.

# pure functions

Functions that takes inputs and returns outputs with no side effects

Are you accessing variables from outside? This has side effects

1. `pure function`

```
function addTwo(x,y) {
    return x + y;
}
```

2. `function with side effect`

```
const z = 1;

function addAnother(x,y) {
    return addTwo(x,y) + z;
}
```

`z` is a variable that is from outside. This invalidate the definition of pure function. Although, it is no so tight. Why? Because it is obvious to the reader that `z` does not change.

## pureFunctions.adventages

As a code reader, what kind of adventages do pure functions give me?
I do not have to do mental execution, and I can run a function in pure isolation, because the function has no side effect.
Also, a pure function gives predictability.

# Reducing surfing area

1. Reasigning variables

```
1. function addAnother(z) {
2.     return function addTwo(x,y) {
3.        return x + y + z;
4.    }
5. }
6. addAnother(1)(20, 21); // this is a pure function
```

`AddAnother` is a pure function. The reader can check where `z` is reasigned (from line 1 to 3). This increase readability and confidence for the reader of this code.

# Same input, same output

That means that we can `run in isolation`. We can `trust` on the result. We trust and move on!

There are several options when you have non-pure functions:

1. `Extracting` the impurity
2. `Containing/wrapping` impurity
3. `Adapter` function
4. If you try these things but you can not apply any options, `make it obvious` to the reader

# extracting impurity

- `how?` for example, creating a new file with non-pure functions

- `why?` to make side effect more obvious, so make code more easy to read and mantain

non-pure function

```
function addComment(userId, comment) {
    var record = {
        id: generateUniqueId(),
        userId,
        comment,
    }
    var elem = buildCommentElement(record);
    commentList.appendChild(elem);
}
addComment(42, "This is a non-pure function");
```

This is a non-pure function because

1. it interacts with DOM through `.appendChild`
2. and with same input, has differents outputs with `generateUniqueId()`

Although we can change this code to this:

```#
function newComment(userId, comment, id) {
    var record = {
        id,
        userId,
        comment
    }
    return buildCommentElement(record);
}

const newId = generateUniqueId();
const elem = newComment(42, "This is a pure function!", newId);
commen

```

# arguments

arguments get asigned to parameters. What are the nature of the arguments/inputs?

The function has a _shape_: the numbers, orders and kind of input

- _input_: the number and type of arguments it `takes`
- _outputs_: the number and type of outputs it `returns`

A function could be:

1. _unary_: it takes one input
2. _binary_: it takes two inputs
3. _enary_: it takes more than 2 inputs

4. _Unary_

```
function multiplyBy2(x) {
    return x * 2;
}
```

1. _Binary_

```
function sum(x, y) {
    return x + y;
}
```

> Does the number of inputs matter?

Of course it matters.

> Why the number of inputs matter?

Because the functions are like lego pieces: the fit each other to work together. With one input, it is easier to combine/work with other function. With two is more complicated and with more than 2 is even more complicated. The design in terms of percentage is: 70% unary, 30% binary

> What "kind" of shape do we prefer?

The `unary function` because it is easier to work with other functions

# arguments shape adapter

We can `change the shape: the numbers of the arguments` of a function

- _Why?_ so the shape of a function fits with the shape of other function, as the lego pieces.
- _How?_ we design arguments shape adapters to change the shape of a function

_JS function parameters property_: we can design a function with, for example, 2 parameter and gives more than 2 arguments when we call the function

# flip and reverse adapter

We can `change the shape: the order of the arguments` of a function

- _flip_: transpose the first two arguments
- _reverse_: reverse the whole arguments

# point-free

## pointFree.equationalReasoning

We can get away a function definition when shapes fits. For example:

From:

```
getPerson(function onPerson(person) {
    return renderPerson(person);
});
```

to:

```
getPerson(renderPerson);
```

this is `equational reasoning`: both `onPerson` and `renderPerson` have same shape; both take one input (person).

## pointFree.refactor

The main purpose is to turn from imperative style to declarative style using poin free (removing the inputs)

1. first approach, imperative style:

```
function isOdd(v) {
    return v % 2 == 1;
}
function isEven(v) {
    return v % 2 == 0;
}
```

2. second approach, imperative style:

```
function isOdd(v) {
    return v % 2 == 1;
}
function isEven(v) {
    return !isOdd(v);
}
```

The second make **more obvious the relationship** between `isOdd` and `isEven`

3. third approach, declarative style:

```
function not(fn) {
    return function negate(...args) {
        return !fn(...args);
    }
}
function isOdd(v) {
    return v % 2 == 1;
}`

isEven = not(isOdd);
isEven(4);
```

- _declarative style_: The 3rd solution is _more implicit_, it handle the details, by not defining the parameter `v`
- _imperative style_: The 2nd solution is _more explicit_, it show details that are unnecessary.

What a beautiful refactor!

# Lazy and eager execution

1. lazy execution

```
function repeater(count) {
    return function() {
        return "".padStart(count,"A");
    }
}
var A = repeater(10);
A();    // "AAAAAAAAAA"
A();    // "AAAAAAAAAA"
```

- When does the work occurs? when A is called, and it happens `twice`.
- What variable are we closing over? `count`

3. eager execution

```
function repeater(count) {
    var str = "".padStart(count,"A");
    return function() {
        return str;
    }
}
var A = repeater(10);
A();    // "AAAAAAAAAA"
A();    // "AAAAAAAAAA"
```

- When does the work occurs? when `repeater` is called, and it happens `once`.
- What variable are we closing over? `str`
- What if (2) never calls? We do the work!

# memoization

```
function repeater(count) {
    var str;
    return function() {
        if ( str === undefined) {
            str = "".padStart(count,"A");
        }
        return str;
    }
}
var A = repeater(10);
A();    // "AAAAAAAAAA"
A();    // "AAAAAAAAAA"
```

> Principle 1: pure functions -> same inputs, same outputs

> Principle 2: "Do not close over a variable that is reassigned"

In this approach, we have a confusing solution: the codes executes twice and return the same output for the same input. That means that it is a pure function. Although when you see the function definition, you find that principle 2 has been broken: the variable `str`, which is enclosed, is reassigned: first value is `undefined` and second value is the value of count.

What do we want to achieve?

1. `performance`: lazy execution (execute once)
2. `declarative style`: define a pure function where principle 2 is not broken

We find the `memoize` implementation:

```
function repeater(count) {
    return memoize(function allTheAs() {
        return "".padStart(count,"A");
    }
}
var A = repeater(10);
A();    // "AAAAAAAAAA"
A();    // "AAAAAAAAAA"
```

# referencial transparency

Definition: When the returned value of a function call can be replaced without affecting the rest of the code.

What are the benefits of this? The benefits are for the reader of the code. When the reader do a mental execution of a pure function, she or he inmediatly replace the returned value with the function call and there should not be any doubt: same input, same output. In Haskel, the referencial transparency is a feature that makes the compiler. But in JS, it is in charge of the definitino of the function.

# partial application

We create a more obvious relationship between the entities, when we use the technique of partial application:

```
var getCustomer = partial(ajax, CUSTOMER_API);
var getCurrentUser = partial(getCustomer, {id: 42});
getCustomer({id: 42}, renderCustomer);
getCurrentUser(renderCustomer);
```

Note that we've used `partial`: it takes the first input, and then the second input, and so on, and preset
We can write also

```
var getCurrentUser = partial(ajax, CUSTOMER_API, {id: 42});
```

# changing function shape with curry

```
function add(x,y) { return x + y; }
[1,2,3,4].map(??)
```

- Can we use both function `map` and `add`? No, because they do not have the same shape!
- What technique can we use so both functions fit? `currying`

The solution with curry technique

```
function add(x,y) {
    return x + y;
}
add = curry(add)
[1,2,3,4].map(add(1));
```

`map` needs a function that receives one input that it is replaced with each element of the array, and there it is!
