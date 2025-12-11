# Frontend Implementation Todo List

## Status: Initialization Phase

This document tracks all remaining work needed to complete the frontend portion of the Todo List application take-home assessment.

---

## Critical Path Items (Must Complete)

### Phase 1: Project Setup & Foundation

#### 1. Project Initialization
- [ ] **TASK-1**: Initialize React project with TypeScript
  - **Options**: Vite (recommended) or Create React App
  - **File**: Project root
  - **Action**: 
    - Create React + TypeScript project
    - Configure build tool (Vite recommended for faster dev experience)
    - Set up project structure
  - **Agent**: Frontend Developer
  - **Dependencies**: None
  - **Estimated Time**: 30 minutes

#### 2. Dependencies Installation
- [ ] **TASK-2**: Install required dependencies
  - **File**: `package.json`
  - **Action**: 
    - Install React Query (TanStack Query) - `@tanstack/react-query`
    - Install React Router (if needed) - `react-router-dom`
    - Install Axios or Fetch wrapper - `axios` (recommended)
    - Install TypeScript types
    - Install testing library - `@testing-library/react`, `@testing-library/jest-dom`
    - Install Tailwind CSS - `tailwindcss`, `postcss`, `autoprefixer`
  - **Agent**: Frontend Developer
  - **Dependencies**: TASK-1
  - **Estimated Time**: 15 minutes

#### 3. Project Structure Setup
- [ ] **TASK-3**: Create folder structure
  - **File**: Project root
  - **Action**: 
    - Create `src/components/` - Reusable UI components
    - Create `src/pages/` or `src/views/` - Page-level components
    - Create `src/hooks/` - Custom React hooks
    - Create `src/services/` or `src/api/` - API client and services
    - Create `src/types/` - TypeScript type definitions
    - Create `src/utils/` - Utility functions
    - Create `src/context/` - React Context providers (if needed)
    - Create `src/styles/` - Global styles
  - **Agent**: Frontend Architect
  - **Dependencies**: TASK-1
  - **Estimated Time**: 20 minutes

#### 5. TypeScript Types Setup
- [ ] **TASK-5**: Create TypeScript types matching backend DTOs
  - **File**: `src/types/`
  - **Action**: 
    - Create `types/api.ts` with types matching backend:
      - `TodoList` (matches TodoListDto)
      - `TodoItem` (matches TodoItemDto)
      - `CreateListRequest`
      - `UpdateListRequest`
      - `CreateListItemRequest`
      - `ReorderItemsRequest`
      - `AuthResponse`
      - `LoginRequest`
      - `RegisterRequest`
    - Ensure field names match backend exactly
    - Add JSDoc comments for clarity
  - **Agent**: Frontend Developer
  - **Dependencies**: TASK-4, Backend API contract review
  - **Estimated Time**: 30 minutes

#### 5. API Client Setup
- [ ] **TASK-5**: Create API client service
  - **File**: `src/services/api.ts` or `src/api/client.ts`
  - **Action**: 
    - Create axios instance with base URL configuration
    - Set up request/response interceptors for:
      - JWT token injection (Authorization header)
      - Error handling
      - Request/response logging (dev only)
    - Configure base URL from environment variables
    - Handle CORS if needed
  - **Agent**: Frontend Developer
  - **Dependencies**: TASK-2, TASK-5
  - **Estimated Time**: 45 minutes

#### 7. React Query Setup
- [ ] **TASK-7**: Configure React Query provider
  - **File**: `src/App.tsx` or `src/main.tsx`
  - **Action**: 
    - Wrap app with `QueryClientProvider`
    - Configure QueryClient with:
      - Default query options (staleTime, cacheTime)
      - Default mutation options
      - Error handling
    - Set up React Query DevTools (development only)
  - **Agent**: Frontend Developer
  - **Dependencies**: TASK-2
  - **Estimated Time**: 20 minutes

---

### Phase 2: Authentication

#### 8. Auth Service
- [ ] **TASK-8**: Create authentication service
  - **File**: `src/services/authService.ts`
  - **Action**: 
    - Create `login()` function - POST `/api/auth/login`
    - Create `register()` function - POST `/api/auth/register`
    - Create `logout()` function - Clear token
    - Create `getToken()` function - Get stored token
    - Create `isAuthenticated()` function - Check if user is logged in
    - Store JWT token in localStorage or sessionStorage
  - **Agent**: Frontend Developer
  - **Dependencies**: TASK-6, TASK-5
  - **Estimated Time**: 45 minutes

