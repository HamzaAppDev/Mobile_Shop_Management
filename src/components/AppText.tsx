import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { typography } from "@/design/tokens/typography";
import React, { memo } from "react";
import { StyleSheet, Text, TextProps } from "react-native";

type Variant = "body" | "title" | "subtitle" | "muted" | "link";

export type AppTextProps = TextProps & {
  variant?: Variant;
};

function AppTextBase({ style, variant = "body", ...rest }: AppTextProps) {
  const { colors } = useAppTheme();

  return (
    <Text
      {...rest}
      style={[
        styles.base,
        variant === "body" && { color: colors.text, fontSize: typography.fontSize.md },
        variant === "title" && { color: colors.text, fontSize: 28, fontWeight: "700" },
        variant === "subtitle" && { color: colors.text, fontSize: 18, fontWeight: "600" },
        variant === "muted" && { color: colors.muted, fontSize: typography.fontSize.sm },
        variant === "link" && { color: colors.primary, fontSize: typography.fontSize.md, fontWeight: "600" },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});

export const AppText = memo(AppTextBase);