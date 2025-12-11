import React from 'react';
import { Editor, type OnMount } from "@monaco-editor/react";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { ComponentPreview } from "../component-preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CodeEditorLoader = () => (
    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
    </div>
);

interface ExtractedComponentModalProps {
    html: string;
    onClose: () => void;
    onSave: (name: string) => Promise<void>;
    isSaving: boolean;
}

export const ExtractedComponentModal: React.FC<ExtractedComponentModalProps> = ({ html, onClose, onSave, isSaving }) => {
    const { resolvedTheme } = useTheme();
    const [name, setName] = React.useState("");
    const [activeTab, setActiveTab] = React.useState("preview");

    const handleEditorDidMount: OnMount = (editor) => {
        editor.getAction("editor.action.formatDocument")?.run();
    };

    const handleSave = async () => {
        if (!name.trim()) return;
        await onSave(name);
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-[110] flex items-center justify-center p-8 animate-fade-in" onClick={onClose}>
            <div className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                <header className="flex items-center justify-between p-4 border-b border-border">
                    <h3 className="text-lg font-semibold">Extracted Component</h3>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                        <X className="w-5 h-5" />
                    </button>
                </header>

                <div className="p-4 border-b border-border flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Component Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., User Card, Navbar"
                            className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            autoFocus
                        />
                    </div>
                </div>

                <div className="h-[500px] overflow-hidden flex flex-col">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col">
                        <div className="px-4 pt-2 border-b border-border">
                            <TabsList>
                                <TabsTrigger value="preview">Preview</TabsTrigger>
                                <TabsTrigger value="code">Code</TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="preview" className="flex-grow bg-muted/20 p-4 mt-0 overflow-hidden">
                            <div className="w-full h-full border rounded-lg overflow-hidden bg-white shadow-sm">
                                <ComponentPreview html={html} className="w-full h-full" />
                            </div>
                        </TabsContent>

                        <TabsContent value="code" className="flex-grow mt-0 overflow-hidden bg-[#1e1e1e] relative">
                            <div className="absolute inset-0">
                                <Editor
                                    height="100%"
                                    theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
                                    language="html"
                                    value={html}
                                    loading={<CodeEditorLoader />}
                                    onMount={handleEditorDidMount}
                                    options={{
                                        readOnly: true,
                                        minimap: { enabled: false },
                                        fontSize: 12,
                                        padding: { top: 16, bottom: 16 },
                                        lineNumbers: "off",
                                        scrollBeyondLastLine: false,
                                        automaticLayout: true,
                                    }}
                                />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                <footer className="p-4 border-t border-border flex justify-end gap-2">
                    <Button
                        onClick={() => navigator.clipboard.writeText(html)}
                        variant="outline"
                    >
                        Copy Code
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!name.trim() || isSaving}
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        Save to Library
                    </Button>
                </footer>
            </div>
        </div>
    );
};
