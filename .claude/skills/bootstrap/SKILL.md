---
name: bootstrap
description: |
  First-session project setup. Researches the domain, plans the project,
  creates any needed agents/skills/hooks, and populates CLAUDE.md.
  Use when starting a new project for the first time.
disable-model-invocation: true
argument-hint: "[project idea or description]"
---

# Bootstrap — New Project Setup

Run this once on the first session of a new project.

## Steps

1. **Get the idea.** If `$ARGUMENTS` provided, use that. Otherwise ask.

2. **Research.** Before any planning, research:
   - Current state of the art for this domain
   - Recommended stack, tools, and patterns
   - Known pitfalls and best practices

3. **Plan.** Based on research, identify:
   - Architecture and project structure
   - Whether this project needs custom agents (most don't — use built-in delegation first)
   - Whether this project needs custom skills for domain knowledge
   - What hooks to configure (type checks, lint, tests on Edit/Write)

4. **Present plan to user.** Do not proceed without approval.

5. **Build.** After approval:
   - Create project files, configs, initial code
   - Create any custom agents or skills identified in step 3
   - Configure hooks in `.claude/settings.json`

6. **Update CLAUDE.md.** Fill in the Project section with only what Claude would get wrong without being told:
   - **Name / Domain / Stack**
   - **Commands:** build, test, lint, dev — only non-obvious ones
   - **Gotchas:** non-obvious behaviors, environment quirks, things that would trip Claude up
   - **Architecture:** only where the project deviates from conventions

7. **Keep CLAUDE.md lean.** If Claude can figure it out by reading code or config files, don't add it. Target under 50 lines after bootstrap.

## Rules

- Research BEFORE planning. Don't rely on training data for technology choices.
- Don't create agents unless the project has a specific need for context isolation or domain specialization. Built-in delegation handles most cases.
- Don't create skills unless there's reusable domain knowledge that doesn't belong in CLAUDE.md.
- Every line added to CLAUDE.md must pass this test: "Would removing this cause Claude to make mistakes?"
