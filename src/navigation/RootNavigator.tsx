import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AppTabs } from "./tabs/AppTabs";

import { AppBadge } from "@/components/AppBadge";
import { AppCard } from "@/components/AppCard";
import { AppHeader } from "@/components/AppHeader";
import { AppInput } from "@/components/AppInput";
import { AppSelectField } from "@/components/AppSelectField";
import { AppText } from "@/components/AppText";
import { AppButton } from "@/components/button/AppButton";
import { View } from "react-native";

function LoginScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <AppButton title={"Login"} />
      <AppButton title={"Secondary"} variant="outline" />
      <AppInput placeholder="Search of the text" />
      <AppText>Hamza Ali</AppText>
      <AppCard>
        <AppInput placeholder="Search of the text" />
        <AppBadge label={"Pending"} />
        <AppHeader title={"Header"} />
      </AppCard>

      <AppSelectField
        label="Demo Select"
        data={[
          { id: 1, name: "Option 1" },
          { id: 2, name: "Option 2" },
        ]}
        getValue={(item) => item.id}
        getLabel={(item) => item.name}
      />
    </View>
  );
}

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
        <Stack.Screen name="Auth" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}