import { AppButton, AppDivider, AppText } from "@/components";
import { useAppTheme } from "@/design/theme";
import { radius, space } from "@/design/tokens";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { CategoryRow } from "./CategoryRow";
import {
  DEFAULT_EXPENSE_FILTERS,
  type DatePreset,
  type ExpenseFilters,
  cloneFilters,
} from "./expenseFilters.model";
import { FilterChip } from "./FilterChip";

type Props = {
  initial?: ExpenseFilters;
  onApply?: (filters: ExpenseFilters) => void;
  onClear?: () => void;
};

function ExpenseFilterSheetBase({ initial, onApply, onClear }: Props) {
  const { colors, mode } = useAppTheme();
  const ref = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["85%"], []);
  const [draft, setDraft] = useState<ExpenseFilters>(() =>
    cloneFilters(initial ?? DEFAULT_EXPENSE_FILTERS)
  );

  const [categoryQuery, setCategoryQuery] = useState("");

  const open = useCallback(() => {
    setDraft(cloneFilters(initial ?? DEFAULT_EXPENSE_FILTERS));
    ref.current?.present();
  }, [initial]);

  const close = useCallback(() => {
    Keyboard.dismiss();
    ref.current?.dismiss();
  }, []);

  const setPreset = useCallback((p: DatePreset) => {
    setDraft((s) => ({ ...s, preset: p }));
  }, []);

  const apply = useCallback(() => {
    onApply?.(draft);
    close();
  }, [close, draft, onApply]);

  const clearAll = useCallback(() => {
    setDraft(cloneFilters(DEFAULT_EXPENSE_FILTERS));
    onClear?.();
  }, [onClear]);

  const Backdrop = useCallback(
    (p: any) => (
      <BottomSheetBackdrop
        {...p}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.45}
      />
    ),
    []
  );

  return (
    <>
      {/* You will call open() from Expenses screen. Export open via ref OR render a button outside. */}
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={Backdrop}
        backgroundStyle={{ backgroundColor: colors.surface }}
        handleIndicatorStyle={{ backgroundColor: colors.divider }}
      >
        <BottomSheetView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <AppText variant="subtitle" style={{ fontWeight: "800" }}>
              Filter Expenses
            </AppText>
            <AppText
              variant="link"
              onPress={close}
              style={{ fontWeight: "800" }}
            >
              ✕
            </AppText>
          </View>

          <AppDivider />

          {/* Date Range */}
          <View style={styles.section}>
            <AppText style={styles.sectionTitle}>Date Range</AppText>

            <View style={styles.chipsRow}>
              <FilterChip
                label="This Week"
                active={draft.preset === "week"}
                onPress={() => setPreset("week")}
              />
              <FilterChip
                label="Today"
                active={draft.preset === "today"}
                onPress={() => setPreset("today")}
              />
              <FilterChip
                label="Yesterday"
                active={draft.preset === "yesterday"}
                onPress={() => setPreset("yesterday")}
              />
              <FilterChip
                label="This Month"
                active={draft.preset === "month"}
                onPress={() => setPreset("month")}
              />
            </View>

            {/* NOTE: Date inputs (From/To) can be added later using a date picker.
                For now we keep design-only like your plan. */}
            <View style={styles.dateRow}>
              <View
                style={[
                  styles.dateBox,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                  },
                ]}
              >
                <AppText variant="muted" style={styles.dateLabel}>
                  From
                </AppText>
                <AppText style={{ fontWeight: "700" }}>Oct 20, 2023</AppText>
              </View>

              <View
                style={[
                  styles.dateBox,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                  },
                ]}
              >
                <AppText variant="muted" style={styles.dateLabel}>
                  To
                </AppText>
                <AppText
                  style={{ fontWeight: "700", color: colors.placeholder }}
                >
                  To Date
                </AppText>
              </View>
            </View>
          </View>

          <AppDivider />

          {/* Category */}
          <View style={styles.section}>
            <AppText style={styles.sectionTitle}>Category</AppText>

            <View
              style={[
                styles.searchWrap,
                {
                  backgroundColor:
                    mode === "dark" ? "rgba(255,255,255,0.06)" : "#F2F4F8",
                  borderColor: colors.border,
                },
              ]}
            >
              <BottomSheetTextInput
                value={categoryQuery}
                onChangeText={setCategoryQuery}
                placeholder="Search category..."
                placeholderTextColor={colors.placeholder}
                style={[styles.searchInput, { color: colors.text }]}
              />
            </View>

            <View style={{ gap: space.md, marginTop: space.md }}>
              <CategoryRow title="All Categories" selected />
              <CategoryRow title="Lunch" iconName="food-outline" />
              <CategoryRow title="Electricity" iconName="flash-outline" />
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <AppButton
              title="Clear All"
              variant="outline"
              onPress={clearAll}
              fullWidth={false}
              style={{ flex: 1 }}
            />
            <AppButton
              title="Apply Filters ✓"
              variant="primary"
              onPress={apply}
              fullWidth={false}
              style={{ flex: 1 }}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>

      {/* expose open in a simple way for now */}
      {/* Example usage:
          <ExpenseFilterSheet refApi={(api)=>...} />
          But easiest: you can export open() from parent with ref (next step). */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: space.lg,
    paddingTop: space.md,
    paddingBottom: space.lg,
    gap: space.md,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: space.sm,
  },

  section: {
    gap: space.md,
  },
  sectionTitle: {
    fontWeight: "800",
    fontSize: 13,
  },

  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: space.sm,
  },

  dateRow: {
    flexDirection: "row",
    gap: space.md,
  },
  dateBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    minHeight: 56,
    justifyContent: "center",
  },
  dateLabel: {
    fontSize: 11,
    marginBottom: 4,
  },

  searchWrap: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: space.md,
    height: 44,
    justifyContent: "center",
  },
  searchInput: {
    fontSize: 15,
    fontWeight: "600",
  },

  footer: {
    flexDirection: "row",
    gap: space.md,
    marginTop: "auto",
    paddingTop: space.md,
  },
});

export const ExpenseFilterSheet = memo(ExpenseFilterSheetBase);
export type { ExpenseFilters };
