import { AppText } from "@/components";
import { space } from "@/design/tokens";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

function SignupHeaderBase() {
  return (
    <View style={styles.wrap}>
      <AppText style={styles.title}>Start your digital register today.</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: space.md,
    marginBottom: space.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 28,
  },
});

export const SignupHeader = memo(SignupHeaderBase);
