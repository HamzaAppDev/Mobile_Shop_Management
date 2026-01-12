import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { space } from "@/design/tokens";
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
  padded?: boolean; // default true
  paddingHorizontal?: number; // default 16
  paddingVertical?: number; // default 12

  // Scrolling
  scroll?: boolean; // default false
  scrollProps?: ScrollViewProps;

  // Pull to refresh
  refreshing?: boolean;
  onRefresh?: () => void;

  // Keyboard
  keyboardAvoiding?: boolean; // default false

  // Styling
  style?: ViewStyle;
  contentStyle?: ViewStyle;

  // Background
  backgroundVariant?: "background" | "surface";

  // Optional header slot (keeps Screen flexible but not forced)
  header?: React.ReactNode;
  floating?: React.ReactNode;
};

function AppScreenBase({
  children,
  padded = true,
  paddingHorizontal = 16,
  paddingVertical = 0,
  scroll = false,
  scrollProps,
  refreshing = false,
  onRefresh,
  keyboardAvoiding = false,
  style,
  contentStyle,
  backgroundVariant = "background",
  header,
  floating,
}: Props) {
  const { colors } = useAppTheme();

  const bg =
    backgroundVariant === "surface" ? colors.surface : colors.background;
  const containerPadding = padded
    ? { paddingHorizontal, paddingVertical }
    : null;

  const refreshControl = onRefresh ? (
    <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} />
  ) : undefined;

  const Body = scroll ? (
    <ScrollView
      {...scrollProps}
      keyboardShouldPersistTaps={
        scrollProps?.keyboardShouldPersistTaps ?? "handled"
      }
      showsVerticalScrollIndicator={
        scrollProps?.showsVerticalScrollIndicator ?? false
      }
      refreshControl={scrollProps?.refreshControl ?? refreshControl}
      contentContainerStyle={[
        styles.scrollContent,
        containerPadding,
        contentStyle,
      ]}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, containerPadding, contentStyle]}>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }, style]}>
      {header ? <View style={styles.headerWrap}>{header}</View> : null}
      <View style={styles.bodyWrap}>
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

        {floating ? <View style={styles.floating}>{floating}</View> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  headerWrap: {
    paddingHorizontal: space.lg,
    paddingTop: space.md,
  },
  kav: { flex: 1 },
  content: { flex: 1 },
  bodyWrap: { flex: 1, position: "relative" },
  scrollContent: { flexGrow: 1 },
  floating: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    // pointerEvents so taps go through where no button exists
    pointerEvents: "box-none",
  },
});

export const AppScreen = memo(AppScreenBase);
