* What is Node.js?
    Node.js is a JavaScript runtime environment. Sounds great, but what does that mean? How does that work?
    The Node run-time environment includes everything you need to execute a program written in JavaScript.

    mdn Node.js is an open source server environment
    Node.js uses JavaScript on the server

* Why Node.js?

    Node.js uses asynchronous programming!
    A common task for a web server can be to open a file on the server and return the content to the client.

    Here is how Node.js handles a file request:

        Sends the task to the computer's file system.
        Ready to handle the next request.
        When the file system has opened and read the file, the server returns the content to the client.

    Node.js eliminates the waiting, and simply continues with the next request.

    Node.js runs single-threaded, non-blocking, asynchronously programming, which is very memory efficient.

* What Can Node.js Do?

    Node.js can generate dynamic page content
    Node.js can create, open, read, write, delete, and close files on the server
    Node.js can collect form data
    Node.js can add, delete, modify data in your database


* Whats new in nodejs 10 (LTS - april 2018 release)
    -Native Node HTTP/2 becomes stable

    -Performance improvements with V8 Engine v6.6
    Node is powered off the V8 JavaScript Engine used in Chromium, and Node.js v10 comes equipped with the latest
    release. For the browser, the V8 Engine v6.6 which ships with Chrome 66 and provides reduction of around 20–40% in
    both parse and compilation time of JavaScript.

    -Better Support for ES Modules (ESM)
    Node has been using CommonJS (CJS) which is the require and module.exports syntax. In the epic ES6 release in 2015,
    a new module system was introduced known as ECMAScript Modules (ESM). Being the official ECMA implementation along
    with the love and broad adoption by developers, Node has been working toward its own implementation of the ESM spec.

    -npm v6 ships immediately

    -Experimental promise version of the ‘fs’ functions
     Interacting with the file system is a staple of many Node apps, and Node 10 will be shipping experimental version
     of the fs package with promises. Previously these functions handled asynchronous actions through callbacks but
     could be converted using the util.promisify() function that shipped with Node 8. Now developers can utilize fs with
     promises without needing the extra step.

* simple server
    var http = require('http');

    //create a server object:
    http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('Hello World!'); //write a response to the client
      res.end(); //end the response
    }).listen(8080); //the server object listens on port 8080

    http://localhost:8080

