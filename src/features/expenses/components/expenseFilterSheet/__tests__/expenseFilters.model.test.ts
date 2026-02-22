/**
 * Unit tests for expense filter model – cloneExpenseFilters, DEFAULT_EXPENSE_FILTERS.
 */
import {
  cloneExpenseFilters,
  DEFAULT_EXPENSE_FILTERS,
  type ExpenseFilters,
} from "../expenseFilters.model";

describe("expenseFilters.model", () => {
  describe("DEFAULT_EXPENSE_FILTERS", () => {
    it("has expected shape", () => {
      expect(DEFAULT_EXPENSE_FILTERS).toMatchObject({
        preset: "week",
        from: null,
        to: null,
        categoryId: null,
        categoryLabel: "All Categories",
      });
    });
  });

  describe("cloneExpenseFilters", () => {
    it("returns new object", () => {
      const input: ExpenseFilters = { ...DEFAULT_EXPENSE_FILTERS };
      const result = cloneExpenseFilters(input);
      expect(result).not.toBe(input);
      expect(result).toEqual(input);
    });

    it("clones Date objects", () => {
      const from = new Date("2024-02-01");
      const to = new Date("2024-02-28");
      const input: ExpenseFilters = {
        ...DEFAULT_EXPENSE_FILTERS,
        from,
        to,
      };
      const result = cloneExpenseFilters(input);
      expect(result.from).not.toBe(from);
      expect(result.from?.getTime()).toBe(from.getTime());
      expect(result.to).not.toBe(to);
      expect(result.to?.getTime()).toBe(to.getTime());
    });

    it("preserves null dates", () => {
      const input: ExpenseFilters = { ...DEFAULT_EXPENSE_FILTERS };
      const result = cloneExpenseFilters(input);
      expect(result.from).toBeNull();
      expect(result.to).toBeNull();
    });
  });
});
