import { AppHeader, AppScreen } from "@/components";
import { space } from "@/design/tokens";
import { useAuthNavigation } from "@/navigation/auth";
import { Routes } from "@/navigation/routes";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";

import { SignupFooter, SignupFormCard, SignupHeader } from "./components";

export function SignupScreen() {
  const nav = useAuthNavigation();

  const goBack = useCallback(() => nav.goBack(), [nav]);

  const onCreate = useCallback(() => {
    // Design-only flow:
    // after sign up => go to SetPin
    nav.navigate(Routes.Auth.SetPin);
  }, [nav]);

  const onGoLogin = useCallback(() => {
    nav.navigate(Routes.Auth.Login);
  }, [nav]);

  return (
    <AppScreen padded backgroundVariant="background">
      <AppHeader
        title="Create Account"
        showBack
        onBackPress={goBack}
        size="compact"
      />

      <View style={styles.body}>
        <SignupHeader />
        <SignupFormCard onSubmit={onCreate} />
        <SignupFooter onCreate={onCreate} onGoLogin={onGoLogin} />

        <View style={{ height: space.lg }} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: space.md,
  },
});
