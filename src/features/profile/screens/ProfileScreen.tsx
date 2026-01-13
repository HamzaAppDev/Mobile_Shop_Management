import { AppScreen, AppText } from "@/components";
import React from "react";
import { View } from "react-native";

export function ProfileScreen() {
  return (
    <AppScreen padded backgroundVariant="background">
      <AppText variant="title">Profile</AppText>
      <View style={{ height: 12 }} />
      <AppText variant="muted">Settings and account info will go here.</AppText>
    </AppScreen>
  );
}
