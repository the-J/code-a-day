* What is the difference between "==" and "==="?
    JavaScript has both strict and type-converting equality comparison. For strict equality the objects being compared
    must have the same type and:
    • Two strings are strictly equal when they have the same sequence of characters, same length,
        and same characters in corresponding positions.
    • Two numbers are strictly equal when they are numerically equal (have the same number value).
        NaN is not equal to anything, including NaN. Positive and negative zeros are equal to one another.
    • Two Boolean operands are strictly equal if both are true or both are false.
    • Two objects are strictly equal if they refer to the same Object.
    • Null and Undefined types are == (but not ===). [I.e. Null==Undefined (but not Null===Undefined)]

* What scopes of variables are there?
	Global and local

* How can you iterate elements?
    Processing each of the items in a collection is a very common operation. JavaScript provides a number of ways
    of iterating over a collection, from simple for loops to map() and filter(). Iterators and Generators bring
    the concept of iteration directly into the core language and provide a mechanism for customizing the behavior of
    for...of loops.

* How can you iterate over elements inside object?
    for in - object properties
    for of - over itererables

```js
    // for of: Use for…of to iterate over the values in an iterable, like an array for example:
    let str = 'abcde';

    for (let char of str) {
      console.log(char.toUpperCase().repeat(3));
    }

    // forin: Use for…in to iterate over the properties of an object (the object keys):

    let oldCar = {
      make: 'Toyota',
      model: 'Tercel',
      year: '1996'
    };

    for (let key in oldCar) {
      console.log(`${key} --> ${oldCar[key]}`);
      // make --> Toyota
      // model --> Tercel
    }

    //For most objects, use for .. in :
    for (var key in yourobject) {
      console.log(key, yourobject[key]);
    }
```

With ES6, if you need both keys and values simultaneously, do

```js
for (let [key, value] of Object.entries(yourobject)) {
    console.log(key, value);
}
```

To avoid logging inherited properties, check with hasOwnProperty :

```js
for (var key in yourobject) {
    if (yourobject.hasOwnProperty(key)) {
        console.log(key, yourobject[key]);
    }
}
```
If you want to do it "in chunks", the best is to extract the keys in an array. As the order isn't  guaranteed, this 
is the proper way. In modern browsers, you can use

```
var keys = [];
for (var key in yourobject) {
    if (yourobject.hasOwnProperty(key)) keys.push(key);
}
```

##### OBJECT PROPERTIES
   ###### Properties of the Object constructor
   * Object.length Has a value of 1.
   * Object.prototype - Allows the addition of properties to all objects of type Object.

   ###### Methods of the Object constructor:
   Object.prototype.constructor - Specifies the function that creates an object's prototype.


   * Object.assign()    Copies the values of all enumerable own properties from one or more source objects to a 
   target object.
   
   * Object.create()    Creates a new object with the specified prototype object and properties.
   
   * Object.defineProperty()    Adds the named property described by a given descriptor to an object.
   
   * Object.defineProperties()    Adds the named properties described by the given descriptors to an object.
   
   * Object.entries()    Returns an array containing all of the [key, value] pairs of a given object's own enumerable
    string properties.
   
   * Object.freeze()    Freezes an object: other code can't delete or change any properties.
   
   * Object.fromEntries()    Returns a new object from an iterable of key-value pairs (reverses Object.entries).
   
   * Object.getOwnPropertyDescriptor()    Returns a property descriptor for a named property on an object.
   
   * Object.getOwnPropertyDescriptors()    Returns an object containing all own property descriptors for an object.
   
   * Object.getOwnPropertyNames()    Returns an array containing the names of all of the given object's own 
   enumerable and non-enumerable properties except for those which use Symbol.
   
   * Object.getOwnPropertySymbols()    Returns an array of all symbol properties found directly upon a given object.
   
   * Object.getPrototypeOf()    Returns the prototype of the specified object.
   
   * Object.is()    Compares if two values are the same value. Equates all NaN values (which differs from both 
   Abstract Equality Comparison and Strict Equality Comparison).
   
   * Object.isExtensible()    Determines if extending of an object is allowed.
   
   * Object.isFrozen()    Determines if an object was frozen.
   
   * Object.isSealed()    Determines if an object is sealed.
   
   * Object.keys()    Returns an array containing the names of all of the given object's own enumerable string 
   properties.
   
   * Object.preventExtensions()    Prevents any extensions of an object.
   
   * Object.seal()    Prevents other code from deleting properties of an object.
   
   * Object.setPrototypeOf()    Sets the prototype (i.e., the internal [[Prototype]] property).
   
   * Object.values()    Returns an array containing the values that correspond to all of a given object's own 
   enumerable string properties.

###### Object instances and Object prototype object, Object Constructor

All objects in JavaScript are descended from Object; all objects inherit methods and properties from Object.prototype,
although they may be overridden. For example, other constructors' prototypes override the constructor property and
provide their own toString() methods. Changes to the Object prototype object are propagated to all objects unless
the properties and methods subject to those changes are overridden further along the prototype chain.

ex
```js
Object.prototype.valueOf = function () {
    return this.name;
}

let y = Object.create({})

y.name = 'adam'
y.age = 40

y.valueOf() -> "adam"
y -> Object { name: "adam", age: 40 }
```
ex2

```js
let Human = function(name, age) {
    this.name = name; this.age = age;
}

let Natali = new Human('Natali', 20)
// Natali -> Object { name: "Natali", age: 20 }
// Natali.valueOf() -> Natali
```

* Object constructor
    The constructor property returns a reference to the Object constructor function that created the instance object.
    Note that the value of this property is a reference to the function itself, not a string containing the function's name.
     The value is only read-only for primitive values such as 1, true and "test".
    Description
    Section

    All objects (with the exception of objects created with Object.create(null)) will have a constructor property. Objects
     created without the explicit use of a constructor function (i.e. the object and array literals) will have a constructor
     property that points to the Fundamental Object constructor type for that object.
```js
    var o = {}; o.constructor === Object; // true
    var o = new Object; o.constructor === Object; // true
    var a = []; a.constructor === Array; // true
    var a = new Array; a.constructor === Array; // true
    var n = new Number(3); n.constructor === Number; // true

    The following example creates a prototype, Tree, and an object of that type, theTree. The example then displays the
    constructor property for the object theTree.

    function Tree(name) {
      this.name = name;
    }

    var theTree = new Tree('Redwood');
    console.log('theTree.constructor is ' + theTree.constructor);

    This example displays the following output:

    theTree.constructor is function Tree(name) {
      this.name = name;
    }
```
##### Symbols

   Symbol is a way to define a name -- not a value --, and the fact that properties defined using symbols are not
    visible using for..in, Object.getOwnPropertyNames() or JSON.stringify() makes symbols useful for metadata properties:
ex
```js
    var Metadata = {    
        Date: Symbol('Message date')
    };

    var email = function(recipient, message) {
        this.Recipient = recipient;
        this.Message = message;
        this[Metadata.Date] = new Date();
    };

    var email1 = new email('@Me', 'test');
    console.log(JSON.stringify(email1));
    {
       Recipient: '@Me',
       Message: 'test'
    }

    // Date is still accessible using
    console.log(email1[Metadata.Date]); 
    // -> Thu Nov 27 2014 16:50:00 GMT+0000

    // Debugging in Console:
    {
       Recipient: '@Me',
       Message: 'test'
       Symbol(Message date): Thu Nov 27 2014 16:50:00 GMT+0000
    }
```
   Symbols can be made global using the Symbol.for function, so metadata names can be created once and used across all
   project files. Accessing the value using a symbol requires having a reference to the symbol when created. Each 
   call to Symbol() creates a new one even if the same description is used:
```js
    var a = Symbol('a');
    var b = Symbol('a');
    a != b
    // and
    a != Symbol('a')
````
   but, creating a symbol using Symbol.for, it will be registered in a global registry and the description becomes a key,
   meanong only one symbol with the same key will exist in the global registry:
```js
    var a = Symbol.for('a');
    var b = Symbol.for('a');
    a == b
    // and
    a == Symbol.for('a')
