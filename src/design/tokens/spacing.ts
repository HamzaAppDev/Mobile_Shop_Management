export const spacing = {
  0: 0,
  2: 2,
  4: 4,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
  14: 14,
  16: 16,
  18: 18,
  20: 20,
  24: 24,
  28: 28,
  32: 32,
  36: 36,
  40: 40,
  48: 48,
  56: 56,
  64: 64,
} as const;

export type Spacing = keyof typeof spacing;

// Optional “semantic” aliases (very useful)
export const space = {
  xs: spacing[8],
  sm: spacing[12],
  md: spacing[16],
  lg: spacing[24],
  xl: spacing[32],
} as const;
