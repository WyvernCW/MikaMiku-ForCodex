# Threat Model: {{PROJECT_NAME}}

## System Overview
- Scope: {{SCOPE}}
- Data Classification: {{CLASSIFICATION}}
- Trust Boundaries: {{BOUNDARIES}}
- Threat Model Date: {{DATE}}

## STRIDE Analysis

### Spoofing
Can an attacker pretend to be a legitimate user, device, or service?

| Threat | Mitigation | Status |
|--------|-----------|--------|
| Identity spoofing in authentication | Implement multi-factor authentication and certificate pinning | Pending |
| Device spoofing in mobile apps | Implement device attestation and integrity checks | Pending |
| Service spoofing in microservices | Implement mutual TLS and service mesh identity | Pending |

### Tampering
Can data or code be modified without authorization?

| Threat | Mitigation | Status |
|--------|-----------|--------|
| Data tampering in transit | Enforce TLS 1.3 with certificate validation | Pending |
| Data tampering at rest | Encrypt all stored data with AES-256-GCM | Pending |
| Code tampering in mobile apps | Implement code signing and runtime integrity checks | Pending |
| Configuration tampering | Use immutable infrastructure and configuration validation | Pending |

### Repudiation
Can actions be denied or falsely claimed?

| Threat | Mitigation | Status |
|--------|-----------|--------|
| Denial of transaction | Implement immutable audit logs with digital signatures | Pending |
| False claim of action | Use non-repudiable timestamps and witness logs | Pending |
| Log tampering | Store logs in append-only, externally monitored storage | Pending |

### Information Disclosure
Can sensitive data leak to unauthorized parties?

| Threat | Mitigation | Status |
|--------|-----------|--------|
| Sensitive data in error messages | Sanitize all error output, use generic messages | Pending |
| Data exposure through APIs | Implement field-level encryption and data minimization | Pending |
| Memory dump exposure | Clear sensitive data from memory after use | Pending |
| Backup exposure | Encrypt backups independently with separate keys | Pending |

### Denial of Service
Can the system be overwhelmed or made unavailable?

| Threat | Mitigation | Status |
|--------|-----------|--------|
| Resource exhaustion | Implement rate limiting, circuit breakers, and quotas | Pending |
| Distributed denial of service | Use CDN, DDoS protection, and anycast | Pending |
| Application-level DoS | Implement request timeouts and payload size limits | Pending |
| Database connection exhaustion | Use connection pooling and query timeouts | Pending |

### Elevation of Privilege
Can a user gain unauthorized permissions?

| Threat | Mitigation | Status |
|--------|-----------|--------|
| Vertical privilege escalation | Implement strict role-based access control | Pending |
| Horizontal privilege escalation | Validate ownership on every resource access | Pending |
| Privilege escalation through bugs | Apply principle of least privilege and sandboxing | Pending |
| Admin function exposure | Separate admin interfaces and require re-authentication | Pending |

## Attack Surface
- {{SURFACE_1}}
- {{SURFACE_2}}
- {{SURFACE_3}}
- {{SURFACE_4}}

## Risk Acceptance
| Risk | Severity | Likelihood | Impact | Justification |
|------|----------|-----------|--------|---------------|
| {{RISK_1}} | {{SEV_1}} | {{LIK_1}} | {{IMP_1}} | {{JUST_1}} |

## Review Schedule
- Initial review: {{DATE}}
- Quarterly review: {{Q_DATE}}
- Triggered review: After major architecture changes or security incidents