```
##### WHAT DOES "this" DO?
    The JavaScript this keyword refers to the object it belongs to.
    var person = {
        firstName: "John",
        lastName : "Doe",
        id       : 5566,
        fullName : function() {
            return this.firstName + " " + this.lastName;
        }
    };



    This has different values depending on where it is used.

        In a method, this refers to the owner object.
        Alone, this refers to the global object.
        In a function, this refers to the global object.
        In a function, in strict mode, this is undefined.
        In an event, this refers to the element that received the event.
        Methods like call(), and apply() can refer this to any object.


    A function's this keyword behaves a little differently in JavaScript compared to other languages. It also has some
    differences between strict mode and non-strict mode.

    --Global Context

    In the global execution context (outside of any function), this refers to the global object whether in strict mode or not.

    // In web browsers, the window object is also the global object:
    console.log(this === window); // true

    a = 37;
    console.log(window.a); // 37

    this.b = "MDN";
    console.log(window.b)  // "MDN"
    console.log(b)         // "MDN"

    --Function context

    Inside a function, the value of this depends on how the function is called.

    Since the following code is not in strict mode, and because the value of this is not set by the call, this will
    default to the global object, which is window in a browser.

    function f1() {
      return this;
    }

    // In a browser:
    f1() === window; // true

    // In Node:
    f1() === global; // true

    In strict mode, however, the value of this remains at whatever it was set to when entering the execution context,
    so, in the following case, this will default to undefined:

    function f2() {
      'use strict'; // see strict mode
      return this;
    }

    f2() === undefined; // true

    So, in strict mode, if this was not defined by the execution context, it remains undefined.
    In the second example, this should be undefined, because f2 was called directly and not as a method or property of
    an object (e.g. window.f2()). This feature wasn't implemented in some browsers when they first started to support
    strict mode. As a result, they incorrectly returned the window object.

    To pass the value of this from one context to another, use call(), or apply():

    // An object can be passed as the first argument to call or apply and this will be bound to it.
    var obj = {a: 'Custom'};

    // This property is set on the global object
    var a = 'Global';

    function whatsThis() {
      return this.a;  // The value of this is dependent on how the function is called
    }

    whatsThis();          // 'Global'
    whatsThis.call(obj);  // 'Custom'
    whatsThis.apply(obj); // 'Custom'

    Where a function uses the this keyword in its body, its value can be bound to a particular object in the call using
    the call() or apply() methods which all functions inherit from Function.prototype.

    function add(c, d) {
      return this.a + this.b + c + d;
    }

    var o = {a: 1, b: 3};

    // The first parameter is the object to use as
    // 'this', subsequent parameters are passed as
    // arguments in the function call
    add.call(o, 5, 7); // 16

    // The first parameter is the object to use as
    // 'this', the second is an array whose
    // members are used as the arguments in the function call
    add.apply(o, [10, 20]); // 34

    Note that with call and apply, if the value passed as this is not an object, an attempt will be made to convert it
    to an object using the internal ToObject operation. So if the value passed is a primitive like 7 or 'foo', it will
    be converted to an Object using the related constructor, so the primitive number 7 is converted to an object as if
    by new Number(7) and the string 'foo' to an object as if by new String('foo'), e.g.

    function bar() {
      console.log(Object.prototype.toString.call(this));
    }

    bar.call(7);     // [object Number]
    bar.call('foo'); // [object String]

    --The bind method

    ECMAScript 5 introduced Function.prototype.bind(). Calling f.bind(someObject) creates a new function with the same
    body and scope as f, but where this occurs in the original function, in the new function it is permanently bound to
    the first argument of bind, regardless of how the function is being used.

    function f() {
      return this.a;
    }

    var g = f.bind({a: 'azerty'});
    console.log(g()); // azerty

    var h = g.bind({a: 'yoo'}); // bind only works once!
    console.log(h()); // azerty

    var o = {a: 37, f: f, g: g, h: h};
    console.log(o.a, o.f(), o.g(), o.h()); // 37,37, azerty, azerty

    --Arrow functions

    In arrow functions, this retains the value of the enclosing lexical context's this. In global code, it will be set
    to the global object:

    var globalObject = this;
    var foo = (() => this);
    console.log(foo() === globalObject); // true

    Note: if this arg is passed to call, bind, or apply on invocation of an arrow function it will be ignored. You can
    still prepend arguments to the call, but the first argument (thisArg) should be set to null.

    // Call as a method of an object
    var obj = {func: foo};
    console.log(obj.func() === globalObject); // true

    // Attempt to set this using call
    console.log(foo.call(obj) === globalObject); // true

    // Attempt to set this using bind
    foo = foo.bind(obj);
    console.log(foo() === globalObject); // true

    No matter what, foo's this is set to what it was when it was created (in the example above, the global object). The
    same applies to arrow functions created inside other functions: their this remains that of the enclosing lexical
    context.

    // Create obj with a method bar that returns a function that
    // returns its this. The returned function is created as
    // an arrow function, so its this is permanently bound to the
    // this of its enclosing function. The value of bar can be set
    // in the call, which in turn sets the value of the
    // returned function.
    var obj = {
      bar: function() {
        var x = (() => this);
        return x;
      }
    };

    // Call bar as a method of obj, setting its this to obj
    // Assign a reference to the returned function to fn
    var fn = obj.bar();

    // Call fn without setting this, would normally default
    // to the global object or undefined in strict mode
    console.log(fn() === obj); // true

    // But caution if you reference the method of obj without calling it
    var fn2 = obj.bar;
    // Then calling the arrow function this is equals to window because it follows the this from bar.
    console.log(fn2()() == window); // true

    In the above, the function(call it anonymous function A) assigned to obj.bar returns another function(call it
    anonymous function B) that is created as an arrow function. As a result, function B's  this is permanently set to
    the this of obj.bar (function A)when called. When the returned function(function B) is called, its this will always
    be what it was set to initially. In the above code example, function B's this is set to function A's this which is
    obj, so it remains set to obj even when called in a manner that would normally set its this to undefined or the
    global object (or any other method as in the previous example in the global execution context).

    --As an object method

    When a function is called as a method of an object, its this is set to the object the method is called on.
    In the following example, when o.f() is invoked, inside the function this is bound to the o object.

    var o = {
      prop: 37,
      f: function() {
        return this.prop;
      }
    };

    console.log(o.f()); // 37

    Note that this behavior is not at all affected by how or where the function was defined. In the previous example, we
    defined the function inline as the f member during the definition of o. However, we could have just as easily
    defined the function first and later attached it to o.f. Doing so results in the same behavior:

    var o = {prop: 37};

    function independent() {
      return this.prop;
    }

    o.f = independent;

    console.log(o.f()); // 37

    This demonstrates that it matters only that the function was invoked from the f member of o.

    Similarly, the this binding is only affected by the most immediate member reference. In the following example, when
    we invoke the function, we call it as a method g of the object o.b. This time during execution, this inside the
    function will refer to o.b. The fact that the object is itself a member of o has no consequence; the most immediate
      reference is all that matters.

    o.b = {g: independent, prop: 42};
    console.log(o.b.g()); // 42


    --nodecall:
    Jako, iż JavaScript nie posiada typowego rozróżnienia na klasę bazową i dziedziczącą,  prototype jest przydatnym
    obejściem pozwalającym na utworzenie “klasy bazowej” z pewnych funkcji, które działają jak obiekty. Na przykład:

    var Osoba = function() {
      this.umieMowic = true;
    };

    Osoba.prototype.powitaj = function() {
      if (this.umieMowic) {
        console.log('Hej, jestem ' + this.imie);
      }
    };

    var Pracownik = function(imie, tytul) {
      Osoba.call(this);
      this.imie = imie;
      this.tytul = tytul;
    };

    Pracownik.prototype = Object.create(Osoba.prototype);
    Pracownik.prototype.constructor = Pracownik;

    Pracownik.prototype.powitaj = function() {
      if (this.umieMowic) {
        console.log('Hej, jestem ' + this.imie + ', ' + this.tytul);
      }
    };

    var Klient = function(imie) {
      Osoba.call(this);
      this.imie = imie;
    };

    Klient.prototype = Object.create(Osoba.prototype);
    Klient.prototype.constructor = Klient;

    var Mim = function(imie) {
      Osoba.call(this);
      this.imie = imie;
      this.umieMowic = false;
    };

    Mim.prototype = Object.create(Osoba.prototype);
    Mim.prototype.constructor = Mim;

    var bob = new Pracownik('Bob', 'Builder');
    var joe = new Klient('Joe');
    var rg = new Pracownik('Red Green', 'Handyman');
    var mike = new Klient('Mike');
    var mim = new Mim('Mim');

    bob.powitaj();
    // Hej, jestem Bob, Builder

    joe.powitaj();
    // Hej, jestem Joe

    rg.powitaj();
    // Hej, jestem Red Green, Handyman

    mike.powitaj();
    // Hej, jestem Mike

    mim.powitaj();
    ----

    This has different values depending on where it is used.

        In a method, this refers to the owner object.
        Alone, this refers to the global object.
        In a function, this refers to the global object.
        In a function, in strict mode, this is undefined.
        In an event, this refers to the element that received the event.
        Methods like call(), and apply() can refer this to any object.

    this in a Method

    In an object method, this refers to the "owner" of the method.

    In the example on the top of this page, this refers to the person object.

    The person object is the owner of the fullName method.
    fullName : function() {
        return this.firstName + " " + this.lastName;
    }
    this Alone

    When used alone, the owner is the Global object, so this refers to the Global object.

    In a browser window the Global object is [object Window]:
    Example
    var x = this;

     In strict mode, when used alone, this also refers to the Global object [object Window]:

    "use strict";
    var x = this;
    this in a Function (Default)

    In a JavaScript function, the owner of the function is the default binding for this.

    So, in a function, this refers to the Global object [object Window].

    function myFunction() {
        return this;
    }
    this in a Function (Strict)

    JavaScript strict mode does not allow default binding.

    So, when used in a function, in strict mode, this is undefined.
    Example
    "use strict";
    function myFunction() {
        return this;
    }
    this in Event Handlers

    In HTML event handlers, this refers to the HTML element that received the event:
    Example
    <button onclick="this.style.display='none'">
        Click to Remove Me!
    </button>

    Object Method Binding

    In these examples, this is the person object (The person object is the "owner" of the function):
    Example
    var person = {
        firstName  : "John",
        lastName   : "Doe",
        id         : 5566,
        myFunction : function() {
            return this;
        }
    };
    Example
    var person = {
        firstName: "John",
        lastName : "Doe",
        id       : 5566,
        fullName : function() {
            return this.firstName + " " + this.lastName;
        }
    };

    In other words: this.firstName means the firstName property of this (person) object.
    Explicit Function Binding

    The call() and apply() methods are predefined JavaScript methods.

    They can both be used to call an object method with another object as argument.

    You can read more about call() and apply() later in this tutorial.

    In this example, when calling person1.fullName with person2 as argument, this will refer to person2, even if it is a method of person1:
    Example
    var person1 = {
        fullName: function() {
            return this.firstName + " " + this.lastName;
        }
    }
    var person2 = {
        firstName:"John",
        lastName: "Doe",
    }
    person1.fullName.call(person2);  // Will return "John Doe"
--------

* set
    The set syntax binds an object property to a function to be called when there is an attempt to set that property.

    var language = {
      set current(name) {
        this.log.push(name);
      },
      log: []
    }

    language.current = 'EN';
    language.current = 'FA';

    console.log(language.log);
    // expected output: Array ["EN", "FA"]

    --
    var o = {a: 0};

    Object.defineProperty(o, 'b', { set: function(x) { this.a = x / 2; } });

    o.b = 10; // Runs the setter, which assigns 10 / 2 (5) to the 'a' property
    console.log(o.a) // 5

* Execution context:
    If you are or want to be a JavaScript developer, then you must know how the JavaScript programs are executed internally.
    The understanding of execution context and execution stack is vital in order to understand other JavaScript concepts
    such as Hoisting, Scope, and Closures.

    What is an Execution Context?

    Simply put, an execution context is an abstract concept of an environment where the Javascript code is evaluated and
    executed. Whenever any code is run in JavaScript, it’s run inside an execution context.
    Types of Execution Context

    There are three types of execution context in JavaScript.

        Global Execution Context — This is the default or base execution context. The code that is not inside any function
            is in the global execution context. It performs two things: it creates a global object which is a window object
            (in case of browsers) and sets the value of this to equal to the global object. There can only be one global
            execution context in a program.

        Functional Execution Context — Every time a function is invoked, a brand new execution context is created for
            that function. Each function has its own execution context, but it’s created when the function is invoked or
            called. There can be any number of function execution contexts. Whenever a new execution context is created,
            it goes through a series of steps in a defined order which I will discuss later in this article.

        Eval Function Execution Context — Code executed inside an eval function also gets its own execution context,
            but as eval isn’t usually used by JavaScript developers, so I will not discuss it here.

    Execution context is a concept in the language spec that—in layman's terms—roughly equates to the 'environment' a
    function executes in; that is, variable scope (and the scope chain, variables in closures from outer scopes),
    function arguments, and the value of the this object.

    The call stack is a collection of execution contexts.

----
* Hoisting
    https://gist.github.com/maxogden/4bed247d9852de93c94c

    Think of hoisting as more of a compile-time thing. In JavaScript, function declarations are "hoisted" to the top of
    their scope. In other words, they are parsed and evaluated before any other code. (This is opposed to
    function expressions, which are evaluated inline.) Consider the following:

    a();
    b();

    function a() { }
    var b = function() { }

    The call to a() will succeed because its declaration was hoisted to the top; a was assigned to automatically before
    program execution began. The call to b() will fail with a TypeError because b will not be defined until line 4.
    Actually, regarding your bit on hoisting, the b variable declaration will also be hoisted: it'll be declared from the
    start, but no value will be assigned to it before line 4. Calling b() before line 4 will indeed result in an error,
    but a different one: we'll be trying to execute undefined, which isn't a function

    **
    // OUTPUT : undefined
    console.log(shape);

    var shape = "square";

    // OUTPUT : "square"
    console.log(shape);

    You’d expect an error to be thrown when the first console.log is called since the variable shape hadn’t been defined
    at that point. But the JavaScript interpreter looks ahead and “hoists” all variable declarations to the top, and the
    initialization remains in the same spot.

    ES6 Block Scoping
    ES6 introduced block-level scoping options to provide developers with more control and flexibility over a variable’s
    lifecycle.

    Block-level declarations are made in block/lexical scopes that are created inside a block “{ }”.

    function getShape(condition) {
    // shape doesn't exist here

    // console.log(shape); => ReferenceError: shape is not defined

    if (condition) {
            let shape = "square";
            // some other code
            return shape;
        } else {
            // shape doesn't exist here as well
            return false;
        }
    }

    **
    Under the hood: variables lifecycle

    When the engine works with variables, their lifecycle consists of the following phases:

        Declaration phase is registering a variable in the scope.
        Initialization phase is allocating memory and creating a binding for the variable in the scope. At this step the variable is automatically initialized with undefined.
        Assignment phase is assigning a value to the initialized variable.

    A variable has unitialized state when it passed the declaration phase, yet didn't reach the initilization.

    --var
    declaration === initialization phase
    var.a === undefined
    assignment phase
    variable = 'value'

    -- function
    declaration === initialization === assignment phase

    -- let
    declaration
    .log(a) -> reference error
    initialization
    let a === undefined
    assignment
    a = 'value'

    --const
    The declaration syntax is similar to let & var , lifecycle is the same as let. But you have to follow some rules.
    Bindings declared using const are treated as constants, and therefore they cannot be re-assigned values once
    defined. Due to this, every const declaration must be initialized at the time of declaration.

    // valid
    const shape = "triangle";

    // syntax error: missing initialization
    const color;

    // TypeError: Assignment to constant variable
    shape = "square"

    However, an object’s properties can be modified!

    const shape = {
        name: "triangle",
        sides: 3
    }

    // WORKS
    shape.name = "square";
    shape.sides = 4;

    // SyntaxError: Invalid shorthand property initializer
    shape = {
        name: "hexagon",
        sides: 6
    }

    In the above example we can see that only the properties of the shape object could be changed because we are only
    changing what shape contains, not what it’s bound to.

    Is const hoisted?


    All declarations (var, let, const, function, function*, class) are "hoisted" in JavaScript. This means that if a
    name is declared in a scope, in that scope the identifier will always reference that particular variable:

* What are event listeners?
    js html dom eventlisteners

    The addEventListener() method attaches an event handler to the specified element.
    The addEventListener() method attaches an event handler to an element without overwriting existing event handlers.
    You can add many event handlers to one element.
    You can add many event handlers of the same type to one element, i.e two "click" events.
    You can add event listeners to any DOM object not only HTML elements. i.e the window object.
    The addEventListener() method makes it easier to control how the event reacts to bubbling.
    When using the addEventListener() method, the JavaScript is separated from the HTML markup, for better readability
        and allows you to add event listeners even when you do not control the HTML markup.
    You can easily remove an event listener by using the removeEventListener() method.

    When passing parameter values, use an "anonymous function" that calls the specified function with the parameters:
    element.addEventListener("click", function(){ myFunction(p1, p2); });

    - Event Bubbling or Event Capturing?

    There are two ways of event propagation in the HTML DOM, bubbling and capturing.
    Event propagation is a way of defining the element order when an event occurs. If you have a <p> element inside a
    <div> element, and the user clicks on the <p> element, which element's "click" event should be handled first?

    In bubbling the inner most element's event is handled first and then the outer: the <p> element's click event is
    handled first, then the <div> element's click event.

    In capturing the outer most element's event is handled first and then the inner: the <div> element's click event
    will be handled first, then the <p> element's click event.

    With the addEventListener() method you can specify the propagation type by using the "useCapture" parameter:
    addEventListener(event, function, useCapture);

    The default value is false, which will use the bubbling propagation, when the value is set to true, the event uses the capturing propagation.
    document.getElementById("myP").addEventListener("click", myFunction, true);
    document.getElementById("myDiv").addEventListener("click", myFunction, true);

    Calling preventDefault() during any stage of event flow cancels the event, meaning that any default action normally
    taken by the implementation as a result of the event will not occur.

    DOM Events are sent to notify code of interesting things that have taken place. Each event is represented by an
    object which is based on the Event interface, and may have additional custom fields and/or functions used to get
    additional information about what happened. Events can represent everything from basic user interactions to
    automated notifications of things happening in the rendering model.

* Events
    Most Common Categories

    Resource Events
    Network Events
    Websocket Events
    Session History Events
    CSS Animation Events
    CSS Transition Events
    Mouse Events
    Drag & Drop Events
    Media Events
    Progress Events
    Storage events
    Update events
    Value change events


* What is a prototype?

    In JavaScript, objects are king. If you understand objects, you understand JavaScript.
    In JavaScript, almost "everything" is an object.

        Booleans can be objects (if defined with the new keyword)
        Numbers can be objects (if defined with the new keyword)
        Strings can be objects (if defined with the new keyword)
        Dates are always objects
        Maths are always objects
        Regular expressions are always objects
        Arrays are always objects
        Functions are always objects
        Objects are always objects

    All JavaScript values, except primitives, are objects.

    --JavaScript Primitives

    A primitive value is a value that has no properties or methods.
    A primitive data type is data that has a primitive value.
    Primitive values are immutable (they are hardcoded and therefore cannot be changed).
    JavaScript defines 5 types of primitive data types:

        string
        number
        boolean
        null
        undefined

    Object Properties - The named values, in JavaScript objects, are called properties.

    Object Methods

    Methods are actions that can be performed on objects.
    Object properties can be both primitive values, other objects, and functions.
    An object method is an object property containing a function definition.

    Creating a JavaScript Object

    With JavaScript, you can define and create your own objects.
    There are different ways to create new objects:

        Define and create a single object, using an object literal.
        Define and create a single object, with the keyword new.
        Define an object constructor, and then create objects of the constructed type.
        function Object.create()

    - Using an Object Literal

        This is the easiest way to create a JavaScript Object.
        Using an object literal, you both define and create an object in one statement.
        An object literal is a list of name:value pairs (like age:50) inside curly braces {}.

    - Using the JavaScript Keyword new

        The following example also creates a new JavaScript object with four properties:
        var person = new Object();

        The two examples above do exactly the same. There is no need to use new Object().
        For simplicity, readability and execution speed, use the first one (the object literal method).

        Objects are mutable: They are addressed by reference, not by value.

        If 'person' is an object, the following statement will not create a copy of person:
        var x = person;  // This will not create a copy of person.

        The object x is not a copy of person. It is person. Both x and person are the same object.
        Any changes to x will also change person, because x and person are the same object.

        var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"}
        var x = person;
        x.age = 10;           // This will change both x.age and person.age

        Note: JavaScript variables are not mutable. Only JavaScript objects.

        Properties are the most important part of any JavaScript object.

    - JavaScript Properties

        Properties are the values associated with a JavaScript object.
        A JavaScript object is a collection of unordered properties.
        Properties can usually be changed, added, and deleted, but some are read only.

    - Accessing JavaScript Properties

        The syntax for accessing the property of an object is:
        objectName.property          // person.age
        objectName["property"]       // person["age"]
        objectName[expression]       // x = "age"; person[x]

        The expression must evaluate to a property name.

    - JavaScript for...in Loop

        The JavaScript for...in statement loops through the properties of an object.
        for (variable in object) {
            code to be executed
        }

    The block of code inside of the for...in loop will be executed once for each property.

    - Looping through the properties of an object:
        var person = {fname:"John", lname:"Doe", age:25};
        for (x in person) {
            txt += person[x];
        }

    - Adding New Properties

        You can add new properties to an existing object by simply giving it a value.
        You cannot use reserved words for property (or method) names. JavaScript naming rules apply.
        person.nationality = "English";

    - Deleting Properties

        The delete keyword deletes a property from an object:
        The delete keyword deletes both the value of the property and the property itself.
        After deletion, the property cannot be used before it is added back again.
        The delete operator is designed to be used on object properties. It has no effect on variables or functions.
        The delete operator should not be used on predefined JavaScript object properties. It can crash your application.

        var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
        delete person.age;   // or delete person["age"];

    - Property Attributes

        All properties have a name. In addition they also have a value.
        The value is one of the property's attributes.
        Other attributes are: enumerable, configurable, and writable.
        These attributes define how the property can be accessed (is it readable?, is it writable?)
        In JavaScript, all attributes can be read, but only the value attribute can be changed (and only if the property is writable).

        ( ECMAScript 5 has methods for both getting and setting all property attributes)

    - Prototype Properties

        JavaScript objects inherit the properties of their prototype.
        The delete keyword does not delete inherited properties, but if you delete a prototype property, it will affect
        all objects inherited from the prototype.

* getters setters
    JavaScript Accessors (Getters and Setters)
    ECMAScript 5 (2009) introduced Getter and Setters.
    Getters and setters allow you to define Object Accessors (Computed Properties).

    - JavaScript Getter (The get Keyword)
        This example uses a lang property to get the value of the language property.

        var person = {
            firstName: "John",
            lastName : "Doe",
            language : "en",
            get lang() {
                return this.language;
            }
        };

    - JavaScript Function or Getter?

        What is the differences between these two examples?
        var person1 = {
            firstName: "John",
            lastName : "Doe",
            fullName : function() {
                return this.firstName + " " + this.lastName;
            }
        };
        var person2 = {
            firstName: "John",
            lastName : "Doe",
            get fullName() {
                return this.firstName + " " + this.lastName;
            }
        };

        The second example provides simpler syntax.
        document.getElementById("demo").innerHTML = person1.fullName();
        document.getElementById("demo2").innerHTML = person2.fullName;

    - Data Quality

        JavaScript can secure better data quality when using getters and setters.

        Using the lang property, in this example, returns the value of the language property in upper case:
        Example
        // Create an object:
        var person = {
            firstName: "John",
            lastName : "Doe",
            language : "en",
            get lang() {
                return this.language.toUpperCase();
            }
        };

        document.getElementById("demo").innerHTML = person.lang;

        Using the lang property, in this example, stores an upper case value in the language property:
        var person = {
            firstName: "John",
            lastName : "Doe",
            language : "",
            set lang(lang) {
                this.language = lang.toUpperCase();
            }
        };

        // Set an object property using a setter:
        person.lang = "en"; // person.lang => "EN"

        // Display data from the object:
        document.getElementById("demo").innerHTML = person.language;

        Why Using Getters and Setters?

            It gives simpler syntax
            It allows equal syntax for properties and methods
            It can secure better data quality
            It is useful for doing things behind-the-scenes


* Object.defineProperty()
    dodaje, napsuje i blokuje parametr obiektu. Nie wiem jak używać, nie używałem.

    The static method Object.defineProperty() defines a new property directly on an object, or modifies an existing
    property on an object, and returns the object.

    This method allows a precise addition to or modification of a property on an object. Normal property addition through
    assignment creates properties which show up during property enumeration (for...in loop or Object.keys method), whose
    values may be changed, and which may be deleted. This method allows these extra details to be changed from their
     defaults. By default, values added using Object.defineProperty() are immutable.

    Property descriptors present in objects come in two main flavors: data descriptors and accessor descriptors. A data
     descriptor is a property that has a value, which may or may not be writable. An accessor descriptor is a property
     described by a getter-setter pair of functions. A descriptor must be one of these two flavors; it cannot be both.

    Both data and accessor descriptors are objects. They share the following optional keys:

    configurable
        true if and only if the type of this property descriptor may be changed and if the property may be deleted from
        the corresponding object.
        Defaults to false.
    enumerable
        true if and only if this property shows up during enumeration of the properties on the corresponding object.
        Defaults to false.

    A data descriptor also has the following optional keys:

    value
        The value associated with the property. Can be any valid JavaScript value (number, object, function, etc).
        Defaults to undefined.
    writable
        true if and only if the value associated with the property may be changed with an assignment operator.
        Defaults to false.

    An accessor descriptor also has the following optional keys:

    get
        A function which serves as a getter for the property, or undefined if there is no getter. When the property is
        accessed, this function is called without arguments and with this set to the object through which the property is
         accessed (this may not be the object on which the property is defined due to inheritance). The return value will
         be used as the value of the property.
        Defaults to undefined.
    set
        A function which serves as a setter for the property, or undefined if there is no setter. When the property is
        assigned to, this function is called with one argument (the value being assigned to the property) and with this set
        to the object through which the property is assigned.
        Defaults to undefined.

    If a descriptor has neither of value, writable, get and set keys, it is treated as a data descriptor. If a descriptor
    has both value or writable and get or set keys, an exception is thrown.

    Bear in mind that these attributes are not necessarily the descriptor's own properties. Inherited properties will be
    considered as well. In order to ensure these defaults are preserved, you might freeze the Object.prototype upfront,
    specify all options explicitly, or point to null with Object.create(null).

* What array functions do you know?
     * Add/remove items

    We already know methods that add and remove items from the beginning or the end:

        arr.push(...items) – adds items to the end,
        arr.pop() – extracts an item from the end,
        arr.shift() – extracts an item from the beginning,
        arr.unshift(...items) – adds items to the beginning.

    - splice

        How to delete an element from the array? The arrays are objects, so we can try to use delete:

        let arr = ["I", "go", "home"];
        delete arr[1]; // remove "go"
         arr[1] // undefined // now arr = ["I",  , "home"];
         arr.length // 3

        The element was removed, but the array still has 3 elements, we can see that arr.length == 3.

        That’s natural, because delete obj.key removes a value by the key. It’s all it does. Fine for objects.
        But for arrays we usually want the rest of elements to shift and occupy the freed place.
        We expect to have a shorter array now.

        So, special methods should be used.
        The arr.splice(str) method is a swiss army knife for arrays. It can do everything: add, remove and insert elements.

        arr.splice(index[, deleteCount, elem1, ..., elemN])

        It starts from the position index: removes deleteCount elements and then inserts elem1, ..., elemN at their place.
        Returns the array of removed elements.

        deletion:
        let arr = ["I", "study", "JavaScript"];
        arr.splice(1, 1); // from index 1 remove 1 element
         arr // ["I", "JavaScript"]
        Easy, right? Starting from the index 1 it removed 1 element.

        In the next example we remove 3 elements and replace them with the other two:
        let arr = ["I", "study", "JavaScript", "right", "now"]; // remove 3 first elements and replace them with another
        arr.splice(0, 3, "Let's", "dance");
         arr ) // now ["Let's", "dance", "right", "now"]

        Here we can see that splice returns the array of removed elements:
        let arr = ["I", "study", "JavaScript", "right", "now"];
        let removed = arr.splice(0, 2); // remove 2 first elements
         removed // "I", "study" <-- array of removed elements

        - insert the elements without any removals
        let arr = ["I", "study", "JavaScript"];
        // from index 2 // delete 0 // then insert "complex" and "language"
        arr.splice(2, 0, "complex", "language");
         arr // "I", "study", "complex", "language", "JavaScript"

        Negative indexes allowed. They specify the position from the end of the array, like here:

        let arr = [1, 2, 5];
        // from index -1 (one step from the end) // delete 0 elements,// then insert 3 and 4
        arr.splice(-1, 0, 3, 4);
         arr // 1,2,3,4,5

    - slice (arr, string) -> array

        The method arr.slice is much simpler than similar-looking arr.splice. arr.slice(start, end)
        It returns a new array where it copies all items start index "start" to "end" (not including "end").
        Both start and end can be negative, in that case position from array end is assumed.
        It works like str.slice, but makes subarrays instead of substrings.

        let str = "test";
        let arr = ["t", "e", "s", "t"];
         str.slice(1, 3) // es
         arr.slice(1, 3) // [e,s]
         str.slice(-2) // st
         arr.slice(-2) // [s,t]

    - concat

        The method arr.concat joins the array with other arrays and/or items. arr.concat(arg1, arg2...)
        It accepts any number of arguments – either arrays or values.
        The result is a new array containing items from arr, then arg1, arg2 etc.
        If an argument is an array or has Symbol.isConcatSpreadable property, then all its elements are copied.
        Otherwise, the argument itself is copied.

        let arr = [1, 2];
        arr.concat([3, 4]); // 1,2,3,4 // merge arr with [3,4]
        arr.concat([3, 4], [5, 6]); // 1,2,3,4,5,6 // merge arr with [3,4] and [5,6]
        arr.concat([3, 4], 5, 6); // 1,2,3,4,5,6 // merge arr with [3,4], then add values 5 and 6

        Normally, it only copies elements from arrays (“spreads” them). Other objects, even if they look like arrays, added as a whole:
        let arr = [1, 2];
        let arrayLike = {
          0: "something",
          length: 1
        };
        arr.concat(arrayLike) // 1,2,[object Object]     //[1, 2, arrayLike]

    * Searching in array

        * indexOf
        * lastIndexOf
        * includes

        The methods arr.indexOf, arr.lastIndexOf and arr.includes have the same syntax and do essentially the same as
        their string counterparts, but operate on items instead of characters:

            arr.indexOf(item, from) looks for item starting from index from, and returns the index where it was found, otherwise -1.
            arr.lastIndexOf(item, from) – same, but looks from right to left.
            arr.includes(item, from) – looks for item starting from index from, returns true if found.

        let arr = [1, 0, false];
        arr.indexOf(0); // 1
        arr.indexOf(false); // 2
        arr.indexOf(null); // -1
         arr.includes(1) // true

        Note that the methods use === comparison. So, if we look for false, it finds exactly false and not the zero.
        If we want to check for inclusion, and don’t want to know the exact index, then arr.includes is preferred.
        Also, a very minor difference of includes is that it correctly handles NaN, unlike indexOf/lastIndexOf:

        const arr = [NaN];
        arr.indexOf(NaN); // -1 (should be 0, but === equality doesn't work for NaN) -> NaN != anything
        arr.includes(NaN);// true (correct)

        * find
        * findIndex

        let result = arr.find(function(item, index, array) {
          // should return true if the item is what we are looking for
        });

        The function is called repetitively for each element of the array:

            item is the element.
            index is its index.
            array is the array itself.

        If it returns true, the search is stopped, the item is returned. If nothing found, undefined is returned.

        For example, we have an array of users, each with the fields id and name. Let’s find the one with id == 1:

        let users = [
          {id: 1, name: "John"},
          {id: 2, name: "Pete"},
          {id: 3, name: "Mary"}
        ];

        let user = users.find(item => item.id == 1); // user.name; // John

        In real life arrays of objects is a common thing, so the find method is very useful.
        Note that in the example we provide to find a single-argument function item => item.id == 1. Other parameters of find are rarely used.

        The arr.findIndex method is essentially the same, but it returns the index where the element was found instead of the element itself.

        * filter

            The syntax is roughly the same as find, but it returns an array of matching elements:

            let results = arr.filter(function(item, index, array) {
              // should return true if the item passes the filter
            });

            let users = [
              {id: 1, name: "John"},
              {id: 2, name: "Pete"},
              {id: 3, name: "Mary"}
            ];

            let someUsers = users.filter(item => item.id < 3); // returns array of the first two users // someUsers.length  === 2

    * Transform an array

        * map
            let result = arr.map(function(item, index, array) {
              // returns the new value instead of item
            })

            It calls the function for each element of the array and returns the array of results.
            let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length) //lengths -> 5,7,6

            map edytujący sam siebie - map nie kopiuje wartości, którą przerabia,
            jeżeli wykonujemy operację modulującą arrr

            var arrr = [
                {name: 'adam'},
                {name: 'krzyś'},
                {name: 'zosia'},
            ]

            arrr.map((user, i) => {
                console.log(user, i); -> {name: 'adam'}, {name: 'krzyś'},
                if(user.name === 'krzyś') {
                    let test = arrr.splice(i,1)
                    console.log(test, arrr);
                }
            })

        * sort(fn)

            The method arr.sort sorts the array in place. The items are sorted as strings by default.

            let arr = [ 1, 2, 15 ];
            arr.sort(); // arr -> 1, 15, 2

            Literally, all elements are converted to strings and then compared. So, the lexicographic ordering is applied and indeed "2" > "15".
            To use our own sorting order, we need to supply a function of two arguments as the argument of arr.sort().

            function compareNumeric(a, b) {
              if (a > b) return 1;
              if (a == b) return 0;
              if (a < b) return -1;
            }

            let arr = [ 1, 2, 15 ];
            arr.sort(compareNumeric); // arr  - > 1, 2, 15

            Let’s step aside and think what’s happening. The arr can be array of anything, right? It may contain numbers or
            strings or html elements or whatever. We have a set of something. To sort it, we need an ordering function that
            knows how to compare its elements. The default is a string order.

            The arr.sort(fn) method has a built-in implementation of sorting algorithm.
            We don’t need to care how it exactly works (an optimized quicksort most of the time).
            It will walk the array, compare its elements using the provided function and reorder them,
            all we need is to provide the fn which does the comparison.

            The algorithm may compare an element multiple times in the process, but it tries to make as few comparisons as possible.
            A comparison function may return any number. Actually, a comparison function is only required to return a
            positive number to say “greater” and a negative number to say “less”.
            That allows to write shorter functions:

            let arr = [ 1, 2, 15 ];
            arr.sort(function(a, b) { return a - b; }); // arr ->  1, 2, 15

        * reverse

            The method arr.reverse reverses the order of elements in arr.

            let arr = [1, 2, 3, 4, 5];
            arr.reverse(); // arr -> 5,4,3,2,1

        * split
        * join

            The str.split(delim) method does exactly that. It splits the string into an array by the given delimiter delim.

            let names = 'Bilbo, Gandalf, Nazgul';
            let arr = names.split(', ');
            for (let name of arr) {
               `A message to ${name}.` // A message to Bilbo  (and other names)
            }

            The split method has an optional second numeric argument – a limit on the array length.
            If it is provided, then the extra elements are ignored. In practice it is rarely used though:
            let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2); // arr; ->  Bilbo, Gandalf

            Split strings
            The call to split(s) with an empty s would split the string into an array of letters:
            let str = "test"; // str.split('') // t,e,s,t

            The call arr.join(str) does the reverse to split. It creates a string of arr items glued by str between them.
            let arr = ['Bilbo', 'Gandalf', 'Nazgul']; // let str = arr.join(';'); // str ->  Bilbo;Gandalf;Nazgul

        * reduce
        * reduceRight

            When we need to iterate over an array – we can use forEach.
            When we need to iterate and return the data for each element – we can use map.
            The methods arr.reduce and arr.reduceRight also belong to that breed, but are a little bit more intricate.
            They are used to calculate a single value based on the array.

            let value = arr.reduce(function(reducer, item, index, arr) {
              // ...
            }, initial);

                item – is the current array item.
                index – is its position.
                arr – is the array.

            So far, like forEach/map. But there’s one more argument:

                reducer – is the result of the previous function call, initial for the first call.

            let arr = [1, 2, 3, 4, 5]; let result = arr.reduce((sum, current) => sum + current, 0); // result ->  15

            We also can omit the initial value:

            let arr = [1, 2, 3, 4, 5]; let result = arr.reduce((sum, current) => sum + current); //result  -> 15

            But such use requires an extreme care. If the array is empty, then reduce call without initial value gives an error.
            So it’s advised to always specify the initial value.

            The method arr.reduceRight does the same, but goes from right to left.
    * Iterate
        * forEach
            arr.forEach(function(item, index, array) {
              // ... do something with item
            });
            ["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
              `${item} is at index ${index} in ${array}`);
            });

            The result of the function (if it returns any) is thrown away and ignored.

    * Array.isArray

        Arrays do not form a separate language type. They are based on objects.
        So typeof does not help to distinguish a plain object from an array:
        typeof {}); // object
        typeof []); // same

        …But arrays are used so often that there’s a special method for that:
        Array.isArray(value).
        It returns true if the value is an array, and false otherwise.
        Array.isArray({})); // false
        Array.isArray([])); // true

    * thisArg
        Most methods support “thisArg”. Almost all array methods that call functions (exception of sort) accept
        an optional additional parameter thisArg. That parameter is not explained in the sections above, because
        it’s rarely used. But for completeness we have to cover it.

        Here’s the full syntax of these methods:

        arr.find(func, thisArg);
        arr.filter(func, thisArg);
        arr.map(func, thisArg);
        // ...
        // thisArg is the optional last argument

        The value of thisArg parameter becomes this for func.

        For instance, here we use an object method as a filter and thisArg comes in handy:

        let user = {
          age: 18,
          younger(otherUser) {
            return otherUser.age < this.age;
          }
        };

        let users = [
          {age: 12},
          {age: 16},
          {age: 32}
        ];

        let youngerUsers = users.filter(user.younger, user); // find all users younger than user // youngerUsers.length -> 2

        In the call above, we use user.younger as a filter and also provide user as the context for it. If we didn’t provide
        the context, users.filter(user.younger) would call user.younger as a standalone function, with this=undefined.
        That would mean an instant error.

    * cheatsheet of array methods:
        To add/remove elements:
            push(...items) – adds items to the end,
            pop() – extracts an item from the end,
            shift() – extracts an item from the beginning,
            unshift(...items) – adds items to the beginning.
            splice(pos, deleteCount, ...items) – at index pos delete deleteCount elements and insert items.
            slice(start, end) – creates a new array, copies elements from position start till end (not inclusive) into it.
            concat(...items) – returns a new array: copies all members of the current one and adds items to it.
                If any of items is an array, then its elements are taken.

        To search among elements:
            indexOf/lastIndexOf(item, pos) – look for item starting from position pos, return the index or -1 if not found.
            includes(value) – returns true if the array has value, otherwise false.
            find/filter(func) – filter elements through the function, return first/all values that make it return true.
            findIndex is like find, but returns the index instead of a value.

        To transform the array:
            map(func) – creates a new array from results of calling func for every element.
            sort(func) – sorts the array in-place, then returns it.
            reverse() – reverses the array in-place, then returns it.
            split/join – convert a string to array and back.
            reduce(func, initial) – calculate a single value over the array by calling func for each element and
                passing an intermediate result between the calls.

        To iterate over elements:
            forEach(func) – calls func for every element, does not return anything.

        Additionally:
            Array.isArray(arr) checks arr for being an array.

        !!! Please note that methods sort, reverse and splice modify the array itself.

    These methods are the most used ones, they cover 99% of use cases. But there are few others:

        arr.some(fn)  If any (first hit and stops iteration)results are true, returns true, otherwise false.
        arr.every(fn) If all results are true, returns true, otherwise false.
        arr.fill(value, start, end) – fills the array with repeating value from index start to end.
        arr.copyWithin(target, start, end) – copies its elements from position start till position end into itself,
            at position target (overwrites existing).


* What string functions do you know?
    In JavaScript, the textual data is stored as strings. There is no separate type for a single character.
    The internal format for strings is always UTF-16, it is not tied to the page encoding.

    * Quotes

        Let’s recall the kinds of quotes. Strings can be enclosed within either single quotes, double quotes or backticks:

        let single = 'single-quoted';
        let double = "double-quoted";
        let backticks = `backticks`;

        Single and double quotes are essentially the same. Backticks, however, allow us to embed any expression
        into the string, including function calls:

        function sum(a, b) {
          return a + b;
        }

        `1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.

        Another advantage of using backticks is that they allow a string to span multiple lines:

        let guestList = `Guests:
         * John
         * Pete
         * Mary
        `;

        If we try to use single or double quotes in the same way, there will be an error:

        Single and double quotes come from ancient times of language creation when the need for multiline strings was not taken
        into account. Backticks appeared much later and thus are more versatile. Backticks also allow us to specify a
        “template function” before the first backtick. The syntax is: func`string`. The function func is called automatically,
        receives the string and embedded expressions and can process them. You can read more about it in the docs. This is
        called “tagged templates”. This feature makes it easier to wrap strings into custom templating or other functionality,
        but it is rarely used.

        ex.styledComponents
        const Button = styled({``})

    * Special characters

        \b 	Backspace
        \f 	Form feed
        \n 	New line
        \r 	Carriage return
        \t 	Tab
        \uNNNN 	A unicode symbol with the hex code NNNN, for instance \u00A9 – is a unicode for the copyright symbol ©. It must be exactly 4 hex digits.
        \u{NNNNNNNN} 	Some rare characters are encoded with two unicode symbols, taking up to 4 bytes. This long unicode requires braces around it.

        "\u00A9" // ©
        "\u{20331}" // 佫, a rare chinese hieroglyph (long unicode)
        "\u{1F60D}" // 😍, a smiling face symbol (another long unicode)

        All special characters start with a backslash character \. It is also called an “escape character”.

        We would also use it if we want to insert a quote into the string.
         'I\'m the Walrus!' // I'm the Walrus!
         `I'm the Walrus!` // I'm the Walrus!
         `The backslash: \\` // The backslash: \

    * String length

        The length property has the string length: Note that \n is a single “special” character, so the length is indeed 3.
        length is a property
        `My\n`.length // 3

        To get a character at position pos, use square brackets [pos] or call the method str.charAt(pos).
        The first character starts from the zero position:

        let str = `Hello`;
        str[0] // H
        str.charAt(0) // H
        str[str.length - 1] // o

        The square brackets are a modern way of getting a character, while charAt exists mostly for historical reasons.
        !!!The only difference between them is that if no character is found, [] returns undefined, and charAt returns an empty string:

        let str = `Hello`;

         str[1000] // undefined
         str.charAt(1000) // '' (an empty string)

        We can also iterate over characters using for..of:
        for (let char of "Hello") {
          char; // H,e,l,l,o (char becomes "H", then "e", then "l" etc)
        }

        Strings are immutable. Strings can’t be changed in JavaScript. It is impossible to change a character.
        The usual workaround is to create a whole new string and assign it to str instead of the old one.

        Let’s try it to show that it doesn’t work:

        let str = 'Hi';
        str[0] = 'h'; // error
        str[0] // doesn't work

    * Changing the case

        * toLowerCase()
        * toUpperCase()

        'Interface'.toUpperCase() // INTERFACE
        'Interface'.toLowerCase() // interface
        'Interface'[0].toLowerCase() // 'i'

