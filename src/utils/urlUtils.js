// src/utils/urlUtils.js
// [NEW] Security utility to validate URLs and prevent XSS via javascript: or data: URIs.

/**
 * Checks if a URL is safe to use in href or src attributes.
 * Uses an allow-list approach for protocols to prevent XSS.
 * Allows relative paths, http/https, mailto, tel, and hash links.
 * @param {string} url - The URL to validate.
 * @returns {boolean} - True if the URL is safe, false otherwise.
 */
export const isSafeUrl = (url) => {
  if (!url || typeof url !== "string") return false;

  const trimmedUrl = url.trim();

  // Allow relative paths (starting with / or #)
  if (trimmedUrl.startsWith("/") || trimmedUrl.startsWith("#")) return true;

  // Allow safe protocols (Allow-list approach)
  const safeProtocols = ["http://", "https://", "mailto:", "tel:"];
  return safeProtocols.some((protocol) =>
    trimmedUrl.toLowerCase().startsWith(protocol),
  );
};
