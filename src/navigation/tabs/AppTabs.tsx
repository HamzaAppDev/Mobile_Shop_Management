import { AppIcon } from "@/components";
import { useAppTheme } from "@/design/theme";
import { HomeScreen, ProfileScreen } from "@/features";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { AppTabRoutes } from "./tabRoutes";
import type { AppTabsParamList } from "./tabTypes";

const Tab = createBottomTabNavigator<AppTabsParamList>();

export function AppTabs() {
  const { colors } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          borderTopColor: colors.border,
          backgroundColor: colors.surface,
          height: 64,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
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
        name={AppTabRoutes.Profile}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AppIcon name="account-outline" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
