# Git & PR Workflow Setup - Complete Guide

## 🎯 Overview

This guide provides everything you need to manage branches and PRs effectively in the BenchBarrier repository.

**Problem Solved**: Stop creating random branches like `copilot/sub-pr-3-again-again` and maintain a clean repository.

---

## 📦 What's Included

### Documentation
1. **GIT_WORKFLOW_GUIDE.md** - Complete git workflow and branch strategy
2. **BRANCH_MANAGEMENT.md** - Branch management tools and best practices
3. **PR_WORKFLOW_QUICKSTART.md** - Quick start guide for PRs
4. **README_GIT_SETUP.md** - This file (setup overview)

### Scripts (`scripts/`)
1. **merge-all-prs.sh** - Merge all open PRs automatically
2. **cleanup-stale-branches.sh** - Delete old branches (>30 days)
3. **create-feature-branch.sh** - Create properly named feature branches

### GitHub Actions (`.github/workflows/`)
1. **branch-naming-policy.yml** - Enforce branch naming conventions
2. **stale-branch-cleanup.yml** - Auto-delete stale branches weekly

### Git Configuration
- ✅ `push.default = simple` - Prevent accidental branch creation
- ✅ `fetch.prune = true` - Auto-prune deleted remote branches
- ✅ `push.autoSetupRemote = false` - Require explicit branch setup

---

## 🚀 Quick Start (5 Minutes)

### 1. Install GitHub CLI

```bash
# Amazon Linux
sudo dnf install gh

# Verify installation
gh --version
```

### 2. Authenticate

```bash
gh auth login
# Follow prompts to authenticate
```

### 3. Verify Setup

```bash
# Check git config
git config --list | grep -E "(push|fetch|prune)"

# Should show:
# push.default=simple
# push.autosetupremote=false
# fetch.prune=true
```

### 4. Test Scripts

```bash
# Make scripts executable (already done)
ls -la scripts/

# Test branch creation
./scripts/create-feature-branch.sh feature test-feature

# Switch back to dev
git checkout dev
git branch -d feature/test-feature
```

### 5. Create Your First PR

```bash
# Create feature branch
./scripts/create-feature-branch.sh feature my-first-feature

# Make a small change
echo "# Test" >> TEST.md
git add TEST.md
git commit -m "feat: add test file"

# Push and create PR
git push origin feature/my-first-feature
gh pr create --base dev --title "Test PR" --body "Testing the workflow"

# View PR
gh pr list

# Merge it
gh pr merge --squash --delete-branch

# Clean up
git checkout dev
git pull origin dev
```

---

## 📋 Current Repository Status

### Branches Found
```
✅ main                    - Production (protected)
✅ dev                     - Development (active)
⚠️  agent/benchbarrier-... - Auto-generated (should be cleaned)
⚠️  copilot/sub-pr-3      - Auto-generated (should be deleted)
⚠️  copilot/sub-pr-3-again - Auto-generated (should be deleted)
⚠️  copilot/...           - Multiple auto-generated branches
```

### Recommended Actions

#### 1. Clean Up Stale Branches
```bash
# Delete all copilot branches
git push origin --delete copilot/sub-pr-3
git push origin --delete copilot/sub-pr-3-again
git push origin --delete copilot/sub-pr-3-another-one
git push origin --delete copilot/sub-pr-3-yet-again
git push origin --delete copilot/open-spark-session

# Or use the automated script
./scripts/cleanup-stale-branches.sh
```

#### 2. Merge or Close Open PRs
```bash
# List open PRs
gh pr list

# Merge all at once
./scripts/merge-all-prs.sh

# Or merge individually
gh pr merge 123 --squash --delete-branch
```

#### 3. Set Up Branch Protection
1. Go to: https://github.com/alaweimm90-archieve/benchbarrier/settings/branches
2. Add rule for `main`:
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass
   - ✅ Include administrators
3. Add rule for `dev`:
   - ✅ Require status checks to pass

---

## 🎯 Recommended Workflow

### Daily Workflow

```bash
# Morning: Start new feature
./scripts/create-feature-branch.sh feature user-profile

# Work on feature
# ... make changes ...
git add .
git commit -m "feat: add user profile page"

# Push and create PR
git push origin feature/user-profile
gh pr create --base dev --title "Add user profile page"

# Afternoon: Review and merge
gh pr merge --squash --delete-branch

# Evening: Clean up
git checkout dev
git pull origin dev
```

### Weekly Maintenance

```bash
# Monday: Clean up stale branches
./scripts/cleanup-stale-branches.sh

# Check repository health
gh pr list --state open
git branch -r | wc -l  # Should be ~2-5 branches
```

### Monthly Review

```bash
# Review all branches
git ls-remote --heads origin

# Check for branches older than 30 days
git for-each-ref --sort=-committerdate refs/remotes/origin/ --format='%(committerdate:short) %(refname:short)'

# Delete any stale branches
./scripts/cleanup-stale-branches.sh 30
```

---

## 🛠️ Tools Reference

### Script Usage

#### merge-all-prs.sh
```bash
# Merge all open PRs
./scripts/merge-all-prs.sh

# What it does:
# 1. Lists all open PRs
# 2. Checks if mergeable
# 3. Merges with squash
# 4. Deletes branch
# 5. Cleans up local branches
```

#### cleanup-stale-branches.sh
```bash
# Default: 30 days
./scripts/cleanup-stale-branches.sh

# Custom threshold: 60 days
./scripts/cleanup-stale-branches.sh 60

# What it does:
# 1. Finds branches older than threshold
# 2. Excludes main and dev
# 3. Deletes remote branches
# 4. Prunes local references
```

