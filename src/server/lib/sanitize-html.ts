/**
 * HTML Sanitization
 * Defense-in-depth pass applied to all AI-generated HTML before it is persisted
 * or returned to the client. The canvas already renders designs inside a
 * sandboxed iframe (`sandbox="allow-scripts"`), but sanitizing at the source
 * prevents stored payloads from reaching the Monaco code view, HTML export,
 * or any future rendering path that isn't sandboxed.
 */

import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitizes AI-generated HTML, stripping scripts, event handler attributes,
 * and other XSS vectors while preserving the structural/Tailwind markup
 * needed to render the design.
 */
export function sanitizeGeneratedHtml(html: string): string {
    return DOMPurify.sanitize(html, {
        // "form" is a legitimate design element (login/signup screens etc.), kept allowed.
        FORBID_TAGS: ["script", "iframe", "object", "embed"],
        FORBID_ATTR: ["srcdoc"],
    });
}
