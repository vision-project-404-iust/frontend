// SideNavContext.ts

import { createContext, useContext } from "react";

/**
 * Defines the shape of the context provided to all NavItem components.
 * This avoids prop drilling for common state.
 */
interface SideNavContextType {
  /**
   * Callback to close the side navigation, typically used in 'temporary' mode.
   */
  onSideNavClose?: () => void;
  /**
   * A map where keys are item paths and values are booleans indicating if the path is active.
   */
  selectedMap: Record<string, boolean>;
  /**
   * Indicates if the side navigation is in its minimized state.
   */
  minimized?: boolean;
  /**
   * The styling variant for the selected navigation item.
   */
  selectedVariant?: "primary" | "textOnly";
}

/**
 * React context for sharing side navigation state with child NavItem components.
 */
export const SideNavContext = createContext<SideNavContextType>({
  selectedMap: {},
});

/**
 * Custom hook to easily access the SideNavContext.
 * @returns The current side navigation context values.
 */
export const useSideNav = () => useContext(SideNavContext);
