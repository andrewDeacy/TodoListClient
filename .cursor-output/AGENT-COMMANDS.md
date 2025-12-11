# Agent Commands - Frontend Project Quick Reference

**Usage**: Copy the command for your task, paste into Cursor Chat (Cmd+L), execute, verify, commit.

---

## 🚀 Phase 1: Foundation

### Command 1: Project Initialization

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend Developer (Stanford CS '18, Software Engineer II at Microsoft).

BEFORE STARTING:
1. Read .cursor-output/MASTER-AGENT-LOG.md (understand current state)
2. Read .cursor-output/Frontend-Todo-List.md item #1 (your task)
3. Read .cursor-output/Requirements-Reference.md (understand requirements)

YOUR TASK:
Complete Frontend-Todo-List.md item #1 (Project Initialization):
- Initialize React project with TypeScript
- Use Vite (recommended) or Create React App
- Configure build tool
- Set up basic project structure

WHEN COMPLETE (ALL MANDATORY):
1. Append your update to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY - use EXACT format)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #1 (MANDATORY)
3. Verify: npm run build or npm run dev works (MANDATORY)
4. Tell me exactly what you did and what files you created

REMEMBER: You are a Stanford grad at Microsoft - production quality code only.
```

### Command 2: Dependencies Installation

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend Developer (Stanford CS '18, Software Engineer II at Microsoft).

YOUR TASK:
Complete Frontend-Todo-List.md item #2 (Dependencies Installation):
- Install React Query (@tanstack/react-query)
- Install React Router (react-router-dom)
- Install Axios (axios)
- Install TypeScript types
- Install testing library (@testing-library/react, @testing-library/jest-dom)
- Install Tailwind CSS (tailwindcss, postcss, autoprefixer)

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #2 (MANDATORY)
3. Verify: npm install completes successfully (MANDATORY)
4. Tell me exactly what you did
```

