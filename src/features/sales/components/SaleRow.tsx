import { AppChip, AppText } from "@/components";
import { useAppTheme } from "@/design/theme";
import { radius, space } from "@/design/tokens";
import React, { memo, useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";

export type SaleRowItem = {
  id: string;
  title: string;
  qty: number;
  amount: number;
  payment: "Cash" | "Online" | "Udhar";
  timeLabel: string;
  statusLabel: "Paid" | "Pending";
  imageUrl?: string;
};

type Props = { item: SaleRowItem };

function formatRs(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function SaleRowBase({ item }: Props) {
  const { colors } = useAppTheme();

  const status = useMemo(() => {
    if (item.statusLabel === "Paid") {
      return {
        bg: colors.successMuted,
        color: colors.success,
        label: "Paid",
      };
    }
    return {
      bg: colors.dangerMuted,
      color: colors.danger,
      label: "Pending",
    };
  }, [colors.danger, colors.dangerMuted, colors.success, colors.successMuted, item.statusLabel]);

  const paymentChip = useMemo(() => {
    if (item.payment === "Cash")
      return { bg: colors.successMuted, color: colors.success };
    if (item.payment === "Online")
      return { bg: colors.primaryMuted, color: colors.primary };
    return { bg: colors.warningMuted, color: colors.warning };
  }, [colors.primary, colors.primaryMuted, colors.success, colors.successMuted, colors.warning, colors.warningMuted, item.payment]);

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <View style={styles.row}>
        <View style={[styles.thumb, { backgroundColor: colors.divider }]}>
          {item.imageUrl ? (
            <Image source={{ uri: item.imageUrl }} style={styles.thumbImg} />
          ) : null}
        </View>

        <View style={{ flex: 1 }}>
          <AppText
            style={[styles.title, { color: colors.text }]}
            numberOfLines={1}
          >
            {item.title}
          </AppText>
          <AppText variant="muted" style={styles.meta}>
            Qty: {item.qty} • {item.timeLabel}
          </AppText>
        </View>

        <View style={styles.right}>
          <AppText style={[styles.amount, { color: colors.success }]}>
            {formatRs(item.amount)}
          </AppText>
          <AppText variant="muted" style={styles.tax}>
            + tax
          </AppText>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <AppChip
          label={item.payment}
          active
          variant="filled"
          size="sm"
          style={{
            backgroundColor: paymentChip.bg,
            borderColor: "transparent",
          }}
        />

        <View style={{ flex: 1 }} />

        <AppChip
          label={status.label}
          active
          variant="filled"
          size="sm"
          style={{ backgroundColor: status.bg, borderColor: "transparent" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: space.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
  },
  thumb: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    overflow: "hidden",
  },
  thumbImg: { width: "100%", height: "100%" },
  title: { fontSize: 13, fontWeight: "800" },
  meta: { marginTop: 2, fontSize: 11 },
  right: { alignItems: "flex-end" },
  amount: { fontSize: 13, fontWeight: "900" },
  tax: { fontSize: 11, marginTop: 2 },

  bottomRow: {
    marginTop: space.md,
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
  },
});

export const SaleRow = memo(SaleRowBase);