#### 9. Auth Context/State
- [ ] **TASK-9**: Create authentication context or state management
  - **File**: `src/context/AuthContext.tsx` or `src/hooks/useAuth.ts`
  - **Action**: 
    - Create AuthContext with:
      - Current user state
      - Login function
      - Register function
      - Logout function
      - Loading state
    - Or create `useAuth` hook with same functionality
    - Persist auth state across page refreshes
  - **Agent**: Frontend Developer
  - **Dependencies**: TASK-8
  - **Estimated Time**: 30 minutes

#### 10. Protected Routes
- [ ] **TASK-10**: Implement protected route wrapper
  - **File**: `src/components/ProtectedRoute.tsx` or `src/hooks/useProtectedRoute.ts`
  - **Action**: 
    - Create component/hook that:
      - Checks if user is authenticated
      - Redirects to login if not authenticated
      - Renders children if authenticated
    - Integrate with React Router if using routing
  - **Agent**: Frontend Developer
  - **Dependencies**: TASK-8
  - **Estimated Time**: 30 minutes

#### 10. Login/Register Pages
- [ ] **TASK-10**: Create authentication pages
  - **File**: `src/pages/Login.tsx`, `src/pages/Register.tsx`
  - **Action**: 
    - Create Login page with:
      - Email/username input
      - Password input
      - Submit button
      - Error message display
      - Loading state
      - Link to register page
    - Create Register page with:
      - Email input
      - Username input
      - Password input
      - Submit button
      - Error message display
      - Loading state
      - Link to login page
    - Handle form validation
    - Use React Query mutations for API calls
  - **Agent**: Frontend UI Developer
  - **Dependencies**: TASK-8, TASK-7
  - **Estimated Time**: 90 minutes

---

### Phase 3: Core Components

#### 13. Base UI Components
- [ ] **TASK-13**: Create base UI components
  - **File**: `src/components/ui/`
  - **Action**: 
    - Create reusable components:
      - `Button.tsx` - Styled button with variants
      - `Input.tsx` - Text input with validation states
      - `Card.tsx` - Container card component
      - `LoadingSpinner.tsx` - Loading indicator
      - `ErrorMessage.tsx` - Error message display
      - `EmptyState.tsx` - Empty state display
    - Make components accessible (ARIA labels, keyboard navigation)
    - Add TypeScript props interfaces
  - **Agent**: Frontend UI Developer
  - **Dependencies**: TASK-4, TASK-3
  - **Estimated Time**: 90 minutes

#### 14. TodoList Service & Hooks
- [ ] **TASK-14**: Create React Query hooks for TodoLists
  - **File**: `src/hooks/useTodoLists.ts`
  - **Action**: 
    - Create `useTodoLists()` - GET `/api/lists` (query)
    - Create `useTodoList(id)` - GET `/api/lists/{id}` (query)
    - Create `useCreateList()` - POST `/api/lists` (mutation)
    - Create `useUpdateList()` - PUT `/api/lists/{id}` (mutation)
    - Create `useDeleteList()` - DELETE `/api/lists/{id}` (mutation)
    - Configure proper cache invalidation
    - Handle loading, error states
  - **Agent**: Frontend Developer
  - **Dependencies**: TASK-6, TASK-7, TASK-5
  - **Estimated Time**: 60 minutes

#### 15. TodoItem Service & Hooks
- [ ] **TASK-15**: Create React Query hooks for TodoItems
  - **File**: `src/hooks/useTodoItems.ts`
  - **Action**: 
    - Create `useTodoItems(listId)` - GET `/api/lists/{listId}/items` (query)
    - Create `useTodoItem(listId, itemId)` - GET `/api/lists/{listId}/items/{itemId}` (query)
    - Create `useCreateItem()` - POST `/api/lists/{listId}/items` (mutation)
    - Create `useUpdateItem()` - PUT `/api/lists/{listId}/items/{itemId}` (mutation)
    - Create `useDeleteItem()` - DELETE `/api/lists/{listId}/items/{itemId}` (mutation)
    - Create `useMarkItemComplete()` - PATCH `/api/lists/{listId}/items/{itemId}/complete` (mutation)
    - Create `useReorderItems()` - PATCH `/api/lists/{listId}/items/reorder` (mutation)
    - Configure proper cache invalidation
    - Handle loading, error states
  - **Agent**: Frontend Developer
  - **Dependencies**: TASK-6, TASK-7, TASK-5
  - **Estimated Time**: 90 minutes

