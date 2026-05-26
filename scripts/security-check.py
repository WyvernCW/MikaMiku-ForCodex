#!/usr/bin/env python3
"""
MikaMiku Security Scanner
Performs static security analysis on source code files.
Supports: Python, JavaScript, TypeScript, Go, Rust, C, C++, Java, Kotlin, Swift
Usage: python3 security-check.py <file-or-directory>
"""

import sys
import os
import re
from pathlib import Path

RULES = [
    ("HARDCODED_SECRET", r'(password|secret|token|api_key|apikey|access_token)\s*=\s*["'][^"']+["']', "CRITICAL"),
    ("SQL_INJECTION", r'(execute|query|raw|exec)\s*\(.*\+.*\)|query\s*\(.*\$\{.*\}', "CRITICAL"),
    ("COMMAND_INJECTION", r'os\.system\s*\(|subprocess\.call\s*\(.*shell\s*=\s*True|subprocess\.run\s*\(.*shell\s*=\s*True', "CRITICAL"),
    ("EVAL_DANGER", r'eval\s*\(|exec\s*\(', "HIGH"),
    ("PICKLE_USAGE", r'pickle\.(loads|load)\s*\(', "HIGH"),
    ("YAML_LOAD", r'yaml\.load\s*\([^,]*\)(?!.*Loader)', "HIGH"),
    ("DEBUG_ENABLED", r'DEBUG\s*=\s*True|debug:\s*true', "MEDIUM"),
    ("BARE_EXCEPT", r'except\s*:', "MEDIUM"),
    ("ASSERT_IN_PROD", r'assert\s+', "LOW"),
    ("INSECURE_RANDOM", r'random\.randint|Math\.random\(\)', "MEDIUM"),
    ("HARDCODED_IP", r'(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)', "LOW"),
]

def scan_file(filepath):
    findings = []
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            lines = content.split('\n')
    except Exception as e:
        return [("ERROR", 0, f"Cannot read file: {e}")]

    for rule_name, pattern, severity in RULES:
        regex = re.compile(pattern, re.IGNORECASE)
        for i, line in enumerate(lines, 1):
            if regex.search(line):
                findings.append((rule_name, i, severity, line.strip()[:80]))

    return findings

def main():
    target = sys.argv[1] if len(sys.argv) > 1 else '.'

    print("🛡️  MikaMiku Security Scanner")
    print("=" * 60)

    if os.path.isfile(target):
        files = [target]
    else:
        files = list(Path(target).rglob('*'))
        files = [f for f in files if f.is_file() and f.suffix in ['.py', '.js', '.ts', '.go', '.rs', '.c', '.cpp', '.java', '.kt', '.swift', '.jsx', '.tsx']]

    total_findings = 0

    for filepath in files:
        findings = scan_file(str(filepath))
        if findings:
            print(f"\n📄 {filepath}")
            for rule, line, severity, code in findings:
                icon = {"CRITICAL": "🔴", "HIGH": "🟠", "MEDIUM": "🟡", "LOW": "🔵", "ERROR": "⚫"}.get(severity, "⚪")
                print(f"   {icon} [{severity}] {rule} at line {line}: {code}")
                total_findings += 1

    print(f"\n{'=' * 60}")
    if total_findings == 0:
        print("✅ No security issues detected!")
    else:
        print(f"⚠️  Total findings: {total_findings}")
        print("💡 Review CRITICAL and HIGH severity items immediately.")
        print("🔁 After fixing, rerun the Build-Test-Loop.")

if __name__ == '__main__':
    main()
