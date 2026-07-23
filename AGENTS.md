# Project: Chimera

An AI-powered full-stack platform that enables rapid design implementation and intelligent user flow creation. Built with the T3 Stack for Next.js App Router, Chimera bridges the gap between design concepts and production-ready applications through AI assistance.

## What is Chimera?

Chimera is a modern web application framework that leverages artificial intelligence to streamline the development process. It allows developers and designers to:

- **AI-Assisted Design Implementation**: Transform design mockups and wireframes into functional components with AI guidance
- **Intelligent User Flow Creation**: Build complex user journeys with AI-powered suggestions and best practices
- **Rapid Prototyping**: Accelerate development from concept to working prototype
- **Type-Safe Architecture**: Maintain code quality and reliability through end-to-end type safety
- **Modern Stack Integration**: Combine the best tools in the React ecosystem for optimal developer experience

The platform uses AI to understand design patterns, suggest optimal component structures, and help implement user flows that follow modern UX principles while maintaining clean, maintainable code.

---

## General Instructions:

- When generating new TypeScript code, follow the existing coding style in the project.
- Ensure all new functions and classes have proper TypeScript types and JSDoc comments where appropriate.
- Prefer Server Components over Client Components unless interactivity is required.
- All code should be compatible with TypeScript 5.0+ and Node.js 20+.
- Use the Next.js 15 App Router conventions for routing and layouts.

## Coding Style:

- Use 2 spaces for indentation.
- Use `const` and `let` instead of `var`.
# Project: Chimera

An AI-powered full-stack platform that enables rapid design implementation and intelligent user flow creation. Built with the T3 Stack for Next.js App Router, Chimera bridges the gap between design concepts and production-ready applications through AI assistance.

## What is Chimera?

Chimera is a modern web application framework that leverages artificial intelligence to streamline the development process. It allows developers and designers to:

- **AI-Assisted Design Implementation**: Transform design mockups and wireframes into functional components with AI guidance
- **Intelligent User Flow Creation**: Build complex user journeys with AI-powered suggestions and best practices
- **Rapid Prototyping**: Accelerate development from concept to working prototype
- **Type-Safe Architecture**: Maintain code quality and reliability through end-to-end type safety
- **Modern Stack Integration**: Combine the best tools in the React ecosystem for optimal developer experience

The platform uses AI to understand design patterns, suggest optimal component structures, and help implement user flows that follow modern UX principles while maintaining clean, maintainable code.

---

## General Instructions:

- When generating new TypeScript code, follow the existing coding style in the project.
- Ensure all new functions and classes have proper TypeScript types and JSDoc comments where appropriate.
- Prefer Server Components over Client Components unless interactivity is required.
- All code should be compatible with TypeScript 5.0+ and Node.js 20+.
- Use the Next.js 15 App Router conventions for routing and layouts.

## Coding Style:

- Use 2 spaces for indentation.
- Use `const` and `let` instead of `var`.
- Prefer async/await over Promise chains.
- Use template literals for string interpolation.
- Always use strict equality (`===` and `!==`).
- Component files should use PascalCase (e.g., `UserProfile.tsx`).
- Utility files should use camelCase (e.g., `formatDate.ts`).

## Tech Stack:

### Core Framework
- **Next.js** (App Router) - React framework for web applications
- **TypeScript** - End-to-end type safety
- **React 19** - UI library with Server Components
- **Jotai** - Atomic state management for global client state

### Backend & API
- **tRPC** - Type-safe API layer without code generation
- **Prisma** - Type-safe ORM for database operations
- **Better Auth** - Modern authentication solution (email/password only)
- **AI SDK** - Vercel AI SDK with Google provider for AI features

### Frontend & Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Accessible and customizable UI components built on Radix UI
- **Radix UI** - Headless UI primitives
- **dnd-kit** - Lightweight, performant drag and drop
- **Monaco Editor** - Code editor component

### Database
- **SQLite** - Lightweight file-based database

---

## Project Structure:

