import { useAppTheme } from "@/design/theme";
import { radius, space } from "@/design/tokens";
import React, { memo } from "react";
import { Pressable, StyleSheet, View, type ViewStyle } from "react-native";
import { AppIcon, type AppIconName } from "./AppIcon";
import { AppText } from "./AppText";

export type AppChipSize = "sm" | "md";

export type AppChipProps = {
  label: string;

  active?: boolean;
  disabled?: boolean;

  // ✅ optional: right icon (chevron, x, etc.)
  rightIcon?: AppIconName;

  // ✅ optional remove action (shows X icon if not provided rightIcon)
  onRemove?: () => void;

  // ✅ sizing
  size?: AppChipSize;

  // actions
  onPress?: () => void;

  style?: ViewStyle;
};

function AppChipBase({
  label,
  active = false,
  disabled = false,
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

  return (
    <Pressable
      disabled={!isClickable}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          height,
          paddingHorizontal: padX,
          backgroundColor: active ? colors.primary : "transparent",
          borderColor: active ? colors.primary : colors.border,
          opacity: disabled ? 0.55 : pressed ? 0.9 : 1,
        },
        style,
      ]}
    >
      <AppText
        numberOfLines={1}
        style={{
          color: active ? colors.onPrimary : colors.text,
          fontWeight: "700",
          fontSize,
        }}
      >
        {label}
      </AppText>

      {showRight ? (
        <View style={styles.rightWrap}>
          {rightIcon ? (
            <AppIcon
              name={rightIcon}
              size={16}
              color={active ? colors.onPrimary : colors.muted}
            />
          ) : null}

          {onRemove ? (
            <Pressable
              onPress={onRemove}
              hitSlop={10}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <AppIcon
                name="close"
                size={16}
                color={active ? colors.onPrimary : colors.muted}
              />
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
