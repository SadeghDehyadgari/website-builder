// src/utils/idGenerator.js

/**
 * Generate a unique ID for pages, sections, or items.
 * @returns {string} A unique identifier
 */
export function generateId() {
  // Prefer crypto.randomUUID() for better uniqueness and security
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for non-secure contexts (HTTP) or older browsers
  // Concatenating two Math.random strings to ensure enough entropy
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
