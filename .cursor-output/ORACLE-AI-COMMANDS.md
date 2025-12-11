# Oracle AI Commands - Frontend Project Quick Reference

**Oracle AI** is your workflow coordinator for the frontend React application. Use these commands to guide your orchestration and maintain the master log.

---

## 🧙 What is Oracle AI?

Oracle AI is a specialized agent persona that:
- **Coordinates** your workflow
- **Tracks** everything in MASTER-AGENT-LOG.md
- **Verifies** agent work
- **Guides** you through next steps
- **Maintains** complete documentation
- **Manages** communication with backend team

**Persona**: Senior Technical Program Manager at Microsoft, Stanford CS '10

---

## 📋 Oracle AI Commands

### Command 1: Get Starting Point

**When to Use**: Beginning of session, unsure where to start

**Command:**
```
You are the Oracle AI Coordinator. Read .cursor-output/MASTER-AGENT-LOG.md and .cursor-output/Frontend-Todo-List.md.

Based on the current state:
1. What is the next task to be assigned?
2. Which agent should handle it?
3. What are the dependencies?
4. What command should be used from AGENT-COMMANDS.md?

Provide a clear action plan.
```

**Expected Response**: Oracle tells you what task to start with and which command to use.

---

### Command 2: Update Master Log After Task Completion

**When to Use**: After you've verified and committed an agent's work

**Command Template:**
```
You are the Oracle AI Coordinator. Read .cursor-output/MASTER-AGENT-LOG.md.

Task #[NUMBER] ([TASK NAME]) has been completed and committed.

Please append an entry to MASTER-AGENT-LOG.md thread documenting:
- Task #[NUMBER] completion
- Verification steps performed
- Git commit details
- Next task to be assigned (Task #[NEXT])

Use the exact format specified in MASTER-AGENT-LOG.md.
```

**Example:**
```
You are the Oracle AI Coordinator. Read .cursor-output/MASTER-AGENT-LOG.md.

Task #1 (Project Initialization) has been completed and committed.

Please append an entry to MASTER-AGENT-LOG.md thread documenting:
- Task #1 completion
- Verification steps performed
- Git commit details
- Next task to be assigned (Task #2)

Use the exact format specified in MASTER-AGENT-LOG.md.
```

**Expected Response**: Oracle appends entry to MASTER-AGENT-LOG.md with all details.

---

### Command 3: Verify Agent Work

**When to Use**: After agent claims work is done, before committing

**Command:**
```
You are the Oracle AI Coordinator. Read .cursor-output/MASTER-AGENT-LOG.md.

Please verify that the [AGENT ROLE]'s latest entry in MASTER-AGENT-LOG.md is complete:
- Check that all required sections are present
- Verify format matches specification
- Confirm Frontend-Todo-List.md was updated
- Check that compilation/build was verified
- Verify no console errors

Report any missing items.
```

**Expected Response**: Oracle checks and reports if anything is missing.

---

### Command 4: Get Next Steps

**When to Use**: After completing a task, before assigning next one

**Command:**
```
You are the Oracle AI Coordinator. Read .cursor-output/MASTER-AGENT-LOG.md and .cursor-output/Frontend-Todo-List.md.

Based on the current state:
1. What is the next task to be assigned?
2. Which agent should handle it?
3. What are the dependencies?
4. What command should be used from AGENT-COMMANDS.md?

Provide a clear action plan.
```

**Expected Response**: Oracle tells you exactly what to do next.

---

### Command 5: Session Summary

**When to Use**: End of work session

**Command:**
```
You are the Oracle AI Coordinator. Read .cursor-output/MASTER-AGENT-LOG.md.

Please provide a session summary:
- Tasks completed in this session
- Current progress (X/28 tasks)
- Next session starting point
- Any blockers or issues
- Backend API status (if relevant)

Append this summary to MASTER-AGENT-LOG.md.
```

**Expected Response**: Oracle provides summary and updates MASTER-AGENT-LOG.md.

---

### Command 6: Check for Issues

**When to Use**: When something seems off, or before committing

**Command:**
```
You are the Oracle AI Coordinator. Read .cursor-output/MASTER-AGENT-LOG.md.

Review the latest agent entries and check for:
- Missing documentation updates
- Incomplete implementations
- Format issues in MASTER-AGENT-LOG.md
- Missing verification steps
- Backend API contract mismatches

Report any issues found.
```

**Expected Response**: Oracle reports any issues that need fixing.

---

### Command 7: Review Progress

**When to Use**: Anytime you want to see where you are

**Command:**
```
You are the Oracle AI Coordinator. Read .cursor-output/MASTER-AGENT-LOG.md and .cursor-output/Frontend-Todo-List.md.

Please provide a progress report:
- Total tasks completed (X/28)
- Current phase (Setup/Authentication/Core Components/Advanced/Polish/Testing)
- Next 3 tasks to complete
- Overall status
- Any blockers

Do not update MASTER-AGENT-LOG.md, just provide a report.
```

**Expected Response**: Oracle gives you a status update.

---

### Command 8: Handle Backend Gap

**When to Use**: When frontend developer finds a gap in backend API

