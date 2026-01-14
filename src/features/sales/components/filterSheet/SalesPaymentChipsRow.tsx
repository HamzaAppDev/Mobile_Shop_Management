import { AppChip } from "@/components";
import { space } from "@/design/tokens";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import type { SalesPayment } from "./salesFilterSheet.model";

type Props = {
  value: SalesPayment;
  onChange: (v: SalesPayment) => void;
};

function SalesPaymentChipsRowBase({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      <AppChip
        label="Cash"
        active={value === "cash"}
        size="sm"
        variant={value === "cash" ? "filled" : "outline"}
        onPress={() => onChange(value === "cash" ? null : "cash")}
      />
      <AppChip
        label="Online"
        active={value === "online"}
        size="sm"
        variant={value === "online" ? "filled" : "outline"}
        onPress={() => onChange(value === "online" ? null : "online")}
      />
      <AppChip
        label="Udhar"
        active={value === "udhar"}
        size="sm"
        variant={value === "udhar" ? "filled" : "outline"}
        onPress={() => onChange(value === "udhar" ? null : "udhar")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: space.sm,
  },
});

export const SalesPaymentChipsRow = memo(SalesPaymentChipsRowBase);
