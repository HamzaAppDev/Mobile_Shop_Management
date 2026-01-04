import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { AppErrorBoundary } from "./src/app/AppErrorBoundary";

import React from "react";
import { AppThemeProvider } from "./src/design/theme/AppThemeProvider";
import { RootNavigator } from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <AppErrorBoundary>
      <AppThemeProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AppThemeProvider>
    </AppErrorBoundary>
  );
}