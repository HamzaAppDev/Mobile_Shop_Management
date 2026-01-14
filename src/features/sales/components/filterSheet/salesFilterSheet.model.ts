// ---------- Domain types ----------
export type SalesDatePreset = "today" | "yesterday" | "week" | "month";
export type SalesPayment = "cash" | "online" | "udhar" | null;

// New UI names used by the screen/toolbars (keep these!)
export type SalesPreset = SalesDatePreset | "custom";
export type Payment = "All" | "Cash" | "Online" | "Udhar";

// ---------- Filters ----------
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

// ---------- Helpers ----------
export function cloneSalesFilters(x: SalesFilters): SalesFilters {
  return {
    ...x,
    from: x.from ? new Date(x.from) : null,
    to: x.to ? new Date(x.to) : null,
  };
}

export function formatDate(d: Date) {
  const m = d.toLocaleString("en-US", { month: "short" });
  const day = d.getDate();
  const y = d.getFullYear();
  return `${m} ${day}, ${y}`;
}
