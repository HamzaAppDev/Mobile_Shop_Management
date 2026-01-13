import { AddFabButton, AppScreen } from "@/components";
import React, { useMemo, useState } from "react";
import { ExpenseFiltersChip } from "./components";
import { ExpenseHeaderCard } from "./components/ExpenseHeaderCard";
import {
  ExpenseTransactionList,
  type ExpenseTx,
} from "./components/ExpenseTransactionList";

const EXPENSE_PRESETS = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
];

const CATEGORY_CHIPS = [
  { key: "all", label: "All" },
  { key: "lunch", label: "Lunch" },
  { key: "electricity", label: "Electricity" },
  { key: "rent", label: "Rent" },
];

type Filter = "month" | "today" | "yesterday";

export function ExpensesScreen() {
  const [filter, setFilter] = useState<Filter>("month");

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
    >
      <ExpenseHeaderCard total={14350} />

      <ExpenseFiltersChip value={filter} onChange={setFilter} />

      <ExpenseTransactionList data={data} />
    </AppScreen>
  );
}
