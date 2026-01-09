import { LoginPinScreen, LoginScreen, SetPinScreen } from "@/features/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Routes } from "../routes";
import type { AuthStackParamList } from "../types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.Auth.Login} component={LoginScreen} />
      {/* <Stack.Screen name={Routes.Auth.Signup} component={SignupScreen} /> */}
      <Stack.Screen name={Routes.Auth.SetPin} component={SetPinScreen} />
      <Stack.Screen name={Routes.Auth.LoginPin} component={LoginPinScreen} />
    </Stack.Navigator>
  );
}
