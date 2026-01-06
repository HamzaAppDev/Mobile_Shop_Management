export const radius = {
    none: 0,
    xs: 6,
    sm: 10,
    md: 14,  // ⭐ most used (buttons, inputs)
    lg: 18,  // cards
    xl: 24,
    full: 999, // pills / badges
} as const;

export type Radius = keyof typeof radius;
