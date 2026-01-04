#!/bin/bash
# cleanup-stale-branches.sh
# Automated script to delete stale branches (older than 30 days)

set -e

DAYS_THRESHOLD=${1:-30}

echo "🔍 Finding stale branches (>$DAYS_THRESHOLD days old)..."
echo ""

# Fetch latest and prune
git fetch --prune

# Get current date in seconds
CURRENT_DATE=$(date +%s)

# Counter for deleted branches
DELETED_COUNT=0

# Process each remote branch
git for-each-ref --sort=-committerdate refs/remotes/origin/ --format='%(committerdate:iso8601)|%(refname:short)' | \
  grep -v 'main\|dev' | \
  while IFS='|' read -r commit_date branch; do
    # Convert commit date to seconds
    COMMIT_TIMESTAMP=$(date -d "$commit_date" +%s 2>/dev/null || echo 0)
    
    if [ "$COMMIT_TIMESTAMP" -eq 0 ]; then
      continue
    fi
    
    # Calculate days old
    DAYS_OLD=$(( (CURRENT_DATE - COMMIT_TIMESTAMP) / 86400 ))
    
    if [ $DAYS_OLD -gt $DAYS_THRESHOLD ]; then
      BRANCH_NAME=${branch#origin/}
      echo "🗑️  Deleting: $BRANCH_NAME"
      echo "   Last commit: $commit_date ($DAYS_OLD days ago)"
      
      if git push origin --delete "$BRANCH_NAME" 2>/dev/null; then
        echo "   ✅ Deleted successfully"
        DELETED_COUNT=$((DELETED_COUNT + 1))
      else
        echo "   ⚠️  Failed to delete (may be protected or already deleted)"
      fi
      echo ""
    fi
  done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Cleanup complete!"
echo "📊 Deleted $DELETED_COUNT stale branch(es)"