* Searching for a substring

    * str.indexOf(substr, pos).
        The optional second parameter allows us to search starting from the given position.

        let str = 'Widget with id';
        str.indexOf('Widget') // 0, because 'Widget' is found at the beginning
        str.indexOf('widget') // -1, not found, the search is case-sensitive
        str.indexOf("id") // 1, "id" is found at the position 1 (..idget with id)

        For instance, the first occurrence of "id" is at position 1. To look for the next occurrence, let’s start the search from position 2:
        let str = 'Widget with id';
        str.indexOf('id', 2) ) // 12

        If we’re interested in all occurrences, we can run indexOf in a loop. Every new call is made with the position after the previous match:

        let str = 'As sly as a fox, as strong as an ox';
        let target = 'as'; // let's look for it
        let pos = 0;
        while (true) {
          let foundPos = str.indexOf(target, pos);
          if (foundPos == -1) break;

          `Found at ${foundPos}`
          pos = foundPos + 1; // continue the search from the next position
        }

        The same algorithm can be layed out shorter:
        let str = "As sly as a fox, as strong as an ox";
        let target = "as";
        let pos = -1;
        while ((pos = str.indexOf(target, pos + 1)) != -1) {
           pos
        }

    * str.lastIndexOf(substr, position)
        Searches from the end of a string to its beginning.
        It would list the occurrences in the reverse order.

        There is a slight inconvenience with indexOf in the if test. We can’t put it in the if like this:

        let str = "Widget with id";
        if (str.indexOf("Widget")) {
            "We found it" // doesn't work!
        }

        The alert in the example above doesn’t show because str.indexOf("Widget") returns 0 (meaning that it found the
        match at the starting position). Right, but if considers 0 to be false.So, we should actually check for -1, like this:

        let str = "Widget with id";
        if (str.indexOf("Widget") != -1) {
            "We found it"); // works now!
        }

    * !!!The bitwise NOT trick

        One of the old tricks used here is the bitwise NOT ~ operator.
        It converts the number to a 32-bit integer (removes the decimal part if exists) and then
        reverses all bits in its binary representation.

        For 32-bit integers the call ~n means exactly the same as -(n+1) (due to IEEE-754 format).
        ~2 // -3, the same as -(2+1)
        ~1 // -2, the same as -(1+1)
        ~0 // -1, the same as -(0+1)
        ~-1 // 0, the same as -(-1+1)

        As we can see, ~n is zero only if n == -1. So, the test if ( ~str.indexOf("...") ) is truthy that the result of
        indexOf is not -1. In other words, when there is a match.

        People use it to shorten indexOf checks:

        let str = "Widget";
        if (~str.indexOf("Widget")) {
            'Found it!' // works
        }

        It is usually not recommended to use language features in a non-obvious way, but this particular trick is
        widely used in old code, so we should understand it.Just remember: if (~str.indexOf(...)) reads as “if found”.

    * includes
    * startsWith
    * endsWith

        The more modern method str.includes(substr, pos) returns true/false depending on whether str contains substr within.
        It’s the right choice if we need to test for the match, but don’t need its position:

         "Widget with id".includes("Widget") // true
         "Hello".includes("Bye") // false

        The optional second argument of str.includes is the position to start searching from:

         "Midget".includes("id") // true
         "Midget".includes("id", 3) // false, from position 3 there is no "id"

        The methods str.startsWith and str.endsWith do exactly what they say:

         "Widget".startsWith("Wid") // true, "Widget" starts with "Wid"
         "Widget".endsWith("get")   // true, "Widget" ends with "get"

    * substring
    * slice
        slice(start, end) 	from start to end (not including end) 	allows negatives
        substring(start, end) 	between start and end 	negative values mean 0


        - str.slice(start [, end]) Returns the part of the string from start to (but not including) end.

            let str = "stringify";
            str.slice(0, 5) // 'strin', the substring from 0 to 5 (not including 5)
            str.slice(0, 1) // 's', from 0 to 1, but not including 1, so only character at 0

            If there is no second argument, then slice goes till the end of the string:
            Negative values for start/end are also possible. They mean the position is counted from the string end:

            let str = "stringify"; -> str.slice(2) // ringify, from the 2nd position till the end

        - str.substring(start [, end]) Returns the part of the string between start and end.

            This is almost the same as slice, but it allows start to be greater than end.

            let str = "stringify";
            str.substring(2, 6) // "ring"
            str.substring(6, 2) // "ring"

            // ...but not for slice:
            str.slice(2, 6) // "ring" (the same)
            str.slice(6, 2) // "" (an empty string)

            Negative arguments are (unlike slice) not supported, they are treated as 0.

    * Comparing strings

        As we know from the chapter Comparisons, strings are compared character-by-character in alphabetical order.

        Although, there are some oddities.
            A lowercase letter is always greater than the uppercase:  'a' > 'Z' // true
            Letters with diacritical marks are “out of order”: 'Österreich' > 'Zealand' // true

        The characters are compared by their numeric code. The greater code means that the character is greater.
        The code for a (97) is greater than the code for Z (90).
            All lowercase letters go after uppercase letters because their codes are greater.
            Some letters like Ö stand apart from the main alphabet. Here, it’s code is greater than anything from a to z.

        * Correct comparisons

        The “right” algorithm to do string comparisons is more complex than it may seem, because alphabets are different
        for different languages. The same-looking letter may be located differently in different alphabets. So, the
        browser needs to know the language to compare. Luckily, all modern browsers (IE10- requires the additional
        library Intl.JS) support the internationalization standard ECMA 402. It provides a special method to compare
        strings in different languages, following their rules.

        The call str.localeCompare(str2):

            Returns 1 if str is greater than str2 according to the language rules.
            Returns -1 if str is less than str2.
            Returns 0 if they are equal.

            'Österreich'.localeCompare('Zealand') // -1



    There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions.
    Strings in JavaScript are encoded using UTF-16.
    We can use special characters like \n and insert letters by their unicode using \u....
    To get a character, use: [].
    To get a substring, use: slice or substring.
    To lowercase/uppercase a string, use: toLowerCase/toUpperCase.
    To look for a substring, use: indexOf, or includes/startsWith/endsWith for simple checks.
    To compare strings according to the language, use: localeCompare, otherwise they are compared by character codes.

    str.trim() – removes (“trims”) spaces from the beginning and end of the string.
    str.repeat(n) – repeats the string n times.
    search/replace with regular expressions

