import { AppChip } from "@/components";
import { space } from "@/design/tokens";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import type { SalesDatePreset } from "./salesFilterSheet.model";

type Props = {
  value: SalesDatePreset;
  onChange: (v: SalesDatePreset) => void;
};

function SalesDatePresetsRowBase({ value, onChange }: Props) {
  return (
    <View style={styles.rowWrap}>
      <AppChip
        label="Today"
        active={value === "today"}
        size="sm"
        variant={value === "today" ? "filled" : "outline"}
        onPress={() => onChange("today")}
      />
      <AppChip
        label="Yesterday"
        active={value === "yesterday"}
        size="sm"
        variant={value === "yesterday" ? "filled" : "outline"}
        onPress={() => onChange("yesterday")}
      />
      <AppChip
        label="This Week"
        active={value === "week"}
        size="sm"
        variant={value === "week" ? "filled" : "outline"}
        onPress={() => onChange("week")}
      />
      <AppChip
        label="This Month"
        active={value === "month"}
        size="sm"
        variant={value === "month" ? "filled" : "outline"}
        onPress={() => onChange("month")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: space.sm,
  },
});

export const SalesDatePresetsRow = memo(SalesDatePresetsRowBase);