#### 16. TodoList List Component
- [ ] **TASK-16**: Create TodoList list/overview component
  - **File**: `src/components/TodoListList.tsx` or `src/pages/TodoListsPage.tsx`
  - **Action**: 
    - Display all user's todo lists
    - Show loading state while fetching
    - Show error state if fetch fails
    - Show empty state if no lists
    - Each list item should be clickable
    - Add "Create New List" button
    - Use `useTodoLists()` hook
  - **Agent**: Frontend UI Developer
  - **Dependencies**: TASK-14, TASK-13
  - **Estimated Time**: 60 minutes

#### 17. TodoList Detail Component
- [ ] **TASK-17**: Create TodoList detail/view component
  - **File**: `src/components/TodoListDetail.tsx` or `src/pages/TodoListDetailPage.tsx`
  - **Action**: 
    - Display single todo list with its items
    - Show list name, description
    - Display all items in the list (ordered by Order property)
    - Show loading state
    - Show error state
    - Show empty state if no items
    - Add "Add Item" button
    - Add "Edit List" button
    - Add "Delete List" button
    - Use `useTodoList()` and `useTodoItems()` hooks
  - **Agent**: Frontend UI Developer
  - **Dependencies**: TASK-14, TASK-15, TASK-13
  - **Estimated Time**: 90 minutes

#### 18. TodoItem Component
- [ ] **TASK-18**: Create TodoItem component
  - **File**: `src/components/TodoItem.tsx`
  - **Action**: 
    - Display single todo item:
      - Title
      - Description (if present)
      - Completion checkbox
      - Due date (if present)
      - Order indicator (for debugging, optional)
    - Handle item completion toggle
    - Show edit/delete buttons
    - Make item draggable (for reordering) - optional but recommended
    - Use `useMarkItemComplete()` hook
  - **Agent**: Frontend UI Developer
  - **Dependencies**: TASK-15, TASK-13
  - **Estimated Time**: 60 minutes

#### 19. Create/Edit List Forms
- [ ] **TASK-19**: Create forms for creating/editing lists
  - **File**: `src/components/CreateListForm.tsx`, `src/components/EditListForm.tsx`
  - **Action**: 
    - Create form with:
      - Name input (required)
      - Description input (optional)
      - Submit button
      - Cancel button
    - Form validation (client-side)
    - Error message display
    - Loading state during submission
    - Use `useCreateList()` and `useUpdateList()` hooks
  - **Agent**: Frontend UI Developer
  - **Dependencies**: TASK-14, TASK-13
  - **Estimated Time**: 60 minutes

#### 20. Create/Edit Item Forms
- [ ] **TASK-20**: Create forms for creating/editing items
  - **File**: `src/components/CreateItemForm.tsx`, `src/components/EditItemForm.tsx`
  - **Action**: 
    - Create form with:
      - Title input (required)
      - Description input (optional)
      - Due date input (optional, date picker)
      - Submit button
      - Cancel button
    - Form validation (client-side)
    - Error message display
    - Loading state during submission
    - Use `useCreateItem()` and `useUpdateItem()` hooks
  - **Agent**: Frontend UI Developer
  - **Dependencies**: TASK-15, TASK-13
  - **Estimated Time**: 60 minutes

---

### Phase 4: Advanced Features

#### 21. Item Reordering
- [ ] **TASK-21**: Implement drag-and-drop reordering
  - **File**: `src/components/TodoItem.tsx` or `src/components/TodoListDetail.tsx`
  - **Action**: 
    - Install drag-and-drop library (react-beautiful-dnd or @dnd-kit)
    - Implement drag handles on items
    - Update item order on drop
    - Call `useReorderItems()` mutation
    - Optimistic updates for better UX
    - Handle errors and rollback if needed
  - **Agent**: Frontend Developer
  - **Dependencies**: TASK-15, TASK-18
  - **Estimated Time**: 90 minutes

