import { AppText } from "@/components/AppText";
import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { space } from "@/design/tokens";
import { radius } from "@/design/tokens/radius";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { memo, useCallback } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type AppHeaderProps = {
  title: string;
  subtitle?: string;

  showBack?: boolean;
  onBackPress?: () => void;

  right?: React.ReactNode;
  containerStyle?: ViewStyle;

  // background = transparent-ish screen header
  // surface = card-like header
  variant?: "background" | "surface";

  // ✅ for your PIN screen: small nav header (like iOS)
  size?: "default" | "compact";
};

function AppHeaderBase({
  title,
  subtitle,
  showBack = true,
  onBackPress,
  right,
  containerStyle,
  variant = "background",
  size = "default",
}: AppHeaderProps) {
  const { colors } = useAppTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleBack = useCallback(() => {
    if (onBackPress) return onBackPress();
    if (navigation.canGoBack()) navigation.goBack();
  }, [navigation, onBackPress]);

  const bg = variant === "surface" ? colors.surface : colors.background;
  const borderColor = variant === "surface" ? colors.border : "transparent";

  const verticalPad = size === "compact" ? space.sm : space.md;

  return (
    <View
      style={[
        styles.wrap,
        {
          backgroundColor: bg,
          borderColor,
          paddingTop: insets.top + verticalPad, // ✅ safe area correct
          paddingBottom: verticalPad,
        },
        containerStyle,
      ]}
    >
      <View style={styles.row}>
        {/* Left */}
        <View style={styles.left}>
          {showBack ? (
            <Pressable
              onPress={handleBack}
              hitSlop={12}
              style={({ pressed }) => [
                styles.backBtn,
                pressed && { opacity: 0.6 },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Back"
            >
              <Ionicons name="chevron-back" size={26} color={colors.text} />
            </Pressable>
          ) : (
            <View style={styles.spacer} />
          )}
        </View>

        {/* Center */}
        <View style={styles.center}>
          <AppText numberOfLines={1} style={styles.title}>
            {title}
          </AppText>

          {subtitle ? (
            <AppText variant="muted" numberOfLines={1} style={styles.subtitle}>
              {subtitle}
            </AppText>
          ) : null}
        </View>

        {/* Right */}
        <View style={styles.right}>
          {right ? right : <View style={styles.spacer} />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: space.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: { width: 40, height: 40 },

  // ✅ match iOS style
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 2,
    textAlign: "center",
  },
});

export const AppHeader = memo(AppHeaderBase);
