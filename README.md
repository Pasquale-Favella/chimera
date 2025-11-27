# Chimera

An AI-powered full-stack platform that enables rapid design implementation and intelligent user flow creation. Built with the T3 Stack for Next.js App Router, Chimera bridges the gap between design concepts and production-ready applications through AI assistance.

## 🚀 Features

- **AI-Assisted Design Implementation**: Transform design mockups and wireframes into functional components with AI guidance.
- **Intelligent User Flow Creation**: Build complex user journeys with AI-powered suggestions and best practices.
- **Rapid Prototyping**: Accelerate development from concept to working prototype.
- **Type-Safe Architecture**: Maintain code quality and reliability through end-to-end type safety.
- **Modern Stack Integration**: Combine the best tools in the React ecosystem for optimal developer experience.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [Jotai](https://jotai.org/)
- **API**: [tRPC](https://trpc.io/)
- **Database**: [Prisma](https://prisma.io/) (SQLite)
- **Authentication**: [Better Auth](https://github.com/better-auth/better-auth)
- **AI**: [Vercel AI SDK](https://sdk.vercel.ai/docs) (Google Provider)
- **Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **Drag & Drop**: [dnd-kit](https://dndkit.com/)

## ⚡ Getting Started

### Prerequisites

- Node.js 20+
- npm, pnpm, or bun

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/Pasquale-Favella/chimera.git
    cd chimera
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Environment Setup**

    Copy the example environment file to create your local configuration:

    ```bash
    cp .env.example .env
    ```

    > [!IMPORTANT]
    > Make sure to fill in the required environment variables in `.env`, especially the database URL and AI provider keys.

4.  **Database Setup**

    Push the schema to your local database:

    ```bash
    npm run db:push
    ```

5.  **Run the Development Server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
chimera/
├── prisma/              # Database schema and migrations
├── src/
│   ├── app/             # Next.js App Router pages & API
│   ├── components/      # Shared UI components (shadcn/ui)
│   ├── features/        # Feature-based modules (components, hooks, stores)
│   ├── server/          # Backend logic (tRPC routers, auth, db)
│   ├── styles/          # Global styles
│   └── types/           # Shared TypeScript types
└── public/              # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.

### What this means:

The AGPL-3.0 is a strong copyleft license, similar to the GPL, but with an additional clause for network server software.

- **Copyleft**: If you modify this software and distribute it, you must release your modifications under the same AGPL-3.0 license.
- **Network Use is Distribution**: If you run a modified version of this software on a server and let users interact with it over a network (e.g., as a web application), you **must** make the source code of your modified version available to those users.
- **Open Source**: You are free to use, modify, and distribute this software, provided you adhere to the terms of the license.

For more details, see the [LICENSE](LICENSE) file.
