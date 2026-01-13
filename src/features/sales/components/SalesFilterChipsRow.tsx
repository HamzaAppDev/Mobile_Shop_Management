import { AppChip } from "@/components";
import { useAppTheme } from "@/design/theme";
import { space } from "@/design/tokens";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

type Payment = "All" | "Cash" | "Online" | "Udhar";

type Props = {
  value: Payment;
  onChange: (v: Payment) => void;
};

function SalesFilterChipsRowBase({ value, onChange }: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.row}>
      <AppChip
        label="All"
        active={value === "All"}
        onPress={() => onChange("All")}
        size="sm"
      />
      <AppChip
        label="Cash"
        active={value === "Cash"}
        onPress={() => onChange("Cash")}
        size="sm"
      />
      <AppChip
        label="Online"
        active={value === "Online"}
        onPress={() => onChange("Online")}
        size="sm"
      />
      <AppChip
        label="Udhar"
        active={value === "Udhar"}
        onPress={() => onChange("Udhar")}
        size="sm"
        // slight tint like screenshot
        style={value === "Udhar" ? { borderColor: colors.primary } : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: space.sm,
    flexDirection: "row",
    gap: space.sm,
    flexWrap: "wrap",
  },
});

export const SalesFilterChipsRow = memo(SalesFilterChipsRowBase);
