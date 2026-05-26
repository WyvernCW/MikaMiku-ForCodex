# Code Review Checklist — MikaMiku

## General Quality
- Code follows the project style guide and formatting standards.
- No dead code, unused imports, or unreachable branches.
- Comments explain why decisions were made, not what the code does.
- No magic numbers. All constants have meaningful names.
- Error handling covers all paths including edge cases and failures.
- No duplicate code. Repetition is extracted into reusable abstractions.

## Security
- No hardcoded secrets, API keys, passwords, or tokens in source code.
- No injection vulnerabilities: SQL, command, LDAP, NoSQL, or XPath.
- No cross-site scripting. All output is context-aware encoded.
- No cross-site request forgery. SameSite cookies and anti-CSRF tokens present.
- No server-side request forgery. URLs validated, internal IPs denied.
- No insecure deserialization. Whitelist classes, validate schemas.
- No race conditions. Atomic operations and proper locking used.
- Cryptography uses approved algorithms: AES-256-GCM, ChaCha20-Poly1305,
  Ed25519, Argon2id. No custom cryptography.
- Dependencies scanned for known vulnerabilities.
- Security headers present: HSTS, CSP, X-Frame-Options, X-Content-Type-Options.

## Performance
- No N-plus-one queries. Database queries are batched or joined.
- Algorithms are appropriate for the data size and access patterns.
- Memory usage is bounded and profiled.
- No unnecessary input-output or network calls.
- Caching strategy is defined where beneficial.
- Lazy loading is used for below-the-fold content.
- Bundle size is monitored and budgeted.

## Testing
- Unit tests cover the happy path.
- Unit tests cover error paths and failure modes.
- Edge cases are documented and tested.
- Integration tests cover external dependencies.
- No flaky tests. Tests are deterministic and isolated.
- Test coverage meets the project minimum threshold.
- Mocking is used appropriately, not excessively.

## Maintainability
- Functions are under 50 lines. Complex functions are split.
- Each function and class has a single responsibility.
- Dependencies are explicit, minimal, and injectable.
- No tight coupling to implementation details. Interfaces and abstractions
  are used where appropriate.
- Backward compatibility is considered for public APIs.
- Breaking changes are documented with migration guides.

## Documentation
- README is updated if the change affects setup or usage.
- API documentation is updated for public interface changes.
- Architecture Decision Records are created for significant choices.
- Runbooks are updated for operational procedure changes.
- User-facing documentation is updated for behavior changes.

## Build-Test-Loop Verification
- Build command passes with zero errors and zero warnings.
- Test command passes with zero failures.
- Lint command passes with zero issues.
- Security audit passes with zero critical or high findings.
- All checks pass before the review is approved.
