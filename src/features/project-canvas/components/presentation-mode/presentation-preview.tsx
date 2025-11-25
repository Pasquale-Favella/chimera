import React, { useRef, useEffect, useMemo } from 'react';
import { Editor, type OnMount } from "@monaco-editor/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import type { ViewMode, DeviceSize } from "../../stores/presentation-store";
import type { ElementStyles } from "../properties-panel";

const CodeEditorLoader = () => (
  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
    <Loader2 className="h-6 w-6 animate-spin" />
  </div>
);

const deviceWidths: Record<DeviceSize, string> = {
  mobile: '375px',
  tablet: '768px',
  desktop: '100%',
};

const IFRAME_INTERACTION_SCRIPT = `
  let isSelectionActive = false;
  let selectedElement = null;
  const style = document.createElement('style');
  style.innerHTML = \`
    .ai-dev-selectable *:hover {
      outline: 2px dotted #f87171 !important;
      outline-offset: -2px;
      cursor: pointer;
    }
    .ai-dev-selected {
      outline: 3px solid #22d3ee !important;
      outline-offset: -3px;
      box-shadow: 0 0 20px 5px rgba(34, 211, 238, 0.5);
    }
  \`;
  document.head.appendChild(style);

  function getCssSelectorPath(element) {
    if (!(element instanceof Element)) return;
    const path = [];
    while (element.nodeType === Node.ELEMENT_NODE) {
      let selector = element.nodeName.toLowerCase();
      if (element.id) {
        selector += '#' + element.id;
        path.unshift(selector);
        break;
      } else {
        let sibling = element;
        let nth = 1;
        while (sibling = sibling.previousElementSibling) {
          if (sibling.nodeName.toLowerCase() == selector) nth++;
        }
        if (nth != 1) selector += ":nth-of-type("+nth+")";
      }
      path.unshift(selector);
      element = element.parentNode;
    }
    return path.join(" > ");
  }
  
  function getElementStyles(element) {
    const computed = window.getComputedStyle(element);
    return {
      backgroundColor: computed.backgroundColor,
      color: computed.color,
      fontSize: computed.fontSize,
      fontWeight: computed.fontWeight,
      padding: computed.padding,
      margin: computed.margin,
      borderRadius: computed.borderRadius,
    };
  }

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedElement) {
      selectedElement.classList.remove('ai-dev-selected');
    }
    selectedElement = e.target;
    selectedElement.classList.add('ai-dev-selected');
    const path = getCssSelectorPath(selectedElement);
    const styles = getElementStyles(selectedElement);
    window.parent.postMessage({ type: 'element-selected', path: path, styles: styles }, '*');
  };

  window.addEventListener('message', (event) => {
    if (event.data.type === 'TOGGLE_SELECTION_MODE') {
      isSelectionActive = event.data.isActive;
      document.body.classList.toggle('ai-dev-selectable', isSelectionActive);
      if (isSelectionActive) {
        document.body.addEventListener('click', handleClick, true);
      } else {
        document.body.removeEventListener('click', handleClick, true);
        if (selectedElement) {
          selectedElement.classList.remove('ai-dev-selected');
          selectedElement = null;
          window.parent.postMessage({ type: 'clear-selection' }, '*');
        }
      }
    }
    if (event.data.type === 'clear-selection-from-parent') {
      if (selectedElement) {
        selectedElement.classList.remove('ai-dev-selected');
        selectedElement = null;
      }
    }
  });
`;

interface PresentationPreviewProps {
  activeView: ViewMode;
  deviceSize: DeviceSize;
  currentHtml: string;
  isSelectionModeActive: boolean;
  selectedElementPath: string | null;
  designDescription: string;
  onHtmlChange: (html: string) => void;
  onApplyChanges: () => void;
  onElementSelected: (path: string, styles: ElementStyles) => void;
  onClearSelection: () => void;
}

export function PresentationPreview({
  activeView,
  deviceSize,
  currentHtml,
  isSelectionModeActive,
  selectedElementPath,
  designDescription,
  onHtmlChange,
  onApplyChanges,
  onElementSelected,
  onClearSelection
}: PresentationPreviewProps) {
  const { resolvedTheme } = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // ... (handleEditorDidMount and iframeContent remain the same)

  useEffect(() => {
    if (!selectedElementPath) {
      iframeRef.current?.contentWindow?.postMessage({ type: 'clear-selection-from-parent' }, '*');
    }
  }, [selectedElementPath]);

  const handleEditorDidMount: OnMount = (editor) => {
    setTimeout(() => {
      editor.getAction('editor.action.formatDocument')?.run().then(() => {
        const formattedValue = editor.getValue();
        if (formattedValue !== currentHtml) {
          onHtmlChange(formattedValue);
        }
      });
    }, 500);
  };

  const iframeContent = useMemo(() => {
    return `
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-100">
    <div id="wrapper">${currentHtml}</div>
    <script>${IFRAME_INTERACTION_SCRIPT}</script>
  </body>
      </html >
  `;
  }, [currentHtml]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return;

      if (event.data.type === 'element-selected' && event.data.path) {
        onElementSelected(event.data.path, event.data.styles);
      } else if (event.data.type === 'clear-selection') {
        onClearSelection();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onElementSelected, onClearSelection]);

  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'TOGGLE_SELECTION_MODE', isActive: isSelectionModeActive }, '*');
  }, [isSelectionModeActive]);

  // Expose clear selection to parent via ref or effect? 
  // Actually, the parent controls selection state, but the iframe needs to be notified to clear visual selection.
  // We can listen to a prop change or expose a method.
  // Let's use an effect that listens to a "clear signal" from parent? 
  // Or better, the parent passes `selectedElementPath` and if it's null, we clear.
  // But we don't have `selectedElementPath` prop here.
  // Let's just expose the ref or handle it via the `isSelectionModeActive` toggle for now.
  // If the parent clears selection explicitly (e.g. via X button), it should probably pass a prop or we handle it here.
  // For now, let's assume the parent handles the state and we just reflect it.
  // Wait, `clearSelection` in the original code sent a message to iframe.

  return (
    <main className="flex-grow flex flex-col bg-muted/20 overflow-hidden">
      {activeView === 'preview' ? (
        <div className="flex-grow p-4 flex items-center justify-center">
          <div
            className="bg-white rounded-lg shadow-xl transition-all duration-300 ease-in-out"
            style={{
              width: deviceWidths[deviceSize],
              height: deviceSize === 'desktop' ? '100%' : '812px',
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          >
            <iframe
              ref={iframeRef}
              srcDoc={iframeContent}
              title={`Preview - ${designDescription} `}
              sandbox="allow-scripts allow-same-origin"
              className="w-full h-full rounded-lg"
              onLoad={() => {
                iframeRef.current?.contentWindow?.postMessage({
                  type: 'TOGGLE_SELECTION_MODE',
                  isActive: isSelectionModeActive
                }, '*');
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex-grow flex flex-col p-0 bg-[#1e1e1e]">
          <div className="flex-grow overflow-hidden">
            <Editor
              theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
              language="html"
              value={currentHtml}
              onChange={(value) => onHtmlChange(value || "")}
              loading={<CodeEditorLoader />}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                padding: { top: 16, bottom: 16 },
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
          <div className="flex-shrink-0 p-2 bg-background border-t border-border">
            <Button onClick={onApplyChanges}>
              Apply Changes
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
