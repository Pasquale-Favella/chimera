import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface DocsSectionProps {
    id: string
    title: string
    children: ReactNode
    className?: string
}

export function DocsSection({ id, title, children, className }: DocsSectionProps) {
    return (
        <section id={id} className={cn("scroll-mt-20 space-y-4", className)}>
            <h2 className="border-b pb-2 font-semibold text-3xl tracking-tight">
                {title}
            </h2>
            <div className="prose prose-neutral max-w-none dark:prose-invert">
                {children}
            </div>
        </section>
    )
}

interface DocsSubsectionProps {
    title: string
    children: ReactNode
    className?: string
}

export function DocsSubsection({ title, children, className }: DocsSubsectionProps) {
    return (
        <div className={cn("space-y-3", className)}>
            <h3 className="font-semibold text-xl tracking-tight">{title}</h3>
            <div className="text-muted-foreground">{children}</div>
        </div>
    )
}

interface CodeBlockProps {
    children: string
    language?: string
    className?: string
}

export function CodeBlock({ children, language = "tsx", className }: CodeBlockProps) {
    return (
        <pre
            className={cn(
                "overflow-x-auto rounded-lg border bg-muted p-4 font-mono text-sm",
                className
            )}
        >
            <code className="text-foreground">{children}</code>
        </pre>
    )
}
