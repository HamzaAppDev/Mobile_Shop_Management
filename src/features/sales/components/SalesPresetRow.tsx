import { AppChip } from "@/components";
import { space } from "@/design/tokens";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

export type SalesPreset = "today" | "yesterday" | "week" | "month";

type Props = {
  value: SalesPreset;
  onChange: (v: SalesPreset) => void;
};

function SalesPresetRowBase({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      <AppChip
        label="Today"
        active={value === "today"}
        onPress={() => onChange("today")}
        size="sm"
      />
      <AppChip
        label="Yesterday"
        active={value === "yesterday"}
        onPress={() => onChange("yesterday")}
        size="sm"
      />
      <AppChip
        label="This Week"
        active={value === "week"}
        onPress={() => onChange("week")}
        size="sm"
      />
      <AppChip
        label="This Month"
        active={value === "month"}
        onPress={() => onChange("month")}
        size="sm"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: space.sm,
    flexWrap: "wrap",
  },
});

export const SalesPresetRow = memo(SalesPresetRowBase);
