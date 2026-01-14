import { AppText } from "@/components";
import { useAppTheme } from "@/design/theme";
import { space } from "@/design/tokens";
import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  title: string;
  onClose: () => void;
};

function SalesSheetHeaderBase({ title, onClose }: Props) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.header,
        { borderBottomColor: colors.divider, backgroundColor: colors.surface },
      ]}
    >
      <AppText style={[styles.title, { color: colors.text }]}>{title}</AppText>

      <Pressable
        onPress={onClose}
        hitSlop={12}
        style={({ pressed }) => [pressed && { opacity: 0.7 }]}
        accessibilityRole="button"
        accessibilityLabel="Close"
      >
        <Ionicons name="close" size={22} color={colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { fontSize: 16, fontWeight: "900" },
});

export const SalesSheetHeader = memo(SalesSheetHeaderBase);
