import { AppInput } from "@/components";
import { useAppTheme } from "@/design/theme";
import { radius, space } from "@/design/tokens";
import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  onPressFilter?: () => void;
};

function SalesSearchRowBase({ value, onChangeText, onPressFilter }: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <AppInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search items..."
          returnKeyType="search"
          rightIcon={<Ionicons name="search" size={18} color={colors.muted} />}
        />
      </View>

      <Pressable
        onPress={onPressFilter}
        hitSlop={10}
        style={({ pressed }) => [
          styles.filterBtn,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            opacity: pressed ? 0.85 : 1,
          },
        ]}
      >
        <Ionicons name="options-outline" size={18} color={colors.muted} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: space.md,
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
  },
  filterBtn: {
    width: 44,
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const SalesSearchRow = memo(SalesSearchRowBase);
