# MikaMiku — Skill + Plugin for Codex

MikaMiku is a **dual-format intelligence amplification system** for Codex. It works as both a **standalone Skill** (Agent Skills standard) and a **full Plugin** (Codex Plugin System), giving you maximum flexibility across any Codex deployment.

---

## What is MikaMiku

MikaMiku transforms Codex into an autonomous engineering entity capable of building anything from a single web component to an entire operating system kernel. It enforces rigorous quality through the Build-Test-Loop protocol, maintains perfect context persistence across long conversations, and applies world-class design principles to every visual output.

### Core Capabilities

| Protocol | Description |
|----------|-------------|
| **Build-Test-Loop (BTL)** | Every deliverable must pass build, test, lint, and audit before completion. Zero-defect delivery. |
| **Context Persistence Protocol (CPP)** | Maintains running Project State across the entire conversation. Never forgets filenames, decisions, or prior corrections. |
| **Anti-Hallucination Engine (AHE)** | Never invents APIs, signatures, or library versions. Every recommendation is conservative and verifiable. |
| **Error Immunity Protocol (EIP)** | Once a bug is fixed, it stays fixed. Mental diff checks prevent regression. |
| **Design Mastery** | 8-point grid, golden ratio, rule of thirds, F/Z patterns, accessible contrast, purposeful motion. Anti-AI-slop charter enforced. |
| **Security Fortress** | Defense-in-depth across all layers. STRIDE threat modeling and OWASP Top 10 compliance mandatory. |
| **Mega-Project Architecture** | Kernel development, game engines, Android ROMs, Linux distros, compilers, firmware — senior staff engineer expertise. |
| **Progressive Intelligence Amplification (PIA)** | Understanding deepens with every turn. Infers unstated requirements and asks precise clarifying questions. |

---

## Dual Format: Skill + Plugin

MikaMiku ships in **two formats** that share the same intelligence core:

### Format 1: Skill (Agent Skills Standard)

The lightweight format. Just `SKILL.md` + supporting files. Works with any agent that supports the standard — Codex, Claude Code, OpenClaude, and more.

**Installation:**
```bash
# Codex — Global (all projects)
mkdir -p ~/.codex/skills
cp -r mikamiku ~/.codex/skills/

# Codex — Project-specific
mkdir -p .codex/skills
cp -r mikamiku .codex/skills/

# Claude Code — Global
mkdir -p ~/.claude/skills
cp -r mikamiku ~/.claude/skills/

# Universal standard path (works across all agents)
mkdir -p ~/.agents/skills
cp -r mikamiku ~/.agents/skills/
```

**Activation:** Start a new session and ask something that matches the skill description. Codex reads the `SKILL.md` description, detects the match, and activates MikaMiku automatically.

> "Build me a secure React dashboard with dark mode"

---

### Format 2: Plugin (Codex Plugin System)

The full format. Bundles the skill inside a proper Codex plugin with a manifest, UI metadata, icons, and invocation policy. Appears as a tile in the Codex plugin marketplace.

**Installation:**
```bash
# macOS
mkdir -p ~/Library/Application\ Support/Codex/plugins/
cp -r mikamiku-plugin ~/Library/Application\ Support/Codex/plugins/

# Linux
mkdir -p ~/.config/Codex/plugins/
cp -r mikamiku-plugin ~/.config/Codex/plugins/

# Windows
# Copy to %APPDATA%\Codex\plugins\
```

**Activation:** Restart Codex. MikaMiku appears in the plugin sidebar/marketplace. Enable it, then prompt normally — the plugin auto-detects engineering tasks and loads the skill.

---

## Directory Structure

### Skill Format (`mikamiku/`)
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

### Plugin Format (`mikamiku-plugin/`)
```
mikamiku-plugin/
├── .codex-plugin/
│   └── plugin.json                    # Plugin manifest (name, version, skills path, UI)
├── agents/
│   └── openai.yaml                    # Invocation policy & UI metadata
├── assets/
│   ├── mikamiku-icon.svg              # Composer icon (64x64)
│   └── mikamiku-logo.png            # App icon (256x256)
└── skills/
    └── mikamiku/                      # ← The exact same skill directory as above
        ├── SKILL.md
        ├── scripts/
        ├── references/
        └── assets/
```

**The plugin wraps the skill.** The `skills/` directory inside the plugin contains the exact same files as the standalone skill format. The plugin adds the manifest, UI metadata, and icons on top.

---

## Which Format Should I Use?

| Scenario | Recommended Format |
|----------|-------------------|
| Quick setup, minimal overhead | **Skill** — drop into `~/.codex/skills/` |
| Team sharing, version control | **Skill** — commit `mikamiku/` to your repo |
| UI marketplace, branded experience | **Plugin** — appears as a tile with icon and color |
| Auto-activation without prompts | **Plugin** — `agents/openai.yaml` handles implicit invocation |
| Cross-agent compatibility (Claude, OpenClaude) | **Skill** — universal standard |
| Production deployment, distribution | **Plugin** — proper packaging with manifest |

---

## Verification

### Skill Format
```bash
# Check the file exists
ls ~/.codex/skills/mikamiku/SKILL.md

# Or simply check the directory
ls ~/.codex/skills/mikamiku/
```

### Plugin Format
```bash
# Check the manifest exists
ls ~/Library/Application\ Support/Codex/plugins/mikamiku-plugin/.codex-plugin/plugin.json

# Verify skills are bundled
ls ~/Library/Application\ Support/Codex/plugins/mikamiku-plugin/skills/mikamiku/SKILL.md
```

---

## Activation Examples

Start a new session and ask something that matches the skill description:

- "Build me a secure React dashboard with dark mode"
- "Design a Linux kernel module for ARM64"
- "Create an Android custom ROM with privacy hardening"
- "Code a game engine in Rust with ECS architecture"
- "Architect a Linux distribution from scratch"
- "Develop a cross-platform mobile app with Flutter"
- "Build a compiler for a custom programming language"
- "Design a responsive landing page using the golden ratio"
- "Create a microservices backend with zero-trust security"
- "Develop firmware for an embedded ARM Cortex-M device"

Codex reads the skill description, detects the match, and activates MikaMiku automatically. Once active, the skill remains active for the entire session.

You can also explicitly invoke it:
```bash
$mikamiku
```

---

## Compatibility

| Platform | Skill | Plugin |
|----------|:-----:|:------:|
| Codex (OpenAI) | ✅ | ✅ |
| Claude Code (Anthropic) | ✅ | ❌ |
| OpenClaude (Gitlawb) | ✅ | ❌ |
| Any Agent Skills standard agent | ✅ | ❌ |

---

## Skill Philosophy

MikaMiku represents the belief that AI-assisted engineering should not be fast and sloppy. It should be rigorous, thoughtful, and precise. Every line of code is a commitment. Every test is a promise. Every design decision is intentional. The skill exists to amplify human intent, not to replace human judgment.

---

## License

This skill/plugin is provided as-is for personal and commercial use. Modify it, extend it, and share it freely.
