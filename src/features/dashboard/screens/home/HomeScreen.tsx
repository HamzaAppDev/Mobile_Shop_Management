import { AppScreen } from "@/components";
import { space } from "@/design/tokens";
import React, { useCallback } from "react";
import { View } from "react-native";
import { HomeSummaryCards } from "./components/HomeSummaryCards";
import { HomeTopBar } from "./components/HomeTopBar";
import { QuickActionsGrid } from "./components/QuickActionsGrid";
import { QuickSaleFab } from "./components/QuickSaleFab";

export function HomeScreen() {
  const onPressAction = useCallback((key: string) => {
    console.log("action:", key);
  }, []);

  return (
    <AppScreen
      padded
      scroll
      backgroundVariant="background"
      paddingHorizontal={space.lg}
    >
      <HomeTopBar shopName="Mobile Zone" />
      <HomeSummaryCards
        todaySales={12500}
        todayExpense={2100}
        pendingMoney={5400}
      />
      <QuickActionsGrid onPressAction={onPressAction} />
      <View style={{ height: 120 }} />
      <QuickSaleFab onPress={() => console.log("quick sale")} />
    </AppScreen>
  );
}
