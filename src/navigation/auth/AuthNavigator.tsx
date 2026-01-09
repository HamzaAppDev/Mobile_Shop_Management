import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Routes } from "../routes";
import type { AuthStackParamList } from "../types";

// Import your screens from feature folder
import { SetPinScreen } from "@/features/auth/screens/SetPin";
import { LoginPinScreen } from "@/features/auth/screens/login/LoginPinScreen";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.Auth.SetPin} component={SetPinScreen} />
      <Stack.Screen name={Routes.Auth.LoginPin} component={LoginPinScreen} />
    </Stack.Navigator>
  );
}
