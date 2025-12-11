# Complete Beginner's Guide: Using AI Agents to Build Your Todo List Frontend

**Who This Is For**: Anyone who wants to build a professional React Todo List frontend using AI agents, even if you're not an expert developer.

**Goal**: Complete a production-quality React application that meets all requirements.

**Time**: Follow this guide step-by-step, and you'll have a working frontend.

**Use Case**: Copy-paste this entire document into a new Cursor chat window when context gets full to continue work seamlessly.

---

## 🎯 What You're Building

You're building a **Todo List Frontend** - a React application that lets users:
- Register and login
- View their todo lists
- Create, update, and delete lists
- Add, update, and delete items
- Reorder items via dropdown selection (v1.0 - drag-and-drop planned for v1.1)
- All with proper loading, error, and empty states

**End Result**: A professional React app that reviewers will be impressed with.

---

## 📚 Understanding Your Files (The Toolbox)

### Core Files (You'll Use These Most)

1. **MASTER-AGENT-LOG.md** 
   - **What it is**: The central log of everything that happens
   - **Think of it as**: A journal that tracks all work
   - **Who updates it**: Agents and Oracle AI
   - **You do**: Read it to see progress

2. **Frontend-Todo-List.md**
   - **What it is**: Your checklist of 29 tasks to complete (v1.0)
   - **Think of it as**: A to-do list for the project
   - **Who updates it**: Agents check off items as they complete them
   - **You do**: Reference it to see what's done and what's left

3. **AGENT-COMMANDS.md**
   - **What it is**: Pre-written commands you copy and paste
   - **Think of it as**: A recipe book with ready-to-use instructions
   - **Who uses it**: You copy commands from here
   - **You do**: Copy commands, paste into Cursor Chat

4. **ORACLE-AI-COMMANDS.md**
   - **What it is**: Commands for your coordinator (Oracle AI)
   - **Think of it as**: Instructions for your project manager
   - **Who uses it**: You use these to coordinate workflow
   - **You do**: Copy Oracle commands to guide the process

5. **Requirements-Reference.md**
   - **What it is**: The original requirements from the recruiter
   - **Think of it as**: The specification document
   - **Who uses it**: Agents read this to understand what to build
   - **You do**: Reference it if you need to understand requirements

---

## 🚀 Starting a Fresh Session (Copy-Paste This First!)

**When context gets full or you're starting a new session, paste this:**

```
You are the Oracle AI Coordinator. Read .cursor-output/MASTER-AGENT-LOG.md and .cursor-output/Frontend-Todo-List.md.

Based on the current state:
1. What is the next task to be assigned?
2. Which agent should handle it?
3. What are the dependencies?
4. What command should be used from AGENT-COMMANDS.md?

Provide a clear action plan.
```

**Oracle AI will respond** with:
- What was completed last session
- Current progress (X/29 tasks)
- Next task to work on
- Which command to use
- Any important context or blockers

---

## 📋 The Workflow Pattern (Do This for Every Task)

```
1. Ask Oracle AI: "What's next?" (use command above)
2. Oracle tells you: "Task #X, use Command X"
3. Copy Command X from AGENT-COMMANDS.md
4. Paste into Cursor Chat
5. Agent works (wait 1-5 minutes)
6. Agent reports back
7. You verify the work (git status, npm run build, check files)
8. You commit the changes
9. Ask Oracle AI: "Update the log" (use command below)
10. Oracle updates MASTER-AGENT-LOG.md
11. Repeat for next task
```

---

## 🔄 How to Continue with a Fresh Context Window

### Step 1: Before Ending Your Session

**Make sure everything is saved:**

1. **Verify all work is committed:**
   ```bash
   git status
   # Should show "nothing to commit, working tree clean"
   ```

2. **Check documentation is updated:**
   - Open `MASTER-AGENT-LOG.md` - should have latest entry
   - Open `Frontend-Todo-List.md` - checkboxes should be updated

3. **Get a session summary:**
   ```
   You are the Oracle AI Coordinator. Read .cursor-output/MASTER-AGENT-LOG.md.
   
   Please provide a session summary:
   - Tasks completed in this session
   - Current progress (X/29 tasks)
   - Next session starting point
   - Any blockers or issues
   - Backend API status (if relevant)
   
   Append this summary to MASTER-AGENT-LOG.md.
   ```

### Step 2: Start Fresh Session (Copy-Paste This)

**When you come back (new day, or after restarting Cursor):**

1. **Open Cursor** and navigate to your project:
   ```bash
   cd "/Users/andrewdeacy/development/TODO List Repos/TodoListClient"
   cursor .
   ```

2. **Open key files** (so AI can see them):
   - `.cursor-output/MASTER-AGENT-LOG.md`
   - `.cursor-output/Frontend-Todo-List.md`
   - `.cursor-output/AGENT-COMMANDS.md`

