import { useAppTheme } from "@/design/theme/AppThemeProvider";
import React, { memo } from "react";
import { View, ViewProps } from "react-native";

export const AppCard = memo(function AppCard({ style, ...rest }: ViewProps) {
  const { colors, mode } = useAppTheme();

  return (
    <View
      {...rest}
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: colors.border,
          padding: 16,
          shadowColor: "#000",
          shadowOpacity: mode === "dark" ? 0.15 : 0.08,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 6 },
          elevation: mode === "dark" ? 2 : 3,
        },
        style,
      ]}
    />
  );
});