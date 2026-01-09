import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { space } from "@/design/tokens";
import { radius } from "@/design/tokens/radius";
import { typography } from "@/design/tokens/typography";
import React, { memo, useMemo } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { BUTTON_VARIANTS, type ButtonVariant } from "./appButtonVariants";

export type AppButtonProps = {
  title: string;
  onPress?: () => void;

  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;

  fullWidth?: boolean;
  size?: "md" | "sm";

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  // Optional overrides
  bgColorOverride?: string;
  textColorOverride?: string;
  borderColorOverride?: string;

  style?: ViewStyle;
  textStyle?: TextStyle;
};

function AppButtonBase({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  fullWidth = true,
  size = "md",
  leftIcon,
  rightIcon,
  bgColorOverride,
  textColorOverride,
  borderColorOverride,
  style,
  textStyle,
}: AppButtonProps) {
  const { colors } = useAppTheme();
  const V = BUTTON_VARIANTS[variant];

  const isDisabled = disabled || loading;

  const computed = useMemo(() => {
    const bg = bgColorOverride ?? V.bg(colors);
    const text = textColorOverride ?? V.text(colors);
    const border = borderColorOverride ?? V.border(colors);

    if (!isDisabled) {
      return { bg, text, border };
    }

    const disabledBg = V.kind === "filled" ? colors.border : "transparent";
    const disabledBorder = V.kind === "outline" ? colors.border : border;
    const disabledText = colors.muted;

    return {
      bg: disabledBg,
      border: disabledBorder,
      text: disabledText,
    };
  }, [
    V,
    colors,
    isDisabled,
    bgColorOverride,
    textColorOverride,
    borderColorOverride,
  ]);

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      hitSlop={8}
      accessibilityLabel={title}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={({ pressed }) => [
        styles.base,
        size === "sm" ? styles.sm : styles.md,
        fullWidth && styles.fullWidth,
        {
          backgroundColor: computed.bg,
          borderColor: computed.border,
          opacity: isDisabled ? 0.6 : pressed ? 0.9 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={computed.text} />
      ) : (
        <View style={styles.contentRow}>
          {leftIcon ? <View style={styles.iconLeft}>{leftIcon}</View> : null}

          <Text
            numberOfLines={1}
            style={[
              styles.label,
              size === "sm" ? styles.labelSm : styles.labelMd,
              { color: computed.text },
              textStyle,
            ]}
          >
            {title}
          </Text>

          {rightIcon ? <View style={styles.iconRight}>{rightIcon}</View> : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: space.lg,
  },
  fullWidth: { alignSelf: "stretch" },

  // ✅ heights are OK fixed (touch targets). Keep consistent.
  md: { height: 54 },
  sm: {
    height: 44,
    paddingHorizontal: space.md,
    borderRadius: radius.sm,
  },

  contentRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  label: { fontWeight: "600" },
  labelMd: { fontSize: typography.fontSize.md },
  labelSm: { fontSize: typography.fontSize.sm },

  // ✅ use tokens instead of 10
  iconLeft: { marginRight: space.sm },
  iconRight: { marginLeft: space.sm },
});

export const AppButton = memo(AppButtonBase);