### Command 3: Tailwind CSS Setup

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend Developer (Stanford CS '18, Software Engineer II at Microsoft).

YOUR TASK:
Complete Frontend-Todo-List.md item #3 (Tailwind CSS Setup):
- Initialize Tailwind CSS configuration (tailwind.config.js)
- Configure PostCSS (postcss.config.js)
- Set up Tailwind directives in main CSS file (src/index.css)
- Configure content paths for Tailwind to scan
- Set up custom theme if needed
- Test Tailwind is working with a simple component

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #3 (MANDATORY)
3. Verify: Tailwind classes work in a test component (MANDATORY)
4. Tell me exactly what you did
```

### Command 4: Project Structure Setup

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend Architect (Stanford CS '12, Senior Frontend Architect at Microsoft).

YOUR TASK:
Complete Frontend-Todo-List.md item #4 (Project Structure Setup):
- Create folder structure:
  - src/components/ - Reusable UI components
  - src/components/ui/ - Base UI components (Button, Input, etc.)
  - src/pages/ or src/views/ - Page-level components
  - src/hooks/ - Custom React hooks
  - src/services/ or src/api/ - API client and services
  - src/types/ - TypeScript type definitions
  - src/utils/ - Utility functions
  - src/context/ - React Context providers
  - src/styles/ - Global styles (if needed beyond Tailwind)
- Document structure decisions
- Note: Using Tailwind CSS for styling (already configured in TASK-3)

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #4 (MANDATORY)
3. Tell me exactly what you did
```

### Command 5: TypeScript Types Setup

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend Developer (Stanford CS '18, Software Engineer II at Microsoft).

BEFORE STARTING:
1. Review backend API contract in ../TodoListAPI/README.md
2. Review backend DTOs in ../TodoListAPI/TodoListAPI.Core/DTOs/

YOUR TASK:
Complete Frontend-Todo-List.md item #5 (TypeScript Types Setup):
- Create types/api.ts with types matching backend DTOs exactly:
  - TodoList (matches TodoListDto)
  - TodoItem (matches TodoItemDto)
  - CreateListRequest
  - UpdateListRequest
  - CreateListItemRequest
  - ReorderItemsRequest
  - AuthResponse
  - LoginRequest
  - RegisterRequest
- Ensure field names match backend exactly
- Add JSDoc comments for clarity

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #5 (MANDATORY)
3. Verify: TypeScript compiles without errors (MANDATORY)
4. Tell me exactly what you did
```

### Command 6: API Client Setup

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend Developer (Stanford CS '18, Software Engineer II at Microsoft).

YOUR TASK:
Complete Frontend-Todo-List.md item #6 (API Client Setup):
- Create axios instance with base URL configuration
- Set up request/response interceptors for:
  - JWT token injection (Authorization header)
  - Error handling
  - Request/response logging (dev only)
- Configure base URL from environment variables
- Handle CORS if needed

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #6 (MANDATORY)
3. Verify: API client can be imported without errors (MANDATORY)
4. Tell me exactly what you did
```

### Command 7: React Query Setup

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend Developer (Stanford CS '18, Software Engineer II at Microsoft).

YOUR TASK:
Complete Frontend-Todo-List.md item #7 (React Query Setup):
- Wrap app with QueryClientProvider
- Configure QueryClient with:
  - Default query options (staleTime, cacheTime)
  - Default mutation options
  - Error handling
- Set up React Query DevTools (development only)

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #6 (MANDATORY)
3. Verify: App runs without errors, React Query DevTools visible (MANDATORY)
4. Tell me exactly what you did
```

---

## 🔐 Phase 2: Authentication

### Command 7: Auth Service

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend Developer (Stanford CS '18, Software Engineer II at Microsoft).

YOUR TASK:
Complete Frontend-Todo-List.md item #7 (Auth Service):
- Create authService.ts with:
  - login() - POST /api/auth/login
  - register() - POST /api/auth/register
  - logout() - Clear token
  - getToken() - Get stored token
  - isAuthenticated() - Check if logged in
- Store JWT token in localStorage or sessionStorage

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #7 (MANDATORY)
3. Verify: Service functions can be imported and called (MANDATORY)
4. Tell me exactly what you did
```

### Command 8: Auth Context/State

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend Developer (Stanford CS '18, Software Engineer II at Microsoft).

YOUR TASK:
Complete Frontend-Todo-List.md item #8 (Auth Context/State):
- Create AuthContext or useAuth hook with:
  - Current user state
  - Login function
  - Register function
  - Logout function
  - Loading state
- Persist auth state across page refreshes

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #8 (MANDATORY)
3. Verify: Auth state persists after page refresh (MANDATORY)
4. Tell me exactly what you did
```

### Command 9: Protected Routes

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend Developer (Stanford CS '18, Software Engineer II at Microsoft).

YOUR TASK:
Complete Frontend-Todo-List.md item #9 (Protected Routes):
- Create ProtectedRoute component/hook that:
  - Checks if user is authenticated
  - Redirects to login if not authenticated
  - Renders children if authenticated
- Integrate with React Router if using routing

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #9 (MANDATORY)
3. Verify: Unauthenticated users are redirected (MANDATORY)
4. Tell me exactly what you did
```

### Command 11: Minimalist Login UI (Based on Mockup)

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend UI Developer (Stanford CS '15, Senior UI Developer at Microsoft, formerly Apple).

BEFORE STARTING:
1. Review .cursor-output/mockup.png to understand the design
2. Read Frontend-Todo-List.md item #11 for detailed requirements

YOUR TASK:
Complete Frontend-Todo-List.md item #11 (Minimalist Login UI):
- Create Login page matching the mockup design exactly:
  - Centered white modal with rounded corners (rounded-xl or rounded-2xl)
  - Soft shadow (shadow-lg or shadow-xl)
  - Close button (X) in top right corner
  - "Sign in" title (large, bold, centered)
  - "Email or phone number" input field with label
  - "Password" input field with label and "Hide" toggle
  - Large pill-shaped "Sign in" button (light gray, centered)
  - "Remember me" checkbox on left, "Need help?" link on right
  - "Don't have an account? Sign up" text with link
  - reCAPTCHA information text (small, light gray)
- Use minimalist gradient background instead of image:
  - Apply subtle gradient (e.g., bg-gradient-to-br from-gray-50 to-gray-100)
  - Ensure modal stands out against gradient
- Implement form functionality:
  - Form validation
  - Error message display
  - Loading state (disable button, show spinner)
  - Link to register page
- Use React Query mutations for API calls
- Use Tailwind CSS for all styling
- Ensure responsive design (mobile-friendly)
- Make accessible (ARIA labels, keyboard navigation)

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #11 (MANDATORY)
3. Verify: Login page matches mockup design, forms work, validation works, API calls succeed (MANDATORY)
4. Tell me exactly what you did
```

### Command 12: Register Page

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend UI Developer (Stanford CS '15, Senior UI Developer at Microsoft, formerly Apple).

YOUR TASK:
Complete Frontend-Todo-List.md item #12 (Register Page):
- Create Register page with similar minimalist design to Login:
  - Email input
  - Username input
  - Password input
  - Confirm password input (optional)
  - Submit button
  - Error message display
  - Loading state
  - Link to login page
- Match the minimalist aesthetic of Login page
- Handle form validation
- Use React Query mutations for API calls
- Use Tailwind CSS for styling

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #12 (MANDATORY)
3. Verify: Forms work, validation works, API calls succeed (MANDATORY)
4. Tell me exactly what you did
```

---

## 🎨 Phase 3: Core Components

### Command 11: Base UI Components

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend UI Developer (Stanford CS '15, Senior UI Developer at Microsoft, formerly Apple).

YOUR TASK:
Complete Frontend-Todo-List.md item #11 (Base UI Components):
- Create reusable components in src/components/ui/:
  - Button.tsx - Styled button with variants
  - Input.tsx - Text input with validation states
  - Card.tsx - Container card component
  - LoadingSpinner.tsx - Loading indicator
  - ErrorMessage.tsx - Error message display
  - EmptyState.tsx - Empty state display
- Make components accessible (ARIA labels, keyboard navigation)
- Add TypeScript props interfaces

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #11 (MANDATORY)
3. Verify: Components render correctly, accessible (MANDATORY)
4. Tell me exactly what you did
```

### Command 12: TodoList Service & Hooks

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend Developer (Stanford CS '18, Software Engineer II at Microsoft).

BEFORE STARTING:
1. Review backend API endpoints in ../TodoListAPI/README.md
2. Ensure backend API is running and accessible

YOUR TASK:
Complete Frontend-Todo-List.md item #12 (TodoList Service & Hooks):
- Create useTodoLists() - GET /api/lists (query)
- Create useTodoList(id) - GET /api/lists/{id} (query)
- Create useCreateList() - POST /api/lists (mutation)
- Create useUpdateList() - PUT /api/lists/{id} (mutation)
- Create useDeleteList() - DELETE /api/lists/{id} (mutation)
- Configure proper cache invalidation
- Handle loading, error states

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #12 (MANDATORY)
3. Verify: Hooks work, API calls succeed, cache invalidation works (MANDATORY)
4. Tell me exactly what you did

IF BACKEND GAP FOUND:
- Use Oracle AI Command 8 to report gap
- Wait for backend implementation
- Then continue
```

### Command 13: TodoItem Service & Hooks

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend Developer (Stanford CS '18, Software Engineer II at Microsoft).

YOUR TASK:
Complete Frontend-Todo-List.md item #13 (TodoItem Service & Hooks):
- Create useTodoItems(listId) - GET /api/lists/{listId}/items (query)
- Create useTodoItem(listId, itemId) - GET /api/lists/{listId}/items/{itemId} (query)
- Create useCreateItem() - POST /api/lists/{listId}/items (mutation)
- Create useUpdateItem() - PUT /api/lists/{listId}/items/{itemId} (mutation)
- Create useDeleteItem() - DELETE /api/lists/{listId}/items/{itemId} (mutation)
- Create useMarkItemComplete() - PATCH /api/lists/{listId}/items/{itemId}/complete (mutation)
- Create useReorderItems() - PATCH /api/lists/{listId}/items/reorder (mutation)
- Configure proper cache invalidation
- Handle loading, error states

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #13 (MANDATORY)
3. Verify: All hooks work, API calls succeed (MANDATORY)
4. Tell me exactly what you did
```

### Command 14: TodoList List Component

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend UI Developer (Stanford CS '15, Senior UI Developer at Microsoft, formerly Apple).

YOUR TASK:
Complete Frontend-Todo-List.md item #14 (TodoList List Component):
- Display all user's todo lists
- Show loading state while fetching
- Show error state if fetch fails
- Show empty state if no lists
- Each list item should be clickable
- Add "Create New List" button
- Use useTodoLists() hook

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #14 (MANDATORY)
3. Verify: Component renders, all states work, interactions work (MANDATORY)
4. Tell me exactly what you did
```

### Command 15: TodoList Detail Component

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend UI Developer (Stanford CS '15, Senior UI Developer at Microsoft, formerly Apple).

YOUR TASK:
Complete Frontend-Todo-List.md item #15 (TodoList Detail Component):
- Display single todo list with its items
- Show list name, description
- Display all items in the list (ordered by Order property)
- Show loading state
- Show error state
- Show empty state if no items
- Add "Add Item" button
- Add "Edit List" button
- Add "Delete List" button
- Use useTodoList() and useTodoItems() hooks

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #15 (MANDATORY)
3. Verify: Component renders, all states work, items display in correct order (MANDATORY)
4. Tell me exactly what you did
```

### Command 16: TodoItem Component

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend UI Developer (Stanford CS '15, Senior UI Developer at Microsoft, formerly Apple).

YOUR TASK:
Complete Frontend-Todo-List.md item #16 (TodoItem Component):
- Display single todo item:
  - Title
  - Description (if present)
  - Completion checkbox
  - Due date (if present)
- Handle item completion toggle
- Show edit/delete buttons
- Make item draggable (for reordering) - optional but recommended
- Use useMarkItemComplete() hook

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #16 (MANDATORY)
3. Verify: Component renders, completion toggle works (MANDATORY)
4. Tell me exactly what you did
```

### Command 17: Create/Edit List Forms

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend UI Developer (Stanford CS '15, Senior UI Developer at Microsoft, formerly Apple).

YOUR TASK:
Complete Frontend-Todo-List.md item #17 (Create/Edit List Forms):
- Create form with:
  - Name input (required)
  - Description input (optional)
  - Submit button
  - Cancel button
- Form validation (client-side)
- Error message display
- Loading state during submission
- Use useCreateList() and useUpdateList() hooks

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #17 (MANDATORY)
3. Verify: Forms work, validation works, API calls succeed (MANDATORY)
4. Tell me exactly what you did
```

### Command 18: Create/Edit Item Forms

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend UI Developer (Stanford CS '15, Senior UI Developer at Microsoft, formerly Apple).

YOUR TASK:
Complete Frontend-Todo-List.md item #18 (Create/Edit Item Forms):
- Create form with:
  - Title input (required)
  - Description input (optional)
  - Due date input (optional, date picker)
  - Submit button
  - Cancel button
- Form validation (client-side)
- Error message display
- Loading state during submission
- Use useCreateItem() and useUpdateItem() hooks

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #18 (MANDATORY)
3. Verify: Forms work, validation works, API calls succeed (MANDATORY)
4. Tell me exactly what you did
```

---

## 🚀 Phase 4: Advanced Features

### Command 21: Item Reordering (v1.0 - Dropdown-Based)

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend UI Developer (Stanford CS '15, Senior UI Developer at Microsoft, formerly Apple).

YOUR TASK:
Complete Frontend-Todo-List.md item #21 (Item Reordering - Dropdown-Based):
- Add dropdown/select input to each todo item for position selection
- Dropdown should show available positions (1, 2, 3, ... up to total items)
- Current position should be pre-selected in dropdown
- When user selects new position:
  - Call useReorderItems() mutation with item ID and new position
  - Update item order immediately (optimistic update)
  - Handle errors and show error message if reordering fails
  - Refresh list to show updated order
- Dropdown should be styled with Tailwind CSS to match minimalist design
- Make dropdown accessible (ARIA labels, keyboard navigation)
- Show loading state while reordering

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #21 (MANDATORY)
3. Verify: Dropdown reordering works, order updates persist, errors handled (MANDATORY)
4. Tell me exactly what you did

NOTE: This is v1.0 implementation using dropdown. Drag-and-drop is planned for v1.1.
```

### Command 22: Routing Setup

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend Developer (Stanford CS '18, Software Engineer II at Microsoft).

YOUR TASK:
Complete Frontend-Todo-List.md item #22 (Routing Setup):
- Configure routes:
  - /login - Login page
  - /register - Register page
  - /lists - Lists overview
  - /lists/:id - List detail
- Set up protected routes
- Handle 404/not found
- Add navigation component

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #22 (MANDATORY)
3. Verify: All routes work, protected routes redirect correctly (MANDATORY)
4. Tell me exactly what you did
```

---

## ✨ Phase 5: Polish & Quality

### Command 23: Error Handling

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend Developer (Stanford CS '18, Software Engineer II at Microsoft).

YOUR TASK:
Complete Frontend-Todo-List.md item #23 (Error Handling):
- Create error boundary component
- Handle API errors gracefully
- Display user-friendly error messages
- Log errors (console in dev)
- Handle network errors
- Handle authentication errors (redirect to login)

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #23 (MANDATORY)
3. Verify: Errors are handled gracefully (MANDATORY)
4. Tell me exactly what you did
```

### Command 24: Loading States

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend UI Developer (Stanford CS '15, Senior UI Developer at Microsoft, formerly Apple).

YOUR TASK:
Complete Frontend-Todo-List.md item #24 (Loading States):
- Verify loading spinners on all data fetches
- Add skeleton loaders for better UX (optional)
- Handle loading states in forms
- Disable buttons during submission

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #24 (MANDATORY)
3. Verify: All loading states work correctly (MANDATORY)
4. Tell me exactly what you did
```

### Command 23: Empty States

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend UI Developer (Stanford CS '15, Senior UI Developer at Microsoft, formerly Apple).

YOUR TASK:
Complete Frontend-Todo-List.md item #25 (Empty States):
- Create empty state component (if not created in TASK-11)
- Show empty state when:
  - No todo lists exist
  - No items in a list
- Include helpful messages and call-to-action buttons

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #25 (MANDATORY)
3. Verify: Empty states display correctly (MANDATORY)
4. Tell me exactly what you did
```

### Command 26: Responsive Design

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend UI Developer (Stanford CS '15, Senior UI Developer at Microsoft, formerly Apple).

YOUR TASK:
Complete Frontend-Todo-List.md item #26 (Responsive Design):
- Test on mobile, tablet, desktop viewports
- Ensure touch-friendly interactions
- Adjust layout for smaller screens
- Test drag-and-drop on touch devices (if implemented)

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #26 (MANDATORY)
3. Verify: App works on all viewport sizes (MANDATORY)
4. Tell me exactly what you did
```

### Command 27: Accessibility

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend UI Developer (Stanford CS '15, Senior UI Developer at Microsoft, formerly Apple).

YOUR TASK:
Complete Frontend-Todo-List.md item #27 (Accessibility):
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen reader (optional but recommended)
- Ensure sufficient color contrast
- Add focus indicators

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #27 (MANDATORY)
3. Verify: Accessibility features work (MANDATORY)
4. Tell me exactly what you did
```

---

## 🧪 Phase 6: Testing & Documentation

### Command 28: Unit Tests

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend Developer (Stanford CS '18, Software Engineer II at Microsoft).

YOUR TASK:
Complete Frontend-Todo-List.md item #28 (Unit Tests):
- Write test for a component or hook
- Test user interactions
- Test error states
- Test loading states
- Use React Testing Library

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #28 (MANDATORY)
3. Verify: Test passes (MANDATORY)
4. Tell me exactly what you did
```

### Command 29: README Documentation

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend Architect (Stanford CS '12, Senior Frontend Architect at Microsoft).

YOUR TASK:
Complete Frontend-Todo-List.md item #29 (README Documentation):
- Setup instructions (prerequisites, installation)
- How to run the application
- How to test the application
- Project structure explanation
- Assumptions made
- Trade-offs and decisions
- Future improvements
- API integration notes

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #29 (MANDATORY)
3. Verify: README is comprehensive and accurate (MANDATORY)
4. Tell me exactly what you did
```

### Command 30: Code Quality Review

```
Read .cursor-output/MASTER-AGENT-LOG.md first. You are the Frontend Architect (Stanford CS '12, Senior Frontend Architect at Microsoft).

YOUR TASK:
Complete Frontend-Todo-List.md item #30 (Code Quality Review):
- Review code for consistency
- Ensure TypeScript types are used everywhere
- Remove console.logs (or use proper logging)
- Ensure no unused imports
- Verify all components are properly documented
- Check for accessibility issues

WHEN COMPLETE (ALL MANDATORY):
1. Append to .cursor-output/MASTER-AGENT-LOG.md thread (MANDATORY)
2. Update .cursor-output/Frontend-Todo-List.md checkboxes for item #30 (MANDATORY)
3. Verify: Code quality is production-ready (MANDATORY)
4. Tell me exactly what you did
```

---

## 🔗 Backend Coordination

### When Backend Gap is Found

If you find a gap in the backend API (missing endpoint, missing field, etc.):

1. **Stop your current task**
2. **Use Oracle AI Command 8** to report the gap
3. **Wait for backend implementation**
4. **Continue with your task once backend is ready**

### When You Have Backend Questions

If you have questions about the backend API:

1. **Use Oracle AI Command 9** to ask the question
2. **Oracle AI will consult Backend Architect (PoC)**
3. **Continue with your task once question is answered**

---

**Remember**: Always read MASTER-AGENT-LOG.md first, update it when complete, and maintain production-quality code standards!
