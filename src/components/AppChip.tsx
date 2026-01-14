import { useAppTheme } from "@/design/theme";
import { radius, space } from "@/design/tokens";
import React, { memo } from "react";
import { Pressable, StyleSheet, View, type ViewStyle } from "react-native";
import { AppIcon, type AppIconName } from "./AppIcon";
import { AppText } from "./AppText";

export type AppChipSize = "sm" | "md";
export type AppChipVariant = "outline" | "filled" | "ghost";

export type AppChipProps = {
  label: string;

  active?: boolean;
  disabled?: boolean;

  variant?: AppChipVariant;

  rightIcon?: AppIconName;
  onRemove?: () => void;

  size?: AppChipSize;

  onPress?: () => void;

  style?: ViewStyle;
};

function AppChipBase({
  label,
  active = false,
  disabled = false,
  variant = "outline",
  rightIcon,
  onRemove,
  size = "md",
  onPress,
  style,
}: AppChipProps) {
  const { colors } = useAppTheme();

  const isClickable = !!onPress && !disabled;
  const showRight = !!rightIcon || !!onRemove;

  const height = size === "sm" ? 32 : 36;
  const padX = size === "sm" ? space.sm : space.md;
  const fontSize = size === "sm" ? 12 : 13;

  // base visual rules
  const baseBg = variant === "filled" ? colors.surface : "transparent";

  const baseBorder = variant === "ghost" ? "transparent" : colors.border;

  // active visual rules
  const activeBg = variant === "outline" ? "transparent" : colors.primary;

  const activeBorder = variant === "ghost" ? "transparent" : colors.primary;

  const bg = active ? activeBg : baseBg;
  const borderColor = active ? activeBorder : baseBorder;

  const textColor = active ? colors.primary : colors.text;

  // if filled + active => white text reads better
  const resolvedTextColor =
    active && variant === "filled" ? colors.onPrimary : textColor;

  const iconColor =
    active && variant === "filled" ? colors.onPrimary : colors.muted;

  return (
    <Pressable
      disabled={!isClickable}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          height,
          paddingHorizontal: padX,
          backgroundColor: bg,
          borderColor,
          opacity: disabled ? 0.55 : pressed ? 0.9 : 1,
        },
        style,
      ]}
    >
      <AppText
        numberOfLines={1}
        style={{
          color: resolvedTextColor,
          fontWeight: "700",
          fontSize,
        }}
      >
        {label}
      </AppText>

      {showRight ? (
        <View style={styles.rightWrap}>
          {rightIcon ? (
            <AppIcon name={rightIcon} size={16} color={iconColor} />
          ) : null}

          {onRemove ? (
            <Pressable
              onPress={onRemove}
              hitSlop={10}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <AppIcon name="close" size={16} color={iconColor} />
            </Pressable>
          ) : null}
        </View>
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
  rightWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.xs,
  },
});

export const AppChip = memo(AppChipBase);
