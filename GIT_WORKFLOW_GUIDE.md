# Git Workflow & Branch Management Guide

## 🔍 Current Repository Analysis

**Repository**: `alaweimm90-archieve/benchbarrier`

**Current Branches**:
- `main` - Production branch
- `dev` - Development branch (merged from main)
- `agent/benchbarrier-website-development-prompts-tailored-2866-blackbox` - Current working branch
- Multiple copilot branches (sub-pr-3, sub-pr-3-again, sub-pr-3-another-one, etc.)

**Problem**: Too many branches being created automatically, cluttering the repository.

---

## 🎯 Recommended Git Workflow

### **Branch Strategy**

```
main (production)
  ↑
dev (development/staging)
  ↑
feature/your-feature-name (short-lived feature branches)
```

### **Core Branches**

1. **`main`** - Production-ready code only
   - Protected branch
   - Only accepts PRs from `dev`
   - Requires code review
   - Auto-deploys to production

2. **`dev`** - Active development
   - Integration branch
   - Accepts PRs from feature branches
   - Auto-deploys to staging/preview
   - Should always be stable

3. **Feature Branches** - Short-lived, specific features
   - Named: `feature/feature-name` or `fix/bug-name`
   - Created from `dev`
   - Merged back to `dev` via PR
   - Deleted after merge

---

## 📋 Step-by-Step: Creating and Merging PRs

### **1. Start Working on a Feature**

```bash
# Make sure you're on dev and it's up to date
git checkout dev
git pull origin dev

# Create a new feature branch
git checkout -b feature/your-feature-name

# Work on your feature...
# Make commits...
git add .
git commit -m "feat: add your feature description"
```

### **2. Push Your Feature Branch**

```bash
# Push to remote
git push origin feature/your-feature-name
```

### **3. Create a Pull Request (PR)**

**Option A: Using GitHub CLI**
```bash
# Install GitHub CLI if not already installed
# On Amazon Linux: sudo dnf install gh

# Authenticate (one-time setup)
gh auth login

# Create PR from current branch to dev
gh pr create --base dev --head feature/your-feature-name --title "Add your feature" --body "Description of changes"
```

**Option B: Using GitHub Web Interface**
1. Go to: https://github.com/alaweimm90-archieve/benchbarrier
2. Click "Pull requests" tab
3. Click "New pull request"
4. Set base: `dev`, compare: `feature/your-feature-name`
5. Fill in title and description
6. Click "Create pull request"

### **4. Merge the PR**

**Option A: Using GitHub CLI**
```bash
# List open PRs
gh pr list

# Merge a specific PR (by number)
gh pr merge 123 --merge --delete-branch

# Or use squash merge (recommended for cleaner history)
gh pr merge 123 --squash --delete-branch
```

**Option B: Using GitHub Web Interface**
1. Open the PR on GitHub
2. Review changes
3. Click "Merge pull request"
4. Choose merge strategy:
   - **Merge commit** - Keeps all commits
   - **Squash and merge** - Combines all commits into one (recommended)
   - **Rebase and merge** - Replays commits on top of base
5. Click "Confirm merge"
6. Click "Delete branch" to clean up

### **5. Clean Up Local Branches**

```bash
# Switch back to dev
git checkout dev

# Pull the merged changes
git pull origin dev

# Delete local feature branch
git branch -d feature/your-feature-name

# Delete remote feature branch (if not auto-deleted)
git push origin --delete feature/your-feature-name
```

---

## 🧹 Cleaning Up Existing Branches

### **Delete Old/Unused Branches**

```bash
# List all remote branches
git ls-remote --heads origin

# Delete specific remote branch
git push origin --delete copilot/sub-pr-3
git push origin --delete copilot/sub-pr-3-again
git push origin --delete copilot/sub-pr-3-another-one
git push origin --delete copilot/sub-pr-3-yet-again

# Delete multiple branches at once
git push origin --delete \
  copilot/sub-pr-3 \
  copilot/sub-pr-3-again \
  copilot/sub-pr-3-another-one \
  copilot/sub-pr-3-yet-again \
  copilot/open-spark-session
```

### **Prune Deleted Remote Branches Locally**

```bash
# Remove references to deleted remote branches
git fetch --prune

# Or set it to prune automatically
git config --global fetch.prune true
```

---

## 🚫 Preventing Automatic Branch Creation

### **1. Configure Git to Avoid Auto-Branch Creation**

```bash
# Don't automatically create branches on push
git config --global push.default simple

# Require explicit branch creation
git config --global push.autoSetupRemote false
```

### **2. Use Branch Protection Rules (GitHub)**

1. Go to: https://github.com/alaweimm90-archieve/benchbarrier/settings/branches
2. Add rule for `main`:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - ✅ Include administrators
3. Add rule for `dev`:
   - ✅ Require pull request reviews (optional)
   - ✅ Require status checks to pass

### **3. Use a `.github/workflows` Branch Naming Convention**

