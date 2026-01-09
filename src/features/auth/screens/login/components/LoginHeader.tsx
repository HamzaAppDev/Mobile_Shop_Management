import { AppText } from "@/components";
import { space } from "@/design/tokens";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  shopName?: string; // optional later
};

function LoginHeaderBase({ shopName }: Props) {
  return (
    <View style={styles.wrap}>
      <AppText variant="title">Enter PIN</AppText>
      <AppText variant="muted" style={styles.sub}>
        {shopName
          ? `Unlock ${shopName}`
          : "Enter your 4-digit PIN to continue."}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: space.lg },
  sub: { marginTop: space.sm },
});

export const LoginHeader = memo(LoginHeaderBase);
