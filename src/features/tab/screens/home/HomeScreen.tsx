import { AppScreen } from "@/components";
import { AddFabButton } from "@/components/button/AddFabButton";
import { space } from "@/design/tokens";
import React, { useCallback } from "react";
import { View } from "react-native";
import { HomeSummaryCards, HomeTopBar, QuickActionsGrid } from "./components";

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
      floating={
        <AddFabButton
          title="Quick Sale"
          onPress={() => console.log("quick sale")}
        />
      }
    >
      <HomeTopBar shopName="Mobile Zone" />
      <HomeSummaryCards
        todaySales={12500}
        todayExpense={2100}
        pendingMoney={5400}
      />
      <QuickActionsGrid onPressAction={onPressAction} />
      <View style={{ height: 120 }} />
    </AppScreen>
  );
}
