import { AppText } from "@/components";
import { useAppTheme } from "@/design/theme";
import { space, typography } from "@/design/tokens";
import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  title?: string;
  onClose: () => void;
};

function AddExpenseHeaderBase({ title = "Add Expense", onClose }: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.row}>
      <Pressable
        onPress={onClose}
        hitSlop={12}
        style={({ pressed }) => pressed && { opacity: 0.7 }}
        accessibilityRole="button"
        accessibilityLabel="Close"
      >
        <Ionicons name="close" size={22} color={colors.text} />
      </Pressable>

      <AppText style={[styles.title, { color: colors.text }]}>{title}</AppText>

      <View style={{ width: 22 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: space.md,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
});

export const AddExpenseHeader = memo(AddExpenseHeaderBase);
