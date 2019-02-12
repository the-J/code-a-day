#### BACKEND ARCHITECTURE
* ###### SaaS - Software-as-a-Service
     Cloud application services. In today's digital world, Software-as-a-Service (SaaS) generally refers to a new 
     and alternative way of accessing
     software, as opposed to more traditional methods of access. Whereas in the past software would generally be
     purchased outright and loaded onto a device, SaaS normally refers to a subscription based model where the software
     is hosted in the cloud and accessed via the internet. There are a number of benefits of this to consumers, whether
     that is individuals using software for private purposes, or businesses.

     Common SaaS Use-Case: Replaces traditional on-device software
        
     SaaS Examples: Office 365, Google Apps, and Netflix ,Google Apps, Salesforce, Workday, Concur, Citrix 
     GoToMeeting, Cisco WebEx.

* ###### BaaS - Backend as a service
     Is an approach to cloud computing that provides a backend for applications (mostly mobile). They provide an API and tools for different computer languages to integrate with their backend. They also provide additional services like storage, Analytics, Push notifications, dashboards, social integration.
     Somehow it is similar to SaaS, but BaaS is mostly targeted at developers, where SaaS is targeted at end users.
     Parse is the most known BaaS and it was acquired by Facebook on 2013. Provides integration with most computer languages and covers all services needed by an application. They offer a free tier for small apps.
     Another popular BaaS is Firebase, acquired recently by Google. It is targeted mostly at realtime apps and also offers storage.
     BaaS is highly recommended if the solution has to be developed very fast with a stable backend. We use Parse for our projects when the application requirements need such a solution.

* ###### PaaS - Platform as a Service
     Cloud platform services. Provides you computing platforms which typically includes operating system, 
     programming language execution
     environment, database, web server etc.

     Examples: AWS Elastic Beanstalk, Windows Azure, Heroku, Force.com, Google App Engine, Apache Stratos.

* ###### IaaS Infrastructure-as-a-Service
    Cloud infrastructure services. Provides you the computing infrastructure, physical or (quite often) virtual 
    machines and other resources like virtual-machine disk image library, block and file-based storage, 
    firewalls, load balancers, IP addresses, virtual
    local area networks etc. Common IaaS Use-Case: Extends current data center infrastructure for temporary 
    workloads (e.g. increased Christmas holiday site traffic)

    Examples: Amazon EC2, Windows Azure, Rackspace, Google Compute Engine.

* ###### Serverless Computing
     Serverless computing is a cloud-computing execution model in which the cloud provider acts as the server,
     dynamically managing the allocation of machine resources. Pricing is based on the actual amount of resources
     consumed by an application, rather than on pre-purchased units of capacity.

#### GENERAL javaScript

##### About language:
```
JS, is a high-level, interpreted programming language that conforms to the ECMAScript specification. 
It is a language that is also characterized as dynamic, weakly typed, prototype-based and multi-paradigm. 
```
Multi-paradigm: object-oriented (prototype-based), imperative, functional, event-driven,  high-level, interpreted, 
dynamic, weakly typed, single-threaded, non-blocking, asynchronous, concurrent language.  

