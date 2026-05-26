# MikaMiku — Universal Plugin for Codex + Antigravity + OpenCode + OpenClaude + Kilo Code

MikaMiku is a **cross-platform intelligence amplification system** that works as a **unified plugin** for **Codex (OpenAI)**, **Antigravity (Google)**, **OpenCode**, **OpenClaude**, and **Kilo Code**. It transforms your AI agent into an autonomous engineering entity capable of building anything from a single web component to an entire operating system kernel.

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

| Platform | Plugin System | Manifest File | Installation Path |
|----------|--------------|---------------|-------------------|
| **Codex** (OpenAI) | Codex Plugin | `.codex-plugin/plugin.json` | `~/.codex/plugins/` or `.codex/plugins/` |
| **Antigravity** (Google) | Antigravity Plugin | `.codex-plugin/plugin.json` (reads `id`, `configSchema`, `activation`) | `~/.gemini/antigravity/plugins/` or `<workspace>/.agent/plugins/` |
| **OpenCode** | OpenCode Plugin | `.opencode/opencode.json` | `~/.opencode/plugins/` or `<workspace>/.opencode/plugins/` |
| **OpenClaude** (Gitlawb) | OpenClaude Plugin | `.openclaude/openclaude.plugin.json` | `~/.openclaude/plugins/` or `<workspace>/.openclaude/plugins/` |
| **Kilo Code** (kilo.ai) | Agent Skills | `.kilo/kilo.json` + `skills/mikamiku/SKILL.md` | `~/.kilo/skills/` or `~/.kilocode/skills/` |
| **Claude Code** (Anthropic) | Agent Skills | `skills/mikamiku/SKILL.md` | `~/.claude/skills/` or `.claude/skills/` |

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

### OpenCode

```bash
# Global
mkdir -p ~/.opencode/plugins
cp -r mikamiku-unified-plugin ~/.opencode/plugins/

# Project-specific
mkdir -p .opencode/plugins
cp -r mikamiku-unified-plugin .opencode/plugins/
```

Restart OpenCode. The plugin auto-injects SKILL.md on session start.

### OpenClaude (Gitlawb)

```bash
# Global
mkdir -p ~/.openclaude/plugins
cp -r mikamiku-unified-plugin ~/.openclaude/plugins/

# Project-specific
mkdir -p .openclaude/plugins
cp -r mikamiku-unified-plugin .openclaude/plugins/
```

Restart OpenClaude. The plugin auto-activates on prompt keywords.

### Kilo Code (kilo.ai)

```bash
# Global
mkdir -p ~/.kilo/skills
cp -r mikamiku-unified-plugin/skills/mikamiku ~/.kilo/skills/

# Alternative path
mkdir -p ~/.kilocode/skills
cp -r mikamiku-unified-plugin/skills/mikamiku ~/.kilocode/skills/

# Project-specific
mkdir -p .kilo/skills
cp -r mikamiku-unified-plugin/skills/mikamiku .kilo/skills/
```

Restart Kilo Code. The skill auto-activates on engineering prompts.

### Claude Code (Anthropic)

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
│   └── plugin.json              # Unified manifest (all 5 platforms)
├── .opencode/
│   └── opencode.json            # OpenCode plugin manifest
├── .openclaude/
│   └── openclaude.plugin.json   # OpenClaude plugin manifest
├── .kilo/
│   └── kilo.json                # Kilo Code skill manifest
├── agents/
│   └── openai.yaml              # Invocation policy (Codex/Claude Code)
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

The `plugin.json` in `.codex-plugin/` contains **all five** platform formats in one file:

### Codex-Native Fields (preserved)
- `name`, `version`, `description`
- `author`, `homepage`, `repository`, `license`
- `keywords`, `skills`
- `interface.displayName`, `interface.shortDescription`, `interface.longDescription`
- `interface.category`, `interface.capabilities`
- `interface.defaultPrompt`, `interface.brandColor`
- `interface.composerIcon`, `interface.logo`

### Antigravity-Compatible Fields
- `id`, `configSchema`, `enabledByDefault`
- `channels`, `providers`, `activation`
- `contracts.tools`, `uiHints`

### OpenCode-Compatible Fields
- `opencode.plugin.type`, `opencode.plugin.commands`
- `opencode.plugin.hooks.session_start.inject`
- `opencode.plugin.tools` (tool registry)

### OpenClaude-Compatible Fields
- `openclaude.plugin.type`, `openclaude.plugin.activation`
- `openclaude.plugin.activation.onPromptMatch` (keyword triggers)
- `openclaude.plugin.config`

### Kilo Code-Compatible Fields
- `kilo.plugin.type`, `kilo.plugin.skills`
- `kilo.plugin.compatibility.agents` (kilo-code, kiro, cursor, windsurf)
- `kilo.plugin.activation.onPromptMatch` (keyword triggers)
- `kilo.plugin.config`

Each platform reads only the fields it understands and ignores the rest. Platform-specific manifests in `.opencode/`, `.openclaude/`, and `.kilo/` provide fallback compatibility.

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

| Feature | Codex | Antigravity | OpenCode | OpenClaude | Kilo Code | Claude Code |
|---------|:-----:|:-----------:|:--------:|:----------:|:---------:|:-----------:|
| Plugin manifest | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Auto-activation | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Skill format | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Config schema | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| UI hints | ✅ | ⚠️ partial | ⚠️ partial | ⚠️ partial | ⚠️ partial | ❌ |
| Tool contracts | ✅ | ⚠️ partial | ⚠️ partial | ⚠️ partial | ⚠️ partial | ❌ |
| Session hooks | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Prompt keyword matching | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Multi-agent compatibility | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |

---

## Skill Philosophy

MikaMiku represents the belief that AI-assisted engineering should not be fast and sloppy. It should be rigorous, thoughtful, and precise. Every line of code is a commitment. Every test is a promise. Every design decision is intentional. The skill exists to amplify human intent, not to replace human judgment.

---

## License

This plugin is provided as-is for personal and commercial use. Modify it, extend it, and share it freely.
