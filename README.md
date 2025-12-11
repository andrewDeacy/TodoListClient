# TodoListClient - React Frontend Application

A production-quality React frontend application for managing todo lists and todo items. Built with React 18+, TypeScript, React Query, and modern best practices.

## 🎯 Project Status

**Status**: Initialization Phase  
**Current Phase**: Project setup and coordination system established

This is the frontend portion of a take-home assessment. The backend API is located in `../TodoListAPI/`.

## 📋 Quick Start

### Prerequisites

- **Node.js** 18+ and npm (or yarn/pnpm)
- **Backend API** running (see `../TodoListAPI/README.md`)

### Setup Instructions

1. **Install dependencies** (once project is initialized):
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
TodoListClient/
├── .cursor-output/          # Oracle AI coordination system
│   ├── MASTER-AGENT-LOG.md  # Central coordination log
│   ├── Frontend-Todo-List.md # Detailed task breakdown
│   ├── ORACLE-AI-COMMANDS.md # Oracle AI command reference
│   ├── AGENT-COMMANDS.md    # Agent command templates
│   └── Requirements-Reference.md # Requirements documentation
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page-level components
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API client and services
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── context/            # React Context providers
│   └── styles/             # Global styles
└── README.md               # This file
```

## 👥 Team Structure

This project uses an AI agent coordination system:

- **Oracle AI Coordinator** - Workflow coordination and task management
- **Backend Architect (PoC)** - Point of contact for backend API questions
- **Frontend Architect** - Component architecture and design decisions
- **Frontend UI Developer** - UI/UX implementation (Apple-focused)
- **Frontend Developer** - Business logic and data integration

## 📚 Documentation

### For Developers

- **`.cursor-output/MASTER-AGENT-LOG.md`** - Central coordination log (read this first!)
- **`.cursor-output/Frontend-Todo-List.md`** - Detailed task breakdown
- **`.cursor-output/AGENT-COMMANDS.md`** - Command templates for agents
- **`.cursor-output/ORACLE-AI-COMMANDS.md`** - Oracle AI command reference

### For Coordination

- **`.cursor-output/Requirements-Reference.md`** - Complete requirements from recruiter
- **`../TodoListAPI/README.md`** - Backend API documentation
- **`../TodoListAPI/.cursor-output/MASTER-AGENT-LOG.md`** - Backend project log

## 🔄 Workflow

1. **Oracle AI assigns task** → Agent reads MASTER-AGENT-LOG.md
2. **Agent reads task details** → Frontend-Todo-List.md
3. **Agent implements** → Follows architecture and standards
4. **Agent updates log** → Appends to MASTER-AGENT-LOG.md thread
5. **Oracle AI verifies** → Checks completeness and quality
6. **Commit & continue** → Move to next task

## 🔗 Backend Integration

The frontend integrates with the backend API located in `../TodoListAPI/`:

- **Base URL**: Configured via environment variables
- **Authentication**: JWT tokens stored in localStorage
- **API Contract**: Matches backend DTOs exactly

### Backend Communication

- **Questions**: Use Oracle AI Command 9 to ask Backend Architect (PoC)
- **Gaps Found**: Use Oracle AI Command 8 to report gaps and create backend tasks

## 🎯 Success Criteria

The frontend application will be considered complete when:

1. ✅ All components are modular and reusable
2. ✅ React Query is properly configured with caching and invalidation
3. ✅ Loading, error, and empty states are handled for all data operations
4. ✅ Frontend matches backend API contract exactly
5. ✅ Application feels like a real, production app
6. ✅ At least one test is written and passing
7. ✅ README is comprehensive with setup instructions
8. ✅ Code is clean, well-documented, and maintainable

## 🚀 Getting Started with Development

1. **Read the coordination system**:
   - Start with `.cursor-output/MASTER-AGENT-LOG.md`
   - Review `.cursor-output/Frontend-Todo-List.md` for tasks
   - Check `.cursor-output/Requirements-Reference.md` for requirements

2. **Review backend API**:
   - Read `../TodoListAPI/README.md` for API documentation
   - Understand the API contract before implementing

3. **Start with Task #1**:
   - Use Command 1 from `.cursor-output/AGENT-COMMANDS.md`
   - Follow the workflow outlined in MASTER-AGENT-LOG.md

## 📝 Notes

- This is a take-home assessment for a startup position
- Focus on production-quality code, not just "it works"
- Prioritize fundamentals over extra features
- Document all decisions and trade-offs
- Match backend API contract exactly

---

**Last Updated**: 2025-01-09  
**Status**: Initialization Phase - Ready to begin development
