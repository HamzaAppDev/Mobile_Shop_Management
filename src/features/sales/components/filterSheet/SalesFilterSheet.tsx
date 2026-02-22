import { AppButton, AppDivider, AppText } from "@/components";
import { useAppTheme } from "@/design/theme";
import { space } from "@/design/tokens";
import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { memo, useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  DEFAULT_SALES_FILTERS,
  cloneSalesFilters,
  type SalesFilters,
} from "./salesFilterSheet.model";

export type SalesFilterSheetProps = {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  initial?: SalesFilters;
  onApply: (filters: SalesFilters) => void;
};

function SalesFilterSheetBase({
  sheetRef,
  initial = DEFAULT_SALES_FILTERS,
  onApply,
}: SalesFilterSheetProps) {
  const { colors } = useAppTheme();

  const snapPoints = useMemo(() => ["88%"], []);

  // local draft state (sheet editing)
  const [draft, setDraft] = useState<SalesFilters>(() =>
    cloneSalesFilters(initial)
  );

  const close = useCallback(() => {
    sheetRef.current?.dismiss();
  }, [sheetRef]);

  const onPressReset = useCallback(() => {
    setDraft(cloneSalesFilters(DEFAULT_SALES_FILTERS));
  }, []);

  const onPressApply = useCallback(() => {
    onApply(cloneSalesFilters(draft));
    close();
  }, [close, draft, onApply]);

  const Backdrop = useCallback(
    (p: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...p}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={Backdrop}
      backgroundStyle={{ backgroundColor: colors.surface }}
      handleIndicatorStyle={{ backgroundColor: colors.divider }}
      onDismiss={() => {
        // optional: keep draft as-is OR reset to initial when closed
        // setDraft(cloneSalesFilters(initial));
      }}
    >
      {/* ✅ BottomSheetView MUST be inside BottomSheetModal */}
      <BottomSheetView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <AppText style={[styles.title, { color: colors.text }]}>
            Filters
          </AppText>

          <View style={styles.headerActions}>
            <AppText
              onPress={onPressReset}
              style={[styles.resetText, { color: colors.primary }]}
            >
              Reset
            </AppText>

            <AppText
              onPress={close}
              style={[styles.closeText, { color: colors.muted }]}
            >
              Close
            </AppText>
          </View>
        </View>

        <AppDivider />

        {/* Body (for now placeholder — you will add date/payment/customer pickers here) */}
        <View style={{ paddingTop: space.lg }}>
          <AppText variant="muted" style={{ marginBottom: space.sm }}>
            Coming next: Date range, Payment type, Customer, Amount range…
          </AppText>

          {/* Example: show draft state */}
          <View style={[styles.debugBox, { borderColor: colors.border }]}>
            <AppText variant="muted">Draft:</AppText>
            <AppText style={{ marginTop: 4 }}>
              preset: {draft.preset ?? "—"} | payment: {draft.payment ?? "—"}
            </AppText>
          </View>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { borderTopColor: colors.divider }]}>
          <AppButton title="Apply Filters" onPress={onPressApply} />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: space.lg,
    paddingTop: space.md,
    flex: 1,
  },

  header: {
    paddingBottom: space.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
  },
  headerActions: {
    flexDirection: "row",
    gap: space.md,
    alignItems: "center",
  },
  resetText: {
    fontWeight: "800",
  },
  closeText: {
    fontWeight: "700",
  },

  debugBox: {
    marginTop: space.md,
    borderWidth: 1,
    borderRadius: 14,
    padding: space.md,
  },

  footer: {
    marginTop: "auto",
    paddingTop: space.md,
    paddingBottom: space.md,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

export const SalesFilterSheet = memo(SalesFilterSheetBase);
