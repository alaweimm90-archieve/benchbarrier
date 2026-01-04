#!/bin/bash
# Cleanup all branches except main
# This will delete all local and remote branches except main

set -e

echo "🧹 Cleaning up branches..."

# Fetch latest
git fetch origin --prune

# Get current branch
CURRENT_BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null)

# Switch to main if not already there
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "📍 Switching to main branch..."
    git checkout main
    git pull origin main
fi

# Delete all local branches except main
echo "🗑️  Deleting local branches..."
git branch | grep -v "main" | grep -v "^\*" | xargs -r git branch -D

# List remote branches to delete
echo "🌐 Remote branches to delete:"
git branch -r | grep -v "main" | grep -v "HEAD" | sed 's/origin\///' | while read branch; do
    echo "  - $branch"
done

# Ask for confirmation (or auto-confirm in CI)
if [ "$CI" = "true" ] || [ "$AUTO_CONFIRM" = "true" ]; then
    CONFIRM="y"
else
    read -p "Delete these remote branches? (y/N): " CONFIRM
fi

if [ "$CONFIRM" = "y" ] || [ "$CONFIRM" = "Y" ]; then
    git branch -r | grep -v "main" | grep -v "HEAD" | sed 's/origin\///' | while read branch; do
        echo "🗑️  Deleting origin/$branch..."
        git push origin --delete "$branch" 2>/dev/null || echo "   (already deleted)"
    done
    echo "✅ Branch cleanup complete!"
else
    echo "❌ Cleanup cancelled"
fi
