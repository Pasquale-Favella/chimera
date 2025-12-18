import React from "react";
import { useDesignSystem } from "../hooks/use-design-system";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Info, AlertCircle, CheckCircle } from "lucide-react";

interface DesignSystemShowcaseProps {
    projectId: string;
}

export function DesignSystemShowcase({ projectId }: DesignSystemShowcaseProps) {
    const { designSystem } = useDesignSystem(projectId);

    // Strict Style Isolation Logic
    const colors = designSystem.colors;

    // Mappings
    const cssVariables = `
      .design-system-preview-scope {
        /* Core Colors */
        --background: ${colors.background};
        --foreground: ${colors.foreground};
        
        --primary: ${colors.primary};
        --primary-foreground: ${colors.background}; /* Assuming primary is dark/colored */
        
        --secondary: ${colors.secondary};
        --secondary-foreground: ${colors.foreground};
        
        --muted: ${colors.muted};
        --muted-foreground: ${colors.mutedForeground};
        
        --accent: ${colors.secondary};
        --accent-foreground: ${colors.foreground};
        
        --destructive: hsl(0 84% 60%);
        --destructive-foreground: hsl(0 0% 98%);
        
        --border: ${colors.border};
        --input: ${colors.input};
        --ring: ${colors.primary};
        
        /* Component Specifics */
        --card: ${colors.background};
        --card-foreground: ${colors.foreground};
        
        --popover: ${colors.background};
        --popover-foreground: ${colors.foreground};
        
        /* Layout */
        --radius: ${designSystem.radius.medium};
        
        /* Fonts */
        font-family: ${designSystem.typography.fontFamily};
      }

      /* Specific Typography Overrides */
      .design-system-preview-scope h1, 
      .design-system-preview-scope h2, 
      .design-system-preview-scope h3, 
      .design-system-preview-scope h4 {
        font-family: ${designSystem.typography.headingFont || designSystem.typography.fontFamily};
      }
      
      /* Dynamic Spacing for Tailwind Utilities in Scope */
      .design-system-preview-scope {
         --spacing-base: ${designSystem.spacing.base}px;
      }

      /* Generate Spacing Overrides for common values */
      ${[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32].map(v => {
        const val = `${v * designSystem.spacing.base}px`;
        const s = v.toString().replace(".", "."); // keep .5 as 0.5 or .5 in class? Tailwind uses .5 -> 0.5 usually matches class p-0.5? No, class is p-0.5 but strictly usually mapped.
        // Tailwind class format: p-0.5, p-1.5. 
        // We will generate the escaped class names if needed or just standard.
        // Actually simplest is to handle integer and half values.
        const key = v.toString().replace(".", ".");

        return `
            .design-system-preview-scope .p-${key} { padding: ${val} !important; }
            .design-system-preview-scope .pt-${key} { padding-top: ${val} !important; }
            .design-system-preview-scope .pr-${key} { padding-right: ${val} !important; }
            .design-system-preview-scope .pb-${key} { padding-bottom: ${val} !important; }
            .design-system-preview-scope .pl-${key} { padding-left: ${val} !important; }
            .design-system-preview-scope .px-${key} { padding-left: ${val} !important; padding-right: ${val} !important; }
            .design-system-preview-scope .py-${key} { padding-top: ${val} !important; padding-bottom: ${val} !important; }

            .design-system-preview-scope .m-${key} { margin: ${val} !important; }
            .design-system-preview-scope .mt-${key} { margin-top: ${val} !important; }
            .design-system-preview-scope .mr-${key} { margin-right: ${val} !important; }
            .design-system-preview-scope .mb-${key} { margin-bottom: ${val} !important; }
            .design-system-preview-scope .ml-${key} { margin-left: ${val} !important; }
            .design-system-preview-scope .mx-${key} { margin-left: ${val} !important; margin-right: ${val} !important; }
            .design-system-preview-scope .my-${key} { margin-top: ${val} !important; margin-bottom: ${val} !important; }
            
            .design-system-preview-scope .gap-${key} { gap: ${val} !important; }
            .design-system-preview-scope .gap-x-${key} { column-gap: ${val} !important; }
            .design-system-preview-scope .gap-y-${key} { row-gap: ${val} !important; }

            .design-system-preview-scope .space-y-${key} > :not([hidden]) ~ :not([hidden]) { --tw-space-y-reverse: 0; margin-top: calc(${val} * calc(1 - var(--tw-space-y-reverse))); margin-bottom: calc(${val} * var(--tw-space-y-reverse)); }
            .design-system-preview-scope .space-x-${key} > :not([hidden]) ~ :not([hidden]) { --tw-space-x-reverse: 0; margin-right: calc(${val} * var(--tw-space-x-reverse)); margin-left: calc(${val} * calc(1 - var(--tw-space-x-reverse))); }
        `;
    }).join("\n")}
      
      /* Typography Scaling */
      ${[1, 2, 3, 4, 5].map(level => {
        const size = Math.round(parseInt(designSystem.typography.baseSize || "16") * Math.pow(designSystem.typography.scale || 1.25, 5 - level)); // Fixed scale direction
        return `.design-system-preview-scope h${level} { font-size: ${size}px !important; line-height: 1.2; }`;
    }).join("\n")}
      
      .design-system-preview-scope p, .design-system-preview-scope span, .design-system-preview-scope div, .design-system-preview-scope li {
          font-size: ${designSystem.typography.baseSize || "16px"};
      }
      
      .design-system-preview-scope small, .design-system-preview-scope .text-sm {
          font-size: 0.875em;
      }
    `;

    return (
        <div className="h-full flex flex-col bg-muted/20 rounded-lg overflow-hidden border custom-scrollbar">
            <style dangerouslySetInnerHTML={{ __html: cssVariables }} />

            <div className="p-4 border-b bg-background flex justify-between items-center">
                <h3 className="font-medium">Live Preview</h3>
                <Badge variant="outline" className="text-xs font-normal">
                    {designSystem.name} ({designSystem.type})
                </Badge>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 design-system-preview-scope bg-background text-foreground transition-all duration-300">
                <div className="max-w-4xl mx-auto space-y-12">

                    {/* Typography Section */}
                    <section className="space-y-6">
                        <div className="space-y-2 border-b pb-2">
                            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Typography</h4>
                        </div>
                        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
                            <div className="space-y-4">
                                <h1>Heading 1</h1>
                                <h2>Heading 2</h2>
                                <h3>Heading 3</h3>
                                <h4>Heading 4</h4>
                            </div>
                            <div className="space-y-4">
                                <p className="leading-7">
                                    The quick brown fox jumps over the lazy dog. Typography sets the rhythm and tone of your interface.
                                    Good hierarchy guides the user's eye.
                                </p>
                                <blockquote className="border-l-2 border-primary pl-6 italic text-muted-foreground">
                                    "Design is not just what it looks like and feels like. Design is how it works."
                                </blockquote>
                                <div className="text-sm text-muted-foreground">
                                    Small text for captions or secondary information.
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Interactive Elements */}
                    <section className="space-y-6">
                        <div className="space-y-2 border-b pb-2">
                            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Interactive</h4>
                        </div>
                        <div className="flex flex-wrap gap-4 items-center">
                            <Button>Primary</Button>
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="ghost">Ghost</Button>
                            <Button variant="destructive">Destructive</Button>
                            <Button size="icon" variant="outline"><Info className="h-4 w-4" /></Button>
                        </div>
                        <div className="flex flex-wrap gap-6 items-center pt-4">
                            <div className="flex items-center space-x-2">
                                <Switch id="showcase-switch" />
                                <Label htmlFor="showcase-switch">Toggle Switch</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="showcase-check" />
                                <Label htmlFor="showcase-check">Checkbox</Label>
                            </div>
                            <RadioGroup defaultValue="opt1" className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="opt1" id="r1" />
                                    <Label htmlFor="r1">Option 1</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="opt2" id="r2" />
                                    <Label htmlFor="r2">Option 2</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </section>

                    {/* Form Controls */}
                    <section className="space-y-6">
                        <div className="space-y-2 border-b pb-2">
                            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Form Controls</h4>
                        </div>
                        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
                            <div className="space-y-4">
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input type="email" id="email" placeholder="name@example.com" />
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="select">Select Option</Label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a theme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="light">Light</SelectItem>
                                            <SelectItem value="dark">Dark</SelectItem>
                                            <SelectItem value="system">System</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="grid w-full gap-1.5">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea placeholder="Type your message here." id="message" rows={4} />
                                </div>
                                <div className="pt-2 space-y-3">
                                    <Label>Volume Control</Label>
                                    <Slider defaultValue={[33]} max={100} step={1} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Cards & Layout */}
                    <section className="space-y-6">
                        <div className="space-y-2 border-b pb-2">
                            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Components</h4>
                        </div>
                        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Notifications</CardTitle>
                                    <CardDescription>Manage your alert preferences.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className=" flex items-center space-x-4 rounded-md border p-4">
                                        <Info />
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">Push Notifications</p>
                                            <p className="text-sm text-muted-foreground">Send notifications to device.</p>
                                        </div>
                                        <Switch />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="flex flex-col justify-between">
                                <CardHeader>
                                    <CardTitle>Authentication</CardTitle>
                                    <CardDescription>Simple login form example.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label>Username</Label>
                                        <Input />
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Password</Label>
                                        <Input type="password" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full">Sign In</Button>
                                </CardFooter>
                            </Card>

                            <div className="space-y-4">
                                <Alert>
                                    <Info className="h-4 w-4" />
                                    <AlertTitle>Heads up!</AlertTitle>
                                    <AlertDescription>
                                        You can add components to your app using the cli.
                                    </AlertDescription>
                                </Alert>
                                <Alert className="border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>
                                        Your session has expired. Please log in again.
                                    </AlertDescription>
                                </Alert>
                                <div className="rounded-lg border p-4 space-y-3">
                                    <div className="flex items-center space-x-4">
                                        <Skeleton className="h-12 w-12 rounded-full" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-[200px]" />
                                            <Skeleton className="h-4 w-[150px]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Navigation tabs */}
                    <section className="space-y-6">
                        <div className="space-y-2 border-b pb-2">
                            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Navigation</h4>
                        </div>
                        <Tabs defaultValue="account" className="w-full max-w-[400px] mx-auto">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="account">Account</TabsTrigger>
                                <TabsTrigger value="password">Password</TabsTrigger>
                            </TabsList>
                            <TabsContent value="account">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Account</CardTitle>
                                        <CardDescription>
                                            Make changes to your account here. Click save when you're done.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="name">Name</Label>
                                            <Input id="name" defaultValue="Pedro Duarte" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Save changes</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                            <TabsContent value="password">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Password</CardTitle>
                                        <CardDescription>
                                            Change your password here. After saving, you'll be logged out.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="current">Current password</Label>
                                            <Input id="current" type="password" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="new">New password</Label>
                                            <Input id="new" type="password" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Save password</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </section>

                </div>
            </div>
        </div>
    );
}
