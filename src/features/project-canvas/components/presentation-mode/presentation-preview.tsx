import React, { useRef, useEffect, useMemo } from 'react';
import { Editor, type OnMount } from "@monaco-editor/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import type { ViewMode, DeviceSize } from "../../stores/presentation-store";
import type { ElementStyles } from "../properties-panel";
const BROKEN_IMAGE_PLACEHOLDER =
  'data:image/png;base64,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';


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
  onRegisterCapture: (captureFn: () => Promise<string>) => void;
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
  onClearSelection,
  onRegisterCapture
}: PresentationPreviewProps) {
  const { resolvedTheme } = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Expose capture function
  useEffect(() => {
    onRegisterCapture(async () => {
      if (!iframeRef.current?.contentDocument?.body) {
        throw new Error("Preview not ready");
      }

      try {
        const { toPng } = await import('html-to-image');

        const dataUrl = await toPng(iframeRef.current.contentDocument.body, {
          backgroundColor: '#ffffff', // Force white background as designs might be transparent
          width: iframeRef.current.contentDocument.body.scrollWidth,
          height: iframeRef.current.contentDocument.body.scrollHeight,
          style: {
            transform: 'scale(1)', // Reset any transforms
            transformOrigin: 'top left'
          },
          cacheBust: true,
          imagePlaceholder: BROKEN_IMAGE_PLACEHOLDER
        });
        return dataUrl;
      } catch (e) {
        console.error("Failed to capture design preview:", e);
        throw e;
      }
    });
  }, [onRegisterCapture]);

  useEffect(() => {
    if (!selectedElementPath) {
      iframeRef.current?.contentWindow?.postMessage({ type: 'clear-selection-from-parent' }, '*');
    }
  }, [selectedElementPath]);

  const handleEditorDidMount: OnMount = (editor) => {
    editor.getAction('editor.action.formatDocument')?.run().then(() => {
      const formattedValue = editor.getValue();
      if (formattedValue !== currentHtml) {
        onHtmlChange(formattedValue);
      }
    });
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
