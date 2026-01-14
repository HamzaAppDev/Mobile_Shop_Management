import { AppChip, AppInput } from "@/components";
import { useAppTheme } from "@/design/theme";
import { space } from "@/design/tokens";
import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export type ToolbarChip<T extends string = string> = {
  key: T;
  label: string;
};

export type RecordsToolbarProps<P extends string, C extends string> = {
  presets: ToolbarChip<P>[];
  presetValue: P;
  onChangePreset: (k: P) => void;

  query: string;
  searchPlaceholder?: string; // ✅ keep it
  onChangeQuery: (t: string) => void;
  onPressFilter?: () => void;

  chips?: ToolbarChip<C>[];
  chipValue?: C;
  onChangeChip?: (k: C) => void;

  activeFilterLabel?: string;
  onClearActiveFilter?: () => void;
};

function RecordsToolbarBase<P extends string, C extends string>({
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
}: RecordsToolbarProps<P, C>) {
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
          accessibilityRole="button"
          accessibilityLabel="Filters"
        >
          <Ionicons name="options-outline" size={18} color={colors.muted} />
        </Pressable>
      </View>

      {!!chips?.length && (
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
      )}

      {!!activeFilterLabel && (
        <View style={{ marginTop: space.sm }}>
          <AppChip
            label={activeFilterLabel}
            size="sm"
            variant="filled"
            rightIcon="close"
            onRemove={onClearActiveFilter}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingBottom: space.sm },
  row: { flexDirection: "row", gap: space.sm, flexWrap: "wrap" },
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

/**
 * We export with an explicit generic call signature.
 */
type RecordsToolbarComponent = <P extends string, C extends string>(
  props: RecordsToolbarProps<P, C>
) => React.ReactElement;

export const RecordsToolbar = memo(
  RecordsToolbarBase
) as unknown as RecordsToolbarComponent;
