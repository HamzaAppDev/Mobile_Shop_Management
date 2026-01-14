import { AppInput, AppText } from "@/components";
import { useAppTheme } from "@/design/theme";
import { radius, space } from "@/design/tokens";
import { Ionicons } from "@expo/vector-icons";
import React, { memo, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import type { SalesItemOption } from "./salesFilterSheet.model";

type Props = {
  query: string;
  onChangeQuery: (v: string) => void;

  items: SalesItemOption[];
  selectedId: string;
  onSelect: (id: string) => void;
};

function SalesItemPickerBase({
  query,
  onChangeQuery,
  items,
  selectedId,
  onSelect,
}: Props) {
  const { colors } = useAppTheme();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (x) =>
        x.title.toLowerCase().includes(q) ||
        x.subtitle.toLowerCase().includes(q)
    );
  }, [query, items]);

  return (
    <View>
      <AppInput
        placeholder="Search item..."
        value={query}
        onChangeText={onChangeQuery}
        rightIcon={<Ionicons name="search" size={18} color={colors.muted} />}
      />

      <View style={{ height: space.md }} />

      <View style={[styles.listWrap, { borderColor: colors.border }]}>
        {filtered.map((it) => (
          <ItemRow
            key={it.id}
            title={it.title}
            subtitle={it.subtitle}
            active={selectedId === it.id}
            onPress={() => onSelect(it.id)}
          />
        ))}
      </View>
    </View>
  );

  function ItemRow({
    title,
    subtitle,
    active,
    onPress,
  }: {
    title: string;
    subtitle: string;
    active: boolean;
    onPress: () => void;
  }) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.row,
          {
            backgroundColor: active ? "rgba(47,128,237,0.08)" : "transparent",
            borderColor: active ? colors.primary : "transparent",
          },
          pressed && { opacity: 0.92 },
        ]}
      >
        <View style={styles.left}>
          <View
            style={[
              styles.iconBox,
              {
                backgroundColor: active
                  ? "rgba(47,128,237,0.15)"
                  : colors.background,
              },
            ]}
          >
            <Ionicons
              name={
                title === "All Items"
                  ? "albums-outline"
                  : "phone-portrait-outline"
              }
              size={18}
              color={active ? colors.primary : colors.muted}
            />
          </View>

          <View style={{ flex: 1 }}>
            <AppText style={{ fontWeight: "800", color: colors.text }}>
              {title}
            </AppText>
            <AppText variant="muted" style={{ marginTop: 2 }}>
              {subtitle}
            </AppText>
          </View>
        </View>

        <Ionicons
          name={active ? "checkmark-circle" : "ellipse-outline"}
          size={20}
          color={active ? colors.primary : colors.border}
        />
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  listWrap: {
    borderWidth: 1,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  row: {
    borderWidth: 1,
    borderRadius: radius.md,
    margin: space.sm,
    padding: space.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    flex: 1,
    paddingRight: space.md,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const SalesItemPicker = memo(SalesItemPickerBase);
