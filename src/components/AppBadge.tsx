import { AppText } from "@/components/AppText";
import { useAppTheme } from "@/design/theme/AppThemeProvider";
import type { AppColors } from "@/design/tokens/colors";
import { radius } from "@/design/tokens/radius";
import React, { memo, useMemo } from "react";
import { StyleSheet, View, type TextStyle, type ViewStyle } from "react-native";

export const BADGE_VARIANTS = {
    neutral: {
        bg: (c: AppColors, mode: "light" | "dark") => (mode === "dark" ? "rgba(255,255,255,0.06)" : "#F2F4F8"),
        fg: (c: AppColors) => c.muted,
        border: (c: AppColors, mode: "light" | "dark") => (mode === "dark" ? c.border : "transparent"),
    },

    primary: {
        bg: (_c: AppColors, mode: "light" | "dark") => (mode === "dark" ? "rgba(47,128,237,0.18)" : "rgba(47,128,237,0.10)"),
        fg: (c: AppColors) => c.primary,
        border: () => "transparent",
    },

    success: {
        bg: (_c: AppColors, mode: "light" | "dark") => (mode === "dark" ? "rgba(34,197,94,0.18)" : "rgba(34,197,94,0.10)"),
        fg: (c: AppColors) => c.success,
        border: () => "transparent",
    },

    warning: {
        bg: (_c: AppColors, mode: "light" | "dark") => (mode === "dark" ? "rgba(251,191,36,0.18)" : "rgba(251,191,36,0.12)"),
        fg: (c: AppColors) => c.warning,
        border: () => "transparent",
    },

    danger: {
        bg: (_c: AppColors, mode: "light" | "dark") => (mode === "dark" ? "rgba(239,68,68,0.18)" : "rgba(239,68,68,0.10)"),
        fg: (c: AppColors) => c.danger,
        border: () => "transparent",
    },

    info: {
        bg: (_c: AppColors, mode: "light" | "dark") => (mode === "dark" ? "rgba(96,165,250,0.18)" : "rgba(96,165,250,0.12)"),
        fg: (c: AppColors) => c.info,
        border: () => "transparent",
    },

    // Aliases (same visual treatment, different semantic label)
    paid: "success",
    pending: "warning",
    overdue: "danger",
} as const;

export type BadgeVariant = keyof typeof BADGE_VARIANTS;

export type AppBadgeProps = {
    label: string;
    variant?: BadgeVariant;
    leftIcon?: React.ReactNode;
    size?: "sm" | "md";
    style?: ViewStyle;
    textStyle?: TextStyle;
};

function resolveVariantKey(v: BadgeVariant) {
    const mapped = BADGE_VARIANTS[v];
    return typeof mapped === "string" ? mapped : v;
}

function AppBadgeBase({
    label,
    variant = "neutral",
    leftIcon,
    size = "md",
    style,
    textStyle,
}: AppBadgeProps) {
    const { colors, mode } = useAppTheme();

    const key = resolveVariantKey(variant);

    const { bg, fg, border } = useMemo(() => {
        const V = BADGE_VARIANTS[key] as Exclude<(typeof BADGE_VARIANTS)[typeof key], string>;
        return {
            bg: V.bg(colors, mode),
            fg: V.fg(colors),
            border: V.border(colors, mode),
        };
    }, [colors, mode, key]);

    return (
        <View
            style={[
                styles.base,
                size === "sm" ? styles.sm : styles.md,
                { backgroundColor: bg, borderColor: border },
                border !== "transparent" ? styles.border : null,
                style,
            ]}
        >
            {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
            <AppText
                numberOfLines={1}
                variant="body"
                style={[
                    styles.text,
                    size === "sm" ? styles.textSm : styles.textMd,
                    { color: fg },
                    textStyle,
                ]}
            >
                {label}
            </AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: radius.full,
    },
    border: { borderWidth: 1 },

    sm: {
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    md: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    icon: {
        marginRight: 6,
    },
    text: {
        fontWeight: "600",
    },
    textSm: {
        fontSize: 12,
        lineHeight: 14,
    },
    textMd: {
        fontSize: 13,
        lineHeight: 16,
    },
});

export const AppBadge = memo(AppBadgeBase);
