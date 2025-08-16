import type { DrawerProps } from "@mui/material";
import type { ReactNode } from "react";

/**
 * Configuration for a single navigation item.
 */
export interface NavItemConfig {
  /**
   * The text to display for the navigation item.
   */
  text: string;
  /**
   * The icon to display next to the text.
   * @example <HomeIcon />
   */
  icon?: ReactNode;
  /**
   * The URL path for the item. If provided, the item will be a `react-router-dom` Link.
   */
  path?: string;
  /**
   * An optional click handler for the item.
   */
  onClick?: () => void;
  /**
   * An array of child navigation items for creating nested menus.
   */
  children?: NavItemConfig[];
  /**
   * A function to render a dynamic icon based on the selection state.
   * This is useful for icons that change appearance when active (e.g., filled vs. outline).
   * @param isSelected - Whether the item is currently selected.
   * @param theme - The MUI theme object for styling.
   * @returns A ReactNode to be rendered as the icon.
   */
  getIcon?: (isSelected: boolean) => ReactNode;
}

/**
 * Props for the SideNav component.
 */
export interface SideNavProps extends Partial<DrawerProps> {
  /**
   * A custom component to render in the header section of the side navigation.
   */
  header?: ReactNode;
  /**
   * A custom component to render in the footer section of the side navigation.
   */
  footer?: ReactNode;
  /**
   * An array of navigation item configurations.
   */
  navConfig: NavItemConfig[];
  /**
   * The width of the drawer when it is fully open.
   * @default 274
   */
  drawerWidth?: number;
  /**
   * The current active path. This is used to highlight the selected item.
   * It supports hash links (e.g., '/page#section').
   */
  activePath?: string;
  /**
   * The width of the drawer when it is minimized.
   * @default 64
   */
  minimizedWidth?: number;
  /**
   * The variant of the side navigation.
   * - `full`: Always open, full width.
   * - `minimized`: Always open, minimized width.
   * - `temporary`: Opens and closes as a temporary drawer (for mobile).
   * @default 'full'
   */
  sideNavVariant?: "full" | "minimized" | "temporary";
  /**
   * Controls the open state of the `temporary` variant.
   * @default false
   */
  open?: boolean;
  /**
   * Callback fired when the `temporary` drawer is closed.
   */
  onClose?: () => void;
  /**
   * The styling variant for the selected navigation item.
   * - `primary`: Applies the primary theme color as a background.
   * - `textOnly`: Applies the primary theme color to the text and icon.
   * @default 'textOnly'
   */
  selectedVariant?: "primary" | "textOnly";
  /**
   * Determines how the side nav is positioned. This does not affect the 'temporary' variant.
   * - `fixed`: (Default) Positions the nav relative to the viewport, at the edge of the screen. Uses MUI `Drawer`.
   * - `absolute`: Positions the nav relative to its parent container. Uses a simple `Box`.
   * @default 'fixed'
   */
  positioning?: "fixed" | "absolute";

  /**
   * When `sideNavVariant` is set to `'temporary'`, this value defines the vertical
   * offset (in theme spacing units) from the top of the viewport.
   * Useful for positioning the SideNav below a toolbar or other fixed header.
   */
  top?: number;
}
