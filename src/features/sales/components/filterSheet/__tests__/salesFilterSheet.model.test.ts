/**
 * Unit tests for sales filter model – cloneSalesFilters, DEFAULT_SALES_FILTERS.
 */
import {
  cloneSalesFilters,
  DEFAULT_SALES_FILTERS,
  type SalesFilters,
} from "../salesFilterSheet.model";

describe("salesFilterSheet.model", () => {
  describe("DEFAULT_SALES_FILTERS", () => {
    it("has expected shape", () => {
      expect(DEFAULT_SALES_FILTERS).toMatchObject({
        preset: "today",
        from: null,
        to: null,
        payment: "All",
        customerId: null,
        customerLabel: "All Customers",
      });
    });
  });

  describe("cloneSalesFilters", () => {
    it("returns new object", () => {
      const input: SalesFilters = { ...DEFAULT_SALES_FILTERS };
      const result = cloneSalesFilters(input);
      expect(result).not.toBe(input);
      expect(result).toEqual(input);
    });

    it("clones Date objects", () => {
      const from = new Date("2024-01-15");
      const to = new Date("2024-01-20");
      const input: SalesFilters = {
        ...DEFAULT_SALES_FILTERS,
        from,
        to,
      };
      const result = cloneSalesFilters(input);
      expect(result.from).not.toBe(from);
      expect(result.from?.getTime()).toBe(from.getTime());
      expect(result.to).not.toBe(to);
      expect(result.to?.getTime()).toBe(to.getTime());
    });

    it("preserves null dates", () => {
      const input: SalesFilters = { ...DEFAULT_SALES_FILTERS };
      const result = cloneSalesFilters(input);
      expect(result.from).toBeNull();
      expect(result.to).toBeNull();
    });
  });
});
