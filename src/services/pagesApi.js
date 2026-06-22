// Base API URL - change if using my-json-server or production
const API_BASE_URL = "/api";

// NEW: Timeout wrapper for fetch (default 10 seconds)
async function fetchWithTimeout(resource, options = {}, timeout = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === "AbortError") {
      // Attach the original error as 'cause' to satisfy ESLint rule
      const timeoutError = new Error("درخواست با تاخیر مواجه شد (timeout)");
      timeoutError.cause = error;
      throw timeoutError;
    }
    throw error;
  }
}

/**
 * Generic fetch wrapper to handle errors and JSON parsing
 */
async function fetchJson(endpoint, options = {}) {
  const response = await fetchWithTimeout(`${API_BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

// --- Page CRUD operations ---

/**
 * Get all pages
 * @returns {Promise<Array>} list of pages
 */
export async function getPages() {
  return fetchJson("/pages");
}

/**
 * Get a single page by ID
 * @param {string} id
 */
export async function getPageById(id) {
  return fetchJson(`/pages/${id}`);
}

/**
 * Get a page by slug (e.g., '/', 'about')
 * Uses json-server filtering: /pages?slug=...
 * @param {string} slug
 */
export async function getPageBySlug(slug) {
  const pages = await fetchJson(`/pages?slug=${slug}`);
  if (!pages || pages.length === 0) {
    throw new Error(`Page with slug "${slug}" not found`);
  }
  return pages[0];
}

/**
 * Create a new page
 * @param {Object} pageData - { name, slug, sections? }
 */
export async function createPage(pageData) {
  // Ensure sections array exists, default to empty
  const newPage = {
    ...pageData,
    sections: pageData.sections || [],
    id: Date.now().toString(), // simple id for MVP; json-server will keep it
  };
  return fetchJson("/pages", {
    method: "POST",
    body: JSON.stringify(newPage),
  });
}

/**
 * Delete a page by ID
 * @param {string} id
 */
export async function deletePage(id) {
  return fetchJson(`/pages/${id}`, { method: "DELETE" });
}

/**
 * Update entire sections array of a page
 * (Simplest approach for MVP - full replace)
 * @param {string} pageId
 * @param {Array} sections
 */
export async function updatePageSections(pageId, sections) {
  return fetchJson(`/pages/${pageId}`, {
    method: "PATCH",
    body: JSON.stringify({ sections }),
  });
}
