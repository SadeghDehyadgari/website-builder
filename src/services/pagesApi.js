// src/services/pagesApi.js
// [NEW] Import centralized ID generator for consistent ID creation across the app
import { generateId } from "../utils/idGenerator";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
const MASTER_KEY = import.meta.env.VITE_JSONBIN_MASTER_KEY;

// Environment detection based on MASTER_KEY presence
const isJSONBin = () => !!MASTER_KEY;

// Timeout wrapper for fetch (20 seconds for better mobile experience)
async function fetchWithTimeout(resource, options = {}, timeout = 20000) {
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
      const timeoutError = new Error("درخواست با تاخیر مواجه شد (timeout)");
      timeoutError.cause = error;
      throw timeoutError;
    }
    throw error;
  }
}

// Retry wrapper for better reliability on slow networks
async function fetchWithRetry(fetchFn, retries = 2, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchFn();
    } catch (error) {
      // [EXISTING] If the error is an HTTP error with a 4xx status (client error), do not retry.
      if (error.status && error.status >= 400 && error.status < 500) {
        throw error;
      }
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// Generic fetch wrapper for REST API (json-server)
async function fetchJson(endpoint, options = {}) {
  const response = await fetchWithTimeout(`${API_BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!response.ok) {
    const error = new Error(
      `API error: ${response.status} ${response.statusText}`,
    );
    // [EXISTING] Inject status into error object for upstream handling
    error.status = response.status;
    throw error;
  }
  return response.json();
}

// JSONBin-specific fetch (Document Store - reads entire DB)
async function fetchBinData() {
  return fetchWithRetry(async () => {
    const response = await fetchWithTimeout(`${API_BASE_URL}/latest`, {
      headers: {
        "X-Master-Key": MASTER_KEY,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      const error = new Error(
        `JSONBin fetch error: ${response.status} - ${errorText}`,
      );
      // [EXISTING] Inject status into error object for upstream handling
      error.status = response.status;
      throw error;
    }

    const json = await response.json();
    return json.record;
  });
}

// JSONBin-specific save (Document Store - writes entire DB)
async function saveBinData(data) {
  const response = await fetchWithTimeout(API_BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": MASTER_KEY,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`JSONBin save error: ${response.status} - ${errorText}`);
  }
  const json = await response.json();
  return json.record;
}

// ==========================================
// Unified API with Adapter Pattern
// ==========================================
export async function getPages() {
  if (!isJSONBin()) {
    return fetchJson("/pages");
  }
  const data = await fetchBinData();
  return data.pages || [];
}

export async function getPageById(id) {
  if (!isJSONBin()) {
    return fetchJson(`/pages/${id}`);
  }
  const data = await fetchBinData();
  const page = data.pages.find((p) => p.id === id);
  if (!page) {
    throw new Error(`Page with id "${id}" not found`);
  }
  return page;
}

export async function getPageBySlug(slug) {
  if (!isJSONBin()) {
    const pages = await fetchJson(`/pages?slug=${slug}`);
    if (!pages || pages.length === 0) {
      throw new Error(`Page with slug "${slug}" not found`);
    }
    return pages[0];
  }
  const data = await fetchBinData();
  const page = data.pages.find((p) => p.slug === slug);
  if (!page) {
    throw new Error(`Page with slug "${slug}" not found`);
  }
  return page;
}

export async function createPage(pageData) {
  const newPage = {
    ...pageData,
    sections: pageData.sections || [],
    // [UPDATED] Use centralized ID generator instead of Date.now()
    // This ensures consistency with AddSectionMenu and prevents ID collisions on fast clicks
    id: generateId(),
  };

  if (!isJSONBin()) {
    return fetchJson("/pages", {
      method: "POST",
      body: JSON.stringify(newPage),
    });
  }

  const data = await fetchBinData();
  data.pages.push(newPage);
  await saveBinData(data);
  return newPage;
}

export async function deletePage(id) {
  if (!isJSONBin()) {
    return fetchJson(`/pages/${id}`, { method: "DELETE" });
  }
  const data = await fetchBinData();
  data.pages = data.pages.filter((p) => p.id !== id);
  await saveBinData(data);
  return { id };
}

export async function updatePageSections(pageId, sections) {
  if (!isJSONBin()) {
    return fetchJson(`/pages/${pageId}`, {
      method: "PATCH",
      body: JSON.stringify({ sections }),
    });
  }
  const data = await fetchBinData();
  const page = data.pages.find((p) => p.id === pageId);
  if (page) {
    page.sections = sections;
  }
  await saveBinData(data);
  return page;
}

export async function updatePage(id, data) {
  if (!isJSONBin()) {
    return fetchJson(`/pages/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }
  const dataFromBin = await fetchBinData();
  const page = dataFromBin.pages.find((p) => p.id === id);
  if (page) {
    Object.assign(page, data);
  }
  await saveBinData(dataFromBin);
  return page;
}
