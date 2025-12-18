import React, { useMemo } from 'react';
import { useDesignSystem } from "../hooks/use-design-system";
import { useProjectId } from "../contexts/project-id-context";

interface ComponentPreviewProps {
  html: string;
  className?: string;
  scale?: number;
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({ html, className, scale = 1 }) => {
  const projectId = useProjectId();
  const { iframeFonts } = useDesignSystem(projectId);

  const srcDoc = useMemo(() => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          ${iframeFonts.fontLinkTag}
          <style>
            ${iframeFonts.fontStyle}
            body { margin: 0; padding: 1rem; display: flex; align-items: center; justify-content: center; min-height: 100vh; background-color: transparent; }
            #root { width: 100%; }
          </style>
        </head>
        <body>
          <div id="root">${html}</div>
        </body>
      </html>
    `;
  }, [html, iframeFonts]);

  return (
    <div className={className} style={{ overflow: 'hidden' }}>
      <iframe
        srcDoc={srcDoc}
        title="Component Preview"
        className="w-full h-full border-0 bg-white"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${100 / scale}%`,
          height: `${100 / scale}%`
        }}
        sandbox="allow-scripts"
      />
    </div>
  );
};
