# Testing Strategies Reference — MikaMiku

## The Testing Mindset

Testing is not a phase that happens after development. Testing is an integral
part of development. Every feature must be designed to be testable. Every bug
must be reproduced as a test before it is fixed. Every test must fail before
the code is written, and pass after.

This is test-driven development in spirit, even when not followed strictly.
The goal is confidence. A codebase with comprehensive tests can be refactored
fearlessly. A codebase without tests cannot be touched without fear.

---

## The Testing Pyramid

The testing pyramid describes the ideal distribution of test types:

Unit tests form the base. They are numerous, fast, and isolated. They test
individual functions and classes in isolation. A healthy project has hundreds
or thousands of unit tests. They should execute in seconds.

Integration tests form the middle layer. They are fewer in number and slower.
They test how components interact with each other and with external systems such
as databases and APIs. A healthy project has dozens or hundreds of integration
tests. They should execute in minutes.

End-to-end tests form the peak. They are the fewest in number and the slowest.
They test complete user flows through the application as a real user would
experience them. A healthy project has a handful of end-to-end tests. They may
take hours to execute fully.

The pyramid shape is important. Projects with too many end-to-end tests and too
few unit tests are slow, brittle, and expensive to maintain.

---

## Unit Testing Principles

### The FIRST Principles
Fast: Unit tests must execute quickly. If they are slow, developers will not
run them frequently. Target execution under 10 milliseconds per test.

Isolated: Each test must be independent. Tests must not share state, depend on
execution order, or require a specific database state. Use setup and teardown
methods to ensure cleanliness.

Repeatable: Tests must produce the same result every time, regardless of
environment, time of day, or random number generators. Mock time, randomness,
and external dependencies.

Self-validating: Tests must have a boolean pass or fail result. A test that
requires manual inspection of output is not a unit test.

Timely: Tests should be written before or alongside the code they test. Writing
tests after the code is complete often leads to untestable designs.

### Test Structure: Arrange, Act, Assert
Every unit test should follow this three-part structure:

Arrange: Set up the test data, create mocks, configure the system under test.
This should be the largest section of the test.

Act: Execute the single action being tested. This should be one line of code.
If the act section is long, the system under test has too many responsibilities.

Assert: Verify the outcome. Use specific assertions rather than generic ones.
Assert on exact values, not just non-null or non-empty checks.

### Naming Conventions
Test names should describe behavior, not implementation. A good test name
answers the question: what should happen under what conditions?

Good: should_return_error_when_email_is_invalid
Good: calculates_total_price_including_tax
Bad: test_calculate_price
Bad: test_method_1

### Mocking Guidelines
Mock external dependencies, not internal logic. Mock databases, APIs, file
systems, and clocks. Do not mock the system under test itself.

Use dependency injection to make mocking possible. If a class instantiates
its own dependencies, it cannot be unit tested without hacks.

Verify interactions with mocks only when the interaction itself is the
behavior being tested. Do not verify every method call as a matter of habit.

---

## Integration Testing

### Database Integration Tests
Use a real database, not an in-memory fake. In-memory databases have different
behavior from production databases. Use testcontainers to spin up real database
instances in Docker containers.

Each test should run in a transaction that is rolled back at the end. This
ensures test isolation without the overhead of database recreation.

Seed test data explicitly per test. Do not rely on global seed data that may
change and break unrelated tests.

### API Integration Tests
Test the API contract, not the implementation. Send HTTP requests and assert on
HTTP responses. The test should not know how the endpoint is implemented.

Test happy paths, error paths, and edge cases. Send malformed JSON, missing
fields, oversized payloads, and invalid authentication.

Use a dedicated test environment or ephemeral infrastructure. Never run
integration tests against production.

### External Service Integration Tests
Use contract testing to verify that your application and external services
agree on API contracts. Tools like Pact enable consumer-driven contract testing.

Record and replay external service interactions for deterministic tests.
Tools like VCR or WireMock capture real responses and replay them during tests.

---

## End-to-End Testing

### Browser Automation
Use Playwright, Cypress, or Selenium to automate real browser interactions.
Playwright is recommended for modern applications due to its speed, reliability,
and cross-browser support.

Test critical user journeys: sign up, log in, complete purchase, create content,
search, navigate. Do not test every possible interaction. Focus on the paths
that generate revenue or represent core value.

Use page object models to separate test logic from page structure. When the UI
changes, only the page object needs updating, not every test.

### Mobile End-to-End Testing
Use Appium or native frameworks like XCUITest and Espresso. Test on real
devices or high-fidelity emulators. Cloud device labs provide access to a wide
range of devices and OS versions.

Test touch gestures, device rotation, backgrounding and foregrounding, push
notifications, and deep linking.

### Performance Testing
Load testing verifies that the system handles expected traffic. Stress testing
finds the breaking point. Spike testing verifies recovery from sudden traffic
surges. Soak testing verifies stability over extended periods.

Use tools like k6, Gatling, or Locust for load testing. Define success
criteria before running tests: maximum response time, minimum throughput,
maximum error rate.

---

## Security Testing

### Static Application Security Testing
Run SAST tools on every commit. They analyze source code for vulnerabilities
without executing the application. Examples include SonarQube, Semgrep, and
CodeQL.

### Dynamic Application Security Testing
Run DAST tools against running applications. They probe the application with
malicious inputs to find runtime vulnerabilities. Examples include OWASP ZAP
and Burp Suite.

### Dependency Scanning
Scan all dependencies for known vulnerabilities on every build. Tools include
Snyk, OWASP Dependency-Check, npm audit, and cargo audit.

### Fuzzing
Provide random, malformed, or unexpected inputs to find crashes and
vulnerabilities. Fuzzing is particularly effective for parsers, serializers,
and protocol handlers.

### Penetration Testing
Engage external security professionals to attempt to breach the application.
Penetration testing should be performed annually and after major architecture
changes.

---

## Test Coverage

Coverage is a metric, not a goal. 100 percent coverage does not guarantee
quality. 50 percent coverage with well-designed tests may be more valuable
than 100 percent coverage with trivial tests.

However, low coverage is a reliable indicator of insufficient testing. Aim for:
- Critical business logic: 90 percent or higher
- General business logic: 80 percent or higher
- Infrastructure and plumbing: 60 percent or higher
- UI components: 70 percent or higher
- Generated code: 0 percent (exclude from coverage)

Track coverage trends over time. Declining coverage is a warning sign that
quality is slipping.

---

## Continuous Testing

Tests must run automatically on every code change. The Build-Test-Loop
mandates this.

Unit tests run on every commit. Integration tests run on every pull request.
End-to-end tests run on every merge to the main branch. Security scans run
on every build.

Test failures must block deployment. A failing test is a stop signal, not a
warning. Fix the test or fix the code, but do not proceed with deployment.

Flaky tests must be fixed or removed immediately. A flaky test that passes
sometimes and fails sometimes destroys trust in the entire test suite.