- single-threaded
    TL; DR Your JavaScript code is single-threaded in the same context, but all other stuff which is done by browser
    (AJAX request, rendering, event triggers etc.) is not.

    The execution of any JavaScript program can be divided into two separate parts:

    - The Initial execution of the code that takes place during page load
    - The subsequent event-handling

    The largest waste with current programming technologies comes from waiting for I/O to complete.There are several
    ways in which one can deal with the performance impact (from Sam Rushing):

    *  synchronous: you handle one request at a time, each in turn. pros: simple cons: any one request can hold up 
    all the other requests

    * fork a new process: you start a new process to handle each request. pros: easy cons: does not scale well, 
    hundreds of connections means hundreds of processes. fork() is the Unix programmer’s hammer. Because it’s 
    available, every problem looks like a nail. It’s usually overkill

    * threads: start a new thread to handle each request. pros: easy, and kinder to the kernel than using fork, since
     threads usually have much less overhead cons: your machine may not have threads, and threaded programming can 
     get very complicated very fast, with worries about controlling access to shared resources.

    Node.js keeps a single thread for your code…

    It really is a single thread running: you can’t do any parallel code execution; doing a “sleep” for example will
    block the server for one second:

    ```js
    while(new Date().getTime() < now + 1000) {
        // do nothing
    }
    ```

    So while that code is running, node.js will not respond to any other requests from clients, since it only has one
    thread for executing your code. Or if you would have some CPU -intensive code, say, for resizing images, that would
    still block all other requests.

    Well, arguably its not true that Javascript is single threaded if you see from the under hood working of browser JS
    to your JS code, there are thread pools. By single threaded what they mean(browser end) is your JS runs into a
    single threaded event loop. There is one single thread that handles your event loop. Under your JS, the browser code
    is running multiple threads to capture events and trigger handlers, when they capture any new event, they push it
    on an event queue and then that event loop, in which your code is running gets triggered and it handles the request
    e.g. It performs an action which can be to show a DIV, which again triggers the Browser to print it, which in turn
    runs a thread to do it(from the thread pool).

- non-blocking
    The language's concurrency model describes the event loop as non-blocking: program input/output is
    performed using events and callback functions. This means, for instance, that JavaScript can process a mouse click
    while waiting for a database query to return information.

- concurrent
    In computer science, concurrency refers to the ability of different parts or units of a program, algorithm, or
    problem to be executed out-of-order or in partial order, without affecting the final outcome. In more technical 
    terms, concurrency refers to the decomposability property of a program, algorithm, or problem into 
    order-independent or partially-ordered components or units.

- multi-paradigm
    JavaScript supports event-driven, functional, and imperative (including object-oriented and
    prototype-based) programming styles. It has an API for working with text, arrays, dates, regular expressions, and
    basic manipulation of the DOM, but the language itself does not include any I/O, such as networking, storage, or
    graphics facilities, relying for these upon the host environment in which it is embedded.

- asynchronous
    JavaScript code is executed in an event loop, on a single thread. The reality is that all JavaScript executes
    synchronously - it's the event loop that allows you to queue up an action that won't take place until the loop is
    available some time after the code that queued the action has finished executing. So code is said to execute
    asynchronously when it is queued to run sometime after the event loop is available.

    ```js
    request('http://www.google.co.in', function(error, response, body) {
      console.log(body);
    });
       
    console.log('Done!');
    ```

    The request function is executed, passing an anonymous function as a callback to execute when a response is 
    available sometime in the future. “Done!” is immediately output to the console. Sometime in the future, the 
    response comes back and our callback is executed, outputting its body to the console.

    JavaScript is a single threaded concurrent language. It has a single call stack. Whenever an event is fired it gets
    queued up in the message Queue. Event Loop checks keeps on checking if there is an event present in the Queue it
    processes it and removes the event from the queue. So as long as there are events in the Queue, the event loop is
    active.

    What happens when there there exists a few events in Queue already? The event gets lined up waiting for its turn.
    But How does the piece of code knows that the event has been processed at a point of time? Now here comes the
    concept of Callbacks. You just don't queue the event in Message Queue but a function which gets called when the
    event has been processed. This function is called callback.

    So, when does an event is queued up? In web browsers, messages are added any time an event occurs and there is an
    event listener attached to it. If there is no listener, the event is lost. So a click on an element with a click
    event handler will add a message--likewise with any other event.

    ex
    Synchronous code

    In synchronous programs, if you have two lines of code (L1 followed by L2), then L2 cannot begin running until L1
    has finished executing. You can imagine this as if you are in a line of people waiting to buy train tickets. You 
    can't begin to buy a train ticket until all the people in front of you have finished buying theirs. Similarly, 
    the people behind you can't start buying their tickets until you have bought yours.

    Asynchronous code

    In asynchronous programs, you can have two lines of code (L1 followed by L2), where L1 schedules some task to be 
    run in the future, but L2 runs before that task completes. You can imagine as if you are eating at a sit-down 
    restaurant. Other people order their food. You can also order your food. You don't have to wait for them to  
    receive their food and finish eating before you order. Similarly, other people don't have to wait for you to get 
    your food and finish eating before they can order. Everybody will get their food as soon as it is finished cooking.

    The sequence in which people receive their food is often correlated with the sequence in which they ordered food,
    but these sequences do not always have to be identical. For example, if you order a steak, and then I order a glass
    of water, I will likely receive my order first, since it typically doesn't take as much time to serve a glass of
    water as it does to prepare and serve a steak.

    Note that asynchronous does not mean the same thing as concurrent or multi-threaded. JavaScript can have
    asynchronous code, but it is generally single-threaded. This is like a restaurant with a single worker who does all
    of the waiting and cooking. But if this worker works quickly enough and can switch between tasks efficiently 
    enough, then the restaurant seemingly has multiple workers.


