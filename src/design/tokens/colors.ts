export type AppMode = "light" | "dark";

// Minimal semantic tokens: enough for the whole app + dark mode correctness
export const semantic = {
  light: {
    // Brand
    primary: "#2F80ED",
    onPrimary: "#FFFFFF",

    // Surfaces
    background: "#F5F7FB", // screen background
    surface: "#FFFFFF", // cards, sheets
    onSurface: "#111827", // main text on surface

    // Text
    text: "#111827",
    muted: "#6B7280",
    placeholder: "#9CA3AF",

    // Borders / separators
    border: "#E6EAF2",
    divider: "#EEF2F7",

    // Status
    success: "#16A34A",
    warning: "#F59E0B",
    danger: "#DC2626",
    info: "#2563EB",

    // Muted backgrounds (for chips, selected states)
    primaryMuted: "rgba(47,128,237,0.12)",
    dangerMuted: "rgba(239,68,68,0.10)",
    successMuted: "rgba(34,197,94,0.12)",
    warningMuted: "rgba(245,158,11,0.12)",
    infoMuted: "rgba(37,99,235,0.12)",
    surfaceMuted: "rgba(17,24,39,0.06)",
    inputBg: "#F2F4F8",

    // Overlay (for modals)
    overlay: "rgba(0,0,0,0.45)",
    transparent: "rgba(0,0,0,0)",
  },
  dark: {
    // Brand (keep primary same for consistency)
    primary: "#2F80ED",
    onPrimary: "#FFFFFF",

    // Surfaces
    background: "#0B1220",
    surface: "#111A2E",
    onSurface: "#E5E7EB",

    // Text
    text: "#E5E7EB",
    muted: "#9CA3AF",
    placeholder: "#6B7280",

    // Borders / separators
    border: "#1E2A44",
    divider: "#18233A",

    // Status
    success: "#22C55E",
    warning: "#FBBF24",
    danger: "#EF4444",
    info: "#60A5FA",

    // Muted backgrounds (for chips, selected states)
    primaryMuted: "rgba(47,128,237,0.15)",
    dangerMuted: "rgba(239,68,68,0.12)",
    successMuted: "rgba(34,197,94,0.15)",
    warningMuted: "rgba(251,191,36,0.15)",
    infoMuted: "rgba(96,165,250,0.15)",
    surfaceMuted: "rgba(255,255,255,0.06)",
    inputBg: "rgba(255,255,255,0.06)",

    overlay: "rgba(0,0,0,0.65)",
    transparent: "rgba(0,0,0,0)",
  },
} as const;

export type AppColors = (typeof semantic)[AppMode];
export type AppColorKey = keyof AppColors;

export const getColors = (mode: AppMode) => semantic[mode];
