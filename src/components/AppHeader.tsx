import { AppText } from "@/components/AppText";
import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { radius } from "@/design/tokens/radius";
import { useNavigation } from "@react-navigation/native";
import React, { memo, useCallback } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";

export type AppHeaderProps = {
    title: string;
    subtitle?: string;
    showBack?: boolean;
    onBackPress?: () => void;
    right?: React.ReactNode;
    containerStyle?: ViewStyle;
    // If want header to sit on surface (card-like) instead of background
    variant?: "background" | "surface";
};

function AppHeaderBase({
    title,
    subtitle,
    showBack = true,
    onBackPress,
    right,
    containerStyle,
    variant = "background",
}: AppHeaderProps) {
    const { colors } = useAppTheme();
    const navigation = useNavigation();

    const handleBack = useCallback(() => {
        if (onBackPress) return onBackPress();
        if (navigation.canGoBack()) navigation.goBack();
    }, [navigation, onBackPress]);

    const bg = variant === "surface" ? colors.surface : colors.background;
    const border = variant === "surface" ? colors.border : "transparent";

    return (
        <View style={[styles.wrap, { backgroundColor: bg, borderColor: border }, containerStyle]}>
            <View style={styles.row}>
                <View style={styles.left}>
                    {showBack ? (
                        <Pressable
                            onPress={handleBack}
                            hitSlop={12}
                            style={({ pressed }) => [
                                styles.backBtn,
                                { backgroundColor: variant === "surface" ? colors.background : "transparent" },
                                pressed && { opacity: 0.7 },
                            ]}
                            accessibilityRole="button"
                            accessibilityLabel="Back"
                        >
                            <AppText style={{ fontSize: 22, fontWeight: "700", color: colors.text }}>‹</AppText>
                        </Pressable>
                    ) : (
                        <View style={styles.backSpacer} />
                    )}
                </View>

                <View style={styles.center}>
                    <AppText variant="subtitle" numberOfLines={1} style={styles.centerText}>
                        {title}
                    </AppText>
                    {subtitle ? (
                        <AppText variant="muted" numberOfLines={1} style={[styles.centerText, { marginTop: 2 }]}>
                            {subtitle}
                        </AppText>
                    ) : null}
                </View>

                <View style={styles.right}>{right ? right : <View style={styles.rightSpacer} />}</View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1, // looks good for surface header; transparent border for background
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    left: { width: 56, alignItems: "flex-start" },
    center: { flex: 1, alignItems: "center" },
    right: { width: 56, alignItems: "flex-end" },

    backBtn: {
        width: 40,
        height: 40,
        borderRadius: radius.md,
        alignItems: "center",
        justifyContent: "center",
    },
    backSpacer: { width: 40, height: 40 },
    rightSpacer: { width: 40, height: 40 },

    centerText: { textAlign: "center" },
});

export const AppHeader = memo(AppHeaderBase);
