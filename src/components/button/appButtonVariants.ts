import type { AppColors } from "@/design/tokens/colors";

type VariantKind = "filled" | "outline" | "ghost";

export const BUTTON_VARIANTS = {
  primary: {
    kind: "filled" as VariantKind,
    bg: (c: AppColors) => c.primary,
    text: (c: AppColors) => c.onPrimary,
    border: (c: AppColors) => c.primary,
  },
  secondary: {
    kind: "filled" as VariantKind,
    bg: (c: AppColors) => c.surface,
    text: (c: AppColors) => c.text,
    border: (c: AppColors) => c.border,
  },
  outline: {
    kind: "outline" as VariantKind,
    bg: () => "transparent",
    text: (c: AppColors) => c.primary,
    border: (c: AppColors) => c.primary,
  },
  ghost: {
    kind: "ghost" as VariantKind,
    bg: () => "transparent",
    text: (c: AppColors) => c.primary,
    border: () => "transparent",
  },
  danger: {
    kind: "filled" as VariantKind,
    bg: (c: AppColors) => c.danger,
    text: (c: AppColors) => c.onPrimary,
    border: (c: AppColors) => c.danger,
  },
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;
