import { AppChip, AppInput } from "@/components";
import { useAppTheme } from "@/design/theme";
import { space } from "@/design/tokens";
import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export type ToolbarChip = { key: string; label: string };

type Props = {
  presets: ToolbarChip[];
  presetValue: string;
  onChangePreset: (k: string) => void;

  query: string;
  onChangeQuery: (t: string) => void;
  searchPlaceholder?: string;

  onPressFilter?: () => void;

  // optional second row (payment, categories, etc)
  chips?: ToolbarChip[];
  chipValue?: string;
  onChangeChip?: (k: string) => void;

  // optional “active filter remove” chip (with cross)
  activeFilterLabel?: string;
  onClearActiveFilter?: () => void;
};

function RecordsToolbarBase({
  presets,
  presetValue,
  onChangePreset,
  query,
  onChangeQuery,
  searchPlaceholder = "Search...",
  onPressFilter,
  chips,
  chipValue,
  onChangeChip,
  activeFilterLabel,
  onClearActiveFilter,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        {presets.map((p) => (
          <AppChip
            key={p.key}
            label={p.label}
            size="sm"
            active={presetValue === p.key}
            onPress={() => onChangePreset(p.key)}
          />
        ))}
      </View>

      <View style={styles.searchRow}>
        <View style={{ flex: 1 }}>
          <AppInput
            value={query}
            onChangeText={onChangeQuery}
            placeholder={searchPlaceholder}
            rightIcon={
              <Ionicons name="search" size={18} color={colors.muted} />
            }
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

      {/* optional quick chips */}
      {chips?.length ? (
        <View style={styles.row2}>
          {chips.map((c) => (
            <AppChip
              key={c.key}
              label={c.label}
              size="sm"
              active={chipValue === c.key}
              onPress={() => onChangeChip?.(c.key)}
            />
          ))}
        </View>
      ) : null}

      {/* optional active filter chip with X */}
      {activeFilterLabel ? (
        <View style={{ marginTop: space.sm }}>
          <AppChip
            label={activeFilterLabel}
            size="sm"
            variant="solid"
            rightIcon="close"
            onRemove={onClearActiveFilter}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingBottom: space.sm,
  },
  row: {
    flexDirection: "row",
    gap: space.sm,
    flexWrap: "wrap",
  },
  searchRow: {
    marginTop: space.md,
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
  },
  filterBtn: {
    width: 44,
    height: 52,
    borderWidth: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  row2: {
    marginTop: space.sm,
    flexDirection: "row",
    gap: space.sm,
    flexWrap: "wrap",
  },
});

export const RecordsToolbar = memo(RecordsToolbarBase);
