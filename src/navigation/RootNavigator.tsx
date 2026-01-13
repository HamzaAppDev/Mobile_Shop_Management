import { useSessionStore } from "@/app/store/sessionStore";
import React from "react";
import { AppNavigator } from "./app/AppNavigator";
import { AuthNavigator, QuickUnlockNavigator } from "./auth";

export function RootNavigator() {
  const authStatus = useSessionStore((s) => s.authStatus);
  const locked = useSessionStore((s) => s.locked);
  const quickUnlockEnabled = useSessionStore((s) => s.quickUnlockEnabled);

  if (authStatus === "loading") return null;

  if (authStatus === "signedOut") return <AuthNavigator />;

  // signed in:
  if (quickUnlockEnabled && locked) return <QuickUnlockNavigator />;

  return <AppNavigator />;
}
