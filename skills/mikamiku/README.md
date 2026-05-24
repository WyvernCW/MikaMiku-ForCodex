# MikaMiku — Unified Plugin for Codex + Antigravity

MikaMiku is a **cross-platform intelligence amplification system** that works as a **unified plugin** for both **Codex (OpenAI)** and **Antigravity (Google)**. It transforms your AI agent into an autonomous engineering entity capable of building anything from a single web component to an entire operating system kernel.

---

## What is MikaMiku

MikaMiku enforces rigorous quality through the Build-Test-Loop protocol, maintains perfect context persistence across long conversations, and applies world-class design principles to every visual output.

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

## Cross-Platform Compatibility

This plugin is designed to work with **both** Codex and Antigravity using a unified manifest format.

| Platform | Plugin System | Installation Path |
|----------|--------------|-------------------|
| **Codex** (OpenAI) | `.codex-plugin/plugin.json` | `~/.codex/plugins/` or `.codex/plugins/` |
| **Antigravity** (Google) | `plugin.json` (root) | `~/.gemini/antigravity/plugins/` or `<workspace>/.agent/plugins/` |
| **Claude Code** (Anthropic) | Agent Skills standard | `~/.claude/skills/` or `.claude/skills/` |
| **OpenClaw** | `openclaw.plugin.json` | `~/.openclaw/plugins/` |

---

## Installation

### Codex (OpenAI)

```bash
# Global (all projects)
mkdir -p ~/.codex/plugins
cp -r mikamiku-unified-plugin ~/.codex/plugins/

# Project-specific
mkdir -p .codex/plugins
cp -r mikamiku-unified-plugin .codex/plugins/
```

Restart Codex. MikaMiku appears in the plugin sidebar.

### Antigravity (Google)

```bash
# Global (all workspaces)
mkdir -p ~/.gemini/antigravity/plugins
cp -r mikamiku-unified-plugin ~/.gemini/antigravity/plugins/

# Workspace-specific
mkdir -p .agent/plugins
cp -r mikamiku-unified-plugin .agent/plugins/
```

Restart Antigravity. The skill auto-activates on engineering prompts.

### Claude Code (Anthropic) — Skill Mode

```bash
# Global
mkdir -p ~/.claude/skills
cp -r mikamiku-unified-plugin/skills/mikamiku ~/.claude/skills/

# Project-specific
mkdir -p .claude/skills
cp -r mikamiku-unified-plugin/skills/mikamiku .claude/skills/
```

### Universal Standard Path

```bash
mkdir -p ~/.agents/skills
cp -r mikamiku-unified-plugin/skills/mikamiku ~/.agents/skills/
```

---

## Directory Structure

```
mikamiku-unified-plugin/
├── .codex-plugin/
│   └── plugin.json              # Unified manifest (Codex + Antigravity compatible)
├── agents/
│   └── openai.yaml              # Invocation policy & UI metadata
├── assets/
│   ├── mikamiku-icon.svg        # Composer icon (64x64)
│   └── mikamiku-logo.png        # App icon (256x256)
└── skills/
    └── mikamiku/
        ├── SKILL.md             # Core skill definition
        ├── scripts/
        │   ├── build-test-loop.js
        │   ├── detect-tech-stack.js
        │   ├── validate-architecture.js
        │   ├── security-check.py
        │   └── complexity-analyzer.sh
        ├── references/
        │   ├── design-principles.md
        │   ├── composition-layout-guide.md
        │   ├── responsive-design-patterns.md
        │   ├── security-hardening.md
        │   ├── systems-architecture.md
        │   ├── testing-strategies.md
        │   ├── coding-patterns.md
        │   └── database-design.md
        └── assets/
            ├── frontend-design-system.css
            ├── project-manifest.json
            ├── threat-model-template.md
            └── code-review-checklist.md
```

---

## How the Unified Manifest Works

The `plugin.json` in `.codex-plugin/` contains **both** Codex-native fields and Antigravity-compatible fields:

### Codex-Native Fields (preserved)
- `name`, `version`, `description`
- `author`, `homepage`, `repository`, `license`
- `keywords`, `skills`
- `interface.displayName`, `interface.shortDescription`, `interface.longDescription`
- `interface.category`, `interface.capabilities`
- `interface.defaultPrompt`, `interface.brandColor`
- `interface.composerIcon`, `interface.logo`

### Antigravity-Compatible Fields (added)
- `id` — canonical plugin identifier
- `configSchema` — JSON Schema for plugin configuration (buildTestLoopEnabled, securityLevel, designMode)
- `enabledByDefault` — auto-enable on install
- `channels` — plugin channels (coding, engineering, architecture)
- `providers` — provider ownership metadata
- `activation` — when to auto-activate (on commands, channels, config paths)
- `contracts.tools` — tool ownership declarations
- `uiHints` — UI rendering hints for config fields

Both platforms read the same manifest. Codex ignores Antigravity-specific fields. Antigravity ignores Codex-specific fields. The skill content in `skills/mikamiku/` is identical across both.

---

## Activation Examples

Start a new session and ask:

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

The plugin auto-detects engineering prompts and activates MikaMiku.

Explicit invocation:
```bash
$mikamiku
```

---

## Configuration

When installed as a plugin, you can configure:

| Setting | Default | Options |
|---------|---------|---------|
| `buildTestLoopEnabled` | `true` | `true` / `false` |
| `securityLevel` | `"hardened"` | `"standard"` / `"hardened"` / `"paranoid"` |
| `designMode` | `"dark-first"` | `"dark-first"` / `"light-first"` / `"system"` |

---

## Compatibility Matrix

| Feature | Codex | Antigravity | Claude Code | OpenClaw |
|---------|:-----:|:-----------:|:-----------:|:--------:|
| Plugin manifest | ✅ | ✅ | ❌ | ✅ |
| Auto-activation | ✅ | ✅ | ✅ | ✅ |
| Skill format | ✅ | ✅ | ✅ | ✅ |
| Config schema | ✅ | ✅ | ❌ | ✅ |
| UI hints | ✅ | ⚠️ partial | ❌ | ✅ |
| Tool contracts | ✅ | ⚠️ partial | ❌ | ✅ |

---

## Skill Philosophy

MikaMiku represents the belief that AI-assisted engineering should not be fast and sloppy. It should be rigorous, thoughtful, and precise. Every line of code is a commitment. Every test is a promise. Every design decision is intentional. The skill exists to amplify human intent, not to replace human judgment.

---

## License

This plugin is provided as-is for personal and commercial use. Modify it, extend it, and share it freely.
