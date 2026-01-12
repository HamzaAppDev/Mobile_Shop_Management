import { AppButton, AppCard, FormField } from "@/components";
import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { space } from "@/design/tokens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { memo, useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";
import { z } from "zod";

const LoginSchema = z.object({
  mobile: z
    .string()
    .min(1, "Mobile number is required")
    .regex(/^[0-9+\-\s]{7,20}$/, "Enter a valid mobile number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof LoginSchema>;

type Props = {
  onLogin: (values: LoginForm) => void; // design only
  onForgotPassword?: () => void;
};

function LoginFormCardBase({ onLogin, onForgotPassword }: Props) {
  const { colors } = useAppTheme();

  const [showPass, setShowPass] = useState(false);
  const togglePass = useCallback(() => setShowPass((v) => !v), []);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: { mobile: "", password: "" },
  });

  const submit = useMemo(() => handleSubmit(onLogin), [handleSubmit, onLogin]);

  return (
    <AppCard style={styles.card}>
      <Controller
        control={control}
        name="mobile"
        render={({ field: { value, onChange, onBlur } }) => (
          <FormField
            label="Mobile Number"
            placeholder="e.g. 0300 1234567"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="phone-pad"
            autoCapitalize="none"
            error={errors.mobile?.message}
            rightIcon={
              <MaterialCommunityIcons
                name="phone-outline"
                size={18}
                color={colors.muted}
              />
            }
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange, onBlur } }) => (
          <FormField
            label="Password"
            placeholder="••••••••"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={!showPass}
            autoCapitalize="none"
            error={errors.password?.message}
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
        )}
      />

      <View style={styles.forgotRow}>
        <Pressable onPress={onForgotPassword} hitSlop={10}>
          {/* keep your AppText variant link outside if you want */}
        </Pressable>
      </View>

      <AppButton
        title="LOGIN"
        onPress={submit}
        loading={isSubmitting}
        disabled={!isValid || isSubmitting}
      />
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: space.lg,
  },
  forgotRow: {
    alignItems: "flex-end",
    marginTop: -space.sm,
    marginBottom: space.lg,
  },
});

export const LoginFormCard = memo(LoginFormCardBase);
