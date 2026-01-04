#!/bin/bash
# Automated git commit and push script
# Usage: ./scripts/git-commit-push.sh "commit message"

set -e

# Ensure we're on main branch
CURRENT_BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Not on main branch. Switching to main..."
    git checkout main
    git pull origin main
fi

# Get commit message
COMMIT_MSG="${1:-chore: automated commit}"

# Check if there are changes
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ No changes to commit"
    exit 0
fi

# Stage all changes
echo "📦 Staging changes..."
git add -A

# Commit
echo "💾 Committing: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

# Push (post-commit hook will handle this, but we'll do it explicitly too)
echo "🚀 Pushing to origin/main..."
git push origin main

echo "✅ Successfully committed and pushed to main!"