* What is a namespace
    JavaScript is designed in such a way that it is very easy to create global variables that have the potential to
    interact in negative ways. The practice of namespacing is usually to create an object literal encapsulating your
    own functions and variables, so as not to collide with those created by other libraries:

    var MyApplication = {
        var1: someval,
        var2: someval,
        myFunc: function() {
            // do stuff
        }
     };

    Then instead of calling myFunc() globally, it would always be called as:

    MyApplication.myFunc();

    In this example, all of our application's code has been namespaced inside MyApplication. It is therefore far less
    likely that our variables will collide with those created by other libraries or created by the DOM

* Explain JS Event loop

    yt: https://www.youtube.com/watch?v=8aGhZQkoFbQ

    * Stack

        Function calls form a stack of frames.

        function foo(b) {
          var a = 10;
          return a + b + 11;
        }

        function bar(x) {
          var y = 3;
          return foo(x * y);
        }

        console.log(bar(7)); //returns 42

        When calling bar, a first frame is created containing bar's arguments and local variables. When bar calls foo, a second
        frame is created and pushed on top of the first one containing foo's arguments and local variables. When foo returns,
        the top frame element is popped out of the stack (leaving only bar's call frame). When bar returns, the stack is empty.

    * Heap

        Objects are allocated in a heap which is just a name to denote a large mostly unstructured region of memory.

    * Queue

        A JavaScript runtime uses a message queue, which is a list of messages to be processed. Each message has an associated
        function which gets called in order to handle the message.

        At some point during the event loop, the runtime starts handling the messages on the queue, starting with the oldest
        one. To do so, the message is removed from the queue and its corresponding function is called with the message as an
        input parameter. As always, calling a function creates a new stack frame for that function's use.

        The processing of functions continues until the stack is once again empty; then the event loop will process the next
        message in the queue (if there is one).

    * Event loop

        The event loop got its name because of how it's usually implemented, which usually resembles:

        while (queue.waitForMessage()) {
          queue.processNextMessage();
        }

        queue.waitForMessage() waits synchronously for a message to arrive if there is none currently.

        - "Run-to-completion"

            Each message is processed completely before any other message is processed. This offers some nice properties when
            reasoning about your program, including the fact that whenever a function runs, it cannot be pre-empted and will run
            entirely before any other code runs (and can modify data the function manipulates). This differs from C, for instance,
            where if a function runs in a thread, it may be stopped at any point by the runtime system to run some other code in
            another thread.

            A downside of this model is that if a message takes too long to complete, the web application is unable to process user
            interactions like click or scroll. The browser mitigates this with the "a script is taking too long to run" dialog. A
            good practice to follow is to make message processing short and if possible cut down one message into several messages.

        - Adding messages

            In web browsers, messages are added anytime an event occurs and there is an event listener attached to it. If there is
            no listener, the event is lost. So a click on an element with a click event handler will add a message--likewise with
            any other event.

            The function setTimeout is called with 2 arguments: a message to add to the queue, and a time value (optional; defaults
            to 0). The time value represents the (minimum) delay after which the message will actually be pushed into the queue. If
            there is no other message in the queue, the message is processed right after the delay; however, if there are messages,
            the setTimeout message will have to wait for other messages to be processed. For that reason, the second argument
             indicates a minimum time and not a guaranteed time.

            Here is an example that demonstrates this concept (setTimeout does not run immediately after its timer expires):

            const s = new Date().getSeconds();

            setTimeout(function() {
              // prints out "2", meaning that the callback is not called immediately after 500 milliseconds.
              console.log("Ran after " + (new Date().getSeconds() - s) + " seconds");
            }, 500);

            while(true) {
              if(new Date().getSeconds() - s >= 2) {
                console.log("Good, looped for 2 seconds");
                break;
              }
            }

        - Zero delays

            Zero delay doesn't actually mean the call back will fire-off after zero milliseconds. Calling setTimeout with a delay
            of 0 (zero) milliseconds doesn't execute the callback function after the given interval.

            The execution depends on the number of waiting tasks in the queue. In the example below, the message ''this is just a
            message'' will be written to the console before the message in the callback gets processed, because the delay is the minimum time required for the runtime to process the request, but not a guaranteed time.

            Basically, the setTimeout needs to wait for all the code for queued messages to complete even though you specified a
            particular time limit for your setTimeout.

            (function() {

              console.log('this is the start');

              setTimeout(function cb() {
                console.log('this is a msg from call back');
              });

              console.log('this is just a message');

              setTimeout(function cb1() {
                console.log('this is a msg from call back1');
              }, 0);

              console.log('this is the end');

            })();

            // "this is the start"
            // "this is just a message"
            // "this is the end"
            // note that function return, which is undefined, happens here
            // "this is a msg from call back"
            // "this is a msg from call back1"

        - Several runtimes communicating together

            A web worker or a cross-origin iframe has its own stack, heap, and message queue. Two distinct runtimes can only
            communicate through sending messages via the postMessage method. This method adds a message to the other runtime if
            the latter listens to message events.

        - Never blocking

            A very interesting property of the event loop model is that JavaScript, unlike a lot of other languages, never blocks.
            Handling I/O is typically performed via events and callbacks, so when the application is waiting for an IndexedDB query
            to return or an XHR request to return, it can still process other things like user input.

            Legacy exceptions exist like alert or synchronous XHR, but it is considered as a good practice to avoid them. Beware,
            exceptions to the exception do exist (but are usually implementation bugs rather than anything else).

* When will setTimeout({},0), Promise, and return resolve? In what order and why?

    Short answer Promises have better priority than setTimeout callback function in event loop stack (or how i
    understand it).

* What is context in JS?

    In JavaScript, scope and context are not the same thing, and it’s important to understand the difference
    between them. Fortunately, the answer is short and simple.

    The answer is short and simple: Scope pertains to the visibility of variables, and context refers to the object
    to which a function belongs.

    - Scope
        Scope has to do with the the visibility of variables. In JavaScript, scope is achieved through the use of
        functions. When you use the keyword “var” inside of a function, the variable that you are initializing is
        private to the function, and cannot be seen outside of that function. But if there are functions inside of
        this function, then those “inner” functions can “see” that variable, and that variable is said to be
        “in-scope”. Functions can “see” variables that are declared inside of them. They can also “see” any that are
        declared outside of them, but never those declared inside of functions that are nested in that function.
       This is scope in JavaScript

       Till ECMA script 5 there were three type of scope
       function scope,
       global scope
       lexical scope.

       There was no block scope in ECMA script 5 other than function block , catch block and object
       block. Block scope came to existence for other blocks like loops conditional statements etc. with introduction of
       let and const keywords in ECMA script 6.

       The variables and functions defined inside a function block are not accessible outside its block. For example
       let us have a look into below code snippet.

       “use strict”;
        function displayUser(){
            var username =”Sample user name”;
        }
        displayUser();
       console.log(username); //Uncaught Reference Error: username is not defined

       ===
       try{

        }
        catch(e){
        var temp = 22;
        }
        console.log(temp);

        A variables that is defined inside any other block like conditional block or a loops like for or while have no
        local scope.

        for(var i=0;i<10;i++){
             console.log(i);
        }
        console.log("The value of i:" + i)


        --Block Scoping in ECMA Script 6

        To the nearest curly braces in ES6! (if, for, while, function...)
        To the nearest function declaration or to global scope for var! (except for closers)

        var age = 100
        > if (age > 12){
        ...     var dogYears = age * 7;
        ...     console.log(`You are ${dogYears} dog years old!`);
        ...   }
        You are 700 dog years old!
        > console.log(dogYears)
        700






        Finally the advantage in ES-6 is we can have block scope JavaScript. ECMA Script 6 let and const keyword will
        help to achieve block scoping. let’s have look into a program with let keyword and see how block scoping works
        in JavaScript.

        for(let i=0;i<10;i++){
            console.log(i);
        }
        console.log("The value of i:" + i)

         0 1 2 3 4 5 6 7 8 9
         Uncaught ReferenceError: i is not defined

         Block scopes are what you get when you use if statements, for statements, and the like. You can also use them
         stand-alone with a simple begin-end curly braces {}, not to be confused with empty object literals.

         var a = {} // empty object literal

         { var a } // undefined object in a block scope

         if (3 == '3') {
           // block scope for the if statement
         }

         for (var i=0; i<10; i++) {
           // block scope for the for statement
         }

    - Context

        Context is related to objects. It refers to the object to which a function belongs. When you use the
        JavaScript “this” keyword, it refers to the object to which function belongs.For example, inside of a function,
        when you say: “this.accoutNumber”, you are referring to the property “accoutNumber”, that belongs to the object
        to which that function belongs. If the object “foo” has a method called “bar”, when the JavaScript keyword
        “this” is used inside of “bar”, it refers to “foo”. If the function “bar” were executed in the global scope,
        then “this” refers to the window object (except in strict mode). It is important to keep in mind that by
        using the JavaScript call() or apply() methods, you can alter the context within which a function is executed.
        This, in-turn, changes the meaning of “this” inside of that function when it is executed.

* REST
    * What is REST architecture?

        REST stands for REpresentational State Transfer. REST is web standards based architecture and uses HTTP Protocol.
        It revolves around resource where every component is a resource and a resource is accessed by a common interface
        using HTTP standard methods. REST was first introduced by Roy Fielding in 2000.

        A REST Server simply provides access to resources and REST client accesses and modifies the resources using
        HTTP protocol. Here each resource is identified by URIs/ global IDs. REST uses various representation to
        represent a resource like text, JSON, XML but JSON is the most popular one.

    * HTTP methods

        Following four HTTP methods are commonly used in REST based architecture.
            GET − This is used to provide a read only access to a resource.
            PUT − This is used to create a new resource.
            DELETE − This is used to remove a resource.
            POST − This is used to update a existing resource or create a new resource.

    * RESTful Web Services

        A web service is a collection of open protocols and standards used for exchanging data between
        applications or systems. Software applications written in various programming languages and running on various
        platforms can use web services to exchange data over computer networks like the Internet in a manner similar
        to inter-process communication on a single computer. This interoperability (e.g., communication between Java
        and Python, or Windows and Linux applications) is due to the use of open standards.

        Web services based on REST Architecture are known as RESTful web services. These webservices uses HTTP methods
        to implement the concept of REST architecture. A RESTful web service usually defines a URI, Uniform Resource
        Identifier a service, which provides resource representation such as JSON and set of HTTP Methods.

    * Creating RESTful for A Library

        Consider we have a JSON based database of users having the following users in a file users.json:

        {
           "user1" : {
              "name" : "mahesh",
              "password" : "password1",
              "profession" : "teacher",
              "id": 1
           },

           "user2" : {
              "name" : "suresh",
              "password" : "password2",
              "profession" : "librarian",
              "id": 2
           },

           "user3" : {
              "name" : "ramesh",
              "password" : "password3",
              "profession" : "clerk",
              "id": 3
           }
        }

        Based on this information we are going to provide following RESTful APIs.
            URI 	    HTTP Method 	POST body 	    Result
        1 	listUsers 	GET 	        empty 	        Show list of all the users.
        2 	addUser 	POST 	        JSON String 	Add details of new user.
        3 	deleteUser 	DELETE 	        JSON String 	Delete an existing user.
        4 	:id 	    GET 	        empty 	        Show details of a user.

        I'm keeping most of the part of all the examples in the form of hard coding assuming you already know how to pass
        values from front end using Ajax or simple form data and how to process them using express Request object.

    - List Users

    Let's implement our first RESTful API listUsers using the following code in a server.js file −

    server.js

    var express = require('express');
    var app = express();
    var fs = require("fs");

    app.get('/listUsers', function (req, res) {
       fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
          console.log( data );
          res.end( data );
       });
    })

    var server = app.listen(8081, function () {
       var host = server.address().address
       var port = server.address().port
       console.log("Example app listening at http://%s:%s", host, port)
    })

    Now try to access defined API using URL: http://127.0.0.1:8081/listUsers and HTTP Method : GET on
    local machine using any REST client. This should produce following result −

    You can change given IP address when you will put the solution in production environment.

    {
       "user1" : {
          "name" : "mahesh",
          "password" : "password1",
          "profession" : "teacher",
          "id": 1
       },

       "user2" : {
          "name" : "suresh",
          "password" : "password2",
          "profession" : "librarian",
          "id": 2
       },

       "user3" : {
          "name" : "ramesh",
          "password" : "password3",
          "profession" : "clerk",
          "id": 3
       }
    }

    Add User

    Following API will show you how to add new user in the list. Following is the detail of the new user −

    user = {
       "user4" : {
          "name" : "mohit",
          "password" : "password4",
          "profession" : "teacher",
          "id": 4
       }
    }

    You can accept the same input in the form of JSON using Ajax call but for teaching point of view, we are making
    it hard coded here. Following is the addUser API to a new user in the database −

    server.js

    var express = require('express');
    var app = express();
    var fs = require("fs");

    var user = {
       "user4" : {
          "name" : "mohit",
          "password" : "password4",
          "profession" : "teacher",
          "id": 4
       }
    }

    app.post('/addUser', function (req, res) {
       // First read existing users.
       fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
          data = JSON.parse( data );
          data["user4"] = user["user4"];
          console.log( data );
          res.end( JSON.stringify(data));
       });
    })

    var server = app.listen(8081, function () {
       var host = server.address().address
       var port = server.address().port
       console.log("Example app listening at http://%s:%s", host, port)
    })

    Now try to access defined API using URL: http://127.0.0.1:8081/addUser and HTTP Method : POST on local
    machine using any REST client. This should produce following result −

