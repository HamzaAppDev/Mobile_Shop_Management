import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";
import { AppColors, AppMode } from "../tokens/colors";

export function getNavigationTheme(mode: AppMode, c: AppColors): Theme {
  const base = mode === "dark" ? DarkTheme : DefaultTheme;

  return {
    ...base,
    colors: {
      ...base.colors,
      primary: c.primary,
      background: c.background,
      card: c.surface,
      text: c.text,
      border: c.border,
      notification: c.primary,
    },
  };
}