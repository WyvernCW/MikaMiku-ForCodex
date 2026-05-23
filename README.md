# MikaMiku Skill for Codex

## What is MikaMiku

MikaMiku is a supreme intelligence amplification skill for Codex. It
transforms the agent into an autonomous engineering entity capable of
building anything from a single web component to an entire operating system
kernel. It enforces rigorous quality through the Build-Test-Loop protocol,
maintains perfect context persistence across long conversations, and applies
world-class design principles to every visual output.

## Compatibility

This skill works with:

- **Codex** (OpenAI / ChatGPT desktop app)
- Claude Code (Anthropic)
- OpenClaude (Gitlawb)
- Any agent that supports the Agent Skills standard (SKILL.md format)

## Installation

### Codex — Global (all projects)

```bash
mkdir -p ~/.codex/skills
cp -r mikamiku ~/.codex/skills/
```

### Codex — Project-specific

```bash
mkdir -p .codex/skills
cp -r mikamiku .codex/skills/
```

### Claude Code — Global

```bash
mkdir -p ~/.claude/skills
cp -r mikamiku ~/.claude/skills/
```

### Claude Code — Project-specific

```bash
mkdir -p .claude/skills
cp -r mikamiku .claude/skills/
```

### Universal standard path

```bash
mkdir -p ~/.agents/skills
cp -r mikamiku ~/.agents/skills/
```

## Verification

After installation, verify the skill is detected:

```bash
# Check the file exists
ls ~/.codex/skills/mikamiku/SKILL.md

# Or simply check the directory
ls ~/.codex/skills/mikamiku/
```

## Activation

Start a new session and ask something that matches the skill description.
Examples:

- Build me a secure React dashboard with dark mode
- Design a Linux kernel module for ARM64
- Create an Android custom ROM with privacy hardening
- Code a game engine in Rust with ECS architecture
- Architect a Linux distribution from scratch
- Develop a cross-platform mobile app with Flutter
- Build a compiler for a custom programming language
- Design a responsive landing page using the golden ratio
- Create a microservices backend with zero-trust security
- Develop firmware for an embedded ARM Cortex-M device

Codex reads the skill description, detects the match, and activates
MikaMiku automatically. Once active, the skill remains active for the entire
session.

## Directory Structure

```
mikamiku/
├── SKILL.md                           # Core skill definition
├── scripts/
│   ├── build-test-loop.js             # Auto build/test/lint/audit runner
│   ├── detect-tech-stack.js          # Tech stack auto-detection
│   ├── validate-architecture.js      # Project structure validator
│   ├── security-check.py             # Static security scanner
│   └── complexity-analyzer.sh        # Code metrics analyzer
├── references/
│   ├── design-principles.md           # Layout, typography, color, motion
│   ├── composition-layout-guide.md    # Spatial relationships, grids, depth
│   ├── responsive-design-patterns.md  # Mobile-first patterns catalog
│   ├── security-hardening.md         # OWASP, crypto, headers, SDL
│   ├── systems-architecture.md       # Kernel, game engine, Android, Linux
│   ├── testing-strategies.md          # Pyramid, FIRST, coverage, CI
│   ├── coding-patterns.md             # 23 design patterns + architecture
│   └── database-design.md             # Normalization, indexing, migrations
└── assets/
    ├── frontend-design-system.css     # Production dark-first CSS
    ├── project-manifest.json          # Project metadata template
    ├── threat-model-template.md       # STRIDE worksheet
    └── code-review-checklist.md       # Review checklist
```

## Core Capabilities

When MikaMiku is active, Codex gains these amplified abilities:

### Build-Test-Loop Protocol
Every code deliverable must pass through build, test, lint, and audit before
being declared complete. If any check fails, the loop returns to the build
phase for correction. This ensures zero-defect delivery.

### Context Persistence Protocol
The agent maintains a running Project State across the entire conversation.
It never forgets file names, architectural decisions, variable names, or prior
corrections. Even in conversations exceeding fifty turns, continuity is perfect.

### Anti-Hallucination Engine
The agent never invents API endpoints, function signatures, or library versions.
Every recommendation is conservative and verifiable. Uncertainties are stated
explicitly.

### Error Immunity Protocol
Once a bug is fixed, it stays fixed. The agent performs mental diff checks to
prevent regression. It never repeats the same incorrect pattern after being
corrected.

### Design Mastery
All visual work follows professional design principles: the 8-point grid,
golden ratio, rule of thirds, F and Z patterns, visual hierarchy, responsive
breakpoints, accessible contrast, and purposeful motion. The anti-AI-slop
charter forbids generic neon gradients, meaningless floating shapes, and
cookie-cutter hero sections.

### Security Fortress
Every system is hardened by default. Defense-in-depth across input validation,
authentication, authorization, cryptography, transport, storage, and runtime
layers. STRIDE threat modeling and OWASP Top 10 compliance are mandatory.

### Mega-Project Architecture
Capable of guiding kernel development, game engine construction, Android custom
ROM creation, Linux distribution bootstrapping, compiler design, and firmware
development with senior staff engineer expertise.

### Progressive Intelligence Amplification
With every turn, the agent's understanding of user intent deepens. It infers
unstated requirements, proactively suggests optimizations, and asks precise
clarifying questions rather than generic ones.

## Skill Philosophy

MikaMiku represents the belief that AI-assisted engineering should not be fast
and sloppy. It should be rigorous, thoughtful, and precise. Every line of
code is a commitment. Every test is a promise. Every design decision is
intentional. The skill exists to amplify human intent, not to replace human
judgment.

## License

This skill is provided as-is for personal and commercial use. Modify it,
extend it, and share it freely.
