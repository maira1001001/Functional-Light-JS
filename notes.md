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
It is not a function just for using the `function` keyword. It could be both.  So, how do we figure out? First of all, a function takes some inputs and returns some outputs. When a "function" does not have the `return` keyword, it is not a functions, it is a procedure.

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
2.  I/O (console, files, etc)
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