```
chimera/
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   └── migrations/            # Database migration files
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── api/
│   │   │   └── trpc/         # tRPC API routes
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/
│   │   └── ui/               # shadcn/ui components
│   ├── features/              # Feature-based modules
│   │   └── [feature-name]/
│   │       ├── components/    # Feature-specific components
│   │       ├── hooks/         # Feature-specific hooks
│   │       └── stores/        # Feature-specific Jotai stores
│   ├── hooks/                 # Shared custom hooks
│   ├── lib/
│   │   └── utils.ts          # Utility functions
│   ├── providers/             # React Context providers
│   ├── server/
│   │   ├── api/
│   │   │   ├── routers/      # tRPC routers
│   │   │   └── trpc.ts       # tRPC configuration
│   │   ├── auth.ts           # Better Auth configuration
│   │   └── db.ts             # Prisma client instance
│   ├── styles/
│   │   └── globals.css       # Global styles
│   └── types/                 # Shared TypeScript types
├── public/                    # Static assets
├── .env                       # Environment variables (not committed)
├── .env.example              # Environment variables template
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies
```

---

## Feature-Based Architecture

The project adopts a feature-based architecture to organize code logically by domain rather than technical type.

### `src/features/`
- Contains self-contained modules for specific application features (e.g., `project-canvas`).
- Each feature directory should contain its own:
  - `components/`: UI components specific to the feature.
  - `hooks/`: Custom hooks used only within the feature.
  - `stores/`: State management (Jotai atoms) specific to the feature.
  - `utils/`: Helper functions specific to the feature.

This structure improves maintainability and scalability by keeping related code together.

---

## State Management

### Jotai
- Used for global client-side state management.
- Prefer **atoms** for individual pieces of state.
- Use `atomFamily` for managing collections of similar state items (e.g., canvas elements per project).
- Create custom hooks to consume and interact with atoms to keep components clean.

**Example:**
```typescript
// src/features/my-feature/stores/my-store.ts
import { atom } from 'jotai'

export const countAtom = atom(0)
```

```typescript
// src/features/my-feature/hooks/use-count.ts
import { useAtom } from 'jotai'
import { countAtom } from '../stores/my-store'

export const useCount = () => {
  const [count, setCount] = useAtom(countAtom)
  return { count, increment: () => setCount(c => c + 1) }
}
```

---

## Specific Components:

### `src/server/api/routers/`
- Contains all tRPC router definitions.
- Each router should handle a specific domain (e.g., users, posts, etc.).
- Always use Zod schemas for input validation.
- Use `publicProcedure` for open endpoints and `protectedProcedure` for authenticated routes.
- Include proper error handling with appropriate error codes.

**Example:**
```typescript
// src/server/api/routers/example.ts
import { z } from "zod"
import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc"

export const exampleRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.example.findMany()
  }),
  
  create: protectedProcedure
    .input(z.object({ 
      name: z.string().min(1).max(100),
      description: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.example.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      })
    }),
})
```

### `src/server/auth.ts`
- Handles authentication configuration using Better Auth.
- Currently supports email/password authentication only.
- Session management is handled automatically.
- When adding new auth features, ensure they integrate with the existing Prisma adapter.

### `src/components/ui/`
- Contains shadcn/ui components.
- These components are copies that can be modified as needed.
- Follow the shadcn/ui conventions for component structure.
- All components should be accessible and follow ARIA guidelines.

### `src/app/`
- Use Server Components by default.
- Only add `"use client"` directive when you need:
  - Event handlers (onClick, onChange, etc.)
  - React hooks (useState, useEffect, etc.)
  - Browser APIs
- For data fetching, prefer Server Components with direct database queries or tRPC server-side calls.

---

## Working with tRPC:

### Creating New API Endpoints

1. Define your router in `src/server/api/routers/yourRouter.ts`
2. Add the router to `src/server/api/root.ts`
3. Use the API in client components:

