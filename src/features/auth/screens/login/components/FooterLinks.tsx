import { AppText } from "@/components";
import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { space } from "@/design/tokens";
import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  onCreateAccount: () => void;
};

function FooterLinksBase({ onCreateAccount }: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.wrap}>
      <AppText variant="muted">New here?</AppText>
      <Pressable onPress={onCreateAccount} hitSlop={10}>
        <AppText style={[styles.link, { color: colors.primary }]}>
          Create Account
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: space.lg,
    flexDirection: "row",
    justifyContent: "center",
    gap: space.xs,
    alignItems: "center",
  },
  link: {
    fontWeight: "700",
  },
});

export const FooterLinks = memo(FooterLinksBase);
