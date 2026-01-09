import { AppScreen, AppText } from "@/components";
import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { space } from "@/design/tokens";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { FooterLinks } from "./components/FooterLinks";
import { LoginFormCard } from "./components/LoginFormCard";
import { LoginHeader } from "./components/LoginHeader";

import { useAuthNavigation } from "@/navigation/auth";
import { Routes } from "@/navigation/routes";

export function LoginScreen() {
  const { colors } = useAppTheme();
  const nav = useAuthNavigation();

  const onLogin = useCallback(() => {
    // Design-only flow:
    // after login -> go to SetPin (later you will decide based on stored pin)
    nav.navigate(Routes.Auth.SetPin);
  }, [nav]);

  const onCreateAccount = useCallback(() => {
    nav.navigate(Routes.Auth.Signup);
  }, [nav]);

  const onForgot = useCallback(() => {
    // later: nav.navigate(Routes.Auth.ForgotPassword)
  }, []);

  return (
    <AppScreen padded backgroundVariant="background">
      {/* Top "blue bar" effect like Figma */}
      <View style={[styles.topBar, { backgroundColor: colors.primary }]} />

      <View style={styles.body}>
        <LoginHeader />
        <LoginFormCard onLogin={onLogin} onForgotPassword={onForgot} />
        <FooterLinks onCreateAccount={onCreateAccount} />

        <View style={{ flex: 1 }} />

        <AppText variant="muted" style={styles.footerNote}>
          Safe & Secure • Version 2.0
        </AppText>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: 4,
    borderRadius: 999,
    alignSelf: "center",
    width: "60%",
    marginTop: space.md,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: space.xl,
  },
  footerNote: {
    textAlign: "center",
    marginTop: space.xl,
    fontSize: 12,
  },
});
