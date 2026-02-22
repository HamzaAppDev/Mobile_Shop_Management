import { AppIcon, AppText, type AppIconName } from "@/components";
import { useAppTheme } from "@/design/theme";
import { radius, space } from "@/design/tokens";
import React, { memo } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";

type Props = {
  title: string;
  selected?: boolean;
  iconName?: AppIconName; // optional
  iconBg?: string; // optional custom bg
  onPress?: () => void;
  style?: ViewStyle;
};

function CategoryRowBase({
  title,
  selected = false,
  iconName,
  iconBg,
  onPress,
  style,
}: Props) {
  const { colors } = useAppTheme();

  const bg = selected ? colors.primaryMuted : colors.surface;
  const border = selected ? colors.primary : colors.border;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: bg,
          borderColor: border,
          opacity: pressed ? 0.92 : 1,
        },
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      {iconName ? (
        <View
          style={[
            styles.iconBg,
            { backgroundColor: iconBg ?? colors.surfaceMuted },
          ]}
        >
          <AppIcon name={iconName} size={18} color={colors.text} />
        </View>
      ) : null}

      <AppText style={{ flex: 1, fontWeight: "700" }}>{title}</AppText>

      {/* radio */}
      <View
        style={[
          styles.radio,
          {
            borderColor: selected ? colors.primary : colors.border,
            backgroundColor: selected ? colors.primary : "transparent",
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 54,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: space.md,
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
  },
  iconBg: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
  },
});

export const CategoryRow = memo(CategoryRowBase);
