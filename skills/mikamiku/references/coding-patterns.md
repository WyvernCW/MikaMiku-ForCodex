# Coding Patterns Reference — MikaMiku

## The Patterns Mindset

Design patterns are not recipes to be followed blindly. They are solutions to
recurring problems, refined by decades of engineering practice. Know the
patterns. Understand when to apply them. Understand when not to apply them.
Over-engineering is as harmful as under-engineering.

---

## Creational Patterns

### Factory Method
When a class cannot anticipate the type of objects it must create, delegate
the instantiation to subclasses. The factory method defines an interface for
creating an object, but lets subclasses decide which class to instantiate.

Use when: The exact type of object needed depends on runtime conditions or
configuration. You want to decouple object creation from object usage.

Avoid when: The object type is always known at compile time. The added
abstraction provides no benefit.

### Abstract Factory
Provide an interface for creating families of related or dependent objects
without specifying their concrete classes. A GUI toolkit might have an abstract
factory for Windows widgets and another for Mac widgets.

Use when: The system must be independent of how its products are created,
composed, and represented. The system must be configured with one of
multiple families of products.

Avoid when: The product families are unlikely to change. The abstraction
adds unnecessary complexity.

### Builder
Separate the construction of a complex object from its representation, allowing
the same construction process to create different representations. A query
builder that constructs SQL through method chaining is a common example.

Use when: The object has many optional parameters or complex construction
steps. You want to avoid telescoping constructors with dozens of parameters.

Avoid when: The object is simple with few parameters. A plain constructor
is clearer.

### Singleton
Ensure a class has only one instance and provide a global point of access to
it. The singleton pattern is controversial because global state is dangerous.

Use when: Exactly one instance must control shared resources such as database
connection pools, thread pools, or configuration caches.

Avoid when: The singleton introduces hidden dependencies that make testing
difficult. Consider dependency injection instead.

### Prototype
Specify the kinds of objects to create using a prototypical instance, and
create new objects by copying this prototype. Useful when object creation is
expensive and similar objects are needed.

Use when: Classes to instantiate are specified at runtime. Avoiding a
hierarchy of factories is desirable.

Avoid when: Object creation is cheap and straightforward. Deep copying complex
objects is error-prone.

---

## Structural Patterns

### Adapter
Convert the interface of a class into another interface clients expect. An
adapter lets classes work together that could not otherwise because of
incompatible interfaces. Wrapping a third-party API to match your internal
interface is a common use.

Use when: You want to use an existing class whose interface does not match
the one you need. You want to create a reusable class that cooperates with
unrelated classes.

### Bridge
Decouple an abstraction from its implementation so that the two can vary
independently. A drawing application might have a shape abstraction and a
rendering implementation that can be vector or raster.

Use when: You want to avoid a permanent binding between an abstraction and
its implementation. Both the abstraction and implementation should be
extensible by subclassing.

### Composite
Compose objects into tree structures to represent part-whole hierarchies.
The composite lets clients treat individual objects and compositions of
objects uniformly. File systems and organization charts are natural composites.

Use when: You want to represent hierarchies of objects. You want clients to
ignore the difference between compositions of objects and individual objects.

### Decorator
Attach additional responsibilities to an object dynamically. Decorators
provide a flexible alternative to subclassing for extending functionality.
Middleware in web frameworks is a decorator pattern.

Use when: You want to add responsibilities to individual objects dynamically
and transparently. Extension by subclassing is impractical.

### Facade
Provide a unified interface to a set of interfaces in a subsystem. A facade
defines a higher-level interface that makes the subsystem easier to use.

Use when: You want to provide a simple interface to a complex subsystem. There
are many dependencies between clients and the implementation classes.

### Flyweight
Use sharing to support large numbers of fine-grained objects efficiently.
A text editor might share flyweight character objects to avoid creating
millions of identical character instances.

Use when: An application uses a large number of objects. Storage costs are
high because of the sheer quantity of objects.

### Proxy
Provide a surrogate or placeholder for another object to control access to
it. Virtual proxies create expensive objects on demand. Protection proxies
control access permissions. Remote proxies represent objects in different
address spaces.

Use when: You need a more versatile or sophisticated reference to an object
than a simple pointer.

---

## Behavioral Patterns

### Chain of Responsibility
Avoid coupling the sender of a request to its receiver by giving more than
one object a chance to handle the request. Chain the receiving objects and
pass the request along the chain until an object handles it. Express
middleware is a chain of responsibility.

Use when: More than one object may handle a request, and the handler is not
known a priori. You want to issue a request to one of several objects
without specifying the receiver explicitly.

### Command
Encapsulate a request as an object, thereby letting you parameterize clients
with different requests, queue or log requests, and support undoable
operations. The command pattern is the foundation of job queues and event
sourcing.

Use when: You want to parameterize objects by an action to perform. You want
to queue, specify, and execute requests at different times.

### Iterator
Provide a way to access the elements of an aggregate object sequentially
without exposing its underlying representation. Most modern languages provide
built-in iterator protocols.

