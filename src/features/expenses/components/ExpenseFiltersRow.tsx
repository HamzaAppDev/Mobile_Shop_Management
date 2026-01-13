import { AppText } from "@/components";
import { useAppTheme } from "@/design/theme";
import { radius, space } from "@/design/tokens";
import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Filter = "month" | "today" | "yesterday";

type Props = {
  value: Filter;
  onChange: (v: Filter) => void;
};

function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: active ? colors.primary : "transparent",
          borderColor: active ? colors.primary : colors.border,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
    >
      <AppText
        style={{
          color: active ? colors.onPrimary : colors.muted,
          fontWeight: "800",
          fontSize: 12,
        }}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

function ExpenseFiltersChipBase({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      <Chip
        label="This Month"
        active={value === "month"}
        onPress={() => onChange("month")}
      />
      <Chip
        label="Today"
        active={value === "today"}
        onPress={() => onChange("today")}
      />
      <Chip
        label="Yesterday"
        active={value === "yesterday"}
        onPress={() => onChange("yesterday")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: space.sm,
    marginTop: space.md,
    marginBottom: space.lg,
  },
  chip: {
    paddingHorizontal: space.md,
    height: 34,
    borderRadius: radius.full,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const ExpenseFiltersChip = memo(ExpenseFiltersChipBase);
