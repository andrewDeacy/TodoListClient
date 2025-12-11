# Take-Home Assessment Requirements Reference - Frontend

This document contains the original requirements from the recruiter for the frontend portion of the take-home assessment.

---

## Original Test Objective

Build a small to-do task management API and frontend. This test evaluates:

- Backend API design. Please use .NET Core.
- Data structure design. Please use SQL Lite or EF Core in memory.
- **Frontend component design. Please use React or Vue.**
- Communication between frontend and backend.
- Clean code, architecture structure, and thought process.
- Trade-offs and assumptions.
- Include a short README.md with setup steps and your explanation notes.
- Comments or a README.md explaining assumptions, scalability, and what you would implement in the future.
- Submit a GitHub repo link with both frontend and backend projects.
- Please add any features you feel are required for a Production MVP.

---

## Recruiter Email - Detailed Feedback & Guidance

### Context
Here is some recent feedback of take-home assessments that were reviewed. Hopefully this will provide a little insight to what Ezra is looking for in this assessment.

The ones who miss the mark often make their solution too light. It runs, but it feels half-baked or incomplete. The ones who stand out treat the assessment like a small, production-quality project: clean structure, thoughtful decisions, and documentation that shows their thinking.

Below are observations and guidance to help you focus your time in the right places.

---

## Where Strong Submissions Stand Out

### Frontend

1. **Manage data using React Query**, with proper caching, invalidation, and error states.
2. **Handle loading, error, and empty states** clearly.
3. **Match the backend contract exactly** (routes, field names, data shapes).
4. **Keep components modular** — separate logic from presentation.

### Adding Your Own Personal Touch

#### Testing & Docs

1. **Add at least one backend or frontend test** that proves functionality.
2. **Write a README that acts as a runbook**: how to set up, run, and test.
3. **Include notes on assumptions, trade-offs, or what you'd do next** if you had more time.

---

## Where People Tend to Fall Short

1. **No loading or error states on the frontend.**
2. **Frontend and backend out of sync.**
3. **No documentation or setup instructions.**
4. **Using an in-memory database (non-reproducible).** (Backend issue, but affects frontend)
5. **No validation or inconsistent error handling.** (Both frontend and backend)

Those gaps make an otherwise functional solution feel unfinished.

---

## Where to Spend Your Time

We've seen people get lost trying to do too much. The reviewers aren't looking for the most features — they're looking for strong fundamentals.

### If you have to prioritize:

1. **Architecture & clarity first**
   - Make sure your API design, data model, and structure are clean and intentional.
   - The code should read like something you'd hand to a teammate in production.

2. **Validation and error handling next**
   - Reviewers look closely at how you deal with bad input and failure states — both in the API and the UI.

3. **Frontend experience that feels real**
   - It doesn't have to be beautiful, but it should behave like a real app — show clear states for loading, empty lists, and errors.

4. **Documentation and reasoning**
   - A simple, well-written README that explains setup, decisions, and trade-offs is often the difference between "good" and "great."

If you have extra time, polish features like filtering, sorting, or light testing but nail the fundamentals first. The strongest submissions don't try to do everything; they just do the basics extremely well. They feel like something that could ship internally: intentional design, clear documentation, and clean, maintainable code. If you treat this like a production MVP, something that's small, sharp, and well-thought-out, you'll stand out.

---

## Key Takeaways for Frontend Implementation

### Must-Have Frontend Features:

- ✅ React Query or Vue Query for data management
- ✅ Loading, error, and empty states
- ✅ Matches backend contract exactly
- ✅ Modular component structure
- ✅ At least one test
- ✅ Comprehensive README

### Documentation Requirements:

- ✅ README with setup/run instructions
- ✅ Notes on assumptions and trade-offs
- ✅ Future improvements section

---

## Frontend-Specific Requirements

### Data Management

- **Use React Query (TanStack Query)** for all server state
- **Proper caching** - Configure staleTime and cacheTime appropriately
- **Cache invalidation** - Invalidate queries after mutations
- **Error states** - Handle and display errors from API calls
- **Loading states** - Show loading indicators during data fetches

### Component Architecture

- **Modular components** - Separate logic from presentation
- **Reusable components** - Create base UI components (Button, Input, Card, etc.)
- **Custom hooks** - Extract data fetching logic into custom hooks
- **TypeScript** - Use TypeScript for type safety

### User Experience

- **Loading states** - Show spinners/skeletons during data fetches
- **Error states** - Display user-friendly error messages
- **Empty states** - Show helpful messages when no data exists
- **Form validation** - Client-side validation before submission
- **Responsive design** - Works on mobile, tablet, and desktop

### Backend Integration

- **Match API contract exactly** - Use exact field names from backend
- **Handle authentication** - Store and send JWT tokens
- **Error handling** - Handle API errors gracefully
- **CORS** - Ensure CORS is configured correctly

---

## Grading Rubric (Inferred)

### Excellent (Stand Out):

- Production-quality code structure
- Clean component architecture with proper separation of concerns
- Comprehensive loading, error, and empty states
- Well-documented with thoughtful decisions explained
- Tests included
- Easy to run and test
- Feels like a real, production app

### Good (Meets Requirements):

- Functional solution
- Basic structure in place
- Some loading/error states
- Basic documentation

### Needs Improvement (Falls Short):

- No loading or error states
- Frontend and backend out of sync
- Missing documentation
- Feels incomplete or half-baked

---

## Notes for AI-Assisted Development

When using AI to help with this project:

- Reference this document for requirements
- Ensure all "Must-Have" items are completed
- Prioritize fundamentals over extra features
- Focus on production-quality code, not just "it works"
- Always include loading, error, and empty states
- Always match backend API contract exactly
- Always document decisions and trade-offs

---

## Backend API Reference

The backend API is located in `../TodoListAPI/`. Key documentation:

- **API Documentation**: `../TodoListAPI/README.md`
- **Backend Log**: `../TodoListAPI/.cursor-output/MASTER-AGENT-LOG.md`
- **Backend Tasks**: `../TodoListAPI/.cursor-output/Backend-Todo-List.md`

### Backend API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

#### Todo Lists
- `GET /api/lists` - Get all lists for current user
- `GET /api/lists/{id}` - Get list by ID
- `POST /api/lists` - Create new list
- `PUT /api/lists/{id}` - Update list
- `DELETE /api/lists/{id}` - Delete list

#### Todo Items
- `GET /api/lists/{listId}/items` - Get all items in a list
- `GET /api/lists/{listId}/items/{itemId}` - Get item by ID
- `POST /api/lists/{listId}/items` - Create new item
- `PUT /api/lists/{listId}/items/{itemId}` - Update item
- `DELETE /api/lists/{listId}/items/{itemId}` - Delete item
- `PATCH /api/lists/{listId}/items/{itemId}/complete` - Mark item complete/incomplete
- `PATCH /api/lists/{listId}/items/reorder` - Reorder items

### Backend Data Models

See `../TodoListAPI/TodoListAPI.Core/DTOs/` for exact DTO structures:
- `TodoListDto` - List with optional nested items
- `TodoItemDto` - Item with all properties including Order

---

**Last Updated**: 2025-01-09  
**Status**: Reference document for frontend development
