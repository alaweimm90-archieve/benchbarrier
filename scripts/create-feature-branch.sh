#!/bin/bash
# create-feature-branch.sh
# Helper script to create properly named feature branches

set -e

# Check if feature name is provided
if [ -z "$1" ]; then
    echo "❌ Error: Feature name is required"
    echo ""
    echo "Usage: ./create-feature-branch.sh <type> <feature-name>"
    echo ""
    echo "Types:"
    echo "  feature  - New feature"
    echo "  fix      - Bug fix"
    echo "  hotfix   - Urgent production fix"
    echo "  refactor - Code refactoring"
    echo "  docs     - Documentation changes"
    echo "  test     - Test additions/changes"
    echo ""
    echo "Example: ./create-feature-branch.sh feature user-authentication"
    exit 1
fi

TYPE=$1
FEATURE_NAME=$2

# Validate type
if [[ ! "$TYPE" =~ ^(feature|fix|hotfix|refactor|docs|test)$ ]]; then
    echo "❌ Error: Invalid type '$TYPE'"
    echo "Valid types: feature, fix, hotfix, refactor, docs, test"
    exit 1
fi

# Check if feature name is provided
if [ -z "$FEATURE_NAME" ]; then
    echo "❌ Error: Feature name is required"
    echo "Example: ./create-feature-branch.sh $TYPE user-authentication"
    exit 1
fi

# Sanitize feature name (replace spaces with hyphens, lowercase)
FEATURE_NAME=$(echo "$FEATURE_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9-]//g')

BRANCH_NAME="$TYPE/$FEATURE_NAME"

echo "🌿 Creating new branch: $BRANCH_NAME"
echo ""

# Make sure we're on dev and it's up to date
echo "📥 Updating dev branch..."
git checkout dev
git pull origin dev

echo ""
echo "🔀 Creating branch: $BRANCH_NAME"
git checkout -b "$BRANCH_NAME"

echo ""
echo "✅ Branch created successfully!"
echo ""
echo "📝 Next steps:"
echo "   1. Make your changes"
echo "   2. Commit: git add . && git commit -m '$TYPE: your commit message'"
echo "   3. Push: git push origin $BRANCH_NAME"
echo "   4. Create PR: gh pr create --base dev --title 'Your PR title'"
echo ""
echo "🎯 Current branch: $BRANCH_NAME"
