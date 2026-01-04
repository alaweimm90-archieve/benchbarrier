# Pull Request Workflow - Quick Start Guide

## 🚀 TL;DR - Fastest Way to Work

```bash
# 1. Create feature branch
./scripts/create-feature-branch.sh feature my-feature

# 2. Make changes and commit
git add .
git commit -m "feat: add my feature"

# 3. Push and create PR
git push origin feature/my-feature
gh pr create --base dev --title "Add my feature"

# 4. After approval, merge
gh pr merge --squash --delete-branch

# 5. Back to dev
git checkout dev && git pull origin dev
```

---

## 📋 Complete Workflow

### Step 1: Create Feature Branch

**Using Helper Script** (Recommended):
```bash
./scripts/create-feature-branch.sh feature user-authentication
```

**Manual**:
```bash
git checkout dev
git pull origin dev
git checkout -b feature/user-authentication
```

### Step 2: Make Changes

```bash
# Edit files
vim src/auth/login.ts

# Stage changes
git add src/auth/

# Commit with conventional commit message
git commit -m "feat: add JWT authentication system"
```

**Commit Message Format**:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance

### Step 3: Push to Remote

```bash
git push origin feature/user-authentication
```

### Step 4: Create Pull Request

**Option A: GitHub CLI** (Fastest):
```bash
gh pr create \
  --base dev \
  --title "Add user authentication system" \
  --body "Implements JWT-based authentication with login/logout"
```

**Option B: GitHub Web**:
1. Go to: https://github.com/alaweimm90-archieve/benchbarrier/pulls
2. Click "New pull request"
3. Base: `dev`, Compare: `feature/user-authentication`
4. Fill in title and description
5. Click "Create pull request"

### Step 5: Review Process