```typescript
"use client"
import { api } from "@/trpc/react"

export default function MyComponent() {
  const { data, isLoading } = api.example.getAll.useQuery()
  const createMutation = api.example.create.useMutation()

  const handleCreate = () => {
    createMutation.mutate({ name: "New Item" })
  }

  if (isLoading) return <div>Loading...</div>
  
  return (
    <div>
      {data?.map(item => <div key={item.id}>{item.name}</div>)}
      <button onClick={handleCreate}>Create</button>
    </div>
  )
}
```

### Input Validation

Always use Zod schemas for input validation:

```typescript
const inputSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18).max(120),
  role: z.enum(["user", "admin"]),
})

export const userRouter = createTRPCRouter({
  update: protectedProcedure
    .input(inputSchema)
    .mutation(async ({ ctx, input }) => {
      // input is fully typed and validated
      return await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: input,
      })
    }),
})
```

---

## Working with Prisma:

### Defining Models

Edit `prisma/schema.prisma` to define your database schema:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Common Operations

```typescript
// Find unique
const user = await db.user.findUnique({
  where: { id: userId }
})

// Find many with filtering
const users = await db.user.findMany({
  where: { 
    role: "admin",
    createdAt: { gte: new Date("2024-01-01") }
  },
  orderBy: { createdAt: "desc" },
  take: 10,
})

// Create
const newUser = await db.user.create({
  data: {
    email: "user@example.com",
    name: "John Doe",
  }
})

// Update
const updatedUser = await db.user.update({
  where: { id: userId },
  data: { name: "Jane Doe" }
})

// Delete
await db.user.delete({
  where: { id: userId }
})
```

---

## Authentication with Better Auth:

### Configuration

Better Auth is configured in `src/server/auth.ts` with email/password authentication:

```typescript
export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
  },
})
```

### Protecting Routes

Use the `protectedProcedure` in your tRPC routers:

```typescript
export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({ headers: ctx.headers })
  
  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }
  
  return next({
    ctx: {
      session,
    },
  })
})
```

---

## Styling Guidelines:

### Using Tailwind CSS

- Use Tailwind utility classes for styling.
- Avoid custom CSS unless absolutely necessary.
- Use the configured theme values from `tailwind.config.ts`.
- For complex components, compose utilities using `@apply` sparingly.

### Using shadcn/ui Components

- Components are installed locally and can be customized.
- Follow the existing component patterns.
- Maintain accessibility features when modifying components.

**Example:**
```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

---

## Best Practices:

### Type Safety
- Always define proper TypeScript types for your data.
- Use Zod for runtime validation in tRPC endpoints.
- Leverage tRPC's automatic type inference.
- Prisma provides automatic types for database models.

### Performance
- Prefer Server Components for data fetching.
- Use `loading.tsx` and `error.tsx` files for better UX.
- Optimize Prisma queries with `select` and `include`.
- Implement proper error boundaries.

### Code Organization
- Keep components small and focused.
- Extract reusable logic into custom hooks or utilities.
- Group related files together.
- Use barrel exports (`index.ts`) for cleaner imports.

### AI-Assisted Development
- Use AI to generate component structures from design descriptions.
- Leverage AI for implementing complex user flows.
- Get suggestions for optimal state management patterns.
- Receive guidance on accessibility and UX best practices.
- Ask AI for code reviews and optimization suggestions.

---

## Regarding Dependencies:

- Avoid introducing new external dependencies unless absolutely necessary.
- The current stack (T3 Stack with Better Auth) covers most use cases.
- If a new dependency is required, please state:
  - The reason for adding it
  - Why existing solutions are insufficient
  - The bundle size impact
  - The maintenance status of the package

### Current Core Dependencies:
- `next` - Framework
- `react` & `react-dom` - UI library
- `@trpc/client` & `@trpc/server` & `@trpc/react-query` - API layer
- `@prisma/client` - Database ORM
- `better-auth` - Authentication
- `tailwindcss` - Styling
- `zod` - Schema validation
- `@radix-ui/*` - UI primitives (via shadcn/ui)
- `jotai` - State management
- `ai` - AI SDK

---

## Useful Resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Better Auth Documentation](https://better-auth.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Jotai Documentation](https://jotai.org)
- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)