import {
  AppHeader,
  AppScreen,
  RecordsToolbar,
  type ToolbarChip,
} from "@/components";
import { useAppTheme } from "@/design/theme";
import { space } from "@/design/tokens";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  SaleRow,
  type SaleRowItem,
  SalesFilterSheet,
  type SalesPreset,
} from "../components";
import { SalesFilterChipsRow } from "../components/SalesFilterChipsRow";

const SALES_PRESETS: ToolbarChip<SalesPreset>[] = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
];

type Payment = "All" | "Cash" | "Online" | "Udhar";

const PAYMENT_CHIPS: ToolbarChip<Payment>[] = [
  { key: "All", label: "All" },
  { key: "Cash", label: "Cash" },
  { key: "Online", label: "Online" },
  { key: "Udhar", label: "Udhar" },
];

export function SalesScreen() {
  const { colors } = useAppTheme();

  const sheetRef = useRef<BottomSheetModal | null>(null);

  const openFilters = useCallback(() => {
    sheetRef.current?.present();
  }, []);

  const [preset, setPreset] = useState<SalesPreset>("today");
  const [query, setQuery] = useState("");

  const [filters, setFilters] = useState<{ payment: Payment }>({
    payment: "All",
  });

  const data = useMemo<SaleRowItem[]>(
    () => [
      {
        id: "1",
        title: "iPhone 13 Cover",
        qty: 1,
        amount: 450,
        payment: "Cash",
        timeLabel: "1 Min Ago",
        statusLabel: "Paid",
      },
      {
        id: "2",
        title: "Screen Guard",
        qty: 1,
        amount: 150,
        payment: "Online",
        timeLabel: "20 Minutes Ago",
        statusLabel: "Paid",
      },
      {
        id: "3",
        title: "Kara Bulb",
        qty: 4,
        amount: 400,
        payment: "Udhar",
        timeLabel: "1 Hour Ago",
        statusLabel: "Pending",
      },
      {
        id: "4",
        title: "Samsung Charger",
        qty: 2,
        amount: 900,
        payment: "Online",
        timeLabel: "Today",
        statusLabel: "Paid",
      },
      {
        id: "5",
        title: "Repair Service",
        qty: 1,
        amount: 1200,
        payment: "Cash",
        timeLabel: "Today",
        statusLabel: "Paid",
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter((x) => {
      const matchQuery = !q || x.title.toLowerCase().includes(q);
      const matchPayment =
        filters.payment === "All" || x.payment === filters.payment;
      return matchQuery && matchPayment;
    });
  }, [data, filters.payment, query]);

  const onPressFilterChip = useCallback((key: Payment) => {
    setFilters((p) => ({ ...p, payment: key }));
  }, []);

  return (
    <AppScreen
      padded
      scroll={false}
      paddingHorizontal={space.lg}
      header={<AppHeader title="Sales Records" showBack />}
      contentStyle={{ paddingTop: space.md }}
    >
      <RecordsToolbar<SalesPreset, Payment>
        presets={SALES_PRESETS}
        presetValue={preset}
        onChangePreset={setPreset}
        query={query}
        onChangeQuery={setQuery}
        onPressFilter={openFilters}
        chips={PAYMENT_CHIPS}
        chipValue={filters.payment}
        onChangeChip={(k) => setFilters((p) => ({ ...p, payment: k }))}
      />

      <SalesFilterChipsRow
        value={filters.payment}
        onChange={onPressFilterChip}
      />

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <SaleRow item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: space.sm }} />}
        contentContainerStyle={[styles.listContent, { paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      />

      <SalesFilterSheet
        sheetRef={sheetRef}
        onApply={(f) => console.log("Apply sales filters:", f)}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  listContent: { paddingTop: space.md },
});