#### create-feature-branch.sh
```bash
# Syntax
./scripts/create-feature-branch.sh <type> <name>

# Examples
./scripts/create-feature-branch.sh feature user-auth
./scripts/create-feature-branch.sh fix login-bug
./scripts/create-feature-branch.sh hotfix security-patch
./scripts/create-feature-branch.sh refactor code-cleanup
./scripts/create-feature-branch.sh docs api-documentation
./scripts/create-feature-branch.sh test unit-tests

# What it does:
# 1. Updates dev branch
# 2. Creates properly named branch
# 3. Provides next steps
```

### GitHub CLI Commands

```bash
# PR Management
gh pr list                          # List open PRs
gh pr create --base dev             # Create PR
gh pr view 123                      # View PR details
gh pr merge 123 --squash            # Merge PR
gh pr close 123                     # Close PR
gh pr checkout 123                  # Check out PR locally

# Repository Info
gh repo view                        # View repo details
gh repo view --web                  # Open in browser

# Branch Management
gh api repos/:owner/:repo/branches  # List branches via API
```

---

## 📊 Monitoring & Metrics

### Check Repository Health

```bash
# Total branches
git ls-remote --heads origin | wc -l

# Branches excluding main/dev
git ls-remote --heads origin | grep -v 'main\|dev' | wc -l

# Open PRs
gh pr list --state open | wc -l

# Merged PRs this month
gh pr list --state merged --search "merged:>=$(date -d '30 days ago' +%Y-%m-%d)" | wc -l
```

### Ideal Metrics
- **Total branches**: 2-5 (main, dev, + 0-3 active features)
- **Open PRs**: 0-3
- **Branch age**: < 7 days for feature branches
- **PR merge time**: < 24 hours

---

## 🚨 Troubleshooting

### Problem: Scripts Not Executable
```bash
chmod +x scripts/*.sh
```

### Problem: GitHub CLI Not Authenticated
```bash
gh auth login
gh auth status
```

### Problem: Can't Delete Branch
```bash
# Branch may be protected
# Check: https://github.com/alaweimm90-archieve/benchbarrier/settings/branches

# Or branch doesn't exist
git ls-remote --heads origin | grep branch-name
```

### Problem: Merge Conflicts
```bash
# On your feature branch
git fetch origin dev
git merge origin/dev

# Resolve conflicts in files
# Then:
git add .
git commit -m "merge: resolve conflicts"
git push origin feature/your-feature
```

### Problem: Too Many Branches
```bash
# Nuclear option: Delete all except main/dev
git ls-remote --heads origin | \
  grep -v 'main\|dev' | \
  awk '{print $2}' | \
  sed 's|refs/heads/||' | \
  xargs -I {} git push origin --delete {}
```

---

## 🎓 Best Practices Summary

### Branch Naming
- ✅ `feature/user-authentication`
- ✅ `fix/login-bug`
- ✅ `hotfix/security-patch`
- ❌ `my-branch`
- ❌ `test123`
- ❌ `copilot/sub-pr-3-again`

### Branch Lifecycle
1. Create from dev
2. Work on feature (1-3 days max)
3. Create PR
4. Review and merge
5. Delete immediately

### PR Best Practices
- Keep PRs small (100-300 lines)
- Write clear descriptions
- Link related issues
- Respond to reviews quickly
- Use squash merge
- Delete branch after merge

### Repository Maintenance
- Clean up stale branches weekly
- Merge or close open PRs promptly
- Keep only 2-5 active branches
- Use branch protection rules
- Monitor repository health

---

## 📚 Documentation Index

1. **GIT_WORKFLOW_GUIDE.md**
   - Complete git workflow
   - Branch strategy
   - Merge strategies
   - Best practices

2. **BRANCH_MANAGEMENT.md**
   - Automated tools
   - GitHub Actions
   - Monitoring
   - Cleanup procedures

3. **PR_WORKFLOW_QUICKSTART.md**
   - Quick start guide
   - Common scenarios
   - Troubleshooting
   - Command reference

4. **README_GIT_SETUP.md** (This file)
   - Setup overview
   - Quick start
   - Tools reference
   - Current status

---

## 🎯 Next Steps

### Immediate (Today)
1. ✅ Install GitHub CLI
2. ✅ Authenticate with GitHub
3. ✅ Test scripts
4. ✅ Create first PR using new workflow

### Short Term (This Week)
1. Clean up existing stale branches
2. Merge or close all open PRs
3. Set up branch protection rules
4. Enable GitHub Actions

### Long Term (Ongoing)
1. Follow standard workflow for all changes
2. Run cleanup script weekly
3. Monitor repository health
4. Keep documentation updated

---

## 🔗 Quick Links

- **Repository**: https://github.com/alaweimm90-archieve/benchbarrier
- **Pull Requests**: https://github.com/alaweimm90-archieve/benchbarrier/pulls
- **Branches**: https://github.com/alaweimm90-archieve/benchbarrier/branches
- **Settings**: https://github.com/alaweimm90-archieve/benchbarrier/settings
- **Actions**: https://github.com/alaweimm90-archieve/benchbarrier/actions

---

## ✅ Success Criteria

You'll know the setup is working when:
- ✅ Only 2-5 branches exist at any time
- ✅ All branches follow naming convention
- ✅ PRs are merged within 24 hours
- ✅ Branches are deleted after merge
- ✅ No branches older than 7 days
- ✅ Repository is clean and organized

---

## 🎉 Conclusion

With this setup, you now have:
- ✅ Automated tools for branch management
- ✅ Clear workflow for PRs
- ✅ GitHub Actions for enforcement
- ✅ Comprehensive documentation
- ✅ Best practices guide

**Result**: A clean, maintainable repository that's easy to collaborate on!

**Questions?** Check the documentation files or run `gh --help` for GitHub CLI help.
