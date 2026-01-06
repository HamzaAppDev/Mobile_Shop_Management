import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { radius } from "@/design/tokens/radius";
import React, { memo } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

export type CardAccent = "none" | "primary" | "success" | "warning" | "danger" | "info";

export type AppCardProps = ViewProps & {
  accent?: CardAccent;     // left color strip
  accentWidth?: number;    // default 4
  padding?: number;        // default 16
};

const ACCENT_COLOR_KEY: Record<CardAccent, "primary" | "success" | "warning" | "danger" | "info" | null> = {
  none: null,
  primary: "primary",
  success: "success",
  warning: "warning",
  danger: "danger",
  info: "info",
};

function AppCardBase({
  accent = "none",
  accentWidth = 4,
  padding = 16,
  style,
  children,
  ...rest
}: AppCardProps) {
  const { colors, mode } = useAppTheme();

  const key = ACCENT_COLOR_KEY[accent];
  const accentColor = key ? colors[key] : "transparent";

  return (
    <View
      {...rest}
      style={[
        styles.wrap,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          shadowOpacity: mode === "dark" ? 0.18 : 0.10,
        },
        style,
      ]}
    >
      {accent !== "none" ? (
        <View style={[styles.accent, { width: accentWidth, backgroundColor: accentColor }]} />
      ) : null}

      <View style={[styles.content, { padding }]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "#000",
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
    flexDirection: "row",
  },
  accent: {
    height: "100%",
  },
  content: {
    flex: 1,
  },
});

export const AppCard = memo(AppCardBase);
