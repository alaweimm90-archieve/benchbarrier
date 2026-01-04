# Single Branch Workflow - Main Only

## 🎯 Overview

This repository is configured to use **ONLY the `main` branch**. No feature branches, no PRs, no branch clutter.

## ✅ What's Configured

### 1. Git Hooks
- **pre-checkout**: Prevents switching away from main branch
- **post-commit**: Automatically pushes commits to origin/main

### 2. Git Configuration
- Default branch: `main`
- Push behavior: Current branch only
- Pull behavior: Merge (no rebase)

### 3. Automation Scripts
- `scripts/git-commit-push.sh` - Commit and push in one command
- `scripts/cleanup-branches.sh` - Delete all branches except main

### 4. GitHub Actions
- `enforce-main-branch.yml` - Auto-closes PRs and rejects non-main pushes

## 📝 How to Work

### Standard Workflow

```bash
# 1. Ensure you're on main
git checkout main
git pull origin main

# 2. Make your changes
# ... edit files ...

# 3. Commit and push (automatic)
git add -A
git commit -m "feat: your feature description"
# Post-commit hook automatically pushes to origin/main
```

### Quick Commit Script

```bash
# Use the automation script
./scripts/git-commit-push.sh "feat: your feature description"
```

### One-Line Commit

```bash
# Stage, commit, and push in one command
git add -A && git commit -m "feat: your changes" && git push origin main
```

## 🧹 Cleanup Existing Branches

If you have existing branches cluttering your repo:

```bash
# Run the cleanup script
./scripts/cleanup-branches.sh

# Or manually delete a specific branch
git push origin --delete branch-name
git branch -D branch-name
```

## 🚫 What's Prevented

### ❌ Cannot Create New Branches
```bash
git checkout -b feature/new-branch
# ❌ Blocked by pre-checkout hook
```

### ❌ Cannot Switch Branches
```bash
git checkout other-branch
# ❌ Blocked by pre-checkout hook
```

### ❌ PRs Auto-Close
- Any PR opened will be automatically closed
- GitHub Action adds a comment explaining the workflow

## 🔧 Configuration Files

### Git Hooks Location
- `.git/hooks/pre-checkout` - Prevents branch switching
- `.git/hooks/post-commit` - Auto-pushes commits

### Scripts Location
- `scripts/git-commit-push.sh` - Automated commit/push
- `scripts/cleanup-branches.sh` - Branch cleanup

### GitHub Actions
- `.github/workflows/enforce-main-branch.yml` - Enforces main-only policy

## 💡 Benefits

1. **No Branch Clutter** - Only one branch to manage
2. **Automatic Deployment** - Every commit goes straight to main
3. **Simplified Workflow** - No PR reviews, no merge conflicts
4. **Fast Iteration** - Commit and push immediately
5. **Clean History** - Linear git history

## 🎓 Best Practices

### Commit Messages
Use conventional commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Maintenance tasks

### Before Committing
```bash
# Always pull first to avoid conflicts
git pull origin main

# Check what's changed
git status

# Review changes
git diff

# Stage and commit
git add -A
git commit -m "feat: descriptive message"
```

### Handling Conflicts
```bash
# If push fails due to conflicts
git pull origin main
# Resolve conflicts
git add -A
git commit -m "merge: resolve conflicts"
git push origin main
```

## 🔄 Migration from Multi-Branch

If you're migrating from a multi-branch workflow:

1. **Merge all open PRs** or close them
2. **Run cleanup script**: `./scripts/cleanup-branches.sh`
3. **Update team documentation** about the new workflow
4. **Configure branch protection** on GitHub (optional)

## 📊 Current Status

- ✅ Main branch: Active
- ✅ Git hooks: Installed
- ✅ Auto-push: Enabled
- ✅ Branch protection: Configured
- ✅ GitHub Actions: Active

## 🆘 Troubleshooting

### Hook Not Working?
```bash
# Make hooks executable
chmod +x .git/hooks/pre-checkout
chmod +x .git/hooks/post-commit
```

### Stuck on Wrong Branch?
```bash
# Force switch to main (bypass hook temporarily)
git checkout --force main
git pull origin main
```

### Need to Disable Hooks Temporarily?
```bash
# Rename hooks to disable
mv .git/hooks/pre-checkout .git/hooks/pre-checkout.disabled
mv .git/hooks/post-commit .git/hooks/post-commit.disabled

# Re-enable later
mv .git/hooks/pre-checkout.disabled .git/hooks/pre-checkout
mv .git/hooks/post-commit.disabled .git/hooks/post-commit
```

## 📞 Support

For issues or questions about this workflow, refer to:
- `GIT_WORKFLOW_GUIDE.md` - Comprehensive git guide
- `BRANCH_MANAGEMENT.md` - Branch management strategies
- `README_GIT_SETUP.md` - Initial setup instructions

---

**Remember**: Work directly on `main`. Commit often. Push automatically. Keep it simple! 🚀
