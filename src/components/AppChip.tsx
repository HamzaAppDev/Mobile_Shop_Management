import { AppText } from "@/components/AppText";
import { useAppTheme } from "@/design/theme";
import { radius, space } from "@/design/tokens";
import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";

export type AppChipProps = {
  label: string;
  active?: boolean;
  disabled?: boolean;

  onPress?: () => void;

  /** Optional left icon */
  leftIcon?: React.ReactNode;

  /** Optional right icon (like chevron / check) */
  rightIcon?: React.ReactNode;

  /** Optional dismiss "x" action */
  onRemove?: () => void;

  /** Visual variants */
  variant?: "outline" | "filled";
  size?: "sm" | "md";

  style?: ViewStyle;
};

function AppChipBase({
  label,
  active = false,
  disabled = false,
  onPress,
  leftIcon,
  rightIcon,
  onRemove,
  variant = "outline",
  size = "md",
  style,
}: AppChipProps) {
  const { colors } = useAppTheme();

  const clickable = !!onPress && !disabled;

  const bg =
    variant === "filled"
      ? active
        ? colors.primary
        : colors.surface
      : "transparent";

  const border = active ? colors.primary : colors.border;

  const textColor =
    variant === "filled" && active
      ? colors.onPrimary
      : active
      ? colors.primary
      : colors.muted;

  const height = size === "sm" ? 32 : 36;
  const px = size === "sm" ? space.md : space.lg;

  return (
    <Pressable
      disabled={!clickable}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          height,
          paddingHorizontal: px,
          backgroundColor: bg,
          borderColor: border,
          opacity: disabled ? 0.55 : pressed ? 0.92 : 1,
          transform: pressed ? [{ scale: 0.99 }] : undefined,
        },
        style,
      ]}
    >
      {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}

      <AppText numberOfLines={1} style={[styles.label, { color: textColor }]}>
        {label}
      </AppText>

      {rightIcon ? <View style={styles.rightIcon}>{rightIcon}</View> : null}

      {onRemove ? (
        <Pressable
          onPress={onRemove}
          hitSlop={10}
          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
        >
          <Ionicons
            name="close"
            size={16}
            color={
              variant === "filled" && active ? colors.onPrimary : colors.muted
            }
          />
        </Pressable>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderRadius: radius.full,
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
  },
  label: {
    fontSize: 12,
    fontWeight: "800",
  },
  leftIcon: { marginRight: 2 },
  rightIcon: { marginLeft: 2 },
});

export const AppChip = memo(AppChipBase);
