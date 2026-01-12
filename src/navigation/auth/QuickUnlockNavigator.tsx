import { LoginPinScreen } from "@/features/auth/screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Routes } from "../routes";
import type { AuthStackParamList } from "../types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function QuickUnlockNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.Auth.LoginPin} component={LoginPinScreen} />
    </Stack.Navigator>
  );
}
