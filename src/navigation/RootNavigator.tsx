import { useSessionStore } from "@/appRoot/store/sessionStore";
import React from "react";
import { AuthNavigator, QuickUnlockNavigator } from "./auth";
import { AppTabs } from "./tabs/AppTabs";

export function RootNavigator() {
  const authStatus = useSessionStore((s) => s.authStatus);
  const locked = useSessionStore((s) => s.locked);
  const quickUnlockEnabled = useSessionStore((s) => s.quickUnlockEnabled);

  if (authStatus === "loading") return null;

  if (authStatus === "signedOut") return <AuthNavigator />;

  // signed in:
  if (quickUnlockEnabled && locked) return <QuickUnlockNavigator />;

  return <AppTabs />;
}
