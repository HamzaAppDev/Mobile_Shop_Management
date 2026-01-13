import { AppText } from "@/components";
import { useAppTheme } from "@/design/theme";
import { space } from "@/design/tokens";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { memo, useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = { title: string };

function SalesHeaderBase({ title }: Props) {
  const { colors } = useAppTheme();
  const nav = useNavigation();

  const onBack = useCallback(() => {
    if (nav.canGoBack()) nav.goBack();
  }, [nav]);

  return (
    <View style={styles.wrap}>
      <Pressable
        onPress={onBack}
        hitSlop={12}
        style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
      >
        <Ionicons name="chevron-back" size={22} color={colors.text} />
      </Pressable>

      <AppText style={[styles.title, { color: colors.text }]} numberOfLines={1}>
        {title}
      </AppText>

      <View style={{ width: 22 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: space.lg,
    paddingTop: space.md,
    paddingBottom: space.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontWeight: "800",
  },
});

export const SalesHeader = memo(SalesHeaderBase);
