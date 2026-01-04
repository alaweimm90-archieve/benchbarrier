# Branch Management Guide

## 🎯 Quick Start

### Create a New Feature Branch
```bash
# Use the helper script
./scripts/create-feature-branch.sh feature user-authentication

# Or manually
git checkout dev
git pull origin dev
git checkout -b feature/user-authentication
```

### Merge All Open PRs
```bash
# Use the automated script
./scripts/merge-all-prs.sh
```

### Clean Up Stale Branches
```bash
# Delete branches older than 30 days
./scripts/cleanup-stale-branches.sh

# Or specify custom threshold (e.g., 60 days)
./scripts/cleanup-stale-branches.sh 60
```

---

## 📊 Current Repository Status

**Repository**: `alaweimm90-archieve/benchbarrier`

**Active Branches**:
- ✅ `main` - Production
- ✅ `dev` - Development
- ⚠️ `agent/benchbarrier-website-development-prompts-tailored-2866-blackbox` - Current working branch
- ⚠️ Multiple `copilot/*` branches (should be cleaned up)

**Recommended Actions**:
1. Merge or close all open PRs
2. Delete stale branches (copilot/*)
3. Switch to using the standard workflow (feature/*, fix/*)

---

## 🔧 Automated Tools

### 1. **merge-all-prs.sh**
Automatically merges all open pull requests.

**Features**:
- Lists all open PRs
- Checks if PR is mergeable
- Merges with squash strategy
- Deletes branch after merge
- Cleans up local branches

**Usage**:
```bash
./scripts/merge-all-prs.sh
```

**Requirements**:
- GitHub CLI (`gh`) installed
- Authenticated with GitHub

### 2. **cleanup-stale-branches.sh**
Deletes branches older than a specified threshold.

**Features**:
- Finds branches older than N days
- Excludes main and dev
- Deletes remote branches
- Prunes local references

**Usage**:
```bash
# Default: 30 days
./scripts/cleanup-stale-branches.sh

# Custom threshold: 60 days
./scripts/cleanup-stale-branches.sh 60
```

### 3. **create-feature-branch.sh**
Creates properly named feature branches.

**Features**:
- Enforces naming convention
- Updates dev before branching
- Provides next steps guidance

**Usage**:
```bash
./scripts/create-feature-branch.sh <type> <name>

# Examples
./scripts/create-feature-branch.sh feature user-authentication
./scripts/create-feature-branch.sh fix login-bug
./scripts/create-feature-branch.sh hotfix security-patch
```

**Types**:
- `feature` - New feature
- `fix` - Bug fix
- `hotfix` - Urgent production fix
- `refactor` - Code refactoring
- `docs` - Documentation
- `test` - Tests

---

## 🤖 GitHub Actions

### 1. **Branch Naming Policy**
Enforces branch naming conventions on PRs.

**File**: `.github/workflows/branch-naming-policy.yml`

**Allowed Patterns**:
- `feature/*`
- `fix/*`
- `hotfix/*`
- `refactor/*`
- `docs/*`
- `test/*`

**Rejected Patterns**:
- `copilot/*`
- `agent/*`
- Random names without prefix

### 2. **Stale Branch Cleanup**
Automatically deletes branches older than 30 days.

**File**: `.github/workflows/stale-branch-cleanup.yml`

**Schedule**: Every Monday at 00:00 UTC

**Manual Trigger**: Available via GitHub Actions UI

---

## 📋 Standard Workflow

### 1. Start a New Feature
```bash
# Create branch
./scripts/create-feature-branch.sh feature my-awesome-feature

# Make changes
git add .
git commit -m "feat: add awesome feature"

# Push
git push origin feature/my-awesome-feature
```

### 2. Create Pull Request
```bash
# Using GitHub CLI
gh pr create --base dev --title "Add awesome feature" --body "Description"

# Or via GitHub web interface
# https://github.com/alaweimm90-archieve/benchbarrier/compare
```

### 3. Merge Pull Request
```bash
# Using GitHub CLI
gh pr merge --squash --delete-branch

# Or via GitHub web interface
# Click "Squash and merge" button
```

### 4. Clean Up
```bash
# Switch back to dev
git checkout dev
git pull origin dev

# Delete local branch
git branch -d feature/my-awesome-feature
```

---

## 🚫 What NOT to Do

### ❌ Don't Create Random Branch Names
```bash
# Bad
git checkout -b my-branch
git checkout -b test123
git checkout -b copilot/sub-pr-3-again-again

# Good
git checkout -b feature/user-authentication
git checkout -b fix/login-bug
```

### ❌ Don't Work Directly on Main/Dev
```bash
# Bad
git checkout main
# make changes directly

# Good
git checkout -b feature/my-feature
# make changes on feature branch
```

### ❌ Don't Keep Branches Alive Forever
```bash
# Bad: Branch created 3 months ago, still open

# Good: Create branch, work, merge, delete (1-3 days max)
```

### ❌ Don't Push Without Creating PR
```bash
# Bad
git push origin random-branch
# ... and forget about it

# Good
git push origin feature/my-feature
gh pr create --base dev
```

---

## 🧹 Cleaning Up Current Mess

### Step 1: List All Branches
```bash
git ls-remote --heads origin
```

### Step 2: Identify Branches to Delete
Look for:
- `copilot/*` branches
- `agent/*` branches (except current)
- Branches with random names
- Branches older than 30 days

### Step 3: Delete Unwanted Branches
```bash
# Delete specific branch
git push origin --delete copilot/sub-pr-3

# Or use the cleanup script
./scripts/cleanup-stale-branches.sh
```

### Step 4: Merge or Close Open PRs
```bash
# List open PRs
gh pr list

# Merge all at once
./scripts/merge-all-prs.sh

# Or merge individually
gh pr merge 123 --squash --delete-branch
```

### Step 5: Prune Local References
```bash
git fetch --prune
git branch --merged | grep -v "\*\|main\|dev" | xargs -r git branch -d
```

---

## 📊 Branch Health Monitoring

### Check Branch Age
```bash
# List branches with last commit date
git for-each-ref --sort=-committerdate refs/remotes/origin/ --format='%(committerdate:short) %(refname:short)'
```

### Count Branches
```bash
# Total branches
git ls-remote --heads origin | wc -l

# Branches excluding main/dev
git ls-remote --heads origin | grep -v 'main\|dev' | wc -l
```

### Find Merged Branches
```bash
# Branches merged into dev
git branch -r --merged origin/dev | grep -v 'main\|dev'
```

---

## 🎓 Best Practices Summary

### ✅ DO:
1. Use the helper scripts (`create-feature-branch.sh`)
2. Follow naming conventions (`feature/`, `fix/`, etc.)
3. Create PRs for all changes
4. Delete branches after merging
5. Keep branches short-lived (1-3 days)
6. Pull latest dev before creating branches
7. Use squash merge for cleaner history

### ❌ DON'T:
1. Create branches with random names
2. Work directly on main or dev
3. Keep branches alive for weeks
4. Push without creating PR
5. Forget to delete merged branches
6. Create multiple branches for same feature

---

## 🔗 Quick Links

- **Repository**: https://github.com/alaweimm90-archieve/benchbarrier
- **Pull Requests**: https://github.com/alaweimm90-archieve/benchbarrier/pulls
- **Branches**: https://github.com/alaweimm90-archieve/benchbarrier/branches
- **Actions**: https://github.com/alaweimm90-archieve/benchbarrier/actions

---

## 📞 Need Help?

### Install GitHub CLI
```bash
# Amazon Linux
sudo dnf install gh

# Or download from
# https://cli.github.com/
```

### Authenticate GitHub CLI
```bash
gh auth login
```

### View All Commands
```bash
# PR commands
gh pr --help

# Branch commands
git branch --help
```

---

## 🎯 Goal

**Keep your repository clean with:**
- Only 2 permanent branches: `main` and `dev`
- Short-lived feature branches (1-3 days max)
- Automated cleanup of stale branches
- Consistent naming conventions
- Clear PR workflow

**Result**: A clean, maintainable repository that's easy to navigate and collaborate on.
