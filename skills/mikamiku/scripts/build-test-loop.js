#!/usr/bin/env node
/**
 * MikaMiku Build-Test-Loop Orchestrator
 * Automatically detects tech stack and runs appropriate build/test/lint commands.
 * Usage: node build-test-loop.js [project-path]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectPath = process.argv[2] || '.';
const absPath = path.resolve(projectPath);

console.log('🔧 MikaMiku Build-Test-Loop Starting...');
console.log(`📁 Project: ${absPath}`);
console.log('='.repeat(60));

// Tech stack detection
function detectStack(projectDir) {
  const files = fs.readdirSync(projectDir);
  const stack = {
    node: fs.existsSync(path.join(projectDir, 'package.json')),
    python: fs.existsSync(path.join(projectDir, 'requirements.txt')) || fs.existsSync(path.join(projectDir, 'pyproject.toml')) || fs.existsSync(path.join(projectDir, 'setup.py')),
    rust: fs.existsSync(path.join(projectDir, 'Cargo.toml')),
    go: fs.existsSync(path.join(projectDir, 'go.mod')),
    java: fs.existsSync(path.join(projectDir, 'pom.xml')) || fs.existsSync(path.join(projectDir, 'build.gradle')),
    flutter: fs.existsSync(path.join(projectDir, 'pubspec.yaml')),
    dotnet: files.some(f => f.endsWith('.csproj') || f.endsWith('.sln')),
    cmake: fs.existsSync(path.join(projectDir, 'CMakeLists.txt')),
    make: fs.existsSync(path.join(projectDir, 'Makefile')),
    docker: fs.existsSync(path.join(projectDir, 'Dockerfile')),
    ruby: fs.existsSync(path.join(projectDir, 'Gemfile')),
    elixir: fs.existsSync(path.join(projectDir, 'mix.exs')),
  };
  return stack;
}

// Command definitions per stack
const COMMANDS = {
  node: {
    name: 'Node.js / TypeScript',
    build: ['npm run build', 'npm install && npm run build'],
    test: ['npm test', 'npm run test'],
    lint: ['npm run lint', 'npx tsc --noEmit', 'npm run type-check'],
    audit: ['npm audit', 'npm audit --audit-level=moderate'],
  },
  python: {
    name: 'Python',
    build: ['python -m compileall .', 'python setup.py build'],
    test: ['python -m pytest', 'pytest', 'python -m unittest discover'],
    lint: ['python -m flake8', 'python -m pylint .', 'python -m mypy .', 'black --check .'],
    audit: ['pip-audit', 'safety check'],
  },
  rust: {
    name: 'Rust',
    build: ['cargo build', 'cargo build --release'],
    test: ['cargo test'],
    lint: ['cargo clippy', 'cargo fmt --check'],
    audit: ['cargo audit'],
  },
  go: {
    name: 'Go',
    build: ['go build ./...'],
    test: ['go test ./...'],
    lint: ['go vet ./...', 'gofmt -l .'],
    audit: ['nancy sleuth', 'govulncheck ./...'],
  },
  java: {
    name: 'Java',
    build: ['./mvnw compile', 'mvn compile', './gradlew build'],
    test: ['./mvnw test', 'mvn test', './gradlew test'],
    lint: ['./mvnw checkstyle:check', './gradlew check'],
    audit: ['mvn org.owasp:dependency-check-maven:check'],
  },
  flutter: {
    name: 'Flutter / Dart',
    build: ['flutter build apk', 'flutter build web', 'dart compile exe bin/main.dart'],
    test: ['flutter test', 'dart test'],
    lint: ['flutter analyze', 'dart analyze'],
    audit: [],
  },
  cmake: {
    name: 'C/C++ (CMake)',
    build: ['cmake -B build && cmake --build build'],
    test: ['ctest --test-dir build'],
    lint: ['cppcheck --enable=all .', 'clang-tidy src/**/*.cpp'],
    audit: [],
  },
  make: {
    name: 'C/C++ (Make)',
    build: ['make'],
    test: ['make test', 'make check'],
    lint: ['cppcheck --enable=all .'],
    audit: [],
  },
  dotnet: {
    name: '.NET',
    build: ['dotnet build'],
    test: ['dotnet test'],
    lint: ['dotnet format --verify-no-changes'],
    audit: ['dotnet list package --vulnerable'],
  },
  ruby: {
    name: 'Ruby',
    build: ['bundle install'],
    test: ['bundle exec rspec', 'bundle exec rake test'],
    lint: ['bundle exec rubocop'],
    audit: ['bundle audit'],
  },
  elixir: {
    name: 'Elixir',
    build: ['mix compile'],
    test: ['mix test'],
    lint: ['mix format --check-formatted', 'mix credo'],
    audit: ['mix hex.audit'],
  },
};

