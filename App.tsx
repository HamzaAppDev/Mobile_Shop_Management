import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppErrorBoundary } from "./src/app/AppErrorBoundary";
import { navigationRef } from "./src/navigation/rootNavigation";

import { AppLifecycle } from "@/app";
import { useBootstrap } from "@/app/bootstrap/useBootstrap";
import { SessionProvider } from "@/app/session";
import React from "react";
import { AppThemeProvider } from "./src/design/theme/AppThemeProvider";
import { RootNavigator } from "./src/navigation/RootNavigator";

function AppBoot() {
  useBootstrap(); // Flips authStatus from "loading" to signedOut/signedIn
  return (
    <>
      <RootNavigator />
      <AppLifecycle />
    </>
  );
}

export default function App() {
  return (
    <AppErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppThemeProvider>
          <SessionProvider>
          <BottomSheetModalProvider>
            <NavigationContainer ref={navigationRef}>
              <AppBoot />
            </NavigationContainer>
          </BottomSheetModalProvider>
          </SessionProvider>
        </AppThemeProvider>
      </GestureHandlerRootView>
    </AppErrorBoundary>
  );
}