3. **Start with Oracle AI** (paste this):
   ```
   You are the Oracle AI Coordinator. Read .cursor-output/MASTER-AGENT-LOG.md and .cursor-output/Frontend-Todo-List.md.
   
   Based on the current state:
   1. What is the next task to be assigned?
   2. Which agent should handle it?
   3. What are the dependencies?
   4. What command should be used from AGENT-COMMANDS.md?
   
   Provide a clear action plan.
   ```

4. **Oracle AI will tell you:**
   - What was completed last session
   - What's the next task
   - Which command to use
   - Any important context

### Step 3: Continue with Next Task

**Once Oracle AI gives you the next task:**

1. **Copy the command** from `AGENT-COMMANDS.md` (Oracle will tell you which one)

2. **Paste into Cursor Chat** - the agent will:
   - Read `MASTER-AGENT-LOG.md` to understand what's been done
   - Read `Frontend-Todo-List.md` to see what needs to be done
   - Read relevant files if needed
   - Complete the task
   - Update documentation

3. **Verify and commit** as usual

4. **Continue the pattern!**

---

## 📝 Quick Reference: Essential Commands (Copy-Paste Ready)

### Starting a Fresh Session (Use This First!)
```
You are the Oracle AI Coordinator. Read .cursor-output/MASTER-AGENT-LOG.md and .cursor-output/Frontend-Todo-List.md.

Based on the current state:
1. What is the next task to be assigned?
2. Which agent should handle it?
3. What are the dependencies?
4. What command should be used from AGENT-COMMANDS.md?

Provide a clear action plan.
```

### After Task Completion (Update the Log)
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

### Getting Next Steps (Between Tasks)
```
You are the Oracle AI Coordinator. Read .cursor-output/MASTER-AGENT-LOG.md and .cursor-output/Frontend-Todo-List.md.

Based on the current state:
1. What is the next task to be assigned?
2. Which agent should handle it?
3. What are the dependencies?
4. What command should be used from AGENT-COMMANDS.md?

Provide a clear action plan.
```

### End of Session Summary
```
You are the Oracle AI Coordinator. Read .cursor-output/MASTER-AGENT-LOG.md.

Please provide a session summary:
- Tasks completed in this session
- Current progress (X/29 tasks)
- Next session starting point
- Any blockers or issues
- Backend API status (if relevant)

Append this summary to MASTER-AGENT-LOG.md.
```

### When Frontend Finds Backend Gap (Important!)
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
```

### When You Have Backend Questions
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

### Progress Check
```
You are the Oracle AI Coordinator. Read .cursor-output/MASTER-AGENT-LOG.md and .cursor-output/Frontend-Todo-List.md.

Please provide a progress report:
- Total tasks completed (X/29)
- Current phase (Setup/Authentication/Core Components/Advanced/Polish/Testing)
- Next 3 tasks to complete
- Overall status
- Any blockers

Do not update MASTER-AGENT-LOG.md, just provide a report.
```

---

## 🎯 The 29 Tasks (In Order) - v1.0

### Phase 1: Foundation (6 tasks)
1. Project Initialization
2. Dependencies Installation
3. Project Structure Setup
4. TypeScript Types Setup
5. API Client Setup
6. React Query Setup

### Phase 2: Authentication (4 tasks)
7. Auth Service
8. Auth Context/State
9. Protected Routes
10. Login/Register Pages

### Phase 3: Core Components (8 tasks)
11. Base UI Components
12. TodoList Service & Hooks
13. TodoItem Service & Hooks
14. TodoList List Component
15. TodoList Detail Component
16. TodoItem Component
17. Create/Edit List Forms
18. Create/Edit Item Forms

### Phase 4: Advanced Features (2 tasks)
21. Item Reordering (dropdown-based) - v1.0
22. Routing Setup

### Phase 5: Polish & Quality (5 tasks)
21. Error Handling
22. Loading States
23. Empty States
24. Responsive Design
25. Accessibility

### Phase 6: Testing & Documentation (3 tasks)
26. Unit Tests
27. README Documentation
28. Code Quality Review

**Total**: 29 tasks to complete the frontend (v1.0)

**Note**: Drag-and-drop reordering is planned for v1.1. v1.0 uses dropdown-based reordering for simplicity.

---

## 🔗 Backend Integration

### Backend API Location
- **Path**: `../TodoListAPI/`
- **Documentation**: `../TodoListAPI/README.md`
- **Backend Log**: `../TodoListAPI/.cursor-output/MASTER-AGENT-LOG.md`

### Important: Backend Must Be Running

Before starting frontend development:
1. **Start the backend API** (see `../TodoListAPI/README.md`)
2. **Verify it's running**: Check `http://localhost:5074/swagger`
3. **Note the API base URL** for frontend configuration

