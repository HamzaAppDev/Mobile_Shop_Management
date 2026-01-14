export type SalesPreset = "today" | "yesterday" | "week" | "month" | "custom";
export type Payment = "All" | "Cash" | "Online" | "Udhar";

export type SalesFilters = {
  preset?: SalesPreset;
  from?: Date | null;
  to?: Date | null;
  payment?: Payment;
  customerId?: string | null;
  customerLabel?: string | null;
};

export const DEFAULT_SALES_FILTERS: SalesFilters = {
  preset: "today",
  from: null,
  to: null,
  payment: "All",
  customerId: null,
  customerLabel: "All Customers",
};

export function cloneSalesFilters(x: SalesFilters): SalesFilters {
  return {
    ...x,
    from: x.from ? new Date(x.from) : null,
    to: x.to ? new Date(x.to) : null,
  };
}
