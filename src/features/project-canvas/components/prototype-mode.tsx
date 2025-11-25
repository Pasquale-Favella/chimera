'use client';

import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, X, RefreshCw, Monitor, ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePrototype } from "../hooks/use-prototype";

interface PrototypeModeProps {
  projectId: string;
  startId: string;
  onClose: () => void;
}

const IFRAME_PROTOTYPE_SCRIPT = `
  const style = document.createElement('style');
  style.innerHTML = \`
    .ai-prototype-hotspot {
      cursor: pointer !important;
      outline: 2px dotted #22d3ee !important;
      outline-offset: 2px;
    }
  \`;
  document.head.appendChild(style);

  let currentListeners = [];

  const cleanupListeners = () => {
    currentListeners.forEach(({element, listener}) => {
      element.classList.remove('ai-prototype-hotspot');
      element.removeEventListener('click', listener);
    });
    currentListeners = [];
  };

  const handleClick = (e, connectionId) => {
    e.preventDefault();
    e.stopPropagation();
    window.parent.postMessage({ type: 'NAVIGATE', connectionId: connectionId }, '*');
  };

  window.addEventListener('message', (event) => {
    if (event.data.type === 'UPDATE_LISTENERS') {
      cleanupListeners();
      const selectors = event.data.selectors; // This is a map-like object { connectionId: selector }
      
      for (const connectionId in selectors) {
        if (selectors.hasOwnProperty(connectionId)) {
          const selector = selectors[connectionId];
          if (selector) {
            try {
              const element = document.querySelector(selector);
              if (element) {
                const listener = (e) => handleClick(e, connectionId);
                element.addEventListener('click', listener, true);
                element.classList.add('ai-prototype-hotspot');
                currentListeners.push({ element, listener });
              }
            } catch (e) {
              console.warn('Invalid selector for prototype:', selector, e);
            }
          }
        }
      }
    }
  });
`;

export function PrototypeMode({
  projectId,
  startId,
  onClose,
}: PrototypeModeProps) {
  const {
    currentScreenId,
    setCurrentScreenId,
    interactiveSelectors,
    isLoading,
    error,
    iframeRef,
    connectedDesigns,
    currentDesign,
    handleRestart,
    retry,
  } = usePrototype(projectId, startId);

  const iframeContent = useMemo(() => {
    if (!currentDesign) return '';
    return `
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-white">
          <div id="wrapper">${currentDesign.html}</div>
          <script>${IFRAME_PROTOTYPE_SCRIPT}</script>
        </body>
      </html>
    `;
  }, [currentDesign]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm animate-in fade-in-0">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/40 bg-background/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Monitor className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Prototype Mode</h2>
            <p className="text-xs text-muted-foreground">
              {currentDesign?.description || 'Loading...'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRestart}
            className="gap-2"
            title="Restart Prototype"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Restart</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-9 w-9 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
            title="Close Prototype"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden bg-muted/5 dark:bg-muted/10">
        <div className="relative w-full h-full max-w-6xl bg-card rounded-xl shadow-2xl overflow-hidden border border-border/50 ring-1 ring-border flex flex-col">
          {/* Browser-like header for the iframe container */}
          <div className="h-8 bg-muted/30 border-b border-border/50 flex items-center px-3 gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="h-5 w-1/2 max-w-[200px] bg-muted/50 rounded-sm" />
            </div>
          </div>

          <div className="flex-1 relative bg-card">
            {isLoading && (
              <div className="absolute inset-0 bg-background/80 z-20 flex items-center justify-center backdrop-blur-sm">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm font-medium text-muted-foreground">
                    Loading screen...
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
                <Alert variant="destructive" className="max-w-md shadow-lg flex flex-col gap-4">
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                  <Button variant="outline" size="sm" onClick={retry} className="self-end">
                    Retry
                  </Button>
                </Alert>
              </div>
            )}

            {currentDesign ? (
              <iframe
                ref={iframeRef}
                srcDoc={iframeContent}
                title={`Prototype - ${currentDesign.description}`}
                sandbox="allow-scripts allow-same-origin"
                className="w-full h-full border-0"
                onLoad={() => {
                  if (iframeRef.current?.contentWindow) {
                    iframeRef.current.contentWindow.postMessage({ type: 'UPDATE_LISTENERS', selectors: interactiveSelectors }, '*');
                  }
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-muted-foreground">
                  {isLoading ? 'Starting prototype...' : 'No screen to display.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="flex items-center justify-center pb-6 pt-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-4 rounded-full bg-foreground/5 px-6 py-3 backdrop-blur-md border border-white/10 shadow-lg transition-all hover:bg-foreground/10 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring">
              <div className="flex flex-col items-center text-left">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Current Screen</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium max-w-[200px] truncate">
                    {currentDesign?.description || 'Unknown Screen'}
                  </span>
                  <ChevronUp className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>

              <div className="h-8 w-px bg-border/50 mx-2" />

              <div className="text-xs text-muted-foreground">
                {connectedDesigns.findIndex(d => d.id === currentScreenId) + 1} / {connectedDesigns.length}
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-64 max-h-[300px] overflow-y-auto">
            {connectedDesigns.map((design, index) => (
              <DropdownMenuItem
                key={design.id}
                onClick={() => setCurrentScreenId(design.id)}
                className="flex items-center justify-between cursor-pointer"
              >
                <span className="truncate flex-1">{design.description || `Screen ${index + 1}`}</span>
                {design.id === currentScreenId && <div className="h-2 w-2 rounded-full bg-primary" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
