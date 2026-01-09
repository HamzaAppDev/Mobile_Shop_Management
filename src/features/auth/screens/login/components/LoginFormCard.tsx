import { AppButton, AppCard, AppInput, AppText } from "@/components";
import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { space } from "@/design/tokens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { memo, useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  onLogin: () => void;
  onForgotPassword?: () => void;
};

function LoginFormCardBase({ onLogin, onForgotPassword }: Props) {
  const { colors } = useAppTheme();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const togglePass = useCallback(() => setShowPass((v) => !v), []);

  return (
    <AppCard style={styles.card}>
      <AppText style={styles.label}>Mobile Number</AppText>

      <AppInput
        placeholder="e.g. 0300 1234567"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
        autoCapitalize="none"
        rightIcon={
          <MaterialCommunityIcons
            name="phone-outline"
            size={18}
            color={colors.muted}
          />
        }
      />

      <View style={{ height: space.md }} />

      <AppText style={styles.label}>Password</AppText>

      <AppInput
        placeholder="••••••••"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPass}
        autoCapitalize="none"
        rightIcon={
          <Pressable onPress={togglePass} hitSlop={10}>
            <MaterialCommunityIcons
              name={showPass ? "eye-off-outline" : "eye-outline"}
              size={18}
              color={colors.muted}
            />
          </Pressable>
        }
      />

      <View style={styles.forgotRow}>
        <Pressable onPress={onForgotPassword} hitSlop={10}>
          <AppText variant="link" style={styles.forgot}>
            Forgot Password?
          </AppText>
        </Pressable>
      </View>

      <AppButton title="LOGIN" onPress={onLogin} />
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: space.lg,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: space.sm,
  },
  forgotRow: {
    alignItems: "flex-end",
    marginTop: space.sm,
    marginBottom: space.lg,
  },
  forgot: {
    fontSize: 13,
    fontWeight: "600",
  },
});

export const LoginFormCard = memo(LoginFormCardBase);