### Closures

* What are closures?

    A closure is a function having access to the parent scope, even after the parent function has closed.

    A closure is a special kind of object that combines two things:
        a function
        the environment in which that function was created.
        The environment consists of any local variables that were in-scope at the time that the closure was created.

    JavaScript variables can belong to the local or global scope.
    Global variables can be made local (private) with closures.

    - Global Variables

        A function can access all variables defined inside the function, like this:

        function myFunction() {
            var a = 4;
            return a * a;
        }

        But a function can also access variables defined outside the function, like this:

        var a = 4;
        function myFunction() {
            return a * a;
        }

        In the last example, a is a global variable. In a web page, global variables belong to the window object.
        Global variables can be used (and changed) by all scripts in the page (and in the window).
        In the first example, a is a local variable. A local variable can only be used inside the function where it
        is defined. It is hidden from other functions and other scripting code. Global and local variables with the same
        name are different variables. Modifying one, does not modify the other.

        Variables created without the keyword var, are always global, even if they are created inside a function.

    - Variable Lifetime

        Global variables live as long as your application (your window / your web page) lives. Local variables have
        short lives. They are created when the function is invoked, and deleted when the function is finished.

    - More about closures
    ex 1
    function outside() {
        var text = 1;
        return function() {
            text++;
            console.log(text);
        };
    };
    var trueOutside = outside();
    trueOutside(); // 2
    trueOutside(); // 3
    trueOutside(); // 4

    Why it can accumulate? It is just that simple since the variable trueOutsidehas created a new execution context for
    that inner function, and it stores all the status inside itself without affecting the original parent function
    outside().

    ex2
    var funcs = [];
    for (var i = 0; i < 3; i++) {          // let's create 3 functions
        funcs[i] = function() {            // and store them in funcs
            console.log("My value: " + i); // each should log its value.
        };
    }
    for (var j = 0; j < 3; j++) {
        funcs[j]();                        // and now let's run each one to see
    }

    What you expect the output to be? Since the variable i has increased step by step during the loop and the value
     had stored step by step into that function. It should output the following,

    My value: 0
    My value: 1
    My value: 2

    But instead, it will output like this:

    My value: 3
    My value: 3
    My value: 3

    “Don’t make functions within a loop”“. Yes, he make a point, but why?

    It is simple because, in that anonymous function created in the loop, you have referred a variable which
    belongs to the outside scope, so the next time when you execute this function, the variable i is 3.
    You will ask, what? Haven’t we store that value during the loop? Let’s rewrite the above code a little.

    var i = 0,
        j = 0;

    var funcs = [];

    for (i = 0; i < 3; i++) {              // let's create 3 functions
        funcs[i] = function() {            // and store them in funcs
            console.log("My value: " + i); // each should log its value.
        };
    }

    for (j = 0; j < 3; j++) {
        funcs[j]();                        // and now let's run each one to see
    }

    You know the variable hoist and scope in JavaScript, right? Which is JavaScript doesn’t have a block
    scope, so anytime we declare a variable, it will be hoisted to the top of its container function, if there is no
    container function, it will be hoisted to the global scope. So, this is the reason why i is appeared at the first
    of the block. And this is what happens next:

        1 the variable i and j gets declared first
        2 When the first loop runs, an anonymous function has been created inside the loop
        3 Inside the newly created anonymous function, it referred a variable i which is not in its scope
        4 After the first loop, the value of variable i accumulates to 3 since the loop runs for 3 times.
        5 In the second loop, each function created in the first loop will be invoked.
        6 When it gets invoked, the interpreter will check the value of i, and it found there is no i inside.
        7 Since this anonymous has become a closure, the interpreter will look at its scope chain.
        8 Finally, the interpreter founds the variable i, in the global scope, still within its lexical scope, which is
          totally legitimate for this anonymous function to refer.
        9 And the value of i is 3. We solved it in step 4.

    What happens afterwards for the second and third loop is totally the same from step 6~10.
    The concept of closure in JavaScript makes it very dangerous to make new functions inside a loop.

    How to solve it?

    Since we know the cause, we can solve it now, by using the same concept.
    3.1 I love functions and I will create it at any cost!

    You may think that since the i is a primitive value, we could simple declare a new variable inside that
    function in loop and assign the i to it. Something like

    for (i = 0; i < 3; i++) {
        funcs[i] = function() {
            var my_i = i
            console.log("My value: " + my_i);
        };
    }

    It won’t work, still give you three My value: 3.

    The reason is still as previous:

        When the anonymous function get executed, when it tries to evaluate my_i, it need to read from i, and i is already 3

    So, one way to solve this is to create another closure to save that temporary value. So it leads us to the following code:

    var i = 0;
    var j = 0;
    var funcs = [];
    function printValue(num) {
        return function() {
            console.log("My value: ", num);
        }
    }
    for (i = 0; i < 3; i++) {
        funcs[i] = printValue(i);
    }
    for (j = 0; j < 3; j++) {
        funcs[j]();
    }

    We get what we want.

    My value: 0
    My value: 1
    My value: 2

    Yes, this is JavaScript, always hits you with a unexpected pose. :) It is about the closure again, but it
    is easier to understand using the concept of “context”

