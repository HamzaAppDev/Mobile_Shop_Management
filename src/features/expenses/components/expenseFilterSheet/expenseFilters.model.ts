export type DatePreset = "week" | "today" | "yesterday" | "month" | "custom";

export type ExpenseFilters = {
  preset: DatePreset;
  from: Date | null;
  to: Date | null;

  categoryId: string | null;
  categoryLabel: string;
};

export const DEFAULT_EXPENSE_FILTERS: ExpenseFilters = {
  preset: "week",
  from: null,
  to: null,
  categoryId: null,
  categoryLabel: "All Categories",
};

export function cloneExpenseFilters(x: ExpenseFilters): ExpenseFilters {
  return {
    ...x,
    from: x.from ? new Date(x.from) : null,
    to: x.to ? new Date(x.to) : null,
  };
}
