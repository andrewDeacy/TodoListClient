# TodoListClient

A React frontend application for managing todo lists and todo items. Built with React 19+, TypeScript, React Query, and Tailwind CSS.

## Prerequisites

- Node.js 20.19+ or 22.12+ and npm
- Backend API running (see [TodoListAPI](https://github.com/andrewDeacy/TodoListAPI))

Verify installation:
```bash
node --version
# Should output: v20.19.0 or higher, or v22.12.0 or higher
```

## Quick Start

### 1. Clone and Navigate

```bash
git clone https://github.com/andrewDeacy/TodoListClient.git
cd TodoListClient
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment (Optional)

Create a `.env` file if your backend runs on a different port:

```env
VITE_API_BASE_URL=http://localhost:5074
```

Default is `http://localhost:5074` - only create `.env` if needed.

### 4. Start Backend API

Ensure the backend API is running before starting the frontend. Clone and run the [TodoListAPI](https://github.com/andrewDeacy/TodoListAPI) repository:

```bash
git clone https://github.com/andrewDeacy/TodoListAPI.git
cd TodoListAPI/TodoListAPI.Api
dotnet run
```

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm test         # Run tests in watch mode
npm run test:run # Run tests once
npm run test:ui  # Run tests with UI
```

## Application Demo

![Todo App Demo](todo-app-rec%20copy.gif)

## Project Structure

```
TodoListClient/
├── src/
│   ├── components/     # React components
│   │   ├── ui/        # Base UI components (Button, Input, Card, etc.)
│   │   └── ...        # Feature components (TodoItem, Forms, etc.)
│   ├── pages/         # Page-level components (Login, Lists, Detail)
│   ├── hooks/         # Custom React hooks (useTodoLists, useTodoItems)
│   ├── services/      # API client and services
│   ├── context/       # React Context (AuthContext)
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
```

## Architecture Overview

The frontend uses a modular component architecture:

- **React Query** for server state management (caching, invalidation, error states)
- **React Context** for authentication state
- **Modular components** with separation of concerns
- **TypeScript** for type safety
- **Tailwind CSS** for styling

Key features:
- Loading, error, and empty states handled throughout
- Drag-and-drop item reordering with fallback controls
- Real-time search/filter functionality
- Responsive design for mobile and desktop
- Comprehensive error handling with Error Boundary

## Testing

The project includes unit tests using Vitest and React Testing Library:

```bash
npm test
```

Test coverage includes component rendering, user interactions, accessibility, and edge cases.

## Assumptions

- Backend API runs on `http://localhost:5074` (or configured via environment variable)
- JWT tokens stored in `localStorage` for persistence
- Backend enforces user isolation
- Frontend types match backend DTOs exactly
- Modern browser with ES6+ support required

## Future Improvements

If given more time:
- Expand test coverage to more components and hooks
- Integration and E2E tests
- Performance optimizations (code splitting, lazy loading)
- Offline support with service workers
- Dark mode theme
- Advanced filtering and sorting
- Export/import functionality
- Real-time collaboration features

## Troubleshooting

**Cannot connect to backend:**
- Verify backend is running on `http://localhost:5074`
- Check `VITE_API_BASE_URL` environment variable
- Verify CORS is configured in backend

**Build fails:**
- Ensure Node.js version is 20.19+ or 22.12+
- Run `npm install` to ensure dependencies are installed
- Check TypeScript errors with `npx tsc --noEmit`

**Tests fail to run:**
- Verify Node.js version (20.19+ or 22.12+)
- Ensure all dependencies are installed
- Check `vite.config.ts` test configuration

## Related Projects

- [TodoListAPI](https://github.com/andrewDeacy/TodoListAPI) - Backend API (.NET 8.0)

---

**Built with React 19 and TypeScript**
