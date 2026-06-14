import DOMPurify from "isomorphic-dompurify";

/**
 * Defense-in-depth sanitizer for CMS-authored HTML rendered via
 * dangerouslySetInnerHTML. Umbraco already sanitizes on input (TinyMCE), but a
 * compromised editor account or a misconfigured field shouldn't be able to
 * inject scripts/handlers into the site. We allow only the inline formatting
 * tags the content actually uses (bold/emphasis/line breaks/highlight spans/
 * links) and strip everything else.
 *
 * Works on both server (SSR) and client via isomorphic-dompurify.
 */
const ALLOWED_TAGS = ["br", "strong", "b", "em", "i", "span", "a"];
const ALLOWED_ATTR = ["class", "href", "title", "target", "rel"];

export function sanitizeHtml(html: string | undefined | null): string {
  if (!html) return "";
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    // No data: or javascript: URIs in links.
    ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|tel:|#|\/)/i,
  });
}