### When Frontend Finds Backend Gaps

If the frontend developer finds a gap in the backend API:

1. **Stop current task**
2. **Use the "Backend Gap" command above** (copy-paste it)
3. **Oracle AI will**:
   - Analyze the gap
   - Create backend tasks in `../TodoListAPI/.cursor-output/Backend-Todo-List.md`
   - Update logs
   - Notify you to work on backend
4. **You work on backend tasks**
5. **Frontend continues** once backend is ready

---

## 📊 Tracking Your Progress

### How to See What's Done

**Option 1: Check Frontend-Todo-List.md**
- Open the file
- Look for `[x]` (checked) vs `[ ]` (unchecked)
- Count how many are checked

**Option 2: Ask Oracle AI** (use Progress Check command above)

**Option 3: Check MASTER-AGENT-LOG.md**
- Scroll to bottom
- See all completed tasks listed
- See what's next

---

## 🆘 Common Issues & Solutions

### Issue: Agent Says It's Done But Nothing Changed

**Solution:**
1. Check `git status` - if nothing shows, agent didn't actually make changes
2. Ask Oracle AI to verify:
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
3. If agent didn't actually do the work, ask it again: "I don't see any changes in git. Please actually implement the changes."

### Issue: `npm run build` Fails

**Solution:**
1. Read the error message
2. Ask the agent: "The build failed with error: [paste error]. Please fix it."
3. Agent should fix it and try again

### Issue: Don't Know What Command to Use

**Solution:**
1. Use the "Starting a Fresh Session" command above
2. Oracle will tell you exactly which command to use

### Issue: Agent Didn't Update Documentation

**Solution:**
1. Remind agent: "You forgot to update MASTER-AGENT-LOG.md. Please append your update now using the exact format."
2. Or ask Oracle AI to check: "Oracle AI, verify the agent's work"

### Issue: Backend API Not Working

**Solution:**
1. Check if backend is running: `cd ../TodoListAPI && dotnet run`
2. Check CORS configuration in backend
3. Check API base URL in frontend configuration
4. Use "Backend Questions" command above if needed

---

## 💡 Pro Tips for Success

1. **One Task at a Time**: Don't rush. Complete each task fully before moving on.

2. **Always Verify**: Run `git status`, `git diff`, `npm run build` after each task.

3. **Use Oracle AI**: Don't hesitate to ask Oracle AI for guidance. It's there to help.

4. **Check Documentation**: After each task, verify MASTER-AGENT-LOG.md was updated.

5. **Commit Often**: Commit after each completed task. Don't let work pile up.

6. **Read Error Messages**: If something fails, read the error. It usually tells you what's wrong.

7. **Backend First**: Make sure backend API is running before starting frontend work.

8. **Test in Browser**: After each component, test it in the browser to see it working.

9. **Report Backend Gaps Early**: If you find a backend gap, report it immediately using the command above.

10. **Take Breaks**: This is a lot of work. Take breaks between tasks.

---

## 🎓 Understanding the Agents

### Who Are These Agents?

Think of them as **specialized team members**:

- **Frontend Developer**: Does the coding (most tasks)
- **Frontend Architect**: Designs patterns and structure
- **Frontend UI Developer**: Creates beautiful UI components (Apple-focused)
- **Backend Architect (PoC)**: Answers backend questions
- **Oracle AI**: Coordinates everything (your helper)

### How Do They Work?

1. You give them a command (from AGENT-COMMANDS.md)
2. They read the relevant files
3. They do the work
4. They update documentation
5. They report back

**You don't need to code anything** - the agents do it!

---

## 🚀 Example: Complete Session

Here's what a complete session looks like:

### Morning Session (Tasks 1-3)

```
[9:00 AM] You: Open Cursor, open files, open chat
[9:05 AM] You: Paste "Starting a Fresh Session" command
[9:06 AM] Oracle: "Task #1. Use Command 1."
[9:07 AM] You: Copy Command 1 from AGENT-COMMANDS.md, paste in chat
[9:12 AM] Agent: "Done! Project initialized."
[9:13 AM] You: Verify (git status, git diff, npm run build)
[9:15 AM] You: Commit changes
[9:16 AM] You: Paste "After Task Completion" command
[9:17 AM] Oracle: Updates log, says "Next: Task #2"

[9:18 AM] You: Copy Command 2, paste in chat
[9:23 AM] Agent: "Done! Dependencies installed."
[9:24 AM] You: Verify and commit
[9:25 AM] You: Paste "After Task Completion" command

[9:26 AM] You: Copy Command 3, paste in chat
[9:31 AM] Agent: "Done! Project structure created."
[9:32 AM] You: Verify and commit
[9:33 AM] You: Paste "After Task Completion" command

[9:34 AM] You: Paste "End of Session Summary" command
[9:35 AM] Oracle: "Completed Tasks 1-3. Next session: Start with Task #4."
```

