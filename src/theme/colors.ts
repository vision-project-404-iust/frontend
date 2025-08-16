import { blue, grey } from "@mui/material/colors";
import type { Palette } from "./colors.type";

export const PALETTE: Palette = {
  primary: {
    light: {
      main: blue[400],
      dark: blue[700],
      light: blue[100],
      contrastText: "#FFFFFF",
    },
    dark: {
      main: blue[300],
      light: blue[100],
      dark: blue[500],
      contrastText: "#FFFFFF",
    },
  },
  secondary: {
    light: {
      main: grey[900],
      dark: "#000000",
      light: grey[700],
      contrastText: "#FFFFFF",
    },
    dark: {
      main: grey[300],
      light: grey[100],
      dark: grey[500],
      contrastText: "#000000",
    },
  },
  action: {
    light: {
      hover: "#00000004",
      selected: "#00000008",
      focus: "#00000012",
      disabled: "#00000038",
      disabledBackground: "#00000012",
    },
    // TODO
    dark: {
      hover: "#FFFFFF04",
      selected: "#FFFFFF08",
      focus: "#FFFFFF12",
      disabled: "#FFFFFF38",
      disabledBackground: "#FFFFFF12",
    },
  },
  error: {
    light: {
      main: "#d32f2f",
      dark: "#c62828",
      light: "#ef5350",
      contrastText: "#FFFFFF",
    },
    dark: {
      main: "#EF9A9A",
      dark: "#E57373",
      light: "#FFCDD2",
      contrastText: "#000000",
    },
  },
  warning: {
    light: {
      main: "#EF6C00",
      dark: "#E65100",
      light: "#FF9800",
      contrastText: "#FFFFFF",
    },
    dark: {
      main: "#FFB74D",
      dark: "#FFA726",
      light: "#FFE0B2",
      contrastText: "#000000",
    },
  },
  info: {
    light: {
      main: "#29B6F6",
      dark: "#0288D1",
      light: "#4FC3F7",
      contrastText: "#FFFFFF",
    },
    dark: {
      main: "#81D4FA",
      dark: "#4FC3F7",
      light: "#E1F5FE",
      contrastText: "#000000",
    },
  },
  success: {
    light: {
      main: "#2e7d32",
      dark: "#1b5e20",
      light: "#4caf50",
      contrastText: "#FFFFFF",
    },
    // TODO
    dark: {
      main: "#A5D6A7",
      dark: "#66BB6A",
      light: "#C8E6C9",
      contrastText: "#000000",
    },
  },
  // Background colors
  background: {
    light: {
      default: grey[100],
    },
    dark: {
      default: "#121212",
    },
  },
  // Text colors
  text: {
    light: {
      primary: "#000000",
      secondary: "#424242",
      disabled: "#00000038",
    },
    // TODO
    dark: {
      primary: "#FFFFFF",
      secondary: "#B0BEC5",
      disabled: "#FFFFFF38",
    },
  },
};
