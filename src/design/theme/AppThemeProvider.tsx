import { ThemeProvider as NavThemeProvider } from "@react-navigation/native";
import React, { createContext, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";
import { AppColors, AppMode, getColors } from "../tokens/colors";
import { getNavigationTheme } from "./navigationTheme";

type AppTheme = {
  mode: AppMode;
  colors: AppColors;
};

const AppThemeContext = createContext<AppTheme | null>(null);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const scheme = useColorScheme();
  const mode: AppMode = scheme === "dark" ? "dark" : "light";

  const colors = getColors(mode);

  const value = useMemo<AppTheme>(() => ({ mode, colors }), [mode, colors]);

  const navTheme = useMemo(
    () => getNavigationTheme(mode, colors),
    [mode, colors]
  );

  return (
    <AppThemeContext.Provider value={value}>
      <NavThemeProvider value={navTheme}>{children}</NavThemeProvider>
    </AppThemeContext.Provider>
  );
}

export function useAppTheme() {
  const ctx = useContext(AppThemeContext);
  if (!ctx) throw new Error("useAppTheme must be used inside AppThemeProvider");
  return ctx;
}
