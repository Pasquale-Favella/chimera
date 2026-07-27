import type { Metadata } from "next"
import { DocsSidebar } from "./_components/docs-sidebar"
import { DocsSection, DocsSubsection, CodeBlock } from "./_components/docs-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, RocketIcon, SparklesIcon, UsersIcon } from "lucide-react"
import { withSession } from "@/lib/session-check.utils"

export const metadata: Metadata = {
    title: "Documentation | Chimera",
    description: "Learn how to use Chimera's visual design canvas, prototyping tools, and AI features",
}

export default async function DocsPage() {
    await withSession();
    return (
        <div className="container mx-auto max-w-7xl px-4 py-8">
            <div className="mb-8">
                <h1 className="mb-2 font-bold text-4xl tracking-tight">Documentation</h1>
                <p className="text-lg text-muted-foreground">
                    Learn how to use Chimera to create stunning designs, build interactive prototypes, and collaborate with your team.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_250px]">
                <main className="space-y-12">
                    {/* Getting Started */}
                    <DocsSection id="getting-started" title="Getting Started">
                        <p className="text-lg">
                            Welcome to Chimera! This guide will help you get started with the platform and understand its core features.
                        </p>

                        <DocsSubsection title="Overview">
                            <p>
                                Chimera is a visual design canvas and prototyping platform that helps you create UI designs,
                                build interactive prototypes, and present your work to stakeholders. With AI-assisted refinement
                                and an intuitive interface, you can bring your design ideas to life faster than ever.
                            </p>
                        </DocsSubsection>

                        <DocsSubsection title="Creating Your First Project">
                            <p>To create a new project:</p>
                            <ol className="ml-6 list-decimal space-y-2">
                                <li>Navigate to the <strong>Projects</strong> page from the sidebar</li>
                                <li>Click the <strong>Create Project</strong> button</li>
                                <li>Enter a name and description for your project</li>
                                <li>Click <strong>Create</strong> to start working</li>
                            </ol>
                        </DocsSubsection>

                        <DocsSubsection title="Understanding the Interface">
                            <p>The Chimera interface consists of several key areas:</p>
                            <Card className="mt-4">
                                <CardContent className="pt-6">
                                    <ul className="space-y-3">
                                        <li><strong>Canvas:</strong> The main workspace where you create and arrange design elements</li>
                                        <li><strong>Toolbar:</strong> Quick access to tools, view modes, and actions</li>
                                        <li><strong>Properties Panel:</strong> Edit properties of selected elements</li>
                                        <li><strong>Zoom Controls:</strong> Navigate and scale your canvas view</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </DocsSubsection>
                    </DocsSection>

                    {/* Visual Design Canvas */}
                    <DocsSection id="visual-canvas" title="Visual Design Canvas">
                        <p>
                            The visual design canvas is your primary workspace for creating and editing UI designs.
                        </p>

                        <DocsSubsection title="Adding Design Elements">
                            <p>You can add design elements to your canvas in several ways:</p>
                            <ul className="ml-6 list-disc space-y-2">
                                <li>Click the <strong>Add Element</strong> button in the toolbar</li>
                                <li>Drag and drop components from the component library</li>
                                <li>Use AI to generate design elements from descriptions</li>
                            </ul>
                        </DocsSubsection>

                        <DocsSubsection title="Editing Properties">
                            <p>
                                When you select an element on the canvas, the properties panel displays editable properties.
                                You can modify the HTML content, apply custom CSS styles, and adjust positioning.
                            </p>
                            <Alert className="mt-4">
                                <InfoIcon className="h-4 w-4" />
                                <AlertTitle>Pro Tip</AlertTitle>
                                <AlertDescription>
                                    Use the style clipboard to copy styles from one element and apply them to others,
                                    maintaining design consistency across your project.
                                </AlertDescription>
                            </Alert>
                        </DocsSubsection>

                        <DocsSubsection title="Viewport Modes">
                            <p>Preview your designs across different device sizes:</p>
                            <div className="mt-4 grid gap-4 sm:grid-cols-3">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">Desktop</CardTitle>
                                        <CardDescription>1440px+ width</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">Tablet</CardTitle>
                                        <CardDescription>768px - 1439px</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">Mobile</CardTitle>
                                        <CardDescription>Up to 767px</CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                        </DocsSubsection>

                        <DocsSubsection title="Navigation & Zoom">
                            <p>Use the zoom controls to navigate your canvas:</p>
                            <ul className="ml-6 list-disc space-y-2">
                                <li><strong>Zoom In/Out:</strong> Use + and - buttons or scroll wheel</li>
                                <li><strong>Fit to Screen:</strong> Automatically scale to fit viewport</li>
                                <li><strong>Reset Zoom:</strong> Return to 100% scale</li>
                            </ul>
                        </DocsSubsection>
                    </DocsSection>

                    {/* Interactive Prototyping */}
                    <DocsSection id="prototyping" title="Interactive Prototyping">
                        <p>
                            Turn your static designs into interactive prototypes to test user flows and validate UX concepts.
                        </p>

                        <DocsSubsection title="Creating Connections">
                            <p>Connect design elements to create user flows:</p>
                            <ol className="ml-6 list-decimal space-y-2">
                                <li>Enter <strong>Prototype Mode</strong> from the toolbar</li>
                                <li>Click on an element to start a connection</li>
                                <li>Select the target element to complete the connection</li>
                                <li>Define the interaction type (click, hover, etc.)</li>
                            </ol>
                        </DocsSubsection>

                        <DocsSubsection title="Defining Clickable Areas">
                            <p>
                                Use AI to automatically detect clickable elements in your designs, or manually define
                                interactive areas. This helps create realistic prototypes that feel like the final product.
                            </p>
                        </DocsSubsection>

                        <DocsSubsection title="Testing Your Prototype">
                            <p>
                                Click the <strong>Play</strong> button to enter prototype testing mode. Interact with your
                                design as an end-user would, clicking through the defined user flows to validate your UX.
                            </p>
                            <Alert className="mt-4">
                                <RocketIcon className="h-4 w-4" />
                                <AlertTitle>Best Practice</AlertTitle>
                                <AlertDescription>
                                    Test your prototypes with real users to gather feedback before moving to development.
                                    This can save significant time and resources.
                                </AlertDescription>
                            </Alert>
                        </DocsSubsection>
                    </DocsSection>

                    {/* Presentation Mode */}
                    <DocsSection id="presentation" title="Presentation Mode">
                        <p>
                            Showcase your designs in a polished, fullscreen presentation view perfect for client reviews
                            and stakeholder demos.
                        </p>

                        <DocsSubsection title="Entering Presentation Mode">
                            <p>
                                Click the <strong>Present</strong> button in the toolbar to enter presentation mode.
                                Your design will be displayed in a clean, distraction-free view.
                            </p>
                        </DocsSubsection>

                        <DocsSubsection title="Navigation">
                            <p>While in presentation mode, you can:</p>
                            <ul className="ml-6 list-disc space-y-2">
                                <li>Use arrow keys or on-screen controls to navigate between designs</li>
                                <li>Press <strong>Escape</strong> to exit presentation mode</li>
                                <li>Use fullscreen mode for maximum impact</li>
                            </ul>
                        </DocsSubsection>

                        <DocsSubsection title="AI Refinement">
                            <p>
                                During presentations, you can use AI to refine your designs on the fly. Get instant
                                suggestions for improvements and apply them in real-time.
                            </p>
                        </DocsSubsection>
                    </DocsSection>

                    {/* Component Library */}
                    <DocsSection id="components" title="Component Library">
                        <p>
                            Build a library of reusable design components to maintain consistency and speed up your workflow.
                        </p>

                        <DocsSubsection title="Extracting Components">
                            <p>To create a reusable component:</p>
                            <ol className="ml-6 list-decimal space-y-2">
                                <li>Select a design element on the canvas</li>
                                <li>Click <strong>Extract Component</strong> in the properties panel</li>
                                <li>Give your component a name and description</li>
                                <li>The component is now available in your library</li>
                            </ol>
                        </DocsSubsection>

                        <DocsSubsection title="Reusing Components">
                            <p>
                                Access your component library from the sidebar. Drag components onto the canvas
                                to reuse them across your project. Any updates to the master component can be
                                propagated to all instances.
                            </p>
                        </DocsSubsection>

                        <DocsSubsection title="Component Code">
                            <p>
                                View the generated code for any component. This is useful for understanding the
                                structure and for eventual implementation in your codebase.
                            </p>
                        </DocsSubsection>
                    </DocsSection>

                    {/* AI Features */}
                    <DocsSection id="ai-features" title="AI Features">
                        <p>
                            Chimera leverages AI to enhance your design workflow and provide intelligent assistance.
                        </p>

                        <DocsSubsection title="Design Refinement">
                            <p>
                                Use AI to refine and improve your designs. The AI analyzes your layout, colors,
                                typography, and spacing to suggest enhancements that follow design best practices.
                            </p>
                            <Alert className="mt-4">
                                <SparklesIcon className="h-4 w-4" />
                                <AlertTitle>AI-Powered</AlertTitle>
                                <AlertDescription>
                                    Chimera uses advanced AI models to understand design patterns and provide contextual
                                    suggestions tailored to your specific design.
                                </AlertDescription>
                            </Alert>
                        </DocsSubsection>

                        <DocsSubsection title="Interactive Element Detection">
                            <p>
                                When creating prototypes, AI can automatically identify clickable elements in your
                                designs, saving you time in setting up interactions.
                            </p>
                        </DocsSubsection>

                        <DocsSubsection title="Smart Suggestions">
                            <p>
                                As you work, AI provides real-time suggestions for:
                            </p>
                            <ul className="ml-6 list-disc space-y-2">
                                <li>Color palette improvements</li>
                                <li>Typography adjustments</li>
                                <li>Layout optimization</li>
                                <li>Accessibility enhancements</li>
                            </ul>
                        </DocsSubsection>

                        <DocsSubsection title="Configuring AI Settings">
                            <p>
                                Navigate to <strong>Settings</strong> to configure your AI preferences, including
                                which AI provider to use and specific model settings for different features.
                            </p>
                        </DocsSubsection>
                    </DocsSection>

                    {/* Collaboration */}
                    <DocsSection id="collaboration" title="Collaboration">
                        <p>
                            Work together with your team on design projects with built-in collaboration features.
                        </p>

                        <DocsSubsection title="Inviting Team Members">
                            <p>To invite someone to your project:</p>
                            <ol className="ml-6 list-decimal space-y-2">
                                <li>Open your project</li>
                                <li>Click the <strong>Share</strong> button in the toolbar</li>
                                <li>Enter the email address of the person you want to invite</li>
                                <li>They'll receive an invitation to join your project</li>
                            </ol>
                        </DocsSubsection>

                        <DocsSubsection title="Managing Access">
                            <p>
                                Each project has its own access control. You can view all team members and
                                manage their permissions from the project settings.
                            </p>
                            <Alert className="mt-4">
                                <UsersIcon className="h-4 w-4" />
                                <AlertTitle>Team Collaboration</AlertTitle>
                                <AlertDescription>
                                    Multiple users can work on the same project. Changes are synced automatically,
                                    so everyone stays up to date.
                                </AlertDescription>
                            </Alert>
                        </DocsSubsection>

                        <DocsSubsection title="Sharing Designs">
                            <p>
                                Use presentation mode to share your designs with stakeholders who don't need
                                full editing access. They can view and provide feedback without modifying the design.
                            </p>
                        </DocsSubsection>
                    </DocsSection>

                    {/* Settings & Configuration */}
                    <DocsSection id="settings" title="Settings & Configuration">
                        <p>
                            Customize Chimera to fit your workflow and preferences.
                        </p>

                        <DocsSubsection title="User Preferences">
                            <p>
                                Access your user preferences from the <strong>Settings</strong> page to customize:
                            </p>
                            <ul className="ml-6 list-disc space-y-2">
                                <li>Theme (light/dark mode)</li>
                                <li>Default viewport size</li>
                                <li>Editor preferences</li>
                            </ul>
                        </DocsSubsection>

                        <DocsSubsection title="AI Provider Setup">
                            <p>
                                Configure which AI provider to use for different features. Currently supported providers:
                            </p>
                            <Card className="mt-4">
                                <CardContent className="pt-6">
                                    <ul className="space-y-2">
                                        <li><strong>Google Gemini:</strong> For design refinement and suggestions</li>
                                        <li><strong>OpenAI:</strong> For advanced natural language processing</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </DocsSubsection>

                        <DocsSubsection title="API Key Management">
                            <p>
                                To use AI features, you'll need to provide API keys for your chosen providers.
                                Navigate to Settings → AI Configuration to securely add your API keys.
                            </p>
                            <Alert className="mt-4">
                                <InfoIcon className="h-4 w-4" />
                                <AlertTitle>Security</AlertTitle>
                                <AlertDescription>
                                    Your API keys are encrypted and stored securely. They are never shared or exposed
                                    in client-side code.
                                </AlertDescription>
                            </Alert>
                        </DocsSubsection>

                        <DocsSubsection title="Feature Configuration">
                            <p>
                                Enable or disable specific AI features based on your needs and available API quotas.
                                This helps you manage costs and focus on the features most valuable to your workflow.
                            </p>
                        </DocsSubsection>
                    </DocsSection>
                </main>

                <DocsSidebar className="hidden lg:block" />
            </div>
        </div>
    )
}
