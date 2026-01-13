import { AppText } from "@/components";
import { useAppTheme } from "@/design/theme";
import { radius, space, typography } from "@/design/tokens";
import type { ExpenseCategory } from "@/features/expenses/constants/categories";
import { Ionicons } from "@expo/vector-icons";
import React, { memo, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  item: ExpenseCategory;
  selected: boolean;
  onPress: () => void;
};

function CategoryTileBase({ item, selected, onPress }: Props) {
  const { colors } = useAppTheme();

  const tintColor = useMemo(() => {
    switch (item.tint) {
      case "danger":
        return colors.danger;
      case "warning":
        return colors.warning;
      case "info":
        return colors.info;
      case "muted":
        return colors.muted;
      default:
        return colors.primary;
    }
  }, [colors, item.tint]);

  const borderColor = selected ? colors.primary : colors.border;
  const bubbleBg = selected ? "rgba(47,128,237,0.12)" : colors.divider;
  const iconColor = selected ? colors.primary : tintColor;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        {
          backgroundColor: colors.surface,
          borderColor,
          opacity: pressed ? 0.92 : 1,
        },
      ]}
    >
      <View style={[styles.bubble, { backgroundColor: bubbleBg }]}>
        <Ionicons name={item.icon as any} size={20} color={iconColor} />
      </View>

      <AppText style={[styles.text, { color: colors.text }]}>
        {item.label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: space.md,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: space.sm,
  },
  bubble: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
});

export const CategoryTile = memo(CategoryTileBase);