##### What are prototypes?

Starting with basics, there are following data types in JavaScript:
* primitive 
    * undefined
    * number
    * string
    * boolean
* reference types
    * null
    * object

First five are primitive data types. These store a value of their type such as a boolean, and can be true or false.
The last “object” is a reference type which we can describe as a collection of key-value pairs (but it is much more).

In JavaScript, new objects are made using Object constructor function (```new Object() ``` or object literal {}) which 
provides generic
methods like toString() and valueOf().

Functions in JavaScript are special objects which can be “called”. We make them and by using the Function constructor
function (or function literal). The fact that these constructors are objects as well as function has always confused
me, much in the same way the chicken-egg riddle confuses everyone.

prototype: This is a special object which is assigned as property of any function you make in JavaScript. Let me be 
clear here, it is already present for any function you make, but not mandatory for internal functions provided by
JavaScript (and function returned by bind). ```This``` prototype is the same object that is pointed to by the of the a 
newly created object from that function (using new keyword).

#### What is API
Technically, API stands for Application Programming Interface.

An Application Programming Interface (API) is a set of functions, procedures, methods or classes used by computer
programs to request services from the operating system, software libraries or any other service providers running on
the computer. A computer programmer uses the API to make application programs.

Types of API include web services API like the Twitter API, which allows programs to use the API to receive updates
on tweets.

There are many types of APIs. One of the most common types of APIs are Web APIs; these APIs, otherwise known as Web
Services, provide an interface for web applications, or applications that need to connect to each other via the
Internet to communicate. There are tens of thousands of public APIs that can be used to do everything from checking
traffic and weather, to updating your social media status, or even to make payments.

