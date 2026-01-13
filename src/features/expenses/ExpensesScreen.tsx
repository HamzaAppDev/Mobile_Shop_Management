import {
  AddFabButton,
  AppHeader,
  AppScreen,
  RecordsToolbar,
  type ToolbarChip,
} from "@/components";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import { ExpenseFiltersChip } from "./components";
import { ExpenseHeaderCard } from "./components/ExpenseHeaderCard";
import {
  ExpenseTransactionList,
  type ExpenseTx,
} from "./components/ExpenseTransactionList";

type Filter = "month" | "today" | "yesterday";

const EXPENSE_PRESETS: ToolbarChip[] = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
];

const CATEGORY_CHIPS: ToolbarChip[] = [
  { key: "all", label: "All" },
  { key: "lunch", label: "Lunch" },
  { key: "electricity", label: "Electricity" },
  { key: "rent", label: "Rent" },
];

export function ExpensesScreen() {
  const [filter, setFilter] = useState<Filter>("month");
  const [preset, setPreset] = useState<string>("today");
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("all");

  // Bottom sheet ref (optional for now)
  const expenseSheetRef = useRef<BottomSheetModal>(null);

  const activeCategoryLabel = useMemo(() => {
    if (category === "all") return null;
    return CATEGORY_CHIPS.find((c) => c.key === category)?.label ?? null;
  }, [category]);

  const openFilters = useCallback(() => {
    expenseSheetRef.current?.present();
  }, []);

  const data = useMemo<ExpenseTx[]>(
    () => [
      {
        id: "1",
        title: "Shop Rent",
        subtitle: "Monthly rent for shop",
        amount: 10000,
        icon: "home-outline",
        colorKey: "danger",
      },
      {
        id: "2",
        title: "Tea & Snacks",
        subtitle: "Cutlets & Staff",
        amount: 150,
        icon: "coffee-outline",
        colorKey: "warning",
      },
      {
        id: "3",
        title: "Mobile Parts",
        subtitle: "Screen replacement",
        amount: 4200,
        icon: "cellphone",
        colorKey: "info",
      },
      {
        id: "4",
        title: "Electricity Bill",
        subtitle: "Water bill",
        amount: 22500,
        icon: "flash-outline",
        colorKey: "success",
      },
    ],
    []
  );

  return (
    <AppScreen
      padded
      scroll
      backgroundVariant="background"
      contentStyle={{ paddingBottom: 140 }}
      floating={
        <AddFabButton
          title="Expense"
          onPress={() => console.log("Add expense")}
        />
      }
      header={<AppHeader title="Expenses" showBack />}
    >
      <RecordsToolbar
        presets={EXPENSE_PRESETS}
        presetValue={preset}
        onChangePreset={setPreset}
        query={query}
        onChangeQuery={setQuery}
        onPressFilter={openFilters}
        chips={CATEGORY_CHIPS}
        chipValue={category}
        onChangeChip={setCategory}
        activeFilterLabel={
          activeCategoryLabel ? `${activeCategoryLabel}` : undefined
        }
        onClearActiveFilter={() => setCategory("all")}
      />
      <ExpenseHeaderCard total={14350} />

      <ExpenseFiltersChip value={filter} onChange={setFilter} />

      <ExpenseTransactionList data={data} />
      <BottomSheetModal ref={expenseSheetRef} snapPoints={["85%"]} index={0}>
        <View style={{ height: 400 }} />
      </BottomSheetModal>
    </AppScreen>
  );
}
