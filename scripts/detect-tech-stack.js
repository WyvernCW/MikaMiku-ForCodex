#!/usr/bin/env node
/**
 * MikaMiku Tech Stack Detector
 * Analyzes a project and reports detected technologies with build/test commands.
 * Usage: node detect-tech-stack.js [project-path]
 */

const fs = require('fs');
const path = require('path');

const projectPath = process.argv[2] || '.';
const absPath = path.resolve(projectPath);

console.log('🔍 MikaMiku Tech Stack Detector');
console.log('='.repeat(60));
console.log(`Project: ${absPath}\n`);

const checks = [
  { name: 'Node.js / TypeScript', files: ['package.json', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'], cmd: 'npm install && npm run build && npm test' },
  { name: 'Python', files: ['requirements.txt', 'pyproject.toml', 'setup.py', 'setup.cfg', 'Pipfile', 'poetry.lock'], cmd: 'pip install -r requirements.txt && python -m pytest' },
  { name: 'Rust', files: ['Cargo.toml', 'Cargo.lock'], cmd: 'cargo build && cargo test' },
  { name: 'Go', files: ['go.mod', 'go.sum'], cmd: 'go build ./... && go test ./...' },
  { name: 'Java (Maven)', files: ['pom.xml'], cmd: 'mvn compile && mvn test' },
  { name: 'Java (Gradle)', files: ['build.gradle', 'build.gradle.kts', 'gradlew'], cmd: './gradlew build && ./gradlew test' },
  { name: 'Flutter', files: ['pubspec.yaml'], cmd: 'flutter pub get && flutter build && flutter test' },
  { name: '.NET', files: ['.csproj', '.sln'], cmd: 'dotnet build && dotnet test' },
  { name: 'Ruby', files: ['Gemfile', 'Gemfile.lock'], cmd: 'bundle install && bundle exec rspec' },
  { name: 'Elixir', files: ['mix.exs', 'mix.lock'], cmd: 'mix deps.get && mix compile && mix test' },
  { name: 'Docker', files: ['Dockerfile', 'docker-compose.yml', 'docker-compose.yaml'], cmd: 'docker build . && docker-compose up --build' },
  { name: 'CMake (C/C++)', files: ['CMakeLists.txt'], cmd: 'cmake -B build && cmake --build build && ctest --test-dir build' },
  { name: 'Make (C/C++)', files: ['Makefile'], cmd: 'make && make test' },
];

const found = [];
for (const check of checks) {
  const detected = check.files.some(f => {
    if (f.startsWith('.')) {
      return fs.readdirSync(absPath).some(entry => entry.endsWith(f));
    }
    return fs.existsSync(path.join(absPath, f));
  });
  if (detected) {
    found.push(check);
  }
}

if (found.length === 0) {
  console.log('⚠️  No recognized tech stack found.');
  console.log('   Looking for: package.json, Cargo.toml, go.mod, pom.xml, etc.');
} else {
  console.log(`✅ Detected ${found.length} stack(s):\n`);
  found.forEach((f, i) => {
    console.log(`${i + 1}. ${f.name}`);
    console.log(`   Build-Test command: ${f.cmd}`);
    console.log('');
  });

  console.log('💡 MikaMiku Build-Test-Loop Protocol:');
  console.log('   1. Run the build command above');
  console.log('   2. Run the test command above');
  console.log('   3. If any errors, fix and return to step 1');
  console.log('   4. Only proceed when all pass');
}
