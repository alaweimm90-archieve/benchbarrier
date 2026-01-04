#!/bin/bash
# merge-all-prs.sh
# Automated script to merge all open pull requests

set -e

echo "🔍 Fetching all open PRs..."
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "📦 Install it with: sudo dnf install gh"
    echo "🔗 Or visit: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub CLI"
    echo "🔐 Run: gh auth login"
    exit 1
fi

# Get all open PRs
PR_COUNT=$(gh pr list --state open --json number --jq 'length')

if [ "$PR_COUNT" -eq 0 ]; then
    echo "✅ No open PRs found!"
    exit 0
fi

echo "📊 Found $PR_COUNT open PR(s)"
echo ""

# Process each PR
gh pr list --state open --json number,title,headRefName,baseRefName --jq '.[] | "\(.number)|\(.title)|\(.headRefName)|\(.baseRefName)"' | while IFS='|' read -r number title branch base; do
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "📝 PR #$number: $title"
  echo "   Branch: $branch → $base"
  echo ""
  
  # Check if PR is mergeable
  MERGEABLE=$(gh pr view "$number" --json mergeable --jq '.mergeable')
  
  if [ "$MERGEABLE" != "MERGEABLE" ]; then
    echo "   ⚠️  PR is not mergeable (conflicts or checks failing)"
    echo "   Skipping..."
    continue
  fi
  
  echo "   🔄 Merging with squash strategy..."
  
  # Merge with squash and delete branch
  if gh pr merge "$number" --squash --delete-branch --auto; then
    echo "   ✅ Successfully merged and deleted branch"
  else
    echo "   ❌ Failed to merge (may require manual review)"
  fi
  
  echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🧹 Cleaning up local branches..."
git fetch --prune

# Delete local branches that have been merged
git branch --merged | grep -v "\*\|main\|dev" | xargs -r git branch -d 2>/dev/null || true

echo ""
echo "✅ All done!"
echo ""
echo "📊 Summary:"
echo "   - Processed: $PR_COUNT PR(s)"
echo "   - Local branches cleaned up"
echo "   - Remote references pruned"