There are further types of Web APIs such as
   * Simple Object Access Protocol (SOAP), Since Web protocols are installed and available for use by all major 
    operating system platforms, HTTP and XML provide an at-hand solution that allows programs running under different
    operating systems in a network to communicate with each other. SOAP specifies exactly how to encode an HTTP 
    header and an XML file so that a program in one computer can call a program in another computer and pass along 
    information. SOAP also specifies how the called program can return a response. Despite its frequent pairing with 
    HTTP, SOAP supports other transport protocols as well.
    
   * SOAP defines the XML-based message format that Web service-enabled applications use to communicate and
    inter-operate with each other over the Web. The heterogeneous environment of the Web demands that
    applications support a common data encoding protocol and message format. SOAP is a standard for encoding
    messages in XML that invoke functions in other applications.
    
   * Remote Procedure Call (RPC) 
    In distributed computing, a remote procedure call (RPC) is when a computer program causes a procedure 
    (subroutine) to execute in a different address space (commonly on another computer on a shared network), which is
    coded as if it were a normal (local) procedure call, without the programmer explicitly coding the details for the remote interaction. That is, the programmer writes essentially the same code whether the subroutine is local to the executing program, or remote.[1] This is a form of client–server interaction (caller is client, executor is server), typically implemented via a request–response message-passing system. In the object-oriented programming paradigm, RPC calls are represented by remote method invocation (RMI). 
        
   * Representational State Transfer (REST).
   REST is the underlying architectural principle of the web. The amazing thing about the web is the fact that
   clients (browsers) and servers can interact in complex ways without the client knowing anything beforehand
   about the server and the resources it hosts. The key constraint is that the server and client must both
   agree on the media used, which in the case of the web is HTML.

   An API that adheres to the principles of REST does not require the client to know anything about the
   structure of the API. Rather, the server needs to provide whatever information the client needs to interact
   with the service. An HTML form is an example of this: The server specifies the location of the resource and
   the required fields. The browser doesn't know in advance where to submit the information, and it doesn't
   know in advance what information to submit. Both forms of information are entirely supplied by the server.

   So, how does this apply to HTTP, and how can it be implemented in practice? HTTP is oriented around verbs
   and resources. The two verbs in mainstream usage are GET and POST, which I think everyone will recognize.
   However, the HTTP standard defines several others such as PUT and DELETE. These verbs are then applied to
   resources, according to the instructions provided by the server.

#### PROGRAMMING PRINCIPLES

