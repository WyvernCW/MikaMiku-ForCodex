# Security Hardening Reference — MikaMiku

## The Security Mindset

Assume breach. Design every system as if the attacker already has a foothold.
Security is not a product that can be purchased and installed. Security is a
process that must be woven into every layer of the system from the first line
of code.

Defense in depth means no single point of failure. If one layer is breached,
the next layer must still protect the asset. If the perimeter falls, the
network segmentation holds. If the network falls, the host hardening holds.
If the host falls, the application security holds. If the application falls,
the data encryption holds.

---

## Input Validation Matrix

Every piece of data that enters the system from an external source is
untrusted until proven otherwise. Validate at the boundary before the data
touches business logic.

Email addresses must conform to RFC 5322 syntax. Additionally, verify that
the domain has a valid MX record. Sanitize by lowercasing and stripping
whitespace.

URLs must be parsed with a strict URL constructor. Whitelist acceptable
protocols. Reject javascript, data, and file protocols unless explicitly
required. Encode path segments to prevent traversal.

File paths must be canonicalized to resolve dot-dot segments. Check against
an allowlist of acceptable directories. Reject path traversal patterns
unconditionally.

HTML content must be parsed with a trusted sanitizer library. Escape on
output according to context, never on input. Contexts include HTML body,
HTML attribute, JavaScript, CSS, and URL.

SQL queries must use parameterized statements exclusively. Never concatenate
user input into a query string. Use an Object-Relational Mapper safely by
avoiding raw SQL concatenation.

JSON data must be validated against a strict schema. Reject unknown
properties unless explicitly configured to accept them. Validate types,
ranges, and formats for every field.

Numeric input must be type-checked, range-checked, and NaN-checked. Clamp
or reject out-of-range values rather than silently accepting them.

Date input must be parsed as ISO 8601 format. Validate that the date is
within a reasonable range. Normalize timezone to UTC for storage.

---

## Authentication Best Practices

### Password Policy
Require a minimum of 12 characters. Prefer 16 characters or more. Do not
impose arbitrary complexity requirements like mandatory symbols or uppercase
letters. The National Institute of Standards and Technology explicitly
recommends against complexity requirements in Special Publication 800-63B.

Check passwords against breached password databases using the Have I Been
Pwned API or a local bloom filter of known breaches. Reject commonly used
passwords.

Hash passwords using Argon2id. Minimum parameters: 19 megabytes of memory,
2 iterations, and 1 parallelism degree. Adjust parameters based on server
capacity and threat model. Never use MD5, SHA-1, SHA-256, or bcrypt for
new password storage.

Never limit password length except for denial-of-service protection. A
reasonable upper limit is 1024 characters. Long passwords are more secure
than short complex passwords.

### Session Management
Use httpOnly, secure, and SameSite strict cookies for session tokens.
Session timeout should be 15 minutes of idle time and 8 hours absolute
maximum. Regenerate the session identifier on any privilege escalation such
as password change or role elevation.

Bind sessions to a fingerprint derived from IP address and user agent,
but allow leniently to avoid false positives from mobile networks and
browser updates.

### JSON Web Token Guidelines
Use RS256 or ES256 for signing in distributed systems. Never use HS256 when
multiple services verify the token because it requires sharing a symmetric
secret.

Set access token expiry to 15 minutes maximum. Use refresh tokens with a
7-day lifetime. Refresh tokens must be single-use and stored as hashed
values in the database to enable revocation.

Include a JWT ID claim for token revocation lists. Maintain a short-lived
revocation list for compromised tokens.

---

## Cryptography Standards

### Symmetric Encryption
Use AES-256-GCM for general-purpose symmetric encryption. Use
ChaCha20-Poly1305 for mobile devices, embedded systems, and low-power
hardware where AES hardware acceleration is unavailable.

Never reuse a nonce or initialization vector with the same key. Generate
nonces using a cryptographically secure random number generator. For GCM,
nonce reuse completely destroys confidentiality.

Rotate encryption keys every 90 days. Maintain a key versioning system so
that old data can still be decrypted during rotation.

