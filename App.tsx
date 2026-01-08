import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppErrorBoundary } from "./src/app/AppErrorBoundary";

import React from "react";
import { AppThemeProvider } from "./src/design/theme/AppThemeProvider";
import { RootNavigator } from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <AppErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppThemeProvider>
          <BottomSheetModalProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </BottomSheetModalProvider>
        </AppThemeProvider>
      </GestureHandlerRootView>
    </AppErrorBoundary>
  );
}