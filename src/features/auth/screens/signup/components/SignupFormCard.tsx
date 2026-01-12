import { AppButton, AppCard } from "@/components";
import { FormInput } from "@/components/form";
import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { space } from "@/design/tokens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { memo, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet } from "react-native";
import { z } from "zod";

const SignupSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupForm = z.infer<typeof SignupSchema>;

type Props = {
  onCreate: (values: SignupForm) => void; // design-only
};

function SignupFormCardBase({ onCreate }: Props) {
  const { colors } = useAppTheme();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const togglePass = useCallback(() => setShowPass((v) => !v), []);
  const toggleConfirm = useCallback(() => setShowConfirm((v) => !v), []);

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const submit = useMemo(
    () => handleSubmit(onCreate),
    [handleSubmit, onCreate]
  );

  return (
    <AppCard style={styles.card}>
      <FormInput
        control={control}
        name="fullName"
        label="Full Name"
        placeholder="Enter your full name"
        autoCapitalize="words"
        rightIcon={
          <MaterialCommunityIcons
            name="account-outline"
            size={18}
            color={colors.muted}
          />
        }
      />

      <FormInput
        control={control}
        name="email"
        label="Email Address"
        placeholder="name@example.com"
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

      <FormInput
        control={control}
        name="password"
        label="Password"
        placeholder="Enter password"
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

      <FormInput
        control={control}
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Re-enter password"
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

      <AppButton
        title="Create account"
        onPress={submit}
        loading={isSubmitting}
        disabled={!isValid || isSubmitting}
      />
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: { padding: space.lg },
});

export const SignupFormCard = memo(SignupFormCardBase);