#### 22. Routing Setup
- [ ] **TASK-22**: Set up React Router (if using SPA routing)
  - **File**: `src/App.tsx` or `src/router.tsx`
  - **Action**: 
    - Configure routes:
      - `/login` - Login page
      - `/register` - Register page
      - `/lists` - Lists overview
      - `/lists/:id` - List detail
    - Set up protected routes
    - Handle 404/not found
    - Add navigation component
  - **Agent**: Frontend Developer
  - **Dependencies**: TASK-10, TASK-11, TASK-16, TASK-17
  - **Estimated Time**: 45 minutes

---

### Phase 5: Polish & Quality

#### 23. Error Handling
- [ ] **TASK-23**: Implement comprehensive error handling
  - **File**: Throughout application
  - **Action**: 
    - Create error boundary component
    - Handle API errors gracefully
    - Display user-friendly error messages
    - Log errors (console in dev, error tracking service in prod)
    - Handle network errors
    - Handle authentication errors (redirect to login)
  - **Agent**: Frontend Developer
  - **Dependencies**: All previous tasks
  - **Estimated Time**: 60 minutes

#### 24. Loading States
- [ ] **TASK-24**: Ensure all loading states are handled
  - **File**: Throughout application
  - **Action**: 
    - Verify loading spinners on all data fetches
    - Add skeleton loaders for better UX (optional)
    - Handle loading states in forms
    - Disable buttons during submission
  - **Agent**: Frontend UI Developer
  - **Dependencies**: TASK-13, All component tasks
  - **Estimated Time**: 45 minutes

#### 25. Empty States
- [ ] **TASK-25**: Create and implement empty states
  - **File**: `src/components/EmptyState.tsx` (if not created in TASK-11)
  - **Action**: 
    - Create empty state component
    - Show empty state when:
      - No todo lists exist
      - No items in a list
    - Include helpful messages and call-to-action buttons
  - **Agent**: Frontend UI Developer
  - **Dependencies**: TASK-13, TASK-16, TASK-17
  - **Estimated Time**: 30 minutes

#### 26. Responsive Design
- [ ] **TASK-26**: Ensure responsive design
  - **File**: Throughout application
  - **Action**: 
    - Test on mobile, tablet, desktop viewports
    - Ensure touch-friendly interactions
    - Adjust layout for smaller screens
    - Test reordering dropdown on touch devices
  - **Agent**: Frontend UI Developer
  - **Dependencies**: All component tasks
  - **Estimated Time**: 60 minutes

#### 25. Accessibility
- [ ] **TASK-25**: Ensure accessibility compliance
  - **File**: Throughout application
  - **Action**: 
    - Add ARIA labels where needed
    - Ensure keyboard navigation works
    - Test with screen reader (optional but recommended)
    - Ensure sufficient color contrast
    - Add focus indicators
  - **Agent**: Frontend UI Developer
  - **Dependencies**: All component tasks
  - **Estimated Time**: 60 minutes

---

### Phase 6: Testing & Documentation

#### 26. Unit Tests
- [ ] **TASK-26**: Write at least one unit test
  - **File**: `src/components/__tests__/` or `src/hooks/__tests__/`
  - **Action**: 
    - Write test for a component or hook
    - Test user interactions
    - Test error states
    - Test loading states
    - Use React Testing Library
  - **Agent**: Frontend Developer
  - **Dependencies**: All component tasks
  - **Estimated Time**: 60 minutes

#### 27. README Documentation
- [ ] **TASK-27**: Create comprehensive README
  - **File**: `README.md`
  - **Action**: 
    - Setup instructions (prerequisites, installation)
    - How to run the application
    - How to test the application
    - Project structure explanation
    - Assumptions made
    - Trade-offs and decisions
    - Future improvements
    - API integration notes
  - **Agent**: Frontend Architect
  - **Dependencies**: All tasks complete
  - **Estimated Time**: 45 minutes

