# Database Design Reference — MikaMiku

## The Database Mindset

The database is the single source of truth for your application. A poorly
designed database will cripple performance, corrupt data, and make every
feature harder to build. A well-designed database makes features trivial
to implement and queries naturally efficient.

Design the database before writing application code. Changing a database
schema after data exists is orders of magnitude harder than getting it
right the first time.

---

## Normalization

Normalization eliminates redundancy and prevents anomalies. The normal forms
build upon each other.

First Normal Form requires atomic values in every column. No repeating groups,
no arrays, no nested structures in cells. Each cell contains a single value
of a single type.

Second Normal Form requires First Normal Form plus no partial dependencies.
Every non-key attribute must depend on the entire primary key, not just a
part of it. This matters only for composite keys.

Third Normal Form requires Second Normal Form plus no transitive
dependencies. Every non-key attribute must depend directly on the primary
key, not on another non-key attribute.

Boyce-Codd Normal Form is a stricter variant of Third Normal Form. Every
determinant must be a candidate key.

Denormalization is the intentional violation of normal forms for
performance. Denormalize only after profiling proves that normalized queries
are too slow. Document every denormalization decision with the measured
performance improvement.

---

## Indexing Strategy

### Primary Keys
Every table must have a primary key. Use surrogate keys (auto-incrementing
integers or UUIDs) rather than natural keys. Natural keys change over time
and complicate foreign key relationships.

UUIDs prevent enumeration attacks and simplify distributed systems. Auto
incrementing integers are smaller, faster to index, and more human-readable.
Choose based on your threat model and architecture.

### Foreign Keys
Define foreign key constraints at the database level, not just in
application code. Foreign keys enforce referential integrity and prevent
orphaned records. They also enable the query optimizer to generate better
plans.

### Covering Indexes
A covering index includes all columns needed to satisfy a query. The
database can answer the query entirely from the index without touching the
table. This eliminates random I/O and dramatically improves performance.

### Composite Indexes
Order columns in a composite index by selectivity: the most selective
column first. If the first column is not used in the query's where clause,
the index may not be used at all.

### Partial Indexes
Index only a subset of rows that match a predicate. A partial index on
active users is smaller and faster than an index on all users when queries
almost always filter for active status.

### Index Maintenance
Monitor index usage statistics. Drop unused indexes. They consume storage
and slow down writes. Rebuild fragmented indexes periodically.

---

## Query Optimization

### Explain Plans
Always examine the query execution plan before deploying a query to
production. The explain plan reveals whether the database uses indexes,
performs full table scans, or sorts data unnecessarily.

### N-Plus-One Problem
The N-plus-one problem occurs when code queries a list of records, then
queries related data for each record individually. This generates N plus 1
queries instead of one joined query or one batched query.

Prevent it by eager loading related data, using joins, or batching
subqueries.

### Pagination
Offset-based pagination becomes slow for large offsets because the database
must scan and discard all preceding rows. Cursor-based pagination uses the
last seen value as a filter, which is efficient at any scale.

Use offset pagination for small datasets and user-facing page numbers. Use
cursor pagination for large datasets and infinite scroll.

### Query Complexity
Break complex queries into simpler steps using Common Table Expressions.
CTEs improve readability and allow the optimizer to materialize intermediate
results.

Avoid correlated subqueries in the select clause. They execute once per row
and destroy performance.

---

## Transaction Design

### ACID Properties
Atomicity: A transaction is all or nothing. If any part fails, the entire
transaction rolls back.

Consistency: A transaction brings the database from one valid state to
another. Constraints, triggers, and cascades enforce consistency.

Isolation: Concurrent transactions do not interfere with each other. The
database uses locking or multiversion concurrency control to achieve
isolation.

Durability: Once committed, a transaction's effects survive system crashes.
The write-ahead log ensures durability.

### Isolation Levels
Read Uncommitted allows dirty reads. Never use this in production.

Read Committed prevents dirty reads but allows non-repeatable reads. This is
the default in most databases and is appropriate for most applications.

Repeatable Read prevents non-repeatable reads but allows phantom reads.

Serializable prevents all concurrency anomalies including phantom reads.
It is the safest but slowest level. Use only when absolute consistency is
required.

### Transaction Scope
Keep transactions as short as possible. Long transactions hold locks and
prevent garbage collection of old row versions. Do not perform network calls,
file I/O, or user interaction inside a transaction.

---

## Data Types

Choose the smallest data type that can represent the full range of values.
Smaller types use less storage, fit more rows in memory, and transfer faster
over the network.

Use fixed-precision types for money. Floating point types introduce rounding
errors that accumulate. Store monetary values as integers representing the
smallest currency unit.

Use appropriate date and time types. Store timestamps in UTC. Convert to
local time only at the presentation layer. Use date types for dates, not
timestamps truncated to midnight.

Use enumerated types sparingly. They are difficult to modify after creation.
A lookup table is often more flexible.

Use JSON types for truly schemaless data, not as an excuse to avoid schema
design. Index JSON fields that are frequently queried.

---

## Migration Strategy

Every schema change must be versioned, reversible, and tested. Use a
migration tool that records which migrations have been applied.

Migrations must be backward compatible during deployment. Deploy the schema
change first, then deploy the application code that uses it. This prevents
downtime during rolling deployments.

Never drop a column or table that the current application version uses.
Mark it as deprecated, deploy a new application version that does not use
it, then drop it in a subsequent migration.

Never rename a column in place. Add a new column, migrate data, update
code, then drop the old column.

Test migrations against a copy of production data. Migrations that run
instantly on an empty database may take hours on production data.
