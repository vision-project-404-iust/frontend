import { type PaletteOptions } from "@mui/material/styles";
import { PALETTE } from "./colors";

export const lightPalette: PaletteOptions = {
  mode: "light",
  primary: PALETTE.primary.light,
  secondary: PALETTE.secondary.light,
  action: PALETTE.action.light,
  error: PALETTE.error.light,
  success: PALETTE.success.light,
  warning: PALETTE.warning.light,
  info: PALETTE.info.light,
  background: PALETTE.background.light,
  text: PALETTE.text.light,
};

export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: PALETTE.primary.dark,
  secondary: PALETTE.secondary.dark,
  action: PALETTE.action.dark,
  error: PALETTE.error.dark,
  success: PALETTE.success.dark,
  warning: PALETTE.warning.dark,
  info: PALETTE.info.dark,
  background: PALETTE.background.dark,
  text: PALETTE.text.dark,
};
