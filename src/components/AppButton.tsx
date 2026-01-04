import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { typography } from "@/design/tokens/typography";
import React, { memo, useMemo } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";

type Variant = "primary" | "secondary" | "ghost" | "danger";

export type AppButtonProps = {
    title: string;
    onPress?: () => void;
    disabled?: boolean;
    loading?: boolean;
    variant?: Variant;
    fullWidth?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    leftIcon?: React.ReactNode; // optional icon
};

function AppButtonBase({
    title,
    onPress,
    disabled = false,
    loading = false,
    variant = "primary",
    fullWidth = true,
    style,
    textStyle,
    leftIcon,
}: AppButtonProps) {
    const { colors } = useAppTheme();

    const isDisabled = disabled || loading;

    const { containerStyle, labelColor } = useMemo(() => {
        switch (variant) {
            case "secondary":
                return {
                    containerStyle: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 },
                    labelColor: colors.text,
                };
            case "ghost":
                return {
                    containerStyle: { backgroundColor: "transparent", borderColor: "transparent" },
                    labelColor: colors.primary,
                };
            case "danger":
                return {
                    containerStyle: { backgroundColor: colors.danger, borderColor: colors.danger },
                    labelColor: colors.onPrimary,
                };
            case "primary":
            default:
                return {
                    containerStyle: { backgroundColor: colors.primary, borderColor: colors.primary },
                    labelColor: colors.onPrimary,
                };
        }
    }, [variant, colors]);

    return (
        <Pressable
            onPress={isDisabled ? undefined : onPress}
            style={({ pressed }) => [
                styles.base,
                fullWidth && styles.fullWidth,
                containerStyle,
                isDisabled && { opacity: 0.55 },
                pressed && !isDisabled && { opacity: 0.9 },
                style,
            ]}
            accessibilityRole="button"
            accessibilityState={{ disabled: isDisabled }}
        >
            {loading ? (
                <ActivityIndicator color={labelColor} />
            ) : (
                <>
                    {leftIcon ? <>{leftIcon}</> : null}
                    <Text style={[styles.label, { color: labelColor }, textStyle]}>{title}</Text>
                </>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        height: 54,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 16,
    },
    fullWidth: { alignSelf: "stretch" },
    label: {
        fontSize: typography.fontSize.md,
        fontWeight: "600",
    },
});

export const AppButton = memo(AppButtonBase);