* SOLID, Single responsibility principle, a class should have only a single responsibility (i.e. changes to only one 
part of  the software's specification should be able to affect the specification of the class).

* Open/closed principle "software entities … should be open for extension, but closed for modification."

* Liskov substitution principle - "objects in a program should be replaceable with instances of their subtypes without 
altering the correctness of that program."

* Interface segregation principle - "many client-specific interfaces are better than one general-purpose interface."

* Dependency inversion principle - one should "depend upon abstractions, [not] concretions."

* DRY - Don't Repeat Yourself

#### What is CRUD
CRUD stands for Create, Read, Update and Delete. Which are the basic operations that a simple web app would be 
designed to achieve.

#### What is fetch()

The Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as
requests and responses. It also provides a global fetch() method that provides an easy, logical way to fetch
resources asynchronously across the network.
This kind of functionality was previously achieved using XMLHttpRequest. Fetch provides a better alternative that
    can be easily used by other technologies such as Service Workers. Fetch also provides a single logical place to
    define other HTTP-related concepts such as CORS and extensions to HTTP.

The fetch specification differs from jQuery.ajax() in two main ways:

The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
Instead, it will resolve normally (with ok status set to false), and it will only reject on network failure or if 
anything prevented the request from completing. By default, fetch won't send or receive any cookies from the server, 
resulting in unauthenticated requests if the site relies on maintaining a user session (to send cookies, the 
credentials init option must be set). Since Aug 25, 2017. The spec changed the default credentials policy to 
same-origin. Firefox changed since 61.0b13.

A basic fetch request is really simple to set up. Have a look at the following code:

```js
fetch('http://example.com/movies.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(JSON.stringify(myJson));
    });
```

The fetch() method can optionally accept a second parameter, an init object that allows you to control a number of 
different settings:

```js
// Example POST method implementation:
postData(`http://example.com/answer`, {answer: 42})
    // JSON-string from `response.json()` call
    .then(data => console.log(JSON.stringify(data)))
    .catch(error => console.error(error));

function postData(url = ``, data = {}) {
    // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8", // "application/x-www-form-urlencoded"
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses response to JSON
};
```
    

#### WHAT IS throw
The throw statement throws a user-defined exception. Execution of the current function will stop (the statements
after throw won't be executed), and control will be passed to the first catch block in the call stack. If no catch
block exists among caller functions, the program will terminate.

```js

function getRectArea(width, height) {
    if (isNaN(width) || isNaN(height)) {
        throw "Parameter is not a number!";
    }
}

try {
    getRectArea(3, 'A');
}
catch(exception) {
    console.log(exception); // expected output: "Parameter is not a number!"
}
```
ex
You can specify an object when you throw an exception. You can then reference the object's properties in the catch 
block. The following example creates an object of type UserException and uses it in a throw statement.

```js
function UserException(message) {
    this.message = message;
    this.name = 'UserException';
}

function getMonthName(mo) {
    mo = mo - 1; // Adjust month number for array index (1 = Jan, 12 = Dec)
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
       
    if (months[mo] !== undefined) {
        return months[mo];
    } 
    else {
        throw new UserException('Invalid Month No');
    }
}

try {
    // statements to try
    var myMonth = 15; // 15 is out of bound to raise the exception
    var monthName = getMonthName(myMonth);
} catch (e) {
    monthName = 'unknown';
    console.log(e.message, e.name); // pass exception object to err handler
}
```


#### SOFTWARE ARCHITECTURE PATTERN

##### Model View Controller

The Model View Controller (commonly known as MVC) framework helps you to build applications that are easier to test and maintain. It comprises of three major components, namely:

* Model -- this is the layer that represents the application's data
* View -- this represents the presentation or the user interface layer
* Controller -- this layer typically contains the business logic of your application

The primary objective of the MVC design pattern is separation of concerns to facilitate testability. The Model View
Controller design pattern enables you to isolate the concerns and makes your application's code easier to test and
maintain. In a typical MVC design, the request first arrives at the controller which binds the model with the
corresponding view. In the MVC design pattern, the view and the controller makes use of strategy design and the view
and the model are synchronized using the observer design. Hence, we may say that MVC is a compound pattern. The
controller and the view are loosely coupled and one controller can be used by multiple views. The view subscribes
to the changes in the model.

- The Model

    The model defines what data the app should contain. If the state of this data changes, then the model will usually
    notify the view (so the display can change as needed) and sometimes the controller (if different logic is needed to
    control the updated view).

    Going back to our shopping list app, the model would specify what data the list items should contain — item, price,
    etc. — and what list items are already present.

- The View

    The view defines how the app's data should be displayed.

    In our shopping list app, the view would define how the list is presented to the user, and receive the data to
    display from the model.

- The Controller

    The controller contains logic that updates the model and/or view in response to input from the users of the app.

    So for example, our shopping list could have input forms and buttons that allow us to add or delete items. These
    actions require the model to be updated, so the input is sent to the controller, which then manipulates the model as
     appropriate, which then sends updated data to the view.

    You might however also want to just update the view to display the data in a different format, e.g., change the item
    order to alphabetical, or lowest to highest price. In this case the controller could handle this directly without
    needing to update the model.


##### Model View Presenter

The MVP (Model View Presenter) design pattern also comprises of three components - the model, the view and the
presenter. In the MVP design pattern, the Controller (in MVC) is replaced by the Presenter. Unlike the MVC design
pattern, the Presenter refers back to the view due to which mocking of the view is easier and unit testing of
applications that leverage the MVP design pattern over the MVC design pattern are much easier. In the MVP design
pattern, the presenter manipulates the model and also updates the view. There are two variations of this design.
These include the following.

   * Passive View -- in this strategy, the view is not aware of the model and the presenter updates the view to 
    reflect the changes in the model.
    * Supervising Controller -- in this strategy, the view interacts with the model directly to bind data to the data 
    controls without the intervention of the presenter. The presenter is responsible for updating the model. It 
    manipulates the view only if needed -- if you need a complex user interface logic to be executed.

##### JS TRICKS / WTF
```js
>''== false
true

> null == false
false

> Number(true)
1

> +true
1

> true + true
2

> !!("0" && {})
true

> !!(0 && {})
false

> 0 == "0"
true

> null == undefined
true

>  99999999999999999999
100000000000000000000

>  '2' + 1
'21'

> '2' - 1
1

> '2' - -1
3

> Nan instanceof Number
false

> isNan(null)
false

> +null
0

>isNaN(null) == 0
true
''''
