# Git Setup Guide - TodoListClient

**Purpose**: Step-by-step guide to initialize and set up Git repository for the TodoListClient frontend project.

---

## 🚀 Quick Start

### Option 1: Initialize New Local Repository (Recommended for New Project)

If you're starting fresh and haven't created a GitHub repo yet:

```bash
# Navigate to project directory
cd "/Users/andrewdeacy/development/TODO List Repos/TodoListClient"

# Initialize Git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "feat: Initial project setup

- React + TypeScript project structure
- Tailwind CSS configuration
- Oracle AI coordination system
- Project documentation
- Task breakdown (29 tasks)"

# Create main branch (if not already on it)
git branch -M main

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/TodoListClient.git

# Push to remote
git push -u origin main
```

---

## 📋 Detailed Step-by-Step Guide

### Step 1: Navigate to Project Directory

```bash
cd "/Users/andrewdeacy/development/TODO List Repos/TodoListClient"
```

### Step 2: Initialize Git Repository

```bash
git init
```

**Expected output:**
```
Initialized empty Git repository in /Users/andrewdeacy/development/TODO List Repos/TodoListClient/.git/
```

### Step 3: Verify .gitignore is Present

Check that `.gitignore` exists and includes appropriate entries:

```bash
cat .gitignore
```

**Should include:**
- `node_modules/`
- `dist/` or `build/`
- `.env` files
- IDE files (`.vscode/`, `.idea/`)
- OS files (`.DS_Store`)

If `.gitignore` doesn't exist or is incomplete, it should already be created in the project root.

### Step 4: Check Git Status

```bash
git status
```

**You should see:**
- Untracked files (all your project files)
- No staged changes yet

### Step 5: Stage All Files

```bash
git add .
```

**Or stage specific files:**
```bash
git add .gitignore
git add README.md
git add .cursor-output/
git add package.json  # (when created)
```

### Step 6: Create Initial Commit

```bash
git commit -m "feat: Initial project setup

- React + TypeScript project structure
- Tailwind CSS configuration
- Oracle AI coordination system
- Project documentation
- Task breakdown (29 tasks)
- Git setup guide"
```

**Commit Message Format:**
- Use conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, etc.
- First line: Brief summary (50 chars or less)
- Blank line
- Body: Detailed description (wrap at 72 chars)

### Step 7: Set Branch Name (if needed)

```bash
git branch -M main
```

This ensures you're using `main` as the default branch (modern standard).

### Step 8: Create GitHub Repository

**Option A: Using GitHub Web Interface**