* What is a Module in Node.js?

  Consider modules to be the same as JavaScript libraries. A set of functions you want to include in your application.

  My own module:
  exports.myDateTime = function () {
      return Date();
  };

  - modules
    - http
        Node.js has a built-in module called HTTP, which allows Node.js to transfer data over the Hyper Text Transfer
        Protocol (HTTP).
    - url
        The URL module splits up a web address into readable parts.

        var url = require('url');
        var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
        var q = url.parse(adr, true);

        console.log(q.host); //returns 'localhost:8080'
        console.log(q.pathname); //returns '/default.htm'
        console.log(q.search); //returns '?year=2017&month=february'

        var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
        console.log(qdata.month); //returns 'february'

        **
        summer.html
        <!DOCTYPE html>
        <html>
        <body>
        <h1>Summer</h1>
        <p>I love the sun!</p>
        </body>
        </html>

        winter.html
        <!DOCTYPE html>
        <html>
        <body>
        <h1>Winter</h1>
        <p>I love the snow!</p>
        </body>
        </html>


        demo_fileserver.js:
        var http = require('http');
        var url = require('url');
        var fs = require('fs');

        http.createServer(function (req, res) {
          var q = url.parse(req.url, true);
          var filename = "." + q.pathname;

          fs.readFile(filename, function(err, data) {
            if (err) {
              res.writeHead(404, {'Content-Type': 'text/html'});
              return res.end("404 Not Found");
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
          });
        }).listen(8080);


    - fs
        The Node.js file system module allows you to work with the file system on your computer.

        Read files
        Create files
        Update files
        Delete files
        Rename files

    - events
        Every action on a computer is an event. Like when a connection is made or a file is opened.
        Node.js has a built-in module, called "Events", where you can create-, fire-, and listen for- your own events.

        var events = require('events');
        var eventEmitter = new events.EventEmitter();

        //Create an event handler:
        var myEventHandler = function () {
          console.log('I hear a scream!');
        }

        //Assign the event handler to an event:
        eventEmitter.on('scream', myEventHandler);

        //Fire the 'scream' event:
        eventEmitter.emit('scream');


* V8
    V8 is Google’s open source high-performance JavaScript and WebAssembly engine, written in C++. It is used in Google
    Chrome, the open source browser from Google, and in Node.js, among others. It implements ECMAScript and
    WebAssembly. V8 can run standalone, or can be embedded into any C++ application.

    A JavaScript engine is a program or an interpreter which executes JavaScript code. A JavaScript engine can be
    implemented as a standard interpreter, or just-in-time compiler that compiles JavaScript to bytecode in some form.

    V8 was first designed to increase the performance of JavaScript execution inside web browsers. In order to obtain
    speed, V8 translates JavaScript code into more efficient machine code instead of using an interpreter. It compiles
    JavaScript code into machine code at execution by implementing a JIT (Just-In-Time) compiler like a lot of modern
    JavaScript engines do such as SpiderMonkey or Rhino (Mozilla). The main difference here is that V8 doesn’t produce
    bytecode or any intermediate code.

    The release of V8 in 2008 marked a pivotal moment in the history of engines. V8 replaced the browser’s relatively
    slow interpretation of JavaScript. The reason behind this massive improvement lies mainly in the combination of
    interpreter and compiler. Today, all four engines use this technique. The interpreter executes source code almost
    immediately. The compiler generates machine code which the user’s system executes directly. As the compiler works
    on the machine code generation, it applies optimisations. Both compilation and optimisation result in faster code
    execution despite the extra time needed in the compile phase.

    The main idea behind modern engines is to combine the best of both worlds:

        Fast application startup of the interpreter.
        Fast execution of the compiler.


* Nodejs questions
    1. What is Node.js? Where can you use it?

    Node.js is a server side scripting based on Google’s V8 JavaScript engine. It is used to build scalable programs
    especially web applications that are computationally simple but are frequently accessed.

    You can use Node.js in developing I/O intensive web applications like video streaming sites. You can also use it for
     developing: Real-time web applications, Network applications, General-purpose applications and Distributed systems.

    2. Why use Node.js?

    Node.js makes building scalable network programs easy. Some of its advantages include:

        It is generally fast
        It almost never blocks
        It offers a unified programming language and data type
        Everything is asynchronous
        It yields great concurrency

    3. What are the features of Node.js?

    Node.js is a single-threaded but highly scalable system that utilizes JavaScript as its scripting language. It uses
    asynchronous, event-driven I/O instead of separate processes or threads. It is able to achieve high output via
    single-threaded event loop and non-blocking I/O.

    4. How else can the JavaScript code below be written using Node.Js to produce the same output?

    console.log("first");
    setTimeout(function() {
        console.log("second");
    }, 0);
    console.log("third");

    Output:

    first
    third
    second

    In Node.js version 0.10 or higher, setImmediate(fn) will be used in place of setTimeout(fn,0) since it is faster. As
     such, the code can be written as follows:

    console.log("first");
    setImmediate(function(){
        console.log("second");
    });
    console.log("third");

    5. How do you update NPM to a new version in Node.js?

    You use the following commands to update NPM to a new version:

    $ sudo npm install npm -g
    /usr/bin/npm -> /usr/lib/node_modules/npm/bin/npm-cli.js
    npm@2.7.1 /usr/lib/node_modules/npm

    6. Why is Node.js Single-threaded?

    Node.js is single-threaded for async processing. By doing async processing on a single-thread under typical web
    loads, more performance and scalability can be achieved as opposed to the typical thread-based implementation.

    7. Explain callback in Node.js.

    A callback function is called at the completion of a given task. This allows other code to be run in the meantime
    and prevents any blocking.  Being an asynchronous platform, Node.js heavily relies on callback. All APIs of Node are
     written to support callbacks.

    8. What is callback hell in Node.js?

    Callback hell is the result of heavily nested callbacks that make the code not only unreadable but also difficult to
     maintain. For example:

    query("SELECT clientId FROM clients WHERE clientName='picanteverde';", function(id){
      query("SELECT * FROM transactions WHERE clientId=" + id, function(transactions){
        transactions.each(function(transac){
          query("UPDATE transactions SET value = " + (transac.value*0.1) + " WHERE id=" + transac.id, function(error){
            if(!error){
              console.log("success!!");
            }else{
              console.log("error");
            }
          });
        });
      });
    });

    9. How do you prevent/fix callback hell?

    The three ways to prevent/fix callback hell are:

        Handle every single error
        Keep your code shallow
        Modularize – split the callbacks into smaller, independent functions that can be called with some parameters
            then joining them to achieve desired results.

    The first level of improving the code above might be:

    var logError = function(error){
        if(!error){
          console.log("success!!");
        }else{
          console.log("error");
        }
      },
      updateTransaction = function(t){
        query("UPDATE transactions SET value = " + (t.value*0.1) + " WHERE id=" + t.id, logError);
      },
      handleTransactions = function(transactions){
        transactions.each(updateTransaction);
      },
      handleClient = function(id){
        query("SELECT * FROM transactions WHERE clientId=" + id, handleTransactions);
      };

    query("SELECT clientId FROM clients WHERE clientName='picanteverde';",handleClient);

    You can also use Promises, Generators and Async functions to fix callback hell.

    10. Explain the role of REPL in Node.js.

    As the name suggests, REPL (Read Eval print Loop) performs the tasks of – Read, Evaluate, Print and Loop. The REPL
    in Node.js is used to execute ad-hoc Javascript statements. The REPL shell allows entry to javascript directly into
    a shell prompt and evaluates the results. For the purpose of testing, debugging, or experimenting, REPL is very
    critical.

    11. Name the types of API functions in Node.js.

    There are two types of functions in Node.js.:

         Blocking functions - In a blocking operation, all other code is blocked from executing until an I/O event that
         is being waited on occurs. Blocking functions execute synchronously

    For example:
    const fs = require('fs');
    const data = fs.readFileSync('/file.md'); // blocks here until file is read
    console.log(data);
    // moreWork(); will run after console.log

    The second line of code blocks the execution of additional JavaScript until the entire file is read. moreWork ()
    will only be called after Console.log

        Non-blocking functions - In a non-blocking operation, multiple I/O calls can be performed without the execution
        of the program being halted.  Non-blocking functions execute asynchronously.

    For example:

    const fs = require('fs');
    fs.readFile('/file.md', (err, data) => {
      if (err) throw err;
      console.log(data);
    });
    // moreWork(); will run before console.log

    Since fs.readFile () is non-blocking, moreWork () does not have to wait for the file read to complete before being
    called. This allows for higher throughput.

    12. Which is the first argument typically passed to a Node.js callback handler?

    Typically, the first argument to any callback handler is an optional error object. The argument is null or undefined
     if there is no error.

    Error handling by a typical callback handler could be as follows:

    function callback(err, results) {
        // usually we'll check for the error before handling results
        if(err) {
            // handle error somehow and return
        }
        // no error, perform standard callback handling
    }

    13. What are the functionalities of NPM in Node.js?

    NPM (Node package Manager) provides two functionalities:

        Online repository for Node.js packages
        Command line utility for installing packages, version management and dependency management of Node.js packages

    14. What is the difference between Node.js and Ajax?

    Node.js and Ajax (Asynchronous JavaScript and XML) are the advanced implementation of JavaScript. They all serve
    completely different purposes.

    Ajax is primarily designed for dynamically updating a particular section of a page’s content, without having to
    update the entire page.

    Node.js is used for developing client-server applications.

    15. Explain chaining in Node.js.

    Chaining is a mechanism whereby the output of one stream is connected to another stream creating a chain of multiple
     stream operations.

    16. What are “streams” in Node.js? Explain the different types of streams present in Node.js.

    Streams are objects that allow reading of data from the source and writing of data to the destination as a
    continuous process.

    There are four types of streams.

        to facilitate the reading operation
        to facilitate the writing operation
        to facilitate both read and write operations
        is a form of Duplex stream that performs computations based on the available input

    17. What are exit codes in Node.js? List some exit codes.

    Exit codes are specific codes that are used to end a “process” (a global object used to represent a node process).

    Examples of exit codes include:

        Unused
        Uncaught Fatal Exception
        Fatal Error
        Non-function Internal Exception Handler
        Internal Exception handler Run-Time Failure
        Internal JavaScript Evaluation Failure

    18. What are Globals in Node.js?

    Three keywords in Node.js constitute as Globals. These are:

        Global – it represents the Global namespace object and acts as a container for all other objects.
        Process – It is one of the global objects but can turn a synchronous function into an async callback. It can be
            accessed from anywhere in the code and it primarily gives back information about the application or the
            environment.
        Buffer – it is a class in Node.js to handle binary data.

    19. What is the difference between AngularJS and Node.js?

    Angular.JS is a web application development framework while Node.js is a runtime system.

    20. Why is consistent style important and what tools can be used to assure it?

    Consistent style helps team members modify projects easily without having to get used to a new style every time.
    Tools that can help include Standard and ESLint.

    **
    Q1. What is Node.js? What is it used for?

    Node.js is a run-time JavaScript environment built on top of Chrome’s V8 engine. It uses an event-driven,
    non-blocking I/O model. It is lightweight and so efficient. Node.js has a package ecosystem called npm.

    Node.js can be used to build different types of applications such as web application, real-time chat application,
    REST API server etc. However, it is mainly used to build network programs like web servers, similar to PHP, Java, or ASP.NET. Node.js was developed by Ryan Dahl in 2009.

    Q2. What is Event-driven programming?

    Event-driven programming is building our application based on and respond to events. When an event occurs, like
    click or keypress, we are running a callback function which is registered to the element for that event.

    Event driven programming follows mainly a publish-subscribe pattern.

    Q3. What is Event loop in Node.js work? And How does it work?

    The Event loop handles all async callbacks. Node.js (or JavaScript) is a single-threaded, event-driven language.
    This means that we can attach listeners to events, and when a said event fires, the listener executes the callback
    we provided.

    Whenever we are call setTimeout, http.get and fs.readFile, Node.js runs this operations and further continue to run
    other code without waiting for the output. When the operation is finished, it receives the output and runs our
    callback function.

    So all the callback functions are queued in an loop, and will run one-by-one when the response has been received.

    Q4. What is REPL in Node.js?

    REPL means Read-Eval-Print-Loop. It is a virtual environment that comes with Node.js. We can quickly test our
    JavaScript code in the Node.js REPL environment.

    To launch the REPL in Node.js, just open the command prompt and type node. It will change the prompt to > in Windows
     and MAC.

    Now we can type and run our JavaScript easily. For example, if we type 10 + 20, it will print 30 in the next line.

    Q5. What is the purpose of module.exports in Node.js?

    A module encapsulates related code into a single unit of code. This can be interpreted as moving all related
    functions into a file. Imagine that we created a file called greetings.js and it contains the following two
    functions:

    In the above code, module.exports exposes two functions to the outer world. We can import them in another file as follow:

    Q6. What is the difference between Asynchronous and Non-blocking?

    Asynchronous literally means not synchronous. We are making HTTP requests which are asynchronous, means we are not
    waiting for the server response. We continue with other block and respond to the server response when we received.

    The term Non-Blocking is widely used with IO. For example non-blocking read/write calls return with whatever they
    can do and expect caller to execute the call again. Read will wait until it has some data and put calling thread to
    sleep.

    Q7. What is Tracing in Node.js?

    Tracing provides a mechanism to collect tracing information generated by V8, Node core and userspace code in a log
    file. Tracing can be enabled by passing the --trace-events-enabled flag when starting a Node.js application.

    The set of categories for which traces are recorded can be specified using the --trace-event-categories flag
    followed by a list of comma separated category names. By default the node and v8 categories are enabled.

    Running Node.js with tracing enabled will produce log files that can be opened in the chrome://tracing tab of Chrome

    Q8. How will you debug an application in Node.js?

    Node.js includes a debugging utility called debugger. To enable it start the Node.js with the debug argument
    followed by the path to the script to debug.

    Inserting the statement debugger; into the source code of a script will enable a breakpoint at that position in the
    code:

    Q9. Difference between setImmediate() vs setTimeout()

    setImmediate() and setTimeout() are similar, but behave in different ways depending on when they are called.

        setImmediate() is designed to execute a script once the current poll (event loop) phase completes.
        setTimeout() schedules a script to be run after a minimum threshold in ms has elapsed.

    The order in which the timers are executed will vary depending on the context in which they are called. If both are
    called from within the main module, then timing will be bound by the performance of the process.

    Q10. What is process.nextTick()

    setImmediate() and setTimeout() are based on the event loop. But process.nextTick() technically not part of the
    event loop. Instead, the nextTickQueue will be processed after the current operation completes, regardless of the
    current phase of the event loop.

    Thus, any time you call process.nextTick() in a given phase, all callbacks passed to process.nextTick() will be
    resolved before the event loop continues.

    Q11. What is package.json? What is it used for?

    This file holds various metadata information about the project. This file is used to give information to npm that
    allows it to identify the project as well as handle the project's dependencies.

    Some of the fields are: name, name, description, author and dependencies.

    When someone installs our project through npm, all the dependencies listed will be installed as well. Additionally,
    if someone runs npm install in the root directory of our project, it will install all the dependencies to
    ./node_modules directory.

    Q12. What is libuv?

    libuv is a multi-platform support library with a focus on asynchronous I/O. It was primarily developed for use by
    Node.js, but it’s also used by Luvit, Julia, pyuv, and others.

    When the node.js project began in 2009 as a JavaScript environment decoupled from the browser, it is using Google’s
    V8 and Marc Lehmann’s libev, node.js combined a model of I/O – evented – with a language that was well suited to the
     style of programming; due to the way it had been shaped by browsers. As node.js grew in popularity, it was
     important to make it work on Windows, but libev ran only on Unix. libuv was an abstraction around libev or IOCP
     depending on the platform, providing users an API based on libev. In the node-v0.9.0 version of libuv libev was
     removed.

    Some of the features of libuv are:

        Full-featured event loop backed by epoll, kqueue, IOCP, event ports.
        Asynchronous TCP and UDP sockets
        Asynchronous file and file system operations
        Child processes
        File system events

    Q13. What are some of the most popular modules of Node.js?

    There are many most popular, most starred or most downloaded modules in Node.js. Some of them are:

        express
        async
        browserify
        socket.io
        bower
        gulp
        grunt

    Q14. What is EventEmitter in Node.js?

    All objects that emit events are instances of the EventEmitter class. These objects expose an eventEmitter.on()
    function that allows one or more functions to be attached to named events emitted by the object.

    When the EventEmitter object emits an event, all of the functions attached to that specific event are called
    synchronously.

    Q15. What is Streams in Node.js?

    Streams are pipes that let you easily read data from a source and pipe it to a destination. Simply put, a stream is
    nothing but an EventEmitter and implements some specials methods. Depending on the methods implemented, a stream
    becomes Readable, Writable, or Duplex (both readable and writable).

     For example, if we want to read data from a file, the best way to do it from a stream is to listen to data event
     and attach a callback. When a chunk of data is available, the readable stream emits a data event and your callback
     executes. Take a look at the following snippet:

    Types of streams are: Readable, Writable, Duplex and Transform.

    Q16. What is the difference between readFile vs createReadStream in Node.js?

    readFile — is for asynchronously reads the entire contents of a file. It will read the file completely into memory
        before making it available to the User. readFileSync is synchronous version of readFile.

    createReadStream — It will read the file in chunks of the default size 64 kb which is specified before hand.

    Q17. What is crypto in Node.js? How do you cipher the secured information in Node.js?

    The crypto module in Node.js provides cryptographic functionality that includes a set of wrappers for OpenSSL's
    hash, HMAC, cipher, decipher, sign and verify functions.

    Q18. What is the use of Timers is Node.js?

    The Timers module in Node.js contains functions that execute code after a set period of time. Timers do not need to
    be imported via require(), since all the methods are available globally to emulate the browser JavaScript API.

    The Node.js API provides several ways of scheduling code to execute at some point after the present moment. The
    functions below may seem familiar, since they are available in most browsers, but Node.js actually provides its own
    implementation of these methods.

    Node.js Timer provides setTimeout(), setImmediate() and setInterval.

    Q19. What is the use of DNS module in Node.js?

    dns module which provide underlying system's name resolution and DNS look up facilities. DNS module consists of an
    asynchronous network wrapper.

    The most commonly used functions in DNS module are:

        dns.lookup(adress, options, callback) - The dns lookup method takes any website address as its first parameter
            and returns the corresponding first IPV4 or IPV6 record. The options parameter can be an integer or object.
            If no options are provided both IPV4 and IPV6 are valid inputs. The third parameter is the callback functions.
        dns.lookupservice(address, port, callback) - This function converts any physical address such as
            “www.knowledgehills.com” to array of record types. The record types are specified by the second parameter
            “rrbyte”. Finally the third method is the callback function.
        dns.getServers() - This function returns an array of IP address strings, formatted according to rfc5952, that
            are currently configured for DNS resolution. A string will include a port section if a custom port is used.
        dns.setServers() - This function sets the IP address and port of servers to be used when performing DNS
            resolution. The dns.setServers() method must not be called while a DNS query is in progress.

    Q20. What is a Callback function in Node.js?

    Node.js, being an asynchronous platform, doesn’t wait around for things like file I/O to finish — Node.js uses
    callbacks. A callback is a function called at the completion of a given task; this prevents any blocking, and allows
     other code to be run in the meantime.

    Callbacks are the foundation of Node.js. Callbacks give us an interface with which to say, “and when you’re done
    doing that, do all this.” This allows us to have as many IO operations as our OS can handle happening at the same
    time. For example, in a web server with hundreds or thousands of pending requests with multiple blocking queries,
    performing the blocking queries asynchronously gives you the ability to be able to continue working and not just sit
     still and wait until the blocking operations come back.

    Q21. What are the security mechanisms available in Node.js?

    We can secure our Node.js application in the following ways:

    Authentication — Authentication is one of the primary security stages at which user is identified as permitted to
    access the application at all. Authentication verifies the user’s identity through one or several checks. In Node
    .js, authentication can be either session-based or token-based. In session-based authentication, the user’s
    credentials are compared to the user account stored on the server and, in the event of successful validation, a
    session is started for the user. Whenever the session expires, the user needs to log in again. In token-based
    authentication, the user’s credentials are applied to generate a string called a token which is then associated with
     the user’s requests to the server.

    Error Handling — Usually, the error message contains the explanation of what’s actually gone wrong for the user to
    understand the reason. At the same time, when the error is related to the application code syntax, it can be set to
    display the entire log content on the frontend. For an experienced hacker, the log content can reveal a lot of
     sensitive internal information about the application code structure and tools used within the software.

    Request Validation — Another aspect which has to be considered, while building a secure Node.js application, is a
    validation of requests or, in other words, a check of the incoming data for possible inconsistencies. It may seem
    that invalid requests do not directly affect the security of a Node.js application, however, they may influence its
    performance and robustness. Validating the incoming data types and formats and rejecting requests not conforming to
    the set rules can be an additional measure of securing your Node.js application.

     Node.js Security Tools and Best Practices — We can use tools like helmet (protects our application by setting HTTP
     headers), csurf (validates tokens in incoming requests and rejects the invalid ones), node rate limiter (controls
      the rate of repeated requests. This function can protect you from brute force attacks) and cors (enables
      cross-origin resource sharing).

    Q22. What is the passport in Node.js?

    Passport.js is a simple, unobtrusive Node.js authentication middleware for Node.js. Passport.js can be dropped into
    any Express.js-based web application.

    Passport recognizes that each application has unique authentication requirements. Authentication mechanisms, known
    as strategies, are packaged as individual modules. Applications can choose which strategies to employ, without
    creating unnecessary dependencies.

    By default, if authentication fails, Passport will respond with a 401 Unauthorized status, and any additional route
    handlers will not be invoked. If authentication succeeds, the next handler will be invoked and the req.user property
    will be set to the authenticated user.

    1)      What is node.js?

    Node.js is a Server side scripting which is used to build scalable programs. Its multiple advantages over other
    server side languages, the prominent being non-blocking I/O.

    2)      How node.js works?

    Node.js works on a v8 environment, it is a virtual machine that utilizes JavaScript as its scripting language and
    achieves high output via non-blocking I/O and single threaded event loop.

    3)      What do you mean by the term I/O ?

    I/O is the shorthand for input and output, and it will access anything outside of your application. It will be
    loaded into the machine memory to run the program, once the application is started.

    4)      What does event-driven programming mean?

    In computer programming, event driven programming is a programming paradigm in which the flow of the program is
    determined by events like messages from other programs or threads. It is an application architecture technique
    divided into two sections 1) Event Selection 2) Event Handling

    5)      Where can we use node.js?

    Node.js can be used for the following purposes

        a)      Web applications ( especially real-time web apps )
        b)      Network applications
        c)       Distributed systems
        d)      General purpose applications

    6)      What is the advantage of using node.js?

        a)      It provides an easy way to build scalable network programs
        b)      Generally fast
        c)       Great concurrency
        d)      Asynchronous everything
        e)      Almost never blocks

    7)      What are the two types of API functions in Node.js ?

    The two types of API functions in Node.js are

        a)      Asynchronous, non-blocking functions
        b)      Synchronous, blocking functions
        8)      What is control flow function?

    A generic piece of code which runs in between several asynchronous function calls is known as control flow function.

    9)      Explain the steps how “Control Flow” controls the functions calls?

        a)      Control the order of execution
        b)      Collect data
        c)       Limit concurrency
        d)      Call the next step in program

    10)   Why Node.js is single threaded?

    For async processing, Node.js was created explicitly as an experiment. It is believed that more performance and
    scalability can be achieved by doing async processing on a single thread under typical web loads than the typical
    thread based implementation.

    11)   Does node run on windows?

    Yes – it does. Download the MSI installer from http://nodejs.org/download/

    12)   Can you access DOM in node?

    No, you cannot access DOM in node.

    13)   Using the event loop what are the tasks that should be done asynchronously?

        a)      I/O operations
        b)      Heavy computation
        c)       Anything requiring blocking

    14)   Why node.js is quickly gaining attention from JAVA programmers?

    Node.js is quickly gaining attention as it is a loop based server for JavaScript. Node.js gives user the ability to
    write the JavaScript on the server, which has access to things like HTTP stack, file I/O, TCP and databases.

    15)   What are the two arguments that async.queue takes?

    The two arguments that async.queue takes

        a)      Task function
        b)      Concurrency value

    16)   What is an event loop in Node.js ?

    To process and handle external events and to convert them into callback invocations an event loop is used. So, at
    I/O calls, node.js can switch from one request to another .

    17)   Mention the steps by which you can async in Node.js?

    By following steps you can async Node.js

        a)      First class functions
        b)      Function composition
        c)       Callback Counters
        d)      Event loops

    18)    What are the pros and cons of Node.js?

    Pros:

    a)      If your application does not have any CPU intensive computation, you can build it in Javascript top to
            bottom, even down to the database level if you use JSON storage object DB like MongoDB.
    b)      Crawlers receive a full-rendered HTML response, which is far more SEO friendly rather than a single page
            application or a websockets app run on top of Node.js.

    Cons:

    a)       Any intensive CPU computation will block node.js responsiveness, so a threaded platform is a better approach.
    b)      Using relational database with Node.js is considered less favourable

    19)   How Node.js overcomes the problem of blocking of I/O operations?

    Node.js solves this problem by putting the event based model at its core, using an event loop instead of threads.

    20)   What is the difference between Node.js vs Ajax?

    The difference between Node.js and Ajax is that, Ajax (short for Asynchronous Javascript and XML) is a client side
    technology, often used for updating the contents of the page without refreshing it. While,Node.js is Server Side
    Javascript, used for developing server software. Node.js does not execute in the browser but by the server.

    21)   What are the Challenges with Node.js ?

    Emphasizing on the technical side, it’s a bit of challenge in Node.js to have one process with one thread to scale
    up on multi core server.

    22)    What does it mean “non-blocking” in node.js?

    In node.js “non-blocking” means that its IO is non-blocking.  Node uses “libuv” to handle its IO in a
    platform-agnostic way. On windows, it uses completion ports for unix it uses epoll or kqueue etc. So, it makes a
    non-blocking request and upon a request, it queues it within the event loop which call the JavaScript ‘callback’ on
    the main JavaScript thread.

    23)   What is the command that is used in node.js to import external libraries?

    Command “require” is used for importing external libraries, for example, “var http=require (“http”)”.  This will
    load the http library and the single exported object through the http variable.

    24)   Mention the framework most commonly used in node.js?

    “Express” is the most common framework used in node.js

    25)   What is ‘Callback’ in node.js?

    Callback function is used in node.js to deal with multiple requests made to the server. Like if you have a large
    file which is going to take a long time for a server to read and if you don’t want a server to get engage in reading
    that large file while dealing with other requests, call back function is used. Call back function allows the server
    to deal with pending request first and call a function when it is finished.
