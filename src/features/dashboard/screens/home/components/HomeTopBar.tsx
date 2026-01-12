import { AppText } from "@/components";
import { useAppTheme } from "@/design/theme";
import { radius, space } from "@/design/tokens";
import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  shopName: string;
  onPressSettings?: () => void;
};

function HomeTopBarBase({ shopName, onPressSettings }: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.row}>
      <View style={[styles.avatar, { backgroundColor: colors.border }]} />

      <View style={styles.titleWrap}>
        <AppText variant="muted" style={styles.sub}>
          Welcome
        </AppText>
        <AppText style={styles.title}>{shopName}</AppText>
      </View>

      <Pressable
        onPress={onPressSettings}
        hitSlop={10}
        style={({ pressed }) => [
          styles.iconBtn,
          { backgroundColor: colors.surface, borderColor: colors.border },
          pressed && { opacity: 0.75 },
        ]}
      >
        <Ionicons name="settings-outline" size={18} color={colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    marginTop: space.md,
    marginBottom: space.lg,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
  },
  titleWrap: { flex: 1 },
  sub: { fontSize: 11, fontWeight: "700" },
  title: { fontSize: 16, fontWeight: "800" },
  sub2: { fontSize: 12, marginTop: 2 },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const HomeTopBar = memo(HomeTopBarBase);
