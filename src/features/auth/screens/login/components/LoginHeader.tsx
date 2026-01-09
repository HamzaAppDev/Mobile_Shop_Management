import { AppText } from "@/components";
import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { space } from "@/design/tokens";
import { radius } from "@/design/tokens/radius";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

function LoginHeaderBase() {
  const { colors } = useAppTheme();

  return (
    <View style={styles.wrap}>
      <View style={[styles.iconWrap, { backgroundColor: colors.surface }]}>
        <MaterialCommunityIcons
          name="shopping"
          size={18}
          color={colors.primary}
        />
      </View>

      <AppText style={styles.title}>Welcome Back</AppText>
      <AppText variant="muted" style={styles.subtitle}>
        Sign in to manage your shop
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    paddingTop: space.xl,
    paddingBottom: space.lg,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: space.md,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
  },
  subtitle: {
    marginTop: space.xs,
  },
});

export const LoginHeader = memo(LoginHeaderBase);
