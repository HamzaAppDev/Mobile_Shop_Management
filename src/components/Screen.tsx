import { useAppTheme } from "@/design/theme/AppThemeProvider";
import React, { memo } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
    ScrollView,
    StyleSheet,
    View,
    type ScrollViewProps,
    type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    children: React.ReactNode;

    // Layout
    padded?: boolean;             // default true
    paddingHorizontal?: number;   // default 16
    paddingVertical?: number;     // default 12

    // Scrolling
    scroll?: boolean;             // default false
    scrollProps?: ScrollViewProps;

    // Pull to refresh
    refreshing?: boolean;
    onRefresh?: () => void;

    // Keyboard
    keyboardAvoiding?: boolean;   // default false

    // Styling
    style?: ViewStyle;
    contentStyle?: ViewStyle;

    // Background
    backgroundVariant?: "background" | "surface";

    // Optional header slot (keeps Screen flexible but not forced)
    header?: React.ReactNode;
};

function AppScreenBase({
    children,
    padded = true,
    paddingHorizontal = 16,
    paddingVertical = 12,
    scroll = false,
    scrollProps,
    refreshing = false,
    onRefresh,
    keyboardAvoiding = false,
    style,
    contentStyle,
    backgroundVariant = "background",
    header,
}: Props) {
    const { colors } = useAppTheme();

    const bg = backgroundVariant === "surface" ? colors.surface : colors.background;
    const containerPadding = padded ? { paddingHorizontal, paddingVertical } : null;

    const refreshControl =
        onRefresh ? <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} /> : undefined;

    const Body = scroll ? (
        <ScrollView
            {...scrollProps}
            keyboardShouldPersistTaps={scrollProps?.keyboardShouldPersistTaps ?? "handled"}
            showsVerticalScrollIndicator={scrollProps?.showsVerticalScrollIndicator ?? false}
            refreshControl={scrollProps?.refreshControl ?? refreshControl}
            contentContainerStyle={[styles.scrollContent, containerPadding, contentStyle]}
        >
            {children}
        </ScrollView>
    ) : (
        <View style={[styles.content, containerPadding, contentStyle]}>{children}</View>
    );

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: bg }, style]}>
            {header ? <View style={styles.headerWrap}>{header}</View> : null}

            {keyboardAvoiding ? (
                <KeyboardAvoidingView
                    style={styles.kav}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    {Body}
                </KeyboardAvoidingView>
            ) : (
                Body
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    headerWrap: {
        // keep header separate from padding so header layout stays consistent
    },
    kav: { flex: 1 },
    content: { flex: 1 },
    scrollContent: { flexGrow: 1 },
});

export const AppScreen = memo(AppScreenBase);
