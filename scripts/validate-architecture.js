#!/usr/bin/env node
/**
 * MikaMiku Architecture Validator
 * Scans project structure and reports architectural health.
 * Usage: node validate-architecture.js <project-path>
 */

const fs = require('fs');
const path = require('path');

const projectPath = process.argv[2];

if (!projectPath) {
  console.error('Usage: node validate-architecture.js <project-path>');
  process.exit(1);
}

function scanDirectory(dir, depth = 0) {
  const results = { files: [], dirs: [], issues: [] };

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === 'build' || entry.name === 'target') continue;
        results.dirs.push(fullPath);
        if (depth < 4) {
          const sub = scanDirectory(fullPath, depth + 1);
          results.files.push(...sub.files);
          results.issues.push(...sub.issues);
        }
      } else {
        results.files.push(fullPath);

        try {
          const content = fs.readFileSync(fullPath, 'utf-8');
          const lines = content.split('\n');

          // Check for hardcoded secrets
          if (content.match(/password\s*=\s*["'][^"']+["']/i) && !content.includes('process.env') && !content.includes('env.')) {
            results.issues.push(`[SECURITY] Possible hardcoded password in ${fullPath}`);
          }
          if (content.match(/api[_-]?key\s*=\s*["'][^"']+["']/i) && !content.includes('process.env')) {
            results.issues.push(`[SECURITY] Possible hardcoded API key in ${fullPath}`);
          }

          // Check for dangerous patterns
          if (content.includes('eval(') || content.match(/new\s+Function\s*\(/)) {
            results.issues.push(`[SECURITY] Dangerous eval/Function in ${fullPath}`);
          }

          // Check for TODO/FIXME
          if (content.match(/TODO|FIXME|HACK|XXX|BUG/i)) {
            const matches = content.match(/TODO|FIXME|HACK|XXX|BUG/gi);
            results.issues.push(`[MAINTENANCE] ${matches.length} TODO/FIXME markers in ${fullPath}`);
          }

          // Check file size
          if (lines.length > 400) {
            results.issues.push(`[SIZE] ${fullPath} has ${lines.length} lines (recommended max: 400)`);
          }

          // Check function length (rough heuristic for JS/TS)
          if (fullPath.match(/\.(js|ts|jsx|tsx)$/)) {
            const funcMatches = content.match(/function\s+\w+\s*\([^)]*\)\s*\{/g);
            if (funcMatches) {
              funcMatches.forEach((func, idx) => {
                const startIdx = content.indexOf(func);
                let braceCount = 1;
                let endIdx = startIdx + func.length;
                while (braceCount > 0 && endIdx < content.length) {
                  if (content[endIdx] === '{') braceCount++;
                  if (content[endIdx] === '}') braceCount--;
                  endIdx++;
                }
                const funcBody = content.substring(startIdx, endIdx);
                const funcLines = funcBody.split('\n').length;
                if (funcLines > 50) {
                  results.issues.push(`[COMPLEXITY] Function >50 lines (${funcLines}) in ${fullPath}`);
                }
              });
            }
          }
        } catch (e) {
          // Binary file or unreadable
        }
      }
    }
  } catch (err) {
    results.issues.push(`[ERROR] Cannot read ${dir}: ${err.message}`);
  }

  return results;
}

console.log(`🔍 MikaMiku Architecture Scan: ${projectPath}`);
console.log('='.repeat(60));

const scan = scanDirectory(projectPath);

console.log(`📁 Directories: ${scan.dirs.length}`);
console.log(`📄 Files: ${scan.files.length}`);
console.log(`⚠️  Issues: ${scan.issues.length}`);
console.log('');

if (scan.issues.length > 0) {
  scan.issues.forEach(issue => console.log(`  ${issue}`));
} else {
  console.log('  ✅ No issues detected. Architecture looks clean!');
}

console.log('');
console.log('💡 MikaMiku Recommendations:');
console.log('  - Ensure .env files are in .gitignore');
console.log('  - Run dependency audits regularly');
console.log('  - Keep functions under 50 lines where possible');
console.log('  - Keep files under 400 lines; split large modules');
console.log('  - Maintain test coverage > 80%');
console.log('  - Use the Build-Test-Loop for every change');
