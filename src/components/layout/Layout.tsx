// src/components/Layout.tsx

import React, { useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles"; // Import hook
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FaceIcon from "@mui/icons-material/Face";
import AdbIcon from "@mui/icons-material/Adb";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ClassIcon from "@mui/icons-material/Class";
import type { NavItemConfig } from "./sideNav/types";
import { SideNav } from "./sideNav/SideNav";

// Define your navigation structure
const navConfig: NavItemConfig[] = [
  { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { text: "Students", path: "/students", icon: <FaceIcon /> },
  { text: "Classes", path: "/classes", icon: <ClassIcon /> },
];

// 1. Reusable Mode Toggle Button
function ModeToggleButton() {
  const { mode, setMode } = useColorScheme();
  return (
    <IconButton
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
      color="inherit"
    >
      {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}

export const Layout: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const activePath = location.pathname;

  const handleMobileNavToggle = () => {
    setMobileNavOpen(!isMobileNavOpen);
  };

  const desktopHeader = (
    <Box
      sx={{
        p: 2.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <AdbIcon color="primary" />
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold" }}
        >
          My App
        </Typography>
      </Box>
      <ModeToggleButton />
    </Box>
  );

  const sideNavVariant = isMobile ? "temporary" : "full";
  const drawerWidth = 274;
  const sideNavTop = isMobile ? 7 : undefined;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {isMobile && (
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleMobileNavToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              My App
            </Typography>
            {/* 3. Add toggle button to mobile header */}
            <ModeToggleButton />
          </Toolbar>
        </AppBar>
      )}

      <SideNav
        navConfig={navConfig}
        activePath={activePath}
        sideNavVariant={sideNavVariant}
        drawerWidth={drawerWidth}
        open={isMobileNavOpen}
        onClose={handleMobileNavToggle}
        top={sideNavTop}
        header={!isMobile ? desktopHeader : undefined}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {isMobile && <Toolbar />}
        <Outlet />
      </Box>
    </Box>
  );
};
