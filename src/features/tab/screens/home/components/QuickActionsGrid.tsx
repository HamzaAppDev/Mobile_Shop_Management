import { AppIcon, AppText, type AppIconName } from "@/components";
import { useAppTheme } from "@/design/theme";
import { radius, space } from "@/design/tokens";
import { Routes } from "@/navigation/routes";
import { AppStackParamList } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import React, { memo, useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { QuickActionTile } from "./QuickActionTile";

type Action = {
  key: string;
  title: string;
  icon: { name: AppIconName; color: string; bg: string };
  route?: keyof AppStackParamList;
};

type Props = {
  onPressAction?: (route: keyof AppStackParamList) => void;
};

function QuickActionsGridBase({ onPressAction }: Props) {
  const nav = useNavigation<any>();
  const { colors } = useAppTheme();

  const actions = useMemo<Action[]>(
    () => [
      {
        key: "sale",
        title: "+ Sale",
        icon: {
          name: "cart-outline",
          color: colors.primary,
          bg: "rgba(47,128,237,0.12)",
        },
        route: Routes.App.SalesList,
      },
      {
        key: "expense",
        title: "+ Expense",
        icon: {
          name: "cart-arrow-down",
          color: colors.danger,
          bg: "rgba(239,68,68,0.10)",
        },
        route: Routes.App.ExpensesList,
      },
      {
        key: "stock",
        title: "Stock",
        icon: {
          name: "package-variant",
          color: colors.text,
          bg: "rgba(17,24,39,0.06)",
        },
      },
      {
        key: "udhar",
        title: "Udhar / Credit",
        icon: {
          name: "note-text-outline",
          color: "#F59E0B",
          bg: "rgba(245,158,11,0.10)",
        },
      },
      {
        key: "shops",
        title: "Other Shops",
        icon: {
          name: "store-outline",
          color: colors.text,
          bg: "rgba(17,24,39,0.06)",
        },
      },
      {
        key: "staff",
        title: "Staff",
        icon: {
          name: "account-group-outline",
          color: colors.text,
          bg: "rgba(17,24,39,0.06)",
        },
      },
      {
        key: "reports",
        title: "Reports",
        icon: {
          name: "chart-bar",
          color: colors.primary,
          bg: "rgba(47,128,237,0.12)",
        },
      },
      {
        key: "reminders",
        title: "Reminders",
        icon: {
          name: "bell-outline",
          color: colors.text,
          bg: "rgba(17,24,39,0.06)",
        },
      },
    ],
    [colors]
  );

  return (
    <View style={{ marginTop: space.lg }}>
      <View style={styles.headerRow}>
        <AppText style={styles.headerTitle}>Quick Actions</AppText>
        <AppText variant="muted" style={styles.dateText}>
          Sat, 14 Oct
        </AppText>
      </View>

      <FlatList
        data={actions}
        keyExtractor={(i) => i.key}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={{ gap: space.md }}
        contentContainerStyle={{ gap: space.md }}
        renderItem={({ item }) => (
          <QuickActionTile
            title={item.title}
            icon={
              <View style={[styles.iconBg, { backgroundColor: item.icon.bg }]}>
                <AppIcon
                  name={item.icon.name}
                  size={20}
                  color={item.icon.color}
                />
              </View>
            }
            onPress={() => {
              if (item.route) nav.navigate(item.route);
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: space.md,
  },
  headerTitle: { fontSize: 16, fontWeight: "800" },
  dateText: { fontSize: 12 },

  iconBg: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const QuickActionsGrid = memo(QuickActionsGridBase);