Create `.github/branch-naming-policy.yml`:
```yaml
name: Branch Naming Policy
on:
  pull_request:
    types: [opened, edited, synchronize]

jobs:
  check-branch-name:
    runs-on: ubuntu-latest
    steps:
      - name: Check branch name
        run: |
          BRANCH_NAME="${{ github.head_ref }}"
          if [[ ! $BRANCH_NAME =~ ^(feature|fix|hotfix|refactor|docs|test)/.+ ]]; then
            echo "❌ Branch name must start with: feature/, fix/, hotfix/, refactor/, docs/, or test/"
            exit 1
          fi
          echo "✅ Branch name is valid: $BRANCH_NAME"
```

---

## 📊 Merge All Current PRs - Automated Script

### **Script: Merge All Open PRs**

```bash
#!/bin/bash
# merge-all-prs.sh

echo "🔍 Fetching all open PRs..."
gh pr list --state open --json number,title,headRefName --jq '.[] | "\(.number)|\(.title)|\(.headRefName)"' | while IFS='|' read -r number title branch; do
  echo ""
  echo "📝 PR #$number: $title"
  echo "   Branch: $branch"
  echo "   Merging..."
  
  # Merge with squash and delete branch
  gh pr merge "$number" --squash --delete-branch --auto
  
  if [ $? -eq 0 ]; then
    echo "   ✅ Successfully merged and deleted branch"
  else
    echo "   ❌ Failed to merge (may require manual review)"
  fi
done

echo ""
echo "🧹 Cleaning up local branches..."
git fetch --prune
git branch --merged | grep -v "\*\|main\|dev" | xargs -r git branch -d

echo "✅ Done!"
```

**Usage**:
```bash
chmod +x merge-all-prs.sh
./merge-all-prs.sh
```

---

## 🎯 Best Practices

### **DO:**
- ✅ Create feature branches from `dev`
- ✅ Use descriptive branch names: `feature/add-payment-system`
- ✅ Keep branches short-lived (1-3 days max)
- ✅ Delete branches after merging
- ✅ Pull latest `dev` before creating new branches
- ✅ Use squash merge for cleaner history
- ✅ Write clear PR descriptions

### **DON'T:**
- ❌ Work directly on `main` or `dev`
- ❌ Create branches with auto-generated names
- ❌ Keep branches alive for weeks
- ❌ Push directly to protected branches
- ❌ Create multiple branches for the same feature
- ❌ Forget to delete merged branches

---

## 🔄 Complete Workflow Example

```bash
# 1. Start fresh
git checkout dev
git pull origin dev

# 2. Create feature branch
git checkout -b feature/add-user-authentication

# 3. Work and commit
git add src/auth/
git commit -m "feat: add JWT authentication system"

# 4. Push to remote
git push origin feature/add-user-authentication

# 5. Create PR
gh pr create --base dev --title "Add user authentication" --body "Implements JWT-based auth system"

# 6. After review, merge PR
gh pr merge --squash --delete-branch

# 7. Clean up locally
git checkout dev
git pull origin dev
git branch -d feature/add-user-authentication

# 8. Repeat for next feature
```

---

## 🛠️ Quick Commands Reference

```bash
# List all branches
git branch -a

# List open PRs
gh pr list

# Create PR
gh pr create --base dev --head feature/my-feature

# Merge PR
gh pr merge 123 --squash --delete-branch

# Delete remote branch
git push origin --delete branch-name

# Delete local branch
git branch -d branch-name

# Prune deleted remote branches
git fetch --prune

# View PR details
gh pr view 123

# Checkout PR locally
gh pr checkout 123
```

---

## 📈 Monitoring Branch Health

### **Check for Stale Branches**

```bash
# List branches not updated in 30 days
git for-each-ref --sort=-committerdate refs/remotes/origin/ --format='%(committerdate:short) %(refname:short)' | grep -v 'main\|dev' | awk '$1 < "'$(date -d '30 days ago' +%Y-%m-%d)'"'
```

### **Automated Cleanup Script**

```bash
#!/bin/bash
# cleanup-stale-branches.sh

echo "🔍 Finding stale branches (>30 days old)..."

git fetch --prune

git for-each-ref --sort=-committerdate refs/remotes/origin/ --format='%(committerdate:short)|%(refname:short)' | \
  grep -v 'main\|dev' | \
  while IFS='|' read -r date branch; do
    days_old=$(( ($(date +%s) - $(date -d "$date" +%s)) / 86400 ))
    
    if [ $days_old -gt 30 ]; then
      branch_name=${branch#origin/}
      echo "🗑️  Deleting $branch_name (${days_old} days old)"
      git push origin --delete "$branch_name"
    fi
  done

echo "✅ Cleanup complete!"
```

---

## 🎓 Summary

**To avoid creating new branches constantly:**
1. Use a consistent naming convention (`feature/`, `fix/`, etc.)
2. Delete branches immediately after merging
3. Configure git to not auto-create branches
4. Use branch protection rules
5. Set up automated cleanup scripts
6. Follow the feature branch workflow strictly

**To merge all current PRs:**
1. Use `gh pr list` to see all open PRs
2. Use `gh pr merge <number> --squash --delete-branch` for each
3. Or use the automated script provided above

**Key Principle**: Keep your branch tree clean by treating branches as temporary workspaces, not permanent storage.