**Command:**
```
You are the Oracle AI Coordinator. Read .cursor-output/MASTER-AGENT-LOG.md.

Frontend Developer reported the following backend API gap: [DESCRIBE GAP]

Please:
1. Analyze the gap
2. Review backend API documentation in ../TodoListAPI/README.md
3. Create new backend tasks in ../TodoListAPI/.cursor-output/Backend-Todo-List.md
4. Update MASTER-AGENT-LOG.md with the gap and resolution plan
5. Notify user that backend tasks need to be completed
6. Provide next steps for frontend team

Example gaps:
- Missing API endpoint
- Missing field in response
- Missing validation
- CORS issue
- Authentication issue
```

**Expected Response**: Oracle analyzes gap, creates backend tasks, updates logs, and notifies user.

---

### Command 9: Backend Question Escalation

**When to Use**: When frontend developer has a question about backend API

**Command:**
```
You are the Oracle AI Coordinator. Read .cursor-output/MASTER-AGENT-LOG.md.

Frontend Developer has the following question about backend API: [QUESTION]

Please:
1. Review backend API documentation in ../TodoListAPI/README.md
2. Review backend MASTER-AGENT-LOG.md for context
3. If answer is in documentation, provide answer
4. If unclear, escalate to Backend Architect (PoC) by creating a note in MASTER-AGENT-LOG.md
5. Provide guidance to frontend developer

Backend Architect (PoC) location: ../TodoListAPI/.cursor-output/MASTER-AGENT-LOG.md
```

**Expected Response**: Oracle provides answer or escalates to Backend Architect.

---

## 🔄 Typical Workflow with Oracle AI

### Start of Session

```
You: "Oracle AI, what should I start with?"
[Use Command 1]
Oracle: "Start with Task #1. Use Command 1 from AGENT-COMMANDS.md."
```

### After Each Task

```
You: "Oracle AI, Task #1 is done. Update the log."
[Use Command 2]
Oracle: Updates MASTER-AGENT-LOG.md and tells you what's next.
```

### When Finding Backend Gap

```
You: "Oracle AI, frontend dev found a backend gap: missing endpoint for X"
[Use Command 8]
Oracle: Creates backend tasks, updates logs, notifies you to work on backend.
```

### Before Next Task

```
You: "Oracle AI, what's next?"
[Use Command 4]
Oracle: "Task #2. Use Command 2. Ready to proceed."
```

### End of Session

```
You: "Oracle AI, give me a session summary."
[Use Command 5]
Oracle: Provides summary and updates MASTER-AGENT-LOG.md.
```

---

## 📊 Oracle AI Entry Format

When Oracle AI updates MASTER-AGENT-LOG.md, entries follow this format:

```
---
## [ORACLE AI] - [Date/Time] - [Brief Summary]

**Coordinated By**: Oracle AI Coordinator
**Task**: [Task number and name]
**Status**: [Completed / In Progress / Blocked / Needs Review]

### Summary
[Brief description of what happened]

### Verification Performed
- ✅ [Verification step 1]
- ✅ [Verification step 2]
- ✅ [Verification step 3]

### Git Commit
- Branch: [branch name]
- Commit: "[commit message]"
- Merged to: main

### Files Modified
- [file path 1]
- [file path 2]

### Backend Coordination (if applicable)
- [Backend gap found / Backend question answered / Backend task created]

### Next Action
[What should happen next]

---
```

---

## 🎯 Quick Command Reference

| Situation | Command | When |
|-----------|---------|------|
| Starting session | Command 1 | Beginning |
| Task completed | Command 2 | After commit |
| Verify agent work | Command 3 | Before commit |
| Get next steps | Command 4 | Between tasks |
| Session summary | Command 5 | End of session |
| Check for issues | Command 6 | Anytime |
| Review progress | Command 7 | Anytime |
| Backend gap found | Command 8 | When API gap discovered |
| Backend question | Command 9 | When API question arises |

---

## 💡 Pro Tips

1. **Use Oracle AI Frequently**: Don't hesitate to ask for guidance
2. **Update Log After Each Task**: Keep Oracle AI in the loop
3. **Ask Before Committing**: Use Command 3 to verify
4. **Get Summaries**: Use Command 5 at end of sessions
5. **Check Progress**: Use Command 7 when you want status
6. **Report Backend Gaps Early**: Use Command 8 immediately when found
7. **Ask Backend Questions**: Use Command 9 instead of guessing

---

## 🔗 Backend Coordination

### Backend Architect (PoC)
- **Location**: `../TodoListAPI/.cursor-output/MASTER-AGENT-LOG.md`
- **Role**: Point of contact for backend API questions
- **Contact Method**: Use Command 9 to escalate questions

### Backend API Documentation
- **Location**: `../TodoListAPI/README.md`
- **Use**: Review API endpoints, request/response formats, authentication

### Creating Backend Tasks
- **When**: Frontend developer finds missing API endpoint or feature
- **How**: Use Command 8 - Oracle AI will create tasks in backend todo list
- **Result**: User works on backend tasks, then frontend continues

---

**Oracle AI is your coordination assistant. Use it to maintain the master log, guide your workflow, and coordinate with the backend team!**
