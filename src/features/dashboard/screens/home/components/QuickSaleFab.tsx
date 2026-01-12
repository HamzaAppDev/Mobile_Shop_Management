import { AppText } from "@/components";
import { useAppTheme } from "@/design/theme";
import { radius, space } from "@/design/tokens";
import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = { onPress?: () => void };

function QuickSaleFabBase({ onPress }: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.wrap} pointerEvents="box-none">
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.btn,
          { backgroundColor: colors.primary },
          pressed && { opacity: 0.92, transform: [{ scale: 0.98 }] },
        ]}
      >
        <Ionicons name="add" size={18} color={colors.onPrimary} />
        <AppText style={[styles.text, { color: colors.onPrimary }]}>
          Quick Sale
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 72, // above tab bar
    alignItems: "center",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    paddingHorizontal: space.lg,
    height: 44,
    borderRadius: radius.full,
    elevation: 2,
  },
  text: { fontWeight: "800" },
});

export const QuickSaleFab = memo(QuickSaleFabBase);
