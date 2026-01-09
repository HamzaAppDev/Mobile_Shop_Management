import { AppCard, AppInput, AppText } from "@/components";
import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { space } from "@/design/tokens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { memo, useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  onSubmit: () => void; // design-only
};

function SignupFormCardBase({ onSubmit }: Props) {
  const { colors } = useAppTheme();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const togglePass = useCallback(() => setShowPass((v) => !v), []);
  const toggleConfirm = useCallback(() => setShowConfirm((v) => !v), []);

  return (
    <AppCard style={styles.card}>
      <AppText style={styles.label}>Full Name</AppText>
      <AppInput
        placeholder="Enter your full name"
        value={fullName}
        onChangeText={setFullName}
        autoCapitalize="words"
        rightIcon={
          <MaterialCommunityIcons
            name="account-outline"
            size={18}
            color={colors.muted}
          />
        }
      />

      <View style={{ height: space.md }} />

      <AppText style={styles.label}>Email Address</AppText>
      <AppInput
        placeholder="name@example.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        rightIcon={
          <MaterialCommunityIcons
            name="email-outline"
            size={18}
            color={colors.muted}
          />
        }
      />

      <View style={{ height: space.md }} />

      <AppText style={styles.label}>Password</AppText>
      <AppInput
        placeholder="Enter password"
        value={pass}
        onChangeText={setPass}
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

      <View style={{ height: space.md }} />

      <AppText style={styles.label}>Confirm Password</AppText>
      <AppInput
        placeholder="Re-enter password"
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry={!showConfirm}
        autoCapitalize="none"
        rightIcon={
          <Pressable onPress={toggleConfirm} hitSlop={10}>
            <MaterialCommunityIcons
              name={showConfirm ? "eye-off-outline" : "eye-outline"}
              size={18}
              color={colors.muted}
            />
          </Pressable>
        }
      />
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: { padding: space.lg },
  label: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: space.sm,
  },
});

export const SignupFormCard = memo(SignupFormCardBase);
