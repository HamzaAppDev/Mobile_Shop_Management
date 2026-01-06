import type { AppColors } from "@/design/tokens/colors";

export const BUTTON_VARIANTS = {
  primary: {
    bg: (c: AppColors) => c.primary,
    text: (c: AppColors) => c.onPrimary,
    border: (c: AppColors) => c.primary,
  },
  secondary: {
    bg: (c: AppColors) => c.surface,
    text: (c: AppColors) => c.text,
    border: (c: AppColors) => c.border,
  },
  outline: {
    bg: (_c: AppColors) => "transparent",
    text: (c: AppColors) => c.primary,
    border: (c: AppColors) => c.primary, // ✅ outline border fixed to primary (your choice)
  },
  ghost: {
    bg: (_c: AppColors) => "transparent",
    text: (c: AppColors) => c.primary,
    border: (_c: AppColors) => "transparent",
  },
  danger: {
    bg: (c: AppColors) => c.danger,
    text: (c: AppColors) => c.onPrimary,
    border: (c: AppColors) => c.danger,
  },
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;