* What can you use closures for?
    // Initiate counter
    var counter = 0;

    // Function to increment counter
    function add() {
        counter += 1;
    }

    // Call add() 3 times
    add();
    add();
    add();

    // The counter should now be 3

    There is a problem with the solution above: Any code on the page can change the counter, without calling add().
    var add = (function () {
        var counter = 0;
        return function () {counter += 1; return counter}
    })();

    add();
    add();
    add();

    // the counter is now 3

    Using IIFE
    Now we use the Immediately-Invoked Function Expression (IIFE)
    add()()();

* Explain function currying

    Currying is the process of taking a function with multiple arguments and returning a series of
    functions that take one argument and eventually resolve to a value.

    function volume(l, w, h) {
      return l * w * h;
    }

    volume(2, 3, 4); // 24

    The original function volume takes three arguments, but once curried we can instead
    pass in each argument to three nested functions.

    function volume1(length) {
      return function(width) {
        return function(height) {
          return height * width * length;
        }
      }
    }

    volume1(2)(3)(4); // 24

### Async

* What are promises?
    The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting
    value.

    new Promise( /* executor */ function(resolve, reject) { ... } );

    executor
      A function that is passed with the arguments resolve and reject. The executor function is executed immediately by  the
       Promise implementation, passing resolve and reject functions (the executor is called before the Promise constructor
       even returns the created object). The resolve and reject functions, when called, resolve or reject the promise,
       respectively. The executor normally initiates some asynchronous work, and then, once that completes, either calls
       the resolve function to resolve the promise or else rejects it if an error occurred. If an error is thrown in the
       executor function, the promise is rejected. The return value of the executor is ignored.

    var promise1 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve('foo');
      }, 300);
    });

    promise1.then(function(value) {
      console.log(value);
      // expected output: "foo"
    });

    console.log(promise1);
    // expected output: [object Promise]

    const myFirstPromise = new Promise((resolve, reject) => {
      // do something asynchronous which eventually calls either:
      //   resolve(someValue); // fulfilled
      //   reject("failure reason"); // rejected
    });

    To provide a function with promise functionality, simply have it return a promise:

    function myAsyncFunction(url) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
      });
    }

    Guarantees

    Unlike old-style passed-in callbacks, a promise comes with some guarantees:

        Callbacks will never be called before the completion of the current run of the JavaScript event loop.
        Callbacks added with then() even after the success or failure of the asynchronous operation, will be called,
            as above.
        Multiple callbacks may be added by calling then() several times. Each callback is executed one after another,
            in the order in which they were inserted.

    One of the great things about using promises is chaining.

    ex3
    const promise2 = doSomething().then(successCallback, failureCallback);

    This second promise (promise2) represents the completion not just of doSomething(), but also of the
    successCallback or failureCallback you passed in, which can be other asynchronous functions returning a promise.
    When that's the case, any callbacks added to promise2 get queued behind the promise returned by either
    successCallback or failureCallback. Basically, each promise represents the completion of another asynchronous step
    in the chain. In the old days, doing several asynchronous operations in a row would lead to the classic callback
    pyramid of doom:

    doSomething(function(result) {
      doSomethingElse(result, function(newResult) {
        doThirdThing(newResult, function(finalResult) {
          console.log('Got the final result: ' + finalResult);
        }, failureCallback);
      }, failureCallback);
    }, failureCallback);

    With modern functions, we attach our callbacks to the returned promises instead, forming a promise chain:

    doSomething()
    .then(function(result) {
      return doSomethingElse(result);
    })
    .then(function(newResult) {
      return doThirdThing(newResult);
    })
    .then(function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    })
    .catch(failureCallback);

    !!!The arguments to then are optional, and catch(failureCallback) is short for then(null, failureCallback). You
    might see this expressed with arrow functions instead:

    doSomething()
    .then(result => doSomethingElse(result))
    .then(newResult => doThirdThing(newResult))
    .then(finalResult => {
      console.log(`Got the final result: ${finalResult}`);
    })
    .catch(failureCallback);

    Important: Always return results, otherwise callbacks won't catch the result of a previous promise (with arrow
    functions () => x is short for () => { return x; }).

    The catch callback is executed when the promise is rejected.
