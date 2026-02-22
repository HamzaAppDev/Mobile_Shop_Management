import { AppIcon, AppText } from "@/components";
import { useAppTheme } from "@/design/theme";
import { radius, space } from "@/design/tokens";
import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  title: string;
  iconName?: React.ComponentProps<typeof AppIcon>["name"];
  selected?: boolean;
  onPress?: () => void;
};

function CategoryRowBase({
  title,
  iconName,
  selected = false,
  onPress,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        {
          borderColor: selected ? colors.primary : colors.border,
          backgroundColor: selected ? colors.primaryMuted : colors.surface,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
    >
      <View style={styles.left}>
        <View
          style={[styles.iconBox, { backgroundColor: colors.surfaceMuted }]}
        >
          {iconName ? (
            <AppIcon name={iconName} size={18} color={colors.text} />
          ) : null}
        </View>

        <View>
          <AppText style={{ fontWeight: "800" }}>{title}</AppText>
        </View>
      </View>

      <View style={styles.right}>
        {selected ? (
          <AppIcon name="check-circle" size={18} color={colors.primary} />
        ) : (
          <View
            style={[
              styles.unchecked,
              { borderColor: colors.border, backgroundColor: colors.surface },
            ]}
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: space.md,
    paddingVertical: space.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: { flexDirection: "row", alignItems: "center", gap: space.md },
  right: { alignItems: "center", justifyContent: "center" },

  iconBox: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  unchecked: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
  },
});

export const CategoryRow = memo(CategoryRowBase);