#### 28. Code Quality Review
- [ ] **TASK-28**: Final code quality review
  - **File**: Throughout application
  - **Action**: 
    - Review code for consistency
    - Ensure TypeScript types are used everywhere
    - Remove console.logs (or use proper logging)
    - Ensure no unused imports
    - Verify all components are properly documented
    - Check for accessibility issues
  - **Agent**: Frontend Architect
  - **Dependencies**: All tasks complete
  - **Estimated Time**: 60 minutes

---

## Implementation Strategy

### Component Architecture Decision
**Selected**: Modular component structure with separation of concerns
- **Rationale**: 
  - Easier to test and maintain
  - Reusable components
  - Clear separation between UI and business logic
  - Follows React best practices

### State Management Decision
**Selected**: React Query for server state + React Context/useState for UI state
- **Rationale**: 
  - React Query handles caching, invalidation, and error states automatically
  - Reduces boilerplate code
  - Industry standard for React applications
  - Excellent developer experience

### Styling Decision
**Selected**: Tailwind CSS
- **Rationale**: 
  - Utility-first approach for fast development
  - Excellent for building minimalist, clean UIs
  - Great developer experience
  - No runtime overhead
  - Easy to maintain and customize
- **Decision**: Made in TASK-2, configured in TASK-3

---

## Dependencies Graph

```
TASK-1 (Project Init)
  └─> TASK-2 (Dependencies)
      └─> TASK-3 (Tailwind Setup)
          └─> TASK-4 (Structure)
              └─> TASK-5 (Types)
                  └─> TASK-6 (API Client)
                      └─> TASK-7 (React Query)
                          ├─> TASK-8 (Auth Service)
                          │   └─> TASK-9 (Auth Context)
                          │       └─> TASK-10 (Protected Routes)
                          │           └─> TASK-11 (Login UI - Mockup)
                          │               └─> TASK-12 (Register Page)
                          │
                          ├─> TASK-14 (List Hooks)
                          │   └─> TASK-16 (List Component)
                          │       └─> TASK-19 (List Forms)
                          │
                          └─> TASK-15 (Item Hooks)
                              └─> TASK-17 (List Detail)
                                  └─> TASK-18 (Item Component)
                                      └─> TASK-20 (Item Forms)
                                          └─> TASK-21 (Reordering)

TASK-13 (Base Components)
  └─> All component tasks

TASK-22 (Routing)
  └─> Integrates all pages

TASK-23-26 (Polish)
  └─> All previous tasks

TASK-27-29 (Testing & Docs)
  └─> All tasks complete
```

---

## Future Features (v1.1+)

### Drag-and-Drop Reordering
- **Status**: Planned for v1.1
- **Description**: Replace dropdown-based reordering with drag-and-drop interface
- **Implementation**:
  - Install drag-and-drop library (react-beautiful-dnd or @dnd-kit)
  - Implement drag handles on items
  - Update item order on drop
  - Call `useReorderItems()` mutation
  - Optimistic updates for better UX
  - Handle errors and rollback if needed
- **Rationale**: v1.0 focuses on core functionality with simple reordering. Drag-and-drop provides better UX but adds complexity and dependencies.

---

## Next Steps

1. **Immediate Next Task**: TASK-1 - Initialize React project with TypeScript
2. **Assigned Agent**: Frontend Developer
3. **Dependencies**: None
4. **Command**: Use Command 1 from AGENT-COMMANDS.md

---

## Notes

- All tasks are estimated for a single developer
- Testing tasks can be done in parallel with development
- Backend API must be running for frontend development
- Ensure backend API contract is reviewed before implementing API calls
- Contact Backend Architect (PoC) for any backend questions
- Contact Oracle AI Coordinator if backend gaps are found
- **Styling**: Using Tailwind CSS for all styling (configured in TASK-3)
- **Login UI**: TASK-11 requires building minimalist login UI based on `.cursor-output/mockup.png` with gradient background
- **Reordering**: v1.0 uses dropdown-based reordering (TASK-21). Drag-and-drop moved to v1.1

---

**Last Updated**: 2025-01-09  
**Status**: Initialization Phase - Ready to begin TASK-1  
**Total Tasks**: 29 (v1.0 scope)  
**Version**: 1.0 (MVP - Core functionality with dropdown-based reordering)
