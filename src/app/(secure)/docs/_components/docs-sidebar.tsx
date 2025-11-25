"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react"

interface DocsSidebarProps {
    className?: string
}

const sections = [
    { id: "getting-started", title: "Getting Started" },
    { id: "visual-canvas", title: "Visual Design Canvas" },
    { id: "prototyping", title: "Interactive Prototyping" },
    { id: "presentation", title: "Presentation Mode" },
    { id: "components", title: "Component Library" },
    { id: "ai-features", title: "AI Features" },
    { id: "collaboration", title: "Collaboration" },
    { id: "settings", title: "Settings & Configuration" },
]

export function DocsSidebar({ className }: DocsSidebarProps) {
    const [activeSection, setActiveSection] = useState("")

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { rootMargin: "-20% 0px -80% 0px" }
        )

        sections.forEach(({ id }) => {
            const element = document.getElementById(id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <aside className={cn("sticky top-20 h-fit", className)}>
            <nav className="space-y-1">
                <h4 className="mb-4 font-semibold text-sm">On This Page</h4>
                {sections.map(({ id, title }) => (
                    <Link
                        key={id}
                        href={`#${id}`}
                        className={cn(
                            "block rounded-md px-3 py-2 text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground",
                            activeSection === id && "bg-muted text-foreground font-medium"
                        )}
                    >
                        {title}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}
