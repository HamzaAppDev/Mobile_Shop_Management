import { AppText } from "@/components";
import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { space } from "@/design/tokens";
import { radius } from "@/design/tokens/radius";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  onPress: () => void;
};

function FingerprintActionBase({ onPress }: Props) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      style={({ pressed }) => [
        styles.wrap,
        {
          borderColor: colors.border,
          backgroundColor: colors.surface,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel="Use fingerprint"
    >
      <View style={styles.row}>
        <MaterialCommunityIcons
          name="fingerprint"
          size={22}
          color={colors.primary}
        />
        <AppText style={styles.text}>Use fingerprint</AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: "center",
    paddingHorizontal: space.lg,
    paddingVertical: space.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    marginTop: space.lg,
  },
  row: { flexDirection: "row", alignItems: "center", gap: space.sm },
  text: { fontWeight: "600" },
});

export const FingerprintAction = memo(FingerprintActionBase);
