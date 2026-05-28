#!/bin/bash
# MikaMiku Complexity Analyzer
# Measures code metrics and provides complexity guidelines
# Usage: ./complexity-analyzer.sh <directory>

TARGET="${1:-.}"

echo "📊 MikaMiku Complexity Analysis"
echo "================================"
echo "Target: $TARGET"
echo ""

# Count lines of code
echo "📏 Lines of Code (approximate):"
find "$TARGET" -type f \
    \( -name "*.py" -o -name "*.js" -o -name "*.ts" -o -name "*.jsx" -o -name "*.tsx" -o -name "*.go" -o -name "*.rs" -o -name "*.c" -o -name "*.cpp" -o -name "*.java" -o -name "*.kt" -o -name "*.swift" \) \
    -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/vendor/*" -not -path "*/dist/*" -not -path "*/build/*" -not -path "*/target/*" \
    | xargs wc -l 2>/dev/null | tail -1

echo ""
echo "📁 File Distribution:"
for ext in py js ts jsx tsx go rs c cpp java kt swift; do
    count=$(find "$TARGET" -type f -name "*.$ext" -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/vendor/*" -not -path "*/dist/*" -not -path "*/build/*" -not -path "*/target/*" | wc -l)
    if [ "$count" -gt 0 ]; then
        echo "  .$ext: $count files"
    fi
done

echo ""
echo "📐 MikaMiku Complexity Guidelines:"
echo "  - Functions should be < 50 lines"
echo "  - Cyclomatic complexity < 10 per function"
echo "  - Files should be < 400 lines (consider splitting)"
echo "  - Nesting depth < 4 levels"
echo "  - Class length < 300 lines"
echo "  - Method count per class < 20"
echo ""
echo "🔧 For detailed complexity metrics, install:"
echo "  Python:    pip install radon"
echo "  JS/TS:     npm install -g complexity-report"
echo "  Go:        go install github.com/fzipp/gocyclo@latest"
echo "  Rust:      cargo install cargo-geiger"
echo "  Java:      mvn com.github.mucsi96:wagon-maven-plugin:complexity"
echo ""
echo "🔁 Run these as part of your Build-Test-Loop."
