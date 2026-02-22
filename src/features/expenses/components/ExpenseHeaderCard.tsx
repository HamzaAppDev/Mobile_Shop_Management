import { AppCard, AppText } from "@/components";
import { useAppTheme } from "@/design/theme";
import { radius, space, typography } from "@/design/tokens";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

function money(n: number) {
  return `₹ ${n.toLocaleString("en-IN")}`;
}

type Props = { total: number };

function ExpenseHeaderCardBase({ total }: Props) {
  const { colors } = useAppTheme();

  return (
    <AppCard padding={0} style={[styles.card, { borderColor: colors.border }]}>
      <AppText variant="muted" style={styles.kicker}>
        TOTAL EXPENSES
      </AppText>

      <AppText style={styles.value}>{money(total)}</AppText>

      <View style={styles.pillRow}>
        <View
          style={[styles.pill, { backgroundColor: colors.primaryMuted }]}
        >
          <AppText style={[styles.pillText, { color: colors.primary }]}>
            This Month
          </AppText>
        </View>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: space.md,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  kicker: {
    fontSize: typography.fontSize.xs,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  value: {
    fontSize: typography.fontSize.xl,
    fontWeight: "900",
    marginTop: space.sm,
  },
  pillRow: {
    marginTop: space.md,
    flexDirection: "row",
    justifyContent: "center",
  },
  pill: {
    paddingHorizontal: space.md,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  pillText: { fontWeight: "800", fontSize: typography.fontSize.xs },
});

export const ExpenseHeaderCard = memo(ExpenseHeaderCardBase);