**Result**: 3 tasks completed in ~30 minutes!

---

## 🏁 When You're Done

### Final Steps

1. **Complete all 29 tasks** (follow the pattern for v1.0)

2. **Final Verification**:
   ```bash
   npm run build
   npm test
   npm run dev
   ```

3. **Test the Application**:
   - Open browser to `http://localhost:5173` (or your dev server port)
   - Test all features:
     - Register/Login
     - Create lists
     - Add items
     - Reorder items (dropdown-based)
     - Delete items
     - Error states
     - Loading states
     - Empty states

4. **Final Summary**:
   ```
   You are the Oracle AI Coordinator. Read .cursor-output/MASTER-AGENT-LOG.md.
   
   Please provide a final project summary:
   - All tasks completed
   - Final status
   - What was built
   - How to test it
   
   Append this summary to MASTER-AGENT-LOG.md.
   ```

5. **Review Everything**:
   - Check MASTER-AGENT-LOG.md has all entries
   - Check Frontend-Todo-List.md has all checkboxes
   - Check README.md is complete
   - Test the application works

---

## 🎉 Success Checklist

When you're done, you should have:

- ✅ All 29 tasks completed (v1.0)
- ✅ MASTER-AGENT-LOG.md has entries for all tasks
- ✅ Frontend-Todo-List.md has all checkboxes checked
- ✅ Code compiles (`npm run build` succeeds)
- ✅ Tests pass (`npm test` succeeds)
- ✅ App runs (`npm run dev` starts server)
- ✅ All features work in browser
- ✅ Loading, error, and empty states work
- ✅ README.md is complete
- ✅ Matches backend API contract exactly

---

## 📚 File Reference Quick Guide

| File | When to Use | What It Does |
|------|-------------|--------------|
| **AGENT-COMMANDS.md** | Every task | Copy commands to assign work |
| **ORACLE-AI-COMMANDS.md** | Between tasks | Coordinate workflow |
| **MASTER-AGENT-LOG.md** | Always | Track all progress |
| **Frontend-Todo-List.md** | Always | See what's done/left |
| **Requirements-Reference.md** | Reference | Understand requirements |
| **BEGINNERS-GUIDE.md** | Starting fresh | This guide! |

---

## 🎯 Quick Start Checklist

**When starting a new session (context full or new day):**

1. ✅ Open Cursor in `TodoListClient/` directory
2. ✅ Open `.cursor-output/MASTER-AGENT-LOG.md`
3. ✅ Open `.cursor-output/Frontend-Todo-List.md`
4. ✅ Open `.cursor-output/AGENT-COMMANDS.md`
5. ✅ Open Cursor Chat (Cmd+L)
6. ✅ Paste "Starting a Fresh Session" command (from above)
7. ✅ Oracle AI tells you what to do next
8. ✅ Copy command from AGENT-COMMANDS.md
9. ✅ Paste into chat
10. ✅ Agent works, you verify, commit, repeat!

---

## 🚀 You're Ready!

You now know:
- ✅ What each file does
- ✅ How to use Oracle AI
- ✅ How to assign tasks to agents
- ✅ How to verify and commit work
- ✅ How to track progress
- ✅ How to handle issues
- ✅ How to continue in fresh context windows

**Start with**: Paste the "Starting a Fresh Session" command above and follow the pattern!

**Remember**: One task at a time, verify everything, commit often, use Oracle AI for guidance, report backend gaps immediately.

**Good luck! You've got this!** 🎉

---

## 🔄 Copy-Paste Hub (All Commands in One Place)

### When Context Gets Full - Start Here:
```
You are the Oracle AI Coordinator. Read .cursor-output/MASTER-AGENT-LOG.md and .cursor-output/Frontend-Todo-List.md.

Based on the current state:
1. What is the next task to be assigned?
2. Which agent should handle it?
3. What are the dependencies?
4. What command should be used from AGENT-COMMANDS.md?

Provide a clear action plan.
```

### After Each Task:
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

### End of Session:
```
You are the Oracle AI Coordinator. Read .cursor-output/MASTER-AGENT-LOG.md.

Please provide a session summary:
- Tasks completed in this session
- Current progress (X/29 tasks)
- Next session starting point
- Any blockers or issues
- Backend API status (if relevant)

Append this summary to MASTER-AGENT-LOG.md.
```

### Backend Gap Found:
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
```

---

**Questions?** Ask Oracle AI - it's there to help guide you through everything!

**Last Updated**: 2025-01-09  
**Status**: Ready for development - Copy-paste this guide into new chat windows when context gets full!
