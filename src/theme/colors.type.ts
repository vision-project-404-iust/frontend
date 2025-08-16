import type {
  PaletteColor,
  TypeAction,
  TypeBackground,
  TypeText,
} from "@mui/material";
import type { PaletteColorOptions } from "@mui/material";

export interface Palette {
  primary: {
    dark: PaletteColorOptions;
    light: PaletteColorOptions;
  };
  secondary: {
    dark: PaletteColor;
    light: PaletteColor;
  };
  action: {
    dark: Partial<TypeAction>;
    light: Partial<TypeAction>;
  };
  error: {
    dark: PaletteColor;
    light: PaletteColor;
  };
  warning: {
    dark: PaletteColor;
    light: PaletteColor;
  };
  info: {
    dark: PaletteColor;
    light: PaletteColor;
  };
  success: {
    dark: PaletteColor;
    light: PaletteColor;
  };
  background: {
    dark: Partial<TypeBackground>;
    light: Partial<TypeBackground>;
  };
  text: {
    dark: Partial<TypeText>;
    light: Partial<TypeText>;
  };
}