*************************
* What is Async, await?
     The async function declaration defines an asynchronous function, which returns an AsyncFunction object. An
     asynchronous function is a function which operates asynchronously via the event loop, using an implicit Promise to
     return its result. But the syntax and structure of your code using async functions is much more like using
     standard synchronous functions.

    function resolveAfter2Seconds() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
        }, 2000);
      });
    }

    async function asyncCall() {
      console.log('calling');
      var result = await resolveAfter2Seconds();
      console.log(result);
      // expected output: 'resolved'
    }

    asyncCall();

     An async function can contain an await expression that pauses the execution of the async function and waits for the
     passed Promise's resolution, and then resumes the async function's execution and returns the resolved value.

     Remember, the await keyword is only valid inside async functions. If you use it outside of an async function's
     body, you will get a SyntaxError.


* What are callbacks?
     A callback is a function that is to be executed after another function has finished executing — hence the name
     ‘call back’.

     In JavaScript, functions are objects. Because of this, functions can take functions as arguments, and can be returned
     by other functions. Functions that do this are called higher-order functions. Any function that is passed as an
     argument is called a callback function.

* What is "then" ?
     The traditional way to deal with asynchronous calls in JavaScript has been with callbacks. Say we had to make three
     calls to the server, one after the other, to set up our application. With callbacks, the code might look something
     like the following (assuming a xhrGET function to make the server call):

    // Fetch some server configuration
    xhrGET('/api/server-config', function(config) {
        // Fetch the user information, if he's logged in
        xhrGET('/api/' + config.USER_END_POINT, function(user) {
            // Fetch the items for the user
            xhrGET('/api/' + user.id + '/items', function(items) {
                // Actually display the items here
            });
        });
    });

    In this example, we first fetch the server configuration. Then based on that, we fetch information about the
    current user, and then finally get the list of items for the current user. Each xhrGET call takes a callback
    function that is executed when the server responds.

    Now of course the more levels of nesting we have, the harder the code is to read, debug, maintain, upgrade, and
    basically work with. This is generally known as callback hell. Also, if we needed to handle errors, we need to
    possibly pass in another function to each xhrGET call to tell it what it needs to do in case of an error. If we
    wanted to have just one common error handler, that is not possible.

    The Promise API was designed to solve this nesting problem and the problem of error handling.

    The Promise API proposes the following:

        Each asynchronous task will return a promise object.
        Each promise object will have a then function that can take two arguments, a success handler and an error
            handler.
        The success or the error handler in the then function will be called only once, after the asynchronous task
            finishes.
        The then function will also return a promise, to allow chaining multiple calls.
        Each handler (success or error) can return a value, which will be passed to the next function as an argument,
            in the chain of promises.
        If a handler returns a promise (makes another asynchronous request), then the next handler (success or error)
            will be called only after that request is finished.

    So the previous example code might translate to something like the following, using promises and the $http service
    (in AngularJs):

    $http.get('/api/server-config').then(
        function(configResponse) {
            return $http.get('/api/' + configResponse.data.USER_END_POINT);
        }
    ).then(
        function(userResponse) {
            return $http.get('/api/' + userResponse.data.id + '/items');
        }
    ).then(
        function(itemResponse) {
            // Display items here
        },
        function(error) {
            // Common error handling
        }
    );


* how can you queue async calls?
    Foo.prototype.bar = function () {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve()
                console.log('bar');
            }, 3000);
        };
    };

    Foo.prototype.baz = function () {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve()
                console.log('baz');
            }, 3000);
        };
    };

    Now you'd do this to run them sequentially one after another:

    var bob = new Foo();

    bob.bar().then(function() {
       return bob.baz();
    });

    // If you're using ES2015+ you could even do:
    bob.bar().then(() => bob.baz());

    If you need to chain more functions you could simply do it:

    bob.bar()
        .then(() => bob.baz())
        .then(() => bob.anotherBaz())
        .then(() => bob.somethingElse());



### ES6

