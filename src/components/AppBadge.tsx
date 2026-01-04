import { AppText } from "@/components/AppText";
import { useAppTheme } from "@/design/theme/AppThemeProvider";
import React, { memo, useMemo } from "react";
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native";

export type BadgeVariant =
    | "neutral"
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "paid"
    | "pending"
    | "overdue";

export type AppBadgeProps = {
    label: string;
    variant?: BadgeVariant;
    leftIcon?: React.ReactNode;
    size?: "sm" | "md";
    style?: ViewStyle;
    textStyle?: TextStyle;
};

function AppBadgeBase({
    label,
    variant = "neutral",
    leftIcon,
    size = "md",
    style,
    textStyle,
}: AppBadgeProps) {
    const { colors, mode } = useAppTheme();

    const { bg, fg, border } = useMemo(() => {
        // Keep badges soft + readable like your Stitch UI
        const soft = (hex: string) => (mode === "dark" ? "rgba(255,255,255,0.06)" : hex);

        switch (variant) {
            case "primary":
                return { bg: mode === "dark" ? "rgba(47,128,237,0.18)" : "#EAF2FF", fg: colors.primary, border: "transparent" };
            case "success":
            case "paid":
                return { bg: mode === "dark" ? "rgba(34,197,94,0.18)" : "#EAFBF1", fg: colors.success, border: "transparent" };
            case "warning":
            case "pending":
                return { bg: mode === "dark" ? "rgba(251,191,36,0.18)" : "#FFF6E5", fg: colors.warning, border: "transparent" };
            case "danger":
            case "overdue":
                return { bg: mode === "dark" ? "rgba(239,68,68,0.18)" : "#FFECEC", fg: colors.danger, border: "transparent" };
            case "info":
                return { bg: mode === "dark" ? "rgba(96,165,250,0.18)" : "#EAF4FF", fg: colors.info, border: "transparent" };
            case "neutral":
            default:
                return { bg: soft(mode === "dark" ? "" : "#F2F4F8"), fg: colors.muted, border: mode === "dark" ? colors.border : "transparent" };
        }
    }, [variant, colors, mode]);

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
        borderRadius: 999,
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
