import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { memo } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

export type CardAccent = "none" | "primary" | "success" | "warning" | "danger" | "info";

export type AppCardProps = ViewProps & {
  accent?: CardAccent;     // left color strip
  accentWidth?: number;    // default 4
  padding?: number;        // default 16
};

const ACCENT_FALLBACK: Record<CardAccent, keyof ReturnType<typeof useAppTheme>["colors"] | null> = {
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

  const accentKey = ACCENT_FALLBACK[accent];
  const accentColor = accentKey ? colors[accentKey] : "transparent";

  return (
    <View
      {...rest}
      style={[
        styles.wrap,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          shadowOpacity: mode === "dark" ? 0.20 : 0.10,
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
    borderRadius: 16,
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
