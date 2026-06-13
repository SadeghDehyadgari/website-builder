import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPages,
  getPageById,
  getPageBySlug,
  createPage,
  deletePage,
  updatePageSections,
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
  const queryKey = pageKeys.detail(id || slug);
  let queryFn;
  if (id) {
    queryFn = () => getPageById(id);
  } else if (slug) {
    queryFn = () => getPageBySlug(slug);
  } else {
    throw new Error("usePage requires either id or slug");
  }

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!(id || slug), // Only run if we have identifier
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
      // Invalidate pages list to refetch
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
      // Invalidate both list and the specific page detail
      queryClient.invalidateQueries({ queryKey: pageKeys.list() });
      queryClient.invalidateQueries({
        queryKey: pageKeys.detail(variables.pageId),
      });
    },
  });
}
