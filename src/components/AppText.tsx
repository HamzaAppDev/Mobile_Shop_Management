import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { typography } from "@/design/tokens/typography";
import React, { memo } from "react";
import { StyleSheet, Text, TextProps } from "react-native";

type Variant = "body" | "title" | "subtitle" | "muted" | "link";

const textStyles = StyleSheet.create({
  base: {
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  body: { fontSize: typography.fontSize.md, lineHeight: 22, fontWeight: "400" },
  title: { fontSize: 28, lineHeight: 34, fontWeight: "700" },
  subtitle: { fontSize: 18, lineHeight: 24, fontWeight: "600" },
  muted: {
    fontSize: typography.fontSize.sm,
    lineHeight: 20,
    fontWeight: "400",
  },
  link: { fontSize: typography.fontSize.md, lineHeight: 22, fontWeight: "600" },
  caption: {
    fontSize: typography.fontSize.xs,
    lineHeight: 16,
    fontWeight: "400",
  },
});

export type AppTextProps = TextProps & {
  variant?: Variant;
};

function AppTextBase({ style, variant = "body", ...rest }: AppTextProps) {
  const { colors } = useAppTheme();

  const color =
    variant === "muted"
      ? colors.muted
      : variant === "link"
      ? colors.primary
      : colors.text;

  return (
    <Text
      {...rest}
      style={[styles.base, textStyles[variant], { color }, style]}
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