Use when: You want to access an aggregate object's contents without exposing
its internal representation. You want to support multiple traversals of
aggregate objects.

### Mediator
Define an object that encapsulates how a set of objects interact. The mediator
promotes loose coupling by keeping objects from referring to each other
explicitly. Event buses and message brokers are mediators.

Use when: A set of objects communicate in well-defined but complex ways. The
resulting interdependencies are unstructured and difficult to understand.

### Memento
Capture and externalize an object's internal state so that the object can be
restored to this state later. Undo functionality in text editors uses the
memento pattern.

Use when: A snapshot of an object's state must be saved so that it can be
restored later. Direct interface to obtaining the state would expose
implementation details.

### Observer
Define a one-to-many dependency between objects so that when one object
changes state, all its dependents are notified and updated automatically.
Reactive programming and pub-sub systems are built on the observer pattern.

Use when: A change to one object requires changing others, and you do not
know how many objects need to change. An object should be able to notify
other objects without making assumptions about who those objects are.

### State
Allow an object to alter its behavior when its internal state changes. The
object will appear to change its class. A TCP connection that behaves
differently when closed, listening, or established uses the state pattern.

Use when: An object's behavior depends on its state, and it must change its
behavior at runtime depending on that state. Operations have large multipart
conditional statements that depend on the object's state.

### Strategy
Define a family of algorithms, encapsulate each one, and make them
interchangeable. Strategy lets the algorithm vary independently from clients
that use it. Sorting algorithms chosen at runtime are a classic example.

Use when: Many related classes differ only in their behavior. You need
different variants of an algorithm. An algorithm uses data that clients
should not know about.

### Template Method
Define the skeleton of an algorithm in an operation, deferring some steps to
subclasses. The template method lets subclasses redefine certain steps of an
algorithm without changing the algorithm's structure.

Use when: You want to implement the invariant parts of an algorithm once and
leave it up to subclasses to implement the behavior that can vary.

### Visitor
Represent an operation to be performed on the elements of an object
structure. Visitor lets you define a new operation without changing the
classes of the elements on which it operates. AST traversal in compilers
uses the visitor pattern.

Use when: An object structure contains many classes with differing interfaces,
and you want to perform operations on these objects that depend on their
concrete classes.

---

## Concurrency Patterns

### Producer-Consumer
One or more producer threads generate data and place it into a buffer. One or
more consumer threads remove data from the buffer and process it. The buffer
coordinates between producers and consumers.

### Reader-Writer
Multiple reader threads can access shared data simultaneously, but writer
threads require exclusive access. This pattern improves read-heavy workloads.

### Thread Pool
Create a pool of worker threads that wait for tasks. Submit tasks to the pool
rather than creating a new thread for each task. This reduces thread creation
overhead and limits resource consumption.

### Futures and Promises
Represent the result of an asynchronous computation. The future is a
read-only handle to the result. The promise is a write-only handle that
fulfills the future. Async and await in modern languages are built on this
concept.

### Actor Model
Encapsulate state and behavior in actors that communicate exclusively
through message passing. Actors process messages sequentially, eliminating
the need for locks within an actor. Akka and Erlang are built on the actor
model.

---

## Architectural Patterns

### Layered Architecture
Organize the system into horizontal layers, each with a specific
responsibility. Typical layers: presentation, business logic, data access.
Each layer depends only on the layer below it.

Use when: Building traditional enterprise applications with clear separation
of concerns. The team is familiar with this well-understood pattern.

### Hexagonal Architecture (Ports and Adapters)
Structure the application around a core domain with ports that define
interfaces and adapters that implement them. The core knows nothing about
external frameworks, databases, or user interfaces.

Use when: You want to isolate business logic from external concerns. You
anticipate changing databases, frameworks, or delivery mechanisms.

### Microservices
Decompose the application into small, independently deployable services that
communicate through lightweight protocols. Each service owns its data and
business capability.

Use when: Different parts of the system have different scaling requirements.
Teams are large and need independent deployment. The system has clear
bounded contexts.

Avoid when: The team is small. The system is simple. Network overhead and
operational complexity outweigh the benefits.

### Event-Driven Architecture
Components communicate by producing and consuming events. An event router
or message broker distributes events to interested consumers. This enables
loose coupling and scalability.

Use when: Components must react to changes in other components without tight
coupling. The system must scale by adding consumers independently.

### CQRS (Command Query Responsibility Segregation)
Separate read operations from write operations. Use different models for
reading and writing data. The read model can be optimized for queries while
the write model enforces business rules.

Use when: Read and write workloads have fundamentally different requirements.
The read model needs to be denormalized for performance while the write model
needs strict consistency.

Avoid when: The added complexity is not justified by the workload
characteristics. Most applications do not need CQRS.

### Event Sourcing
Store the state of the application as a sequence of events rather than as a
snapshot. The current state is derived by replaying events. This provides a
complete audit trail and enables temporal queries.

Use when: Audit requirements mandate complete history. The system needs to
reconstruct past states. Event replay is valuable for debugging or analytics.

Avoid when: Simple CRUD operations suffice. The complexity of event replay
and snapshotting is not justified.
