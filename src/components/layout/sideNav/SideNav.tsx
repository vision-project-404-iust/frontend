// sideNav.tsx

import React from "react";
import { Box, Drawer, List, Divider, useTheme, Paper } from "@mui/material";
import { getActivePathMap } from "./getActivePathMap";
import { SideNavContext } from "./SideNavContext";
import type { SideNavProps } from "./types";
import { NavItem } from "./NavItem";

/**
 * A responsive and configurable side navigation component.
 *
 * It supports multiple variants (full, minimized, temporary), nested items,
 * and custom header/footer sections. It is designed to integrate seamlessly
 * with `react-router-dom`.
 *
 * @component
 * @example
 * const navConfig = [
 * { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
 * { text: 'Users', path: '/users', icon: <UsersIcon /> },
 * ];
 *
 * <SideNav
 * navConfig={navConfig}
 * activePath="/users"
 * sideNavVariant="full"
 * />
 */
export const SideNav: React.FC<SideNavProps> = ({
  header,
  footer,
  navConfig,
  activePath,
  drawerWidth = 274,
  minimizedWidth = 64,
  sideNavVariant = "full",
  positioning = "fixed",
  open = false,
  onClose,
  selectedVariant = "textOnly",
  top = 0,
  sx,
  ...props
}) => {
  const theme = useTheme();

  // --- Internal State & Variables ---

  // A map of all paths to their selection state, calculated once.
  const selectedMap = getActivePathMap(navConfig, activePath);
  const isMinimized = sideNavVariant === "minimized";
  const isTemporary = sideNavVariant === "temporary";
  const width = isMinimized ? minimizedWidth : drawerWidth;
  const calculateTop = isTemporary ? theme.spacing(top) : 0;

  // Determine if the Drawer component should be used.
  // The 'temporary' variant MUST use a Drawer to work as an overlay.
  // The 'fixed' positioning (default) also uses the Drawer.
  const useEffectDrawer = positioning === "fixed" || isTemporary;

  // Memoized context value to prevent unnecessary re-renders in consumer components.
  // This object is provided to all child `NavItem` components.
  const contextValue = React.useMemo(
    () => ({
      onSideNavClose: onClose,
      selectedMap,
      minimized: isMinimized,
      selectedVariant,
    }),
    [onClose, selectedMap, isMinimized, selectedVariant]
  );

  // --- Styles ---
  const paperSx = {
    width,
    boxSizing: "border-box",
    overflowX: "hidden",
    boxShadow: "none",
    ...(isTemporary && {
      top: calculateTop,
      height: `calc(100% - ${calculateTop})`,
    }),
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  };

  // --- Render Logic ---

  const renderNavItems = (
    <List
      component="nav"
      disablePadding
    >
      {navConfig.map((item, index) => (
        <NavItem
          key={`${item.text}-${index}`}
          item={item}
        />
      ))}
    </List>
  );

  const content = (
    <SideNavContext.Provider value={contextValue}>
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {header && (
          <Box>
            {header}
            <Divider />
          </Box>
        )}
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>{renderNavItems}</Box>
        {footer && (
          <Box sx={{ mt: "auto" }}>
            <Divider />
            {footer}
          </Box>
        )}
      </Box>
    </SideNavContext.Provider>
  );

  if (useEffectDrawer) {
    return (
      <Drawer
        // The MUI Drawer variant is determined by our custom `sideNavVariant` prop.
        // 'temporary' is for mobile/overlay, 'permanent' is for desktop.
        variant={isTemporary ? "temporary" : "permanent"}
        anchor="left"
        // The `open` and `onClose` props are only relevant for the 'temporary' variant.
        open={isTemporary ? open : undefined}
        onClose={isTemporary ? onClose : undefined}
        ModalProps={isTemporary ? { keepMounted: true } : undefined}
        sx={{
          width,
          flexShrink: 0,
          top: calculateTop,
          "& .MuiModal-backdrop": {
            top: calculateTop,
          },
          "& .MuiDrawer-paper": paperSx,
          ...sx,
        }}
        {...props}
      >
        {content}
      </Drawer>
    );
  }

  // For `positioning: 'absolute'`, render a simple Box/Paper that sits inside its container.
  // This is ideal for non-full-width layouts.
  return (
    <Paper
      component="aside" // Use a semantic <aside> tag
      elevation={0}
      square
      sx={{
        ...paperSx, // Reuse the same width and transition styles
        position: "relative", // Positioned within the normal document flow
        height: "100%",
        borderRight: `1px solid ${theme.palette.divider}`,
        flexShrink: 0, // Prevent shrinking when in a flex container
      }}
    >
      {content}
    </Paper>
  );
};
