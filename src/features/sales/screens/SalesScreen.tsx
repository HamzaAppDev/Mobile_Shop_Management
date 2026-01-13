import { AppHeader, AppScreen } from "@/components";
import { useAppTheme } from "@/design/theme";
import { space } from "@/design/tokens";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  SaleRow,
  SaleRowItem,
  SalesPreset,
  SalesPresetRow,
  SalesSearchRow,
} from "../components";
import { SalesFilterChipsRow } from "../components/SalesFilterChipsRow";

const SALES_PRESETS = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
];

const PAYMENT_CHIPS = [
  { key: "All", label: "All" },
  { key: "Cash", label: "Cash" },
  { key: "Online", label: "Online" },
  { key: "Udhar", label: "Udhar" },
];

export function SalesScreen() {
  const { colors } = useAppTheme();

  const [preset, setPreset] = useState<SalesPreset>("today");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    payment: "All" as "All" | "Cash" | "Online" | "Udhar",
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

  const onPressFilterChip = useCallback(
    (key: "All" | "Cash" | "Online" | "Udhar") => {
      setFilters((p) => ({ ...p, payment: key }));
    },
    []
  );

  return (
    <AppScreen
      padded
      scroll={false}
      backgroundVariant="background"
      paddingHorizontal={space.lg}
      header={<AppHeader title="Sales Records" showBack />}
      contentStyle={{ paddingTop: space.md }}
    >
      {/* <RecordsToolbar
    presets={SALES_PRESETS}
    presetValue={preset}
    onChangePreset={setPreset}
    query={query}
    onChangeQuery={setQuery}
    onPressFilter={() => salesSheetRef.current?.present()}
    chips={PAYMENT_CHIPS}
    chipValue={payment}
    onChangeChip={setPayment}
  /> */}
      <SalesPresetRow value={preset} onChange={setPreset} />

      <SalesSearchRow
        value={query}
        onChangeText={setQuery}
        onPressFilter={() => {
          // later: open SalesFilterSheet
          console.log("open filter sheet");
        }}
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
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingTop: space.md,
  },
});
