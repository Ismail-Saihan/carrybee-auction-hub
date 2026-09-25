# Implementation Prompt: Git Installation and GitHub Push

## Goal
Install Git on the Windows host using `winget`, initialize the Git repository on the `main` branch, commit all project files cleanly, and configure/push to GitHub.

---

## Skills Read
- `AGENTS.md` (Workflow loop, environment checks, repository guidelines)
- `.agents/skills/develop/SKILL.md` (Workflow & implementation structure)

---

## Code & System State Inspected
- `winget`: Available at `v1.29.380`.
- `git`: Not currently in PATH / not installed.
- `.gitignore`: Exists and ignores `node_modules/`, `.next/`, `*.local`.
- `.git`: Currently does not exist in workspace `d:\Coding Project\Auction App`.
- Project files: `src/`, `public/`, `design/`, `prompts/`, `package.json`, `tsconfig.json`.

---

## Decisions & Assumptions
1. **Installation Strategy**:
   - Use Windows Package Manager (`winget install --id Git.Git -e --source winget --accept-package-agreements --accept-source-agreements --silent`) to perform a non-interactive installation of Git for Windows.
   - Refresh the PowerShell process environment PATH to ensure `git.exe` (typically in `C:\Program Files\Git\cmd`) is immediately accessible without requiring terminal restart.
2. **Repository Initialization**:
   - Run `git init -b main` in the project root.
   - Ensure standard user configuration exists (if not configured, set local/global git user name and email).
   - Stage all files with `git add .` ensuring `node_modules` and `.next` are ignored.
   - Create initial commit: `"feat: initial commit - CarryBee Auction Hub design system v1.0"`.
3. **GitHub Push**:
   - Set up remote origin when provided by the user (`git remote add origin <URL>`).
   - Push all commits to `main` with upstream tracking (`git push -u origin main`).

---

## Files to Create / Touch
1. System: Git for Windows installed.
2. `.gitignore`: Verify exclusions for build artifacts, `.next`, `node_modules`, and temporary files.
3. `.git/`: Local repository database initialized and committed.

---

## Requirements
- Git must be fully functional from PowerShell (`git --version`).
- Clean repository commit containing all application source code, assets, and design system components.
- No sensitive files or build caches tracked.

---

## Security Considerations
- Ensure `.env` or sensitive local configs are not tracked.
- Do not log or hard-code personal access tokens in script files or commit history.

---

## Acceptance Criteria
- [x] Git installed and accessible via command line.
- [x] Git repository initialized with `main` default branch.
- [x] All project files staged and committed.
- [x] `git status` reports clean working tree.
- [x] Upstream remote configured and pushed to GitHub.

---

## Checks to Run
- `git --version`
- `git status`
- `git log -1`

---

## Manual Test Steps
1. Verify `git --version` outputs installed Git version.
2. Verify `git log` shows the initial commit.
3. Verify repository page on GitHub shows all committed files and assets.
