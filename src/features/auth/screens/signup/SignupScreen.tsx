import { useSession } from "@/app/session";
import { AppHeader, AppScreen, AppText } from "@/components";
import { space } from "@/design/tokens";
import { useAuthNavigation } from "@/navigation/auth";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { SignupFormCard, type SignupForm } from "./components/SignupFormCard";

export function SignupScreen() {
  const nav = useAuthNavigation();

  // Design-only: after signup we mark signed in
  const { signIn } = useSession();

  const onCreate = useCallback(
    (_values: SignupForm) => {
      // Later: Firebase create user, then:
      signIn();
      // RootNavigator will now show QuickUnlock (if enabled) or AppTabs
      // Next step for onboarding: you can navigate to SetPin screen inside Auth flow,
      // but state-driven root is cleaner: we’ll do onboarding gate later.
    },
    [signIn]
  );

  const goBack = useCallback(() => nav.goBack(), [nav]);

  return (
    <AppScreen padded backgroundVariant="background">
      <AppHeader
        title="Create Account"
        showBack
        onBackPress={goBack}
        size="compact"
      />

      <View style={styles.body}>
        <AppText style={styles.title}>
          Start your digital register today.
        </AppText>

        <SignupFormCard onCreate={onCreate} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, paddingTop: space.md },
  title: {
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 28,
    marginBottom: space.lg,
  },
});
