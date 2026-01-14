import { AppText } from "@/components";
import { useAppTheme } from "@/design/theme";
import { radius, space } from "@/design/tokens";
import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { formatDate } from "./salesFilterSheet.model";

type Props = {
  from: Date | null;
  to: Date | null;
  onPressFrom: () => void;
  onPressTo: () => void;
};

function SalesDateButtonsRowBase({ from, to, onPressFrom, onPressTo }: Props) {
  return (
    <View style={styles.row}>
      <DateButton
        label={from ? formatDate(from) : "From Date"}
        onPress={onPressFrom}
      />
      <DateButton label={to ? formatDate(to) : "To Date"} onPress={onPressTo} />
    </View>
  );
}

function DateButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: colors.background, borderColor: colors.border },
        pressed && { opacity: 0.9 },
      ]}
    >
      <Ionicons name="calendar-outline" size={18} color={colors.primary} />
      <AppText style={{ color: colors.text, fontWeight: "700" }}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: space.md,
    marginTop: space.md,
  },
  btn: {
    flex: 1,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: space.md,
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
  },
});

export const SalesDateButtonsRow = memo(SalesDateButtonsRowBase);
