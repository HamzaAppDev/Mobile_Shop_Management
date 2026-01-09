import { AppButton, AppText } from "@/components";
import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { space } from "@/design/tokens";
import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  onCreate: () => void;
  onGoLogin: () => void;
};

function SignupFooterBase({ onCreate, onGoLogin }: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.wrap}>
      <AppButton title="Create account" onPress={onCreate} />

      <View style={styles.row}>
        <AppText variant="muted">Already have an account?</AppText>
        <Pressable onPress={onGoLogin} hitSlop={10}>
          <AppText style={[styles.link, { color: colors.primary }]}>
            Login
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: space.xl },
  row: {
    marginTop: space.md,
    flexDirection: "row",
    justifyContent: "center",
    gap: space.xs,
    alignItems: "center",
  },
  link: { fontWeight: "800" },
});

export const SignupFooter = memo(SignupFooterBase);
