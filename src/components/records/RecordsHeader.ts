import { AppChip, AppInput, AppText } from "@/components";
import { useAppTheme } from "@/design/theme";
import { radius, space } from "@/design/tokens";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { memo, useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export type RecordsHeaderPreset = {
  key: string;
  label: string;
};

export type RecordsHeaderFilterChip = {
  key: string;
  label: string;
};

type Props = {
  title: string;

  // Presets row (Today, Yesterday...)
  presets: RecordsHeaderPreset[];
  presetValue: string;
  onChangePreset: (key: string) => void;

  // Search
  query: string;
  onChangeQuery: (t: string) => void;
  searchPlaceholder?: string;

  // Filter button (opens bottom sheet)
  onPressFilter?: () => void;

  // Optional second chip row (All/Cash... OR categories...)
  filterChips?: RecordsHeaderFilterChip[];
  filterChipValue?: string;
  onChangeFilterChip?: (key: string) => void;

  // Back
  showBack?: boolean;
};

function RecordsHeaderBase({
  title,
  presets,
  presetValue,
  onChangePreset,
  query,
  onChangeQuery,
  searchPlaceholder = "Search items...",
  onPressFilter,
  filterChips,
  filterChipValue,
  onChangeFilterChip,
  showBack = true,
}: Props) {
  const { colors } = useAppTheme();
  const nav = useNavigation();

  const onBack = useCallback(() => {
    if (nav.canGoBack()) nav.goBack();
  }, [nav]);

  return (
    <View style={styles.wrap}>
      {/* Title Row */}
      <View style={styles.titleRow}>
        {showBack ? (
          <Pressable
            onPress={onBack}
            hitSlop={12}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          >
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </Pressable>
        ) : (
          <View style={{ width: 22 }} />
        )}

        <AppText
          style={[styles.title, { color: colors.text }]}
          numberOfLines={1}
        >
          {title}
        </AppText>

        <View style={{ width: 22 }} />
      </View>

      {/* Presets Row */}
      <View style={styles.presetRow}>
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

      {/* Search + Filter button */}
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

      {/* Optional filter chip row */}
      {filterChips?.length ? (
        <View style={styles.filterRow}>
          {filterChips.map((c) => (
            <AppChip
              key={c.key}
              label={c.label}
              size="sm"
              active={filterChipValue === c.key}
              onPress={() => onChangeFilterChip?.(c.key)}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: space.lg,
    paddingTop: space.md,
    paddingBottom: space.sm,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: space.md,
  },
  title: {
    fontSize: 14,
    fontWeight: "900",
  },

  presetRow: {
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
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  filterRow: {
    marginTop: space.sm,
    flexDirection: "row",
    gap: space.sm,
    flexWrap: "wrap",
  },
});

export const RecordsHeader = memo(RecordsHeaderBase);
