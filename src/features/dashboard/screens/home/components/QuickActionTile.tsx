import { AppCard, AppText } from "@/components";
import { useAppTheme } from "@/design/theme";
import { radius, space } from "@/design/tokens";
import React, { memo } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";

type Props = {
  title: string;
  icon: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
};

function QuickActionTileBase({ title, icon, onPress, style }: Props) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        { flex: 1 },
        pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
        style,
      ]}
    >
      <AppCard
        padding={0}
        style={[styles.card, { borderColor: colors.border }, style]}
      >
        {icon}
        <AppText style={styles.title}>{title}</AppText>
      </AppCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: space.md,
    paddingVertical: space.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    minHeight: 94,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 13,
    fontWeight: "800",
    marginTop: space.lg,
  },
});

export const QuickActionTile = memo(QuickActionTileBase);
