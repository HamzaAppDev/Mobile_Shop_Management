import { AppText } from "@/components/AppText";
import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { useNavigation } from "@react-navigation/native";
import React, { memo, useCallback } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";

export type AppHeaderProps = {
    title: string;
    subtitle?: string;
    showBack?: boolean;         // default true
    onBackPress?: () => void;   // override back behavior
    right?: React.ReactNode;    // e.g. settings icon, help icon
    containerStyle?: ViewStyle;
};

function AppHeaderBase({
    title,
    subtitle,
    showBack = true,
    onBackPress,
    right,
    containerStyle,
}: AppHeaderProps) {
    const { colors } = useAppTheme();
    const navigation = useNavigation();

    const handleBack = useCallback(() => {
        if (onBackPress) return onBackPress();
        if (navigation.canGoBack()) navigation.goBack();
    }, [navigation, onBackPress]);

    return (
        <View style={[styles.wrap, { backgroundColor: colors.background }, containerStyle]}>
            <View style={styles.row}>
                <View style={styles.left}>
                    {showBack ? (
                        <Pressable
                            onPress={handleBack}
                            hitSlop={12}
                            style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
                            accessibilityRole="button"
                            accessibilityLabel="Back"
                        >
                            {/* Simple back chevron using text (no icon deps). Replace later with vector icons */}
                            <AppText style={{ fontSize: 22, fontWeight: "700", color: colors.text }}>‹</AppText>
                        </Pressable>
                    ) : (
                        <View style={styles.backSpacer} />
                    )}
                </View>

                <View style={styles.center}>
                    <AppText variant="subtitle" numberOfLines={1} style={{ textAlign: "center" }}>
                        {title}
                    </AppText>
                    {subtitle ? (
                        <AppText variant="muted" numberOfLines={1} style={{ textAlign: "center", marginTop: 2 }}>
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
        paddingTop: 12,
        paddingBottom: 12,
        paddingHorizontal: 12,
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
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    backSpacer: { width: 40, height: 40 },
    rightSpacer: { width: 40, height: 40 },
});

export const AppHeader = memo(AppHeaderBase);