* What are iterators and iterables?
    Iterators are an implementation of Iterable objects such as maps, arrays and strings which enables us to iterate
    over them using next(). They have a wide variety of use cases across Generators, Observables and Spread operators.

    An iterable is a data structure that wants to make its elements accessible to the public. It does so by implementing
    a method whose key is Symbol.iterator. That method is a factory for iterators. That is, it will create iterators.

    An iterator is a pointer for traversing the elements of a data structure.

    ex
    const myFavouriteAuthors = {
        allAuthors: {
            fiction: {'','',''},
            scienceFiction: {'','',''},
            fantasy: {'','',''}
        }
    }

    Now, myFavouriteAuthors is an object which contains another object allAuthors. allAuthors contains three arrays with
    keys fiction, scienceFiction, and fantasy. Now, if I ask you to loop overmyFavouriteAuthors to get all the authors,
    what would your approach be?You can go ahead and try some combination of loops to get all the data.

    However, if you did this —

    for (let author of myFavouriteAuthors) {
      console.log(author)
    }

    // TypeError: {} is not iterable

    const myFavouriteAuthors = {
        allAuthors: {
            fiction: {'','',''},
            scienceFiction: {'','',''},
            fantasy: {'','',''}
        },
        getAllAuthors() {
            const authors = [];

            for (const author of this.allAuthors.fiction) {
                authors.push(author);
            }

            for...
        }
    }

    A few problems can arise with this implementation. Some of them are —

        The name getAllAuthors is very specific. If someone else is making their own myFavouriteAuthors, they may name
            it retrieveAllAuthors.
        We, as developers, always need to know about the specific method that will return all the data. In this case,
            it’s named getAllAuthors.
        getAllAuthors returns an array of strings of all the authors. What if another developer returns an array of
            objects in this format —

    [ {name: 'Agatha Christie'}, {name: 'J. K. Rowling'}, ... ]

    The developer will have to know the exact name and return type of the method that returns all the data.

    const myFavouriteAuthors = {
      allAuthors: {...},
     [Symbol.iterator]() {
        // Get all the authors in an array
        const genres = Object.values(this.allAuthors);

        // Store the current genre and author index
        let currentAuthorIndex = 0;
        let currentGenreIndex = 0;

        return {
          // Implementation of next()
          next() {
            // authors according to current genre index
            const authors = genres[currentGenreIndex];

            // doNotHaveMoreAuthors is true when the authors array is exhausted.
            // That is, all items are consumed.
            const doNothaveMoreAuthors = !(currentAuthorIndex < authors.length);
            if (doNothaveMoreAuthors) {
              // When that happens, we move the genre index to the next genre
              currentGenreIndex++;
              // and reset the author index to 0 again to get new set of authors
              currentAuthorIndex = 0;
            }

            // if all genres are over, then we need tell the iterator that we
            // can not give more values.
            const doNotHaveMoreGenres = !(currentGenreIndex < genres.length);
            if (doNotHaveMoreGenres) {
              // Hence, we return done as true.
              return {
                value: undefined,
                done: true
              };
            }

            // if everything is correct, return the author from the
            // current genre and incerement the currentAuthorindex
            // so next time, the next author can be returned.
            return {
              value: genres[currentGenreIndex][currentAuthorIndex++],
              done: false
            }
          }
        };
      }
    };

    for (const author of myFavouriteAuthors) {
      console.log(author);
    }

    console.log(...myFavouriteAuthors)



    Some built-in types have a default iteration behavior, while other types (such as Object) do not. The built-in types
    with a @@iterator method are:

        Array.prototype[@@iterator]()
        TypedArray.prototype[@@iterator]()
        String.prototype[@@iterator]() -  iterate over each character or Unicode code-points.
        Map.prototype[@@iterator]() - iterates over its key-value pairs
        Set.prototype[@@iterator]() -  iterates over their elements

    for Arrays:
        The values() method returns a new Array Iterator object that contains the values for each index in the array.

        var a = ['w', 'y', 'k', 'o', 'p'];
        var iterator = a.values();

        console.log(iterator.next().value); // w
        console.log(iterator.next().value); // y
        console.log(iterator.next().value); // k
        console.log(iterator.next().value); // o
        console.log(iterator.next().value); // p

    ***yield

    The yield keyword is used to pause and resume a generator function (function* or legacy generator function).

    function* foo(index) {
      while (index < 2) {
        yield index++;
      }
    }

    const iterator = foo(0);

    console.log(iterator.next().value);
    // expected output: 0

    console.log(iterator.next().value);
    // expected output: 1


    function* countAppleSales () {
      var saleList = [3, 7, 5];
      for (var i = 0; i < saleList.length; i++) {
        yield saleList[i];
      }
    }

    Once a generator function is defined, it can be used by constructing an iterator as shown.

    var appleStore = countAppleSales(); // Generator { }
    console.log(appleStore.next()); // { value: 3, done: false }
    console.log(appleStore.next()); // { value: 7, done: false }
    console.log(appleStore.next()); // { value: 5, done: false }
    console.log(appleStore.next()); // { value: undefined, done: true }

    The yield keyword pauses generator function execution and the value of the expression following the yield keyword is
    returned to the generator's caller. It can be thought of as a generator-based version of the return keyword.
    The yield keyword actually returns an IteratorResult object with two properties, value and done. The value property
    is the result of evaluating the yield expression, and done is false, indicating that the generator function has not
    fully completed. Once paused on a yield expression, the generator's code execution remains paused until the
    generator's next() method is called. Each time the generator's next() method is called, the generator resumes
    execution and runs until it reaches one of the following:

* What is new in ES6?

     - Arrows
        Unlike functions, arrows share the same lexical this as their surrounding code.

     - Classes

         ES6 classes are a simple sugar over the prototype-based OO pattern. Having a single convenient declarative form
         makes class patterns easier to use, and encourages interoperability. Classes support prototype-based inheritance,
         super calls, instance and static methods and constructors.

         class Rectangle {
           constructor(height, width) {
             this.height = height;
             this.width = width;
           }
         }

         An important difference between function declarations and class declarations is that function declarations are
         hoisted and class declarations are not. You first need to declare your class and then access it, otherwise code
         like the following will throw a ReferenceError:

         A class expression is another way to define a class. Class expressions can be named or unnamed. The name given to a
         named class expression is local to the class's body. (it can be retrieved through the class's (not an instance's)
         name property, though).

         // unnamed
         let Rectangle = class {
           constructor(height, width) {
             this.height = height;
             this.width = width;
           }
         };
         console.log(Rectangle.name);
         // output: "Rectangle"

         // named
         let Rectangle = class Rectangle2 {
           constructor(height, width) {
             this.height = height;
             this.width = width;
           }
         };
         console.log(Rectangle.name);
         // output: "Rectangle2"

        The body of a class is executed in strict mode, i.e., code written here is subject to stricter syntax for increased
        performance, some otherwise silent errors will be thrown, and certain keywords are reserved for future versions of
        ECMAScript.

        class Rectangle {
          constructor(height, width) {
            this.height = height;
            this.width = width;
          }
          // Getter
          get area() {
            return this.calcArea();
          }
          // Method
          calcArea() {
            return this.height * this.width;
          }
        }

        const square = new Rectangle(10, 10);

        console.log(square.area); // 100

        The static keyword defines a static method for a class. Static methods are called without instantiating their class
        and cannot be called through a class instance. Static methods are often used to create utility functions for an
        application.

        class Point {
          constructor(x, y) {
            this.x = x;
            this.y = y;
          }

          static distance(a, b) {
            const dx = a.x - b.x;
            const dy = a.y - b.y;

            return Math.hypot(dx, dy);
          }
        }

        const p1 = new Point(5, 5);
        const p2 = new Point(10, 10);

        console.log(Point.distance(p1, p2)); // 7.0710678118654755

        --static:
        We can also assign methods to the class function, not to its "prototype". Such methods are called static.

        An example:



        class User {
          static staticMethod() {
            alert(this === User);
          }
        }

        User.staticMethod(); // true

        That actually does the same as assigning it as a function property:

        function User() { }

        User.staticMethod = function() {
          alert(this === User);
        };

        The value of this inside User.staticMethod() is the class constructor User itself (the “object before dot” rule).
    - Template Strings

        Template strings provide syntactic sugar for constructing strings. This is similar to string interpolation
        features in Perl, Python and more. Optionally, a tag can be added to allow the string construction to be
        customized, avoiding injection attacks or constructing higher level data structures from string contents.

        Default function parameters allow named parameters to be initialized with default values if no value or
        undefined is passed.

        function multiply(a, b = 1) {
          return a * b;
        }

        console.log(multiply(5, 2));
        // expected output: 10

        console.log(multiply(5));
        // expected output: 5

    - Default + Rest + Spread

        -- The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values
            from arrays, or properties from objects, into distinct variables.

        var a, b, rest;
        [a, b] = [10, 20];

        console.log(a);
        // expected output: 10
        console.log(b);
        // expected output: 20

        [a, b, ...rest] = [10, 20, 30, 40, 50];
        console.log(rest);
        // expected output: [30,40,50]

        -- The rest parameter syntax allows us to represent an indefinite number of arguments as an array.

        function sum(...theArgs) {
            return theArgs.reduce((previous, current) => {
                return previous + current;
             });
        }

        console.log(sum(1, 2, 3));
        // expected output: 6

        console.log(sum(1, 2, 3, 4));
        // expected output: 10

    - Const and Let
        This is why I favor `const` over `let` in ES6. In JavaScript, `const` means that the identifier can’t be
        reassigned. (Not to be confused with immutable values. Unlike true immutable datatypes such as those produced by
        Immutable.js and Mori, a `const` object can have properties mutated.) If I don’t need to reassign, `const` is
        my default choice over `let` because I want the usage to be as clear as
        possible in the code. I use `let` when I need to reassign a variable. Because I use one variable to represent
        one thing, the use case for `let` tends to be for loops or mathematical algorithms.

        `const` is a signal that the identifier won’t be reassigned.

        `let`, is a signal that the variable may be reassigned, such as a counter in a loop, or a value swap in an
        algorithm. It also signals that the variable will be used only in the block it’s defined in, which is not always
         the entire containing function.

    - Iterators + For..Of

    Iterator objects enable custom iteration like CLR IEnumerable or Java Iterable. Generalize for..in to custom
    iterator-based iteration with for..of. Don’t require realizing an array, enabling lazy design patterns like LINQ.

    let fibonacci = {
      [Symbol.iterator]() {
        let pre = 0, cur = 1;
        return {
          next() {
            [pre, cur] = [cur, pre + cur];
            return { done: false, value: cur }
          }
        }
      }
    }

    for (var n of fibonacci) {
      // truncate the sequence at 1000
      if (n > 1000)
        break;
      console.log(n);
    }

    - Generators

    Generators simplify iterator-authoring using function* and yield. A function declared as function* returns a
    Generator instance. Generators are subtypes of iterators which include additional next and throw. These enable
    values to flow back into the generator, so yield is an expression form which returns a value (or throws).

    Note: Can also be used to enable ‘await’-like async programming, see also ES7 await proposal.

    var fibonacci = {
      [Symbol.iterator]: function*() {
        var pre = 0, cur = 1;
        for (;;) {
          var temp = pre;
          pre = cur;
          cur += temp;
          yield cur;
        }
      }
    }

    for (var n of fibonacci) {
      // truncate the sequence at 1000
      if (n > 1000)
        break;
      console.log(n);
    }


    - Map + Set + WeakMap + WeakSet

        (has, get, set)
        -- Map
        The Map object holds key-value pairs and remembers the original insertion order of the keys. Any value (both
        objects and primitive values) may be used as either a key or a value.

        new Map([iterable])

        -- Set
        const set1 = new Set([1, 2, 3, 4, 5]);

        console.log(set1.has(1));
        // expected output: true

        console.log(set1.has(5));
        // expected output: true

        console.log(set1.has(6));
        // expected output: false

        The Set object lets you store unique values of any type, whether primitive values or object references.

* What should Class contain?
    nothing

    Classes

    The “class” construct allows to define prototype-based classes with a clean, nice-looking syntax.
    The class syntax is versatile, we’ll start with a simple example first.

    function User(name) {
      this.name = name;
    }

    User.prototype.sayHi = function() {
      alert(this.name);
    }

    let user = new User("John");
    user.sayHi();

    …And that’s the same using class syntax:

    class User {

      constructor(name) {
        this.name = name;
      }

      sayHi() {
        alert(this.name);
      }

    }

    let user = new User("John");
    user.sayHi();

    It’s easy to see that the two examples are alike. Just please note that methods in a class do not have a comma
    between them. Novice developers sometimes forget it and put a comma between class methods, and things don’t work.
    That’s not a literal object, but a class syntax. So, what exactly does class do? We may think that it defines a new
    language-level entity, but that would be wrong.

    The class User {...} here actually does two things:

        Declares a variable User that references the function named "constructor".
        Puts methods listed in the definition into User.prototype. Here, it includes sayHi and the constructor.

    class User {
      constructor(name) { this.name = name; }
      sayHi() { alert(this.name); }
    }

    So class is a special syntax to define a constructor together with its prototype methods.

    …But not only that. There are minor tweaks here and there:

    Constructors require new
        Unlike a regular function, a class constructor can’t be called without new:

    class User {
      constructor() {}
    }

    alert(typeof User); // function
    User(); // Error: Class constructor User cannot be invoked without 'new'

### Other
* Using constant value x prove that x-x != 0
    const x = 0;
    typeof x - x // NaN
    => x-x !-NaN // Nothing equals NaN

* What is the result of such operation <code>"Was it a car or a cat I saw?".split('').reverse().join('');</code> How do you call such gramatic figure?
    '?was I tac a ro rac a ti saW' - inversion

* What means IIFE? Can you write down 2 examples of IIFE?
    !function() {alert("Hello from IIFE!")}();
    (function() {alert("Hello from IIFE!")})();

* How to extend native prototype (for example how to add to Array function that counts average value of integers inside it)

    There should be some validation of ar length here.
    If total = undefined and length = 0 -> NaN

    Array.prototype.count = function() {
        let total = 0;
        for( let i = 0; i < this.length; i++) {
            total += this[i];
        }

        return total / this.length;
    }


* Big O notation

    Big O notation is used in Computer Science to describe the performance or complexity of an algorithm. Big O
    pecifically describes the worst-case scenario, and can be used to describe the execution time required or the space
    used (e.g. in memory or on disk) by an algorithm.
