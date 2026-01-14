import { AppButton } from "@/components";
import { useAppTheme } from "@/design/theme";
import { space } from "@/design/tokens";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  onClear: () => void;
  onApply: () => void;
};

function SalesSheetFooterBase({ onClear, onApply }: Props) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.footer,
        { borderTopColor: colors.divider, backgroundColor: colors.surface },
      ]}
    >
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <AppButton title="Clear All" variant="outline" onPress={onClear} />
        </View>
        <View style={{ flex: 1 }}>
          <AppButton title="Apply Filters ✓" onPress={onApply} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
  },
  row: {
    flexDirection: "row",
    gap: space.md,
  },
});

export const SalesSheetFooter = memo(SalesSheetFooterBase);
