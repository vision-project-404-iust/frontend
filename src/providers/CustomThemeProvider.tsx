import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { darkPalette, lightPalette } from "../theme/pallete";
export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = createTheme({
    colorSchemes: {
      light: {
        palette: lightPalette,
      },
      dark: {
        palette: darkPalette,
      },
    },
    cssVariables: {
      colorSchemeSelector: "class",
    },
    spacing: 8,
  });

  return (
    <ThemeProvider
      theme={theme}
      defaultMode="light"
    >
      {children}
    </ThemeProvider>
  );
};
