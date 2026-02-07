---
name: commit
description: |
  Create a well-formatted git commit following conventional commits.
  Use when the user says "commit", "save changes", or "commit this".
disable-model-invocation: true
argument-hint: "[optional message override]"
allowed-tools: Bash(git *)
---

## Commit Workflow

1. **Review changes:**
   - Run `git status` to see all modified/untracked files
   - Run `git diff` to see staged and unstaged changes
   - Run `git log --oneline -5` to see recent commit style

2. **Stage files:**
   - Add specific files by name (not `git add -A`)
   - Never stage `.env`, credentials, or large binaries
   - If unsure, ask the user what to include

3. **Draft commit message:**
   - Summarize the nature of changes (feature, fix, refactor, docs, test)
   - Focus on WHY, not WHAT
   - Keep the first line under 72 characters
   - Add detail in the body if needed

4. **Commit format:**
   ```
   <type>: <short description>

   <optional body with more detail>
   ```

   Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `style`, `perf`

5. **Verify:** Run `git status` after commit to confirm success

## Rules

- NEVER amend previous commits unless explicitly asked
- NEVER push unless explicitly asked
- NEVER skip pre-commit hooks (no `--no-verify`)
- If a pre-commit hook fails, fix the issue and create a NEW commit
- If there are no changes to commit, say so — don't create empty commits

## If $ARGUMENTS provided

Use `$ARGUMENTS` as the commit message instead of drafting one. Still follow the format rules.
