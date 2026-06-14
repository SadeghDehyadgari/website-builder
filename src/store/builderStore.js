import { create } from "zustand";

/**
 * Builder UI state — managed with Zustand.
 *
 * Separation of concerns:
 *   - Server state (page data, sections from db) → React Query (usePages.js)
 *   - UI state (which section is selected, is panel open) → this store
 *
 * CQS (Command-Query Separation):
 *   - Queries: selectedSectionId, isPanelOpen
 *   - Commands: selectSection, clearSelection, openPanel, closePanel
 */
const useBuilderStore = create((set) => ({
  // --- State ---

  /** ID of the currently selected section, or null if none */
  selectedSectionId: null,

  /** Whether the settings panel is open */
  isPanelOpen: false,

  // --- Commands (state mutators) ---

  /**
   * Select a section by ID and open the settings panel.
   * Tell, don't ask: one call does both — caller doesn't need to manage panel separately.
   */
  selectSection: (id) => set({ selectedSectionId: id, isPanelOpen: true }),

  /**
   * Clear selection and close the panel.
   */
  clearSelection: () => set({ selectedSectionId: null, isPanelOpen: false }),

  /**
   * Explicitly open the panel (e.g., for a default-open state).
   */
  openPanel: () => set({ isPanelOpen: true }),

  /**
   * Explicitly close the panel without losing the selected section ID.
   * Useful for an animated slide-out that still needs to know what was selected.
   */
  closePanel: () => set({ isPanelOpen: false }),
}));

export default useBuilderStore;
