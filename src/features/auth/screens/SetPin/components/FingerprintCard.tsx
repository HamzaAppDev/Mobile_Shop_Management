import { AppCard, AppText } from "@/components";
import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { space } from "@/design/tokens";
import { radius } from "@/design/tokens/radius";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  enabled: boolean;
  onToggle: () => void;
};

function FingerprintCardBase({ enabled, onToggle }: Props) {
  const { colors } = useAppTheme();

  return (
    <AppCard style={styles.card}>
      <View style={styles.row}>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name="fingerprint"
            size={22}
            color={colors.primary}
          />
        </View>

        <View style={{ flex: 1 }}>
          <AppText style={{ fontWeight: "600" }}>Use fingerprint</AppText>
          <AppText variant="muted">Quick unlock</AppText>
        </View>

        <Pressable
          onPress={onToggle}
          hitSlop={10}
          accessibilityRole="switch"
          accessibilityState={{ checked: enabled }}
          style={[
            styles.toggle,
            { backgroundColor: enabled ? colors.primary : colors.border },
          ]}
        >
          <View
            style={[
              styles.knob,
              {
                transform: [{ translateX: enabled ? 18 : 0 }],
                backgroundColor: colors.surface,
              },
            ]}
          />
        </Pressable>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: { padding: space.md },
  row: { flexDirection: "row", alignItems: "center" },
  icon: { marginRight: space.md },

  toggle: {
    width: 42,
    height: 24,
    borderRadius: radius.full,
    padding: 3,
    justifyContent: "center",
  },
  knob: {
    width: 18,
    height: 18,
    borderRadius: radius.full,
  },
});

export const FingerprintCard = memo(FingerprintCardBase);
