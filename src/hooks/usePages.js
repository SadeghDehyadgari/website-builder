// src/hooks/usePages.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPages,
  getPageById,
  getPageBySlug,
  createPage,
  deletePage,
  updatePageSections,
  updatePage,
} from "../services/pagesApi";

// Query keys for caching and invalidation
const pageKeys = {
  all: ["pages"],
  list: () => [...pageKeys.all, "list"],
  detail: (idOrSlug) => [...pageKeys.all, "detail", idOrSlug],
};

/**
 * Hook to fetch all pages
 */
export function usePages() {
  return useQuery({
    queryKey: pageKeys.list(),
    queryFn: getPages,
  });
}

/**
 * Hook to fetch a single page by ID or slug.
 * Accepts an object with either `id` or `slug`.
 * Example: usePage({ slug: 'about' })
 */
export function usePage({ id, slug } = {}) {
  // [FIX] Determine if we have the necessary parameters to fetch
  const isEnabled = Boolean(id || slug);
  const queryKey = pageKeys.detail(id || slug);

  return useQuery({
    queryKey,
    // [FIX] Provide a safe queryFn that returns null if disabled.
    // React Query won't execute this if enabled is false, but it satisfies the API requirement.
    queryFn: () => {
      if (!isEnabled) return null;
      return id ? getPageById(id) : getPageBySlug(slug);
    },
    // [FIX] Gracefully disable the query instead of crashing the render phase
    enabled: isEnabled,
  });
}

/**
 * Mutation to create a new page
 */
export function useCreatePage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pageKeys.list() });
    },
  });
}

/**
 * Mutation to delete a page
 */
export function useDeletePage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pageKeys.list() });
    },
  });
}

/**
 * Mutation to update page sections (reorder, add, delete, edit)
 */
export function useUpdatePageSections() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ pageId, sections }) => updatePageSections(pageId, sections),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: pageKeys.list() });
      queryClient.invalidateQueries({
        queryKey: pageKeys.detail(variables.pageId),
      });
    },
  });
}

/**
 * Mutation to update page meta data (name, slug)
 */
export function useUpdatePage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updatePage(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: pageKeys.list() });
      queryClient.invalidateQueries({
        queryKey: pageKeys.detail(variables.id),
      });
    },
  });
}
