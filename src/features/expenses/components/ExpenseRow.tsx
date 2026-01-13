import { AppCard, AppIcon, AppText } from "@/components";
import { useAppTheme } from "@/design/theme";
import { radius, space } from "@/design/tokens";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import type { ExpenseTx } from "./ExpenseTransactionList";

function money(n: number) {
  return `-₹${n.toLocaleString("en-IN")}`;
}

type Props = { item: ExpenseTx };

function ExpenseRowBase({ item }: Props) {
  const { colors } = useAppTheme();

  const tint =
    item.colorKey === "success"
      ? colors.success
      : item.colorKey === "warning"
      ? colors.warning
      : item.colorKey === "danger"
      ? colors.danger
      : colors.info;

  return (
    <AppCard padding={0} style={[styles.card, { borderColor: colors.border }]}>
      <View style={styles.row}>
        <View style={[styles.iconWrap, { backgroundColor: colors.divider }]}>
          <AppIcon name={item.icon} size={18} color={tint} />
        </View>

        <View style={styles.mid}>
          <AppText style={styles.title}>{item.title}</AppText>
          <AppText variant="muted" style={styles.sub}>
            {item.subtitle}
          </AppText>
        </View>
        <AppText style={styles.amount}>{money(item.amount)}</AppText>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: space.lg,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: space.md,
  },

  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },

  mid: { flex: 1 },

  title: { fontWeight: "900", fontSize: 15 },
  sub: { fontSize: 12, marginTop: 6 },
  amount: { fontWeight: "900", fontSize: 14, marginTop: 10 },
});

export const ExpenseRow = memo(ExpenseRowBase);