**As Author**:
- Respond to review comments
- Make requested changes
- Push updates (they'll appear in PR automatically)

**As Reviewer**:
- Review code changes
- Leave comments
- Approve or request changes

### Step 6: Merge Pull Request

**Option A: GitHub CLI**:
```bash
# Squash merge (recommended)
gh pr merge --squash --delete-branch

# Regular merge
gh pr merge --merge --delete-branch

# Rebase merge
gh pr merge --rebase --delete-branch
```

**Option B: GitHub Web**:
1. Open PR on GitHub
2. Click "Squash and merge"
3. Confirm merge
4. Click "Delete branch"

### Step 7: Clean Up Locally

```bash
# Switch back to dev
git checkout dev

# Pull merged changes
git pull origin dev

# Delete local feature branch
git branch -d feature/user-authentication

# Verify it's gone
git branch
```

---

## 🔄 Handling Multiple PRs

### Scenario: Working on Multiple Features

```bash
# Feature 1
./scripts/create-feature-branch.sh feature auth
# ... work on auth ...
git push origin feature/auth
gh pr create --base dev --title "Add authentication"

# Feature 2 (while Feature 1 is in review)
git checkout dev
./scripts/create-feature-branch.sh feature payments
# ... work on payments ...
git push origin feature/payments
gh pr create --base dev --title "Add payment system"

# Feature 3
git checkout dev
./scripts/create-feature-branch.sh fix login-bug
# ... fix bug ...
git push origin fix/login-bug
gh pr create --base dev --title "Fix login redirect bug"
```

### Merge All Open PRs at Once

```bash
./scripts/merge-all-prs.sh
```

---

## 🛠️ Common Scenarios

### Scenario 1: Update Branch with Latest Dev

```bash
# On your feature branch
git checkout feature/my-feature

# Fetch latest dev
git fetch origin dev

# Merge dev into your branch
git merge origin/dev

# Or rebase (cleaner history)
git rebase origin/dev

# Push updated branch
git push origin feature/my-feature --force-with-lease
```

### Scenario 2: Fix Conflicts

```bash
# When merge conflicts occur
git merge origin/dev

# Git will show conflicted files
# Edit files to resolve conflicts

# Mark as resolved
git add .

# Complete merge
git commit -m "merge: resolve conflicts with dev"

# Push
git push origin feature/my-feature
```

### Scenario 3: Amend Last Commit

```bash
# Make additional changes
git add .

# Amend last commit
git commit --amend --no-edit

# Force push (safe with --force-with-lease)
git push origin feature/my-feature --force-with-lease
```

### Scenario 4: Abandon Feature Branch

```bash
# Switch to dev
git checkout dev

# Delete local branch
git branch -D feature/abandoned-feature

# Delete remote branch
git push origin --delete feature/abandoned-feature

# Close PR on GitHub
gh pr close 123
```

---

## 📊 PR Management Commands

### List PRs

```bash
# All open PRs
gh pr list

# Your PRs
gh pr list --author @me

# PRs by state
gh pr list --state open
gh pr list --state closed
gh pr list --state merged
```

### View PR Details

```bash
# View PR in terminal
gh pr view 123

# View PR in browser
gh pr view 123 --web

# View PR diff
gh pr diff 123
```

### Check Out PR Locally

```bash
# Check out PR for testing
gh pr checkout 123

# Test it
npm run build
npm test

# Go back to your branch
git checkout feature/my-feature
```

### Update PR

```bash
# On your feature branch
git add .
git commit -m "fix: address review comments"
git push origin feature/my-feature

# PR updates automatically
```

### Close PR Without Merging

```bash
gh pr close 123
```

### Reopen Closed PR

```bash
gh pr reopen 123
```

---

## 🎯 Best Practices

### 1. Keep PRs Small
- ✅ 1 feature = 1 PR
- ✅ 100-300 lines changed
- ❌ Don't bundle multiple features

### 2. Write Good PR Descriptions

**Template**:
```markdown
## What
Brief description of changes

## Why
Reason for changes

## How
Technical approach

## Testing
How to test the changes

## Screenshots
(if UI changes)
```

**Example**:
```markdown
## What
Adds JWT-based authentication system

## Why
Users need secure login/logout functionality

## How
- Implemented JWT token generation
- Added login/logout endpoints
- Created auth middleware

## Testing
1. Run `npm test`
2. Test login at `/api/auth/login`
3. Verify token in response
```

### 3. Review Your Own PR First

```bash
# Before creating PR, review your changes
gh pr diff

# Or on GitHub
git push origin feature/my-feature
# Then view diff on GitHub before creating PR
```

### 4. Link Issues

```bash
# In PR description
Closes #123
Fixes #456
Resolves #789
```

### 5. Use Draft PRs for WIP

```bash
# Create draft PR
gh pr create --draft --base dev --title "[WIP] Add feature"

# Mark as ready when done
gh pr ready 123
```

---

## 🚨 Troubleshooting

### Problem: Can't Push to Branch

```bash
# Error: Updates were rejected
# Solution: Pull first
git pull origin feature/my-feature --rebase
git push origin feature/my-feature
```

### Problem: Wrong Base Branch

```bash
# Created PR to main instead of dev
# Solution: Edit PR on GitHub
# Or close and recreate
gh pr close 123
gh pr create --base dev --title "..."
```

### Problem: Forgot to Delete Branch

```bash
# List merged branches
git branch --merged

# Delete local
git branch -d feature/old-feature

# Delete remote
git push origin --delete feature/old-feature
```

### Problem: Too Many Commits

```bash
# Squash commits before merging
# Use "Squash and merge" on GitHub
# Or squash locally
git rebase -i HEAD~5  # Squash last 5 commits
```

---

## 📈 Workflow Metrics

### Track Your PRs

```bash
# PRs created this week
gh pr list --author @me --created "$(date -d '7 days ago' +%Y-%m-%d)"

# PRs merged this month
gh pr list --author @me --state merged --search "merged:>=$(date -d '30 days ago' +%Y-%m-%d)"
```

### Repository Health

```bash
# Open PRs count
gh pr list --state open | wc -l

# Average PR age
gh pr list --state open --json createdAt

# Stale PRs (>7 days old)
gh pr list --state open --search "created:<$(date -d '7 days ago' +%Y-%m-%d)"
```

---

## 🎓 Summary

### The Perfect PR Workflow

1. **Create** - Use helper script for proper naming
2. **Commit** - Small, focused commits with good messages
3. **Push** - Push to remote early and often
4. **PR** - Create PR with good description
5. **Review** - Respond to feedback promptly
6. **Merge** - Squash merge for clean history
7. **Clean** - Delete branch immediately after merge

### Key Principles

- ✅ One feature = One branch = One PR
- ✅ Keep PRs small and focused
- ✅ Delete branches after merging
- ✅ Use conventional commit messages
- ✅ Review your own PR first
- ✅ Respond to reviews quickly
- ✅ Keep dev branch up to date

### Time Estimates

- Create branch: 30 seconds
- Make changes: Variable
- Create PR: 1 minute
- Review: 5-15 minutes
- Merge: 30 seconds
- Clean up: 30 seconds

**Total overhead: ~3 minutes per feature**

---

## 🔗 Resources

- **GitHub CLI Docs**: https://cli.github.com/manual/
- **Conventional Commits**: https://www.conventionalcommits.org/
- **Git Branching**: https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows

---

## 🎯 Next Steps

1. Install GitHub CLI: `sudo dnf install gh`
2. Authenticate: `gh auth login`
3. Create your first feature branch: `./scripts/create-feature-branch.sh feature my-first-feature`
4. Make changes and create PR
5. Merge and celebrate! 🎉
