import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, ListResourcesRequestSchema, ReadResourceRequestSchema, ListPromptsRequestSchema, GetPromptRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";
import { promises as fs } from "fs";
import { spawn } from "child_process";
import AdmZip from "adm-zip";
// Resolve paths relative to this file's position
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Root of the workspace is two levels up from build/src under mcp-server
const workspaceRoot = resolve(__dirname, "../../");
console.error(`[MikaMiku MCP] Workspace Root: ${workspaceRoot}`);
// Define Resources database
const RESOURCES = [
    {
        uri: "mikamiku://guidelines/skill",
        name: "MikaMiku Core Skill Guidelines",
        description: "The complete MikaMiku Autonomous Hyper-Intelligence protocol, Build-Test-Loop rules, and engineering checklists.",
        filePath: "skills/mikamiku/SKILL.md"
    },
    {
        uri: "mikamiku://references/coding-patterns",
        name: "MikaMiku Coding Patterns Manual",
        description: "Idiomatic programming conventions, universal code quality rules, and systems design principles.",
        filePath: "skills/mikamiku/references/coding-patterns.md"
    },
    {
        uri: "mikamiku://references/composition-layout-guide",
        name: "MikaMiku Composition & Layout Guide",
        description: "Layout systems, rule of thirds, baseline grids, symmetry, visual hierarchy, and composition mechanics.",
        filePath: "skills/mikamiku/references/composition-layout-guide.md"
    },
    {
        uri: "mikamiku://references/database-design",
        name: "MikaMiku Database Design Manual",
        description: "Database normalisation, transaction boundaries, query optimization, indexing strategies, and connection pooling.",
        filePath: "skills/mikamiku/references/database-design.md"
    },
    {
        uri: "mikamiku://references/design-principles",
        name: "MikaMiku Design Principles Guide",
        description: "Visual design craft, zero tolerance for AI slop, spacing tokens, typography, and dark mode rules.",
        filePath: "skills/mikamiku/references/design-principles.md"
    },
    {
        uri: "mikamiku://references/responsive-design-patterns",
        name: "MikaMiku Responsive Design Patterns",
        description: "Mobile-first philosophy, breakpoint specifications, container queries, touch controls, and fluid typography.",
        filePath: "skills/mikamiku/references/responsive-design-patterns.md"
    },
    {
        uri: "mikamiku://references/security-hardening",
        name: "MikaMiku Security Hardening Manual",
        description: "Defense-in-depth, input sanitization, OAuth 2.1, secure cryptography, transport controls, and STRIDE threat modeling.",
        filePath: "skills/mikamiku/references/security-hardening.md"
    },
    {
        uri: "mikamiku://references/systems-architecture",
        name: "MikaMiku Systems Architecture Manual",
        description: "Architectural guidelines for operating systems, game engines, custom Android ROMs, and compilers.",
        filePath: "skills/mikamiku/references/systems-architecture.md"
    },
    {
        uri: "mikamiku://references/testing-strategies",
        name: "MikaMiku Testing Strategies Reference",
        description: "Full-stack testing, unit verification, UI test automation, mock architecture, and performance benchmarking.",
        filePath: "skills/mikamiku/references/testing-strategies.md"
    }
];
// Execute a script using node/python via spawn
function executeScript(cmd, args, targetCwd) {
    return new Promise((resolve) => {
        console.error(`[MikaMiku MCP] Spawning: ${cmd} ${args.join(" ")} in ${targetCwd}`);
        const proc = spawn(cmd, args, {
            cwd: targetCwd,
            shell: true,
            env: { ...process.env, PAGER: "cat" }
        });
        let output = "";
        proc.stdout.on("data", (data) => {
            output += data.toString();
        });
        proc.stderr.on("data", (data) => {
            output += data.toString();
        });
        proc.on("close", (code) => {
            resolve({ code, output });
        });
        proc.on("error", (err) => {
            resolve({ code: -1, output: `Process spawn error: ${err.message}` });
        });
    });
}
// Track temporary folders to clean them up on exit or on completion.
const tempDirsToCleanup = [];
// Register automatic cleanup on process exit
process.on("exit", () => {
    for (const dir of tempDirsToCleanup) {
        try {
            import("fs").then(({ rmSync }) => {
                rmSync(dir, { recursive: true, force: true });
            });
        }
        catch { }
    }
});
// Helper to resolve local path or download + extract GitHub repo
async function resolveProjectPath(inputPath) {
    const githubUrlRegex = /^https?:\/\/(?:www\.)?github\.com\/([^/]+)\/([^/]+)(?:\/tree\/([^/]+))?/;
    const shorthandRegex = /^([^/]+)\/([^/#]+)(?:#([^/]+))?$/;
    let owner = "";
    let repo = "";
    let ref = "";
    const isLocalWindowsPath = inputPath.includes("\\") || /^[a-zA-Z]:/.test(inputPath);
    const urlMatch = inputPath.match(githubUrlRegex);
    const shorthandMatch = inputPath.match(shorthandRegex);
    if (!isLocalWindowsPath && (urlMatch || shorthandMatch)) {
        if (urlMatch) {
            owner = urlMatch[1];
            repo = urlMatch[2];
            ref = urlMatch[3] || "";
        }
        else if (shorthandMatch) {
            owner = shorthandMatch[1];
            repo = shorthandMatch[2];
            ref = shorthandMatch[3] || "";
        }
        if (repo.endsWith(".git")) {
            repo = repo.slice(0, -4);
        }
        console.error(`[MikaMiku MCP] Detected GitHub Repository: ${owner}/${repo} (ref: ${ref || "default"})`);
        const githubToken = process.env.GITHUB_TOKEN;
        const zipUrl = `https://api.github.com/repos/${owner}/${repo}/zipball/${ref}`;
        console.error(`[MikaMiku MCP] Fetching zipball from: ${zipUrl}`);
        const response = await fetch(zipUrl, {
            headers: {
                "User-Agent": "MikaMiku-MCP-Server",
                ...(githubToken ? { "Authorization": `token ${githubToken}` } : {})
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch zipball from GitHub: ${response.statusText} (${response.status})`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const tempDir = join(workspaceRoot, "mcp-server", "tmp");
        await fs.mkdir(tempDir, { recursive: true });
        const uniqueName = `github-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        const runDir = join(tempDir, uniqueName);
        await fs.mkdir(runDir, { recursive: true });
        const zipPath = join(runDir, "repo.zip");
        await fs.writeFile(zipPath, buffer);
        console.error(`[MikaMiku MCP] Extracting repository archive...`);
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(runDir, true);
        await fs.unlink(zipPath);
        const extractedEntries = await fs.readdir(runDir);
        let resolvedPath = runDir;
        if (extractedEntries.length === 1) {
            resolvedPath = join(runDir, extractedEntries[0]);
        }
        tempDirsToCleanup.push(runDir);
        console.error(`[MikaMiku MCP] Resolved GitHub repository to: ${resolvedPath}`);
        return { resolvedPath, isTemporary: true, tempBaseDir: runDir };
    }
    const resolvedPath = resolve(process.cwd(), inputPath);
    return { resolvedPath, isTemporary: false };
}
// Create the MCP server instance
const server = new Server({
    name: "mikamiku-mcp-server",
    version: "2.0.0",
}, {
    capabilities: {
        tools: {},
        resources: {},
        prompts: {},
    },
});
// Register Tool Listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "detect-tech-stack",
                description: "Automatically detect the technology stack (languages, build tools, test frameworks) in the specified directory.",
                inputSchema: {
                    type: "object",
                    properties: {
                        projectPath: {
                            type: "string",
                            description: "Absolute or relative path to the project directory. Defaults to current directory."
                        }
                    }
                }
            },
            {
                name: "build-test-loop",
                description: "Executes the MikaMiku Build-Test-Loop protocol (build, test, lint, and security audit) for the project stack detected in the specified directory.",
                inputSchema: {
                    type: "object",
                    properties: {
                        projectPath: {
                            type: "string",
                            description: "Absolute or relative path to the project directory. Defaults to current directory."
                        }
                    }
                }
            },
            {
                name: "security-check",
                description: "Runs the MikaMiku static security scanner to check for hardcoded secrets, injection vulnerabilities, and other safety issues in files.",
                inputSchema: {
                    type: "object",
                    properties: {
                        targetPath: {
                            type: "string",
                            description: "Path to a file or directory to scan. Defaults to current directory."
                        }
                    }
                }
            },
            {
                name: "validate-architecture",
                description: "Scans the project directory structure, checks file/function lengths, and reports architectural issues or TODO markers.",
                inputSchema: {
                    type: "object",
                    properties: {
                        projectPath: {
                            type: "string",
                            description: "Path to the project directory to validate."
                        }
                    },
                    required: ["projectPath"]
                }
            }
        ]
    };
});
// Register Tool Execution Handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const projectPathArg = (args?.projectPath || args?.targetPath || ".");
    let resolvedPath = "";
    let isTemporary = false;
    let tempBaseDir = undefined;
    try {
        const result = await resolveProjectPath(projectPathArg);
        resolvedPath = result.resolvedPath;
        isTemporary = result.isTemporary;
        tempBaseDir = result.tempBaseDir;
    }
    catch (err) {
        return {
            content: [{ type: "text", text: `Failed to resolve repository path: ${err.message}` }],
            isError: true
        };
    }
    console.error(`[MikaMiku MCP] CallTool: ${name} on path: ${resolvedPath}`);
    try {
        switch (name) {
            case "detect-tech-stack": {
                const scriptPath = join(workspaceRoot, "scripts/detect-tech-stack.js");
                const { code, output } = await executeScript("node", [scriptPath, resolvedPath], workspaceRoot);
                return {
                    content: [{ type: "text", text: output }],
                    isError: code !== 0
                };
            }
            case "build-test-loop": {
                const scriptPath = join(workspaceRoot, "scripts/build-test-loop.js");
                const { code, output } = await executeScript("node", [scriptPath, resolvedPath], workspaceRoot);
                return {
                    content: [{ type: "text", text: output }],
                    isError: code !== 0
                };
            }
            case "security-check": {
                const scriptPath = join(workspaceRoot, "scripts/security-check.py");
                const { code, output } = await executeScript("python", [scriptPath, resolvedPath], workspaceRoot);
                return {
                    content: [{ type: "text", text: output }],
                    isError: code !== 0
                };
            }
            case "validate-architecture": {
                const scriptPath = join(workspaceRoot, "scripts/validate-architecture.js");
                const { code, output } = await executeScript("node", [scriptPath, resolvedPath], workspaceRoot);
                return {
                    content: [{ type: "text", text: output }],
                    isError: code !== 0
                };
            }
            default:
                throw new Error(`Tool not found: ${name}`);
        }
    }
    catch (error) {
        return {
            content: [{ type: "text", text: `Error executing tool: ${error.message}` }],
            isError: true
        };
    }
    finally {
        if (isTemporary && tempBaseDir) {
            try {
                console.error(`[MikaMiku MCP] Performing immediate cleanup for: ${tempBaseDir}`);
                await fs.rm(tempBaseDir, { recursive: true, force: true });
                const idx = tempDirsToCleanup.indexOf(tempBaseDir);
                if (idx !== -1)
                    tempDirsToCleanup.splice(idx, 1);
            }
            catch (err) {
                console.error(`[MikaMiku MCP] Immediate cleanup failed: ${err.message}`);
            }
        }
    }
});
// Register Resources Listing
server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
        resources: RESOURCES.map(res => ({
            uri: res.uri,
            name: res.name,
            mimeType: "text/markdown",
            description: res.description
        }))
    };
});
// Register Resource Reading Handler
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;
    const match = RESOURCES.find(res => res.uri === uri);
    if (!match) {
        throw new Error(`Resource not found for URI: ${uri}`);
    }
    const absoluteFilePath = join(workspaceRoot, match.filePath);
    try {
        const textContent = await fs.readFile(absoluteFilePath, "utf-8");
        return {
            contents: [{
                    uri: match.uri,
                    mimeType: "text/markdown",
                    text: textContent
                }]
        };
    }
    catch (err) {
        throw new Error(`Failed to read file ${absoluteFilePath}: ${err.message}`);
    }
});
// Register Prompts Listing
server.setRequestHandler(ListPromptsRequestSchema, async () => {
    return {
        prompts: [
            {
                name: "mikamiku-activate",
                description: "Initializes the session with the complete MikaMiku cognitive framework and operational rules.",
                arguments: [
                    {
                        name: "projectType",
                        description: "The kind of project being engineered (e.g. game engine, kernel, web app, mobile app)",
                        required: false
                    },
                    {
                        name: "requirements",
                        description: "Summary of session requirements or context details",
                        required: false
                    }
                ]
            }
        ]
    };
});
// Register Prompt Getting Handler
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    if (name !== "mikamiku-activate") {
        throw new Error(`Prompt not found: ${name}`);
    }
    const projectType = args?.projectType || "software engineering project";
    const requirements = args?.requirements || "Rigorous, high-performance execution";
    const promptText = `Activate MikaMiku Cognitive Amplification Protocol.
You are now operating in MIKAMIKU AUTONOMOUS ENGINEERING MODE.

Project Type: ${projectType}
Context/Requirements: ${requirements}

Core Directives to Enforce:
1. Build-Test-Loop (BTL): You must compile, test, lint, and run dependency audits before delivering code or claiming success.
2. Context Persistence Protocol (CPP): Maintain a running checklist and decision log in your working memory.
3. Anti-Hallucination Engine (AHE): Never invent API endpoints or dependencies. Verify standard library version constraints.
4. Error Immunity Protocol (EIP): Never repeat verified regressions or re-introduce bugs. Perform a strict mental diff on code modifications.
5. Classical Composition & Zero-Slop Aesthetics: If building a frontend or UI component, strictly respect the 8-point grid, golden ratio proportions, fluid typography, HSL tailored palettes, dark mode defaults, and ma (whitespace).
6. Security Hardening by Default: Apply STRIDE threat modeling and defense-in-depth across input validation, cryptography (AES-256-GCM, Argon2id), transport (TLS 1.3), and runtime environments.

Available MikaMiku Reference Libraries:
- mikamiku://guidelines/skill (Core skill documentation)
- mikamiku://references/coding-patterns (Universal coding guidelines)
- mikamiku://references/design-principles (Zero-slop frontend rules)
- mikamiku://references/security-hardening (Defense-in-depth guidelines)
- mikamiku://references/systems-architecture (Game engine & operating system specs)

Proceed with senior staff+ engineering precision and flawless craft.`;
    return {
        description: "MikaMiku initialization prompt",
        messages: [
            {
                role: "user",
                content: {
                    type: "text",
                    text: promptText
                }
            }
        ]
    };
});
// Main stdio loop initialization
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("[MikaMiku MCP] Server successfully connected to Stdio transport.");
}
main().catch((error) => {
    console.error("[MikaMiku MCP] Fatal Server Error:", error);
    process.exit(1);
});