### Asymmetric Encryption
Use RSA-4096 for legacy compatibility with systems that do not support
elliptic curve cryptography. Use ECDSA with the P-256 curve or Ed25519
for modern systems. Ed25519 is preferred for new designs due to its
performance and security properties.

Use X25519 for key exchange in modern protocols.

### Hashing
Use Argon2id for password hashing. Use SHA-256 for integrity checks and
digital signatures where collision resistance is required. Use BLAKE3 for
high-performance hashing where cryptographic guarantees are needed but
speed is critical.

Never use MD5 or SHA-1 for any security-sensitive purpose. These algorithms
are cryptographically broken.

---

## OWASP Top Ten Mitigations

### Broken Access Control
Deny by default. Implement access control once and reuse it everywhere.
Cross-Origin Resource Sharing should whitelist specific origins. Never use
a wildcard with credentials enabled. Rate limit authentication endpoints
to 5 attempts per 15 minutes per IP address or per account.

### Cryptographic Failures
Encrypt all data in transit using TLS 1.3. Encrypt all data at rest. Do not
cache sensitive data in browser storage. Use strong, modern algorithms with
proper key management.

### Injection
Use parameterized queries for all database interactions. Use an ORM safely
by avoiding raw SQL concatenation. Validate and sanitize for LDAP, XPath,
NoSQL, and operating system command injection vectors.

### Insecure Design
Threat model every feature before implementation. Use STRIDE or PASTA
methodology. Apply secure defaults. Validate business logic, not just syntax.

### Security Misconfiguration
Send hardened security headers on every response. Remove default accounts,
unused features, sample data, and debug endpoints. Error messages must not
leak system information, stack traces, or database schema details.

### Vulnerable and Outdated Components
Generate a Software Bill of Materials for every build. Run automated
dependency scanning in continuous integration. Patch critical
vulnerabilities within 24 hours of disclosure.

### Identification and Authentication Failures
Require multi-factor authentication for privileged accounts. Implement
brute-force protection. Use secure password recovery with time-limited,
single-use tokens sent via verified channels.

### Software and Data Integrity Failures
Digitally sign all software updates and verify signatures before
installation. Verify checksums of all dependencies. Protect the continuous
integration and continuous deployment pipeline with signed commits,
immutable build logs, and access controls.

### Security Logging and Monitoring Failures
Log all authentication events including both successes and failures. Log
authorization decisions. Alert on anomalies such as impossible travel,
new device registration, and privilege escalation. Retain logs for one
year minimum, encrypted at rest.

### Server-Side Request Forgery
Validate and sanitize all URLs that the server will fetch. Deny internal
IP ranges including 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. Use
allowlists for outbound domains rather than blacklists.

---

## Security Headers

Every web application must send these headers on every response:

Strict-Transport-Security with a max-age of 31536000 seconds, including
subdomains and requesting preload inclusion in browser HSTS lists.

Content-Security-Policy defining a strict policy. Start with default-src
restricted to self and explicitly allow needed sources for scripts, styles,
images, fonts, and connections.

X-Frame-Options set to deny to prevent clickjacking. Alternatively, use
Content-Security-Policy frame-ancestors for modern browsers.

X-Content-Type-Options set to nosniff to prevent MIME type sniffing attacks.

Referrer-Policy set to strict-origin-when-cross-origin to limit referrer
leakage.

Permissions-Policy disabling unused browser features such as geolocation,
microphone, camera, and payment APIs unless explicitly required.

---

## Secure Development Lifecycle

Requirements phase: Define security requirements alongside functional
requirements. Identify the data classification of all data types. Define
authentication and authorization requirements.

Design phase: Threat model every feature using STRIDE or PASTA. Identify
trust boundaries and attack surfaces. Design for failure and recovery.

Implementation phase: Follow secure coding guidelines. Require peer review
for all code changes. Run static analysis tools on every commit.

Testing phase: Run static application security testing, dynamic application
security testing, fuzzing, and penetration testing. Include security tests
in the automated test suite.

Deployment phase: Harden infrastructure. Use secrets management, not
environment variables. Enable security monitoring and alerting.

Operations phase: Monitor for anomalies. Maintain an incident response plan.
Practice disaster recovery drills. Review and update security controls
quarterly.
