import { useSession } from "@/app/session";
import React from "react";
import { AppNavigator } from "./app/AppNavigator";
import { AuthNavigator, QuickUnlockNavigator } from "./auth";

export function RootNavigator() {
  const { authStatus, locked, quickUnlockEnabled } = useSession();

  if (authStatus === "loading") return null;

  if (authStatus === "signedOut") return <AuthNavigator />;

  // signed in:
  if (quickUnlockEnabled && locked) return <QuickUnlockNavigator />;

  return <AppNavigator />;
}
