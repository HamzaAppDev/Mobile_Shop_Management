import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AppTabs } from "./tabs/AppTabs";

import { SetPinScreen } from "@/features/auth/screens";

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const isLoggedIn = false; // TODO: replace with Firebase auth state

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="App" component={AppTabs} />
      ) : (
        <Stack.Screen name="Auth" component={SetPinScreen} />
      )}
    </Stack.Navigator>
  );
}
