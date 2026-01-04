import { AppErrorBoundary } from "@/app/AppErrorBoundary";
import { RootNavigator } from "@/navigation/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import 'react-native-gesture-handler';

export default function App() {
  return (
    <AppErrorBoundary>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AppErrorBoundary>
  );
}