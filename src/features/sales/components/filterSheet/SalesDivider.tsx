import { useAppTheme } from "@/design/theme";
import { space } from "@/design/tokens";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

function SalesDividerBase() {
  const { colors } = useAppTheme();
  return <View style={[styles.divider, { backgroundColor: colors.divider }]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: space.lg,
  },
});

export const SalesDivider = memo(SalesDividerBase);