1. Go to [GitHub.com](https://github.com)
2. Click the **"+"** icon → **"New repository"**
3. Repository name: `TodoListClient`
4. Description: `React frontend for Todo List application - Take-home assessment`
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Choose **Public** or **Private**
7. Click **"Create repository"**

**Option B: Using GitHub CLI** (if installed)

```bash
gh repo create TodoListClient --public --source=. --remote=origin --push
```

### Step 9: Add Remote Repository

**Get your repository URL from GitHub** (HTTPS or SSH):

```bash
# HTTPS (recommended for beginners)
git remote add origin https://github.com/YOUR_USERNAME/TodoListClient.git

# OR SSH (if you have SSH keys set up)
git remote add origin git@github.com:YOUR_USERNAME/TodoListClient.git
```

**Verify remote was added:**
```bash
git remote -v
```

**Expected output:**
```
origin  https://github.com/YOUR_USERNAME/TodoListClient.git (fetch)
origin  https://github.com/YOUR_USERNAME/TodoListClient.git (push)
```

### Step 10: Push to Remote

```bash
git push -u origin main
```

**The `-u` flag** sets up tracking so future pushes can just use `git push`.

**If you get authentication errors:**
- Use a Personal Access Token (not password)
- Or set up SSH keys
- See "Troubleshooting" section below

---

## 🔄 Ongoing Workflow

### Daily Workflow Pattern

```bash
# 1. Check current status
git status

# 2. See what changed
git diff

# 3. Stage changes
git add .

# 4. Commit with descriptive message
git commit -m "feat: Complete TASK-11 - Minimalist login UI

- Implement login page matching mockup design
- Add gradient background
- Add form validation
- Integrate with auth service

Completed: Frontend-Todo-List.md #11"

# 5. Push to remote
git push
```

### Branch Workflow (Recommended)

For each major task or feature:

```bash
# Create feature branch
git checkout -b feature/task-11-login-ui

# Make changes, commit
git add .
git commit -m "feat: Complete TASK-11 - Login UI"

# Push branch
git push -u origin feature/task-11-login-ui

# Merge to main (after verification)
git checkout main
git merge feature/task-11-login-ui
git push

# Delete feature branch (optional)
git branch -d feature/task-11-login-ui
git push origin --delete feature/task-11-login-ui
```

### Commit Message Best Practices

**Format:**
```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature (e.g., "feat: Add login page")
- `fix`: Bug fix (e.g., "fix: Correct form validation")
- `docs`: Documentation (e.g., "docs: Update README")
- `style`: Formatting (e.g., "style: Format code with Prettier")
- `refactor`: Code restructuring (e.g., "refactor: Extract auth hook")
- `test`: Adding tests (e.g., "test: Add login component tests")
- `chore`: Maintenance (e.g., "chore: Update dependencies")

**Examples:**

```bash
# Good commit message
git commit -m "feat: Complete TASK-11 - Minimalist login UI

- Implement login page matching mockup.png design
- Add gradient background (bg-gradient-to-br from-gray-50 to-gray-100)
- Add form validation and error handling
- Integrate with auth service and React Query
- Add responsive design and accessibility features

Completed: Frontend-Todo-List.md #11"

# Bad commit message (too vague)
git commit -m "update login"
```

---

## 📁 What to Commit

### ✅ Always Commit

- Source code files (`.tsx`, `.ts`, `.js`, `.jsx`)
- Configuration files (`package.json`, `tsconfig.json`, `tailwind.config.js`)
- Documentation (`.md` files)
- `.gitignore`
- `.cursor-output/` directory (coordination system)

### ❌ Never Commit

- `node_modules/` (should be in .gitignore)
- `dist/` or `build/` (should be in .gitignore)
- `.env` files (should be in .gitignore)
- IDE files (`.vscode/`, `.idea/`) - unless team-specific
- OS files (`.DS_Store`, `Thumbs.db`)
- Log files
- Temporary files

### 🤔 Maybe Commit (Team Decision)

- `.vscode/settings.json` - if team wants shared settings
- `package-lock.json` - **YES, commit this** (ensures consistent dependencies)

---

## 🔍 Useful Git Commands

### Viewing History

```bash
# View commit history
git log

# View commit history (one line per commit)
git log --oneline

# View commit history with graph
git log --oneline --graph --all

# View changes in a specific commit
git show <commit-hash>
```

### Checking Status

```bash
# Check what's changed
git status

# See detailed diff
git diff

# See staged changes
git diff --staged

# See what files changed
git diff --name-only
```

### Undoing Changes

```bash
# Unstage files (keep changes)
git reset HEAD <file>

# Discard changes to a file (CAREFUL!)
git checkout -- <file>

# Discard all uncommitted changes (CAREFUL!)
git reset --hard HEAD

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

### Branching

```bash
# List branches
git branch

# Create new branch
git checkout -b <branch-name>

# Switch branch
git checkout <branch-name>

# Delete branch
git branch -d <branch-name>

# Delete remote branch
git push origin --delete <branch-name>
```

---

## 🚨 Troubleshooting

### Issue: "Repository not found" when pushing

**Solution:**
1. Check remote URL: `git remote -v`
2. Verify repository exists on GitHub
3. Check you have access (if private repo)
4. Verify authentication (use Personal Access Token)

### Issue: Authentication failed

**Solution:**
1. **Use Personal Access Token** (not password):
   - GitHub → Settings → Developer settings → Personal access tokens
   - Generate new token with `repo` scope
   - Use token as password when pushing

2. **Or set up SSH keys**:
   ```bash
   # Generate SSH key
   ssh-keygen -t ed25519 -C "your_email@example.com"
   
   # Add to SSH agent
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   
   # Copy public key and add to GitHub
   cat ~/.ssh/id_ed25519.pub
   # Then add to GitHub → Settings → SSH and GPG keys
   ```

### Issue: "Updates were rejected"

**Solution:**
```bash
# Pull latest changes first
git pull origin main

# Resolve any conflicts, then push
git push
```

### Issue: Accidentally committed sensitive data

**Solution:**
```bash
# Remove file from Git history (CAREFUL!)
git rm --cached .env
git commit -m "chore: Remove .env from tracking"
git push

# Add .env to .gitignore
echo ".env" >> .gitignore
git add .gitignore
git commit -m "chore: Add .env to .gitignore"
git push
```

---

## 📝 Git Workflow with Oracle AI

### After Each Task Completion

1. **Agent completes task** → Updates MASTER-AGENT-LOG.md
2. **You verify work** → Check files, test, build
3. **You commit**:
   ```bash
   git add .
   git commit -m "feat: Complete TASK-[NUMBER] - [Task Name]

   [Description of what was done]

   Completed: Frontend-Todo-List.md #[NUMBER]"
   ```
4. **You push**:
   ```bash
   git push
   ```
5. **Oracle AI updates log** → Documents completion

### Branch Strategy Recommendation

**For this project, you can use:**

**Option 1: Simple (Single Branch)**
- Work directly on `main`
- Commit after each task
- Simple and straightforward

**Option 2: Feature Branches**
- Create branch for each major task/phase
- Merge to main after completion
- Better for collaboration

**Recommendation**: Start with Option 1 (single branch) for simplicity. Switch to feature branches if you need to experiment or work on multiple things simultaneously.

---

## 🎯 Quick Reference Checklist

### Initial Setup
- [ ] Navigate to project directory
- [ ] Run `git init`
- [ ] Verify `.gitignore` exists
- [ ] Run `git add .`
- [ ] Run `git commit -m "feat: Initial project setup"`
- [ ] Run `git branch -M main`
- [ ] Create GitHub repository
- [ ] Run `git remote add origin <repo-url>`
- [ ] Run `git push -u origin main`

### After Each Task
- [ ] Run `git status` to see changes
- [ ] Run `git add .` to stage changes
- [ ] Run `git commit -m "feat: Complete TASK-X"` with description
- [ ] Run `git push` to upload to GitHub
- [ ] Update Oracle AI log

---

## 🔗 Related Documentation

- **Oracle AI Commands**: `.cursor-output/ORACLE-AI-COMMANDS.md`
- **Agent Commands**: `.cursor-output/AGENT-COMMANDS.md`
- **Master Log**: `.cursor-output/MASTER-AGENT-LOG.md`
- **Task List**: `.cursor-output/Frontend-Todo-List.md`

---

## 💡 Pro Tips

1. **Commit Often**: Don't wait until everything is perfect. Commit after each task completion.

2. **Write Good Commit Messages**: Future you (and reviewers) will thank you.

3. **Use `.gitignore`**: Keep sensitive files and build artifacts out of Git.

4. **Pull Before Push**: Always pull latest changes before pushing to avoid conflicts.

5. **Test Before Commit**: Make sure code builds and works before committing.

6. **Review Changes**: Use `git diff` to review what you're committing.

7. **Keep Commits Focused**: One logical change per commit.

---

## 🎉 You're Ready!

Once you've completed the initial setup, you can:

1. Start working on tasks
2. Commit after each task
3. Push regularly to backup your work
4. Use Git to track your progress

**Remember**: Git is your safety net. Commit often, push regularly, and you'll never lose your work!

---

**Last Updated**: 2025-01-09  
**Status**: Ready to use
