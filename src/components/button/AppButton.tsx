import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { radius } from "@/design/tokens/radius";
import { typography } from "@/design/tokens/typography";
import React, { memo, useMemo } from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
    type TextStyle,
    type ViewStyle,
} from "react-native";
import { BUTTON_VARIANTS, type ButtonVariant } from "./appButtonVariants";

export type AppButtonProps = {
    title: string;
    onPress?: () => void;

    variant?: ButtonVariant;
    disabled?: boolean;
    loading?: boolean;

    fullWidth?: boolean;
    size?: "md" | "sm";

    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;

    // Optional overrides (like your sample)
    bgColorOverride?: string;
    textColorOverride?: string;
    borderColorOverride?: string;

    style?: ViewStyle;
    textStyle?: TextStyle;
};

function AppButtonBase({
    title,
    onPress,
    variant = "primary",
    disabled = false,
    loading = false,
    fullWidth = true,
    size = "md",
    leftIcon,
    rightIcon,
    bgColorOverride,
    textColorOverride,
    borderColorOverride,
    style,
    textStyle,
}: AppButtonProps) {
    const { colors } = useAppTheme();
    const V = BUTTON_VARIANTS[variant];

    const isDisabled = disabled || loading;

    const computed = useMemo(() => {
        const bg = bgColorOverride ?? V.bg(colors);
        const text = textColorOverride ?? V.text(colors);
        const border = borderColorOverride ?? V.border(colors);

        // disabled styles: keep consistent across variants
        // - outline/ghost remain transparent bg but get lower opacity
        // - filled variants become muted-ish
        const disabledBg =
            variant === "outline" || variant === "ghost"
                ? "transparent"
                : colors.border; // simple muted fill
        const disabledBorder =
            variant === "outline" ? colors.border : border; // outline uses muted border when disabled
        const disabledText = colors.muted;

        return {
            bg: isDisabled ? disabledBg : bg,
            text: isDisabled ? disabledText : text,
            border: isDisabled ? disabledBorder : border,
        };
    }, [
        V,
        colors,
        isDisabled,
        variant,
        bgColorOverride,
        textColorOverride,
        borderColorOverride,
    ]);

    return (
        <Pressable
            onPress={isDisabled ? undefined : onPress}
            style={({ pressed }) => [
                styles.base,
                size === "sm" ? styles.sm : styles.md,
                fullWidth && styles.fullWidth,
                {
                    backgroundColor: computed.bg,
                    borderColor: computed.border,
                    opacity: pressed && !isDisabled ? 0.9 : 1,
                },
                style,
            ]}
            accessibilityRole="button"
            accessibilityState={{ disabled: isDisabled }}
        >
            {loading ? (
                <ActivityIndicator color={computed.text} />
            ) : (
                <View style={styles.contentRow}>
                    {leftIcon ? <View style={styles.iconLeft}>{leftIcon}</View> : null}

                    <Text
                        numberOfLines={1}
                        style={[
                            styles.label,
                            size === "sm" ? styles.labelSm : styles.labelMd,
                            { color: computed.text },
                            textStyle,
                        ]}
                    >
                        {title}
                    </Text>

                    {rightIcon ? <View style={styles.iconRight}>{rightIcon}</View> : null}
                </View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        borderRadius: radius.md,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    fullWidth: {
        alignSelf: "stretch",
    },

    md: { height: 54 },
    sm: { height: 44, paddingHorizontal: 12, borderRadius: radius.sm },

    contentRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    label: {
        fontWeight: "600",
    },
    labelMd: {
        fontSize: typography.fontSize.md,
    },
    labelSm: {
        fontSize: typography.fontSize.sm,
    },

    iconLeft: { marginRight: 10 },
    iconRight: { marginLeft: 10 },
});

export const AppButton = memo(AppButtonBase);
