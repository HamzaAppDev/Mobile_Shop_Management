import { AppText } from "@/components";
import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { radius } from "@/design/tokens/radius";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Pressable, StyleSheet } from "react-native";

type Props = {
  label?: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
};

function KeyBase({ label, icon, onPress }: Props) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [
        styles.key,
        { backgroundColor: colors.surface, opacity: pressed ? 0.7 : 1 },
      ]}
      accessibilityRole="button"
      accessibilityLabel={label ?? "Backspace"}
    >
      {label ? (
        <AppText style={styles.text}>{label}</AppText>
      ) : (
        <MaterialCommunityIcons name={icon!} size={22} color={colors.text} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  key: {
    width: 72,
    height: 72,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontSize: 22, fontWeight: "700" },
});

export const Key = memo(KeyBase);
