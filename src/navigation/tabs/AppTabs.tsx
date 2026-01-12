import { AppIcon } from "@/components/AppIcon";
import { useAppTheme } from "@/design/theme";
import { ExpensesScreen, HomeScreen, SalesScreen } from "@/features/dashboard";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { AppTabRoutes, AppTabsParamList } from "./appTabs";

const Tab = createBottomTabNavigator<AppTabsParamList>();

export function AppTabs() {
  const { colors } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          borderTopColor: colors.border,
          backgroundColor: colors.surface,
          height: 64,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name={AppTabRoutes.Dashboard}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AppIcon name="home-outline" size={22} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={AppTabRoutes.Sales}
        component={SalesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AppIcon name="cart-outline" size={22} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={AppTabRoutes.Expenses}
        component={ExpensesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AppIcon name="cart-arrow-down" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
