import { AppCard, AppText } from "@/components";
import { useAppTheme } from "@/design/theme";
import { radius, space } from "@/design/tokens";
import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  todaySales: number;
  todayExpense: number;
  pendingMoney: number;
};

function money(n: number) {
  // simple formatting (we’ll improve later)
  return `₹ ${n.toLocaleString("en-IN")}`;
}

function HomeSummaryCardsBase({
  todaySales,
  todayExpense,
  pendingMoney,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.wrap}>
      <AppCard
        style={[styles.bigCard, { backgroundColor: "rgba(34,197,94,0.08)" }]}
      >
        <View style={styles.bigRow}>
          <View>
            <AppText style={[styles.kicker, { color: colors.success }]}>
              TODAY SALES
            </AppText>
            <AppText style={styles.bigValue}>{money(todaySales)}</AppText>
          </View>

          <View
            style={[styles.trend, { backgroundColor: "rgba(34,197,94,0.12)" }]}
          >
            <Ionicons name="trending-up" size={16} color={colors.success} />
          </View>
        </View>
      </AppCard>

      <View style={styles.smallRow}>
        <AppCard style={styles.smallCard}>
          <AppText style={[styles.kicker, { color: colors.danger }]}>
            TODAY EXPENSE
          </AppText>
          <AppText style={styles.smallValue}>{money(todayExpense)}</AppText>
        </AppCard>

        <AppCard style={styles.smallCard}>
          <AppText style={[styles.kicker, { color: "#F59E0B" }]}>
            PENDING MONEY
          </AppText>
          <AppText style={styles.smallValue}>{money(pendingMoney)}</AppText>
        </AppCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.md },
  bigCard: {
    padding: space.lg,
    borderRadius: radius.lg,
  },
  bigRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  kicker: { fontSize: 11, fontWeight: "800" },
  bigValue: { fontSize: 24, fontWeight: "900", marginTop: 6 },
  trend: {
    width: 34,
    height: 34,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  smallRow: { flexDirection: "row", gap: space.md },
  smallCard: {
    flex: 1,
    padding: space.lg,
    borderRadius: radius.lg,
  },
  smallValue: { fontSize: 18, fontWeight: "900", marginTop: 6 },
});

export const HomeSummaryCards = memo(HomeSummaryCardsBase);