function runCommand(cmd, label) {
  console.log(`\n▶️  [${label}] ${cmd}`);
  try {
    const output = execSync(cmd, {
      cwd: absPath,
      encoding: 'utf-8',
      stdio: 'pipe',
      timeout: 120000,
    });
    console.log('   ✅ PASSED');
    if (output.trim()) console.log(output.trim().split('\n').map(l => `   ${l}`).join('\n'));
    return { success: true, output };
  } catch (error) {
    console.log('   ❌ FAILED');
    if (error.stdout) console.log(error.stdout.trim().split('\n').map(l => `   ${l}`).join('\n'));
    if (error.stderr) console.log(error.stderr.trim().split('\n').map(l => `   ${l}`).join('\n'));
    return { success: false, error };
  }
}

function tryCommands(commands, label) {
  for (const cmd of commands) {
    const result = runCommand(cmd, label);
    if (result.success) return result;
  }
  return { success: false };
}

// Main execution
const stack = detectStack(absPath);
const detected = Object.entries(stack).filter(([_, v]) => v).map(([k, _]) => k);

if (detected.length === 0) {
  console.log('⚠️  No recognizable tech stack detected.');
  console.log('   Supported: Node.js, Python, Rust, Go, Java, Flutter, .NET, C/C++, Ruby, Elixir');
  process.exit(1);
}

console.log(`🔍 Detected stacks: ${detected.map(k => COMMANDS[k]?.name || k).join(', ')}`);
console.log('');

let allPassed = true;
const failures = [];

for (const tech of detected) {
  const cfg = COMMANDS[tech];
  if (!cfg) continue;

  console.log(`\n📦 ${cfg.name}`);
  console.log('-'.repeat(40));

  // BUILD
  const buildResult = tryCommands(cfg.build, 'BUILD');
  if (!buildResult.success) {
    allPassed = false;
    failures.push({ tech, phase: 'BUILD' });
    console.log('   ⛔ BUILD failed. Stopping further tests for this stack.');
    continue;
  }

  // TEST
  const testResult = tryCommands(cfg.test, 'TEST');
  if (!testResult.success) {
    allPassed = false;
    failures.push({ tech, phase: 'TEST' });
    console.log('   ⛔ TEST failed. Stopping further checks for this stack.');
    continue;
  }

  // LINT
  const lintResult = tryCommands(cfg.lint, 'LINT');
  if (!lintResult.success) {
    allPassed = false;
    failures.push({ tech, phase: 'LINT' });
  }

  // AUDIT
  if (cfg.audit.length > 0) {
    const auditResult = tryCommands(cfg.audit, 'AUDIT');
    if (!auditResult.success) {
      allPassed = false;
      failures.push({ tech, phase: 'AUDIT' });
    }
  }
}

console.log('\n' + '='.repeat(60));
if (allPassed) {
  console.log('🎉 ALL CHECKS PASSED — Build-Test-Loop complete!');
  console.log('   You may proceed with confidence.');
  process.exit(0);
} else {
  console.log('⛔ BUILD-TEST-LOOP FAILED');
  console.log('   Failures detected:');
  failures.forEach(f => console.log(`     - ${f.tech}: ${f.phase}`));
  console.log('\n   🔁 Return to BUILD phase. Fix errors and rerun.');
  process.exit(1);
}
