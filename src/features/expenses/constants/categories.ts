import { Ionicons } from "@expo/vector-icons";

export type CategoryTint = "primary" | "info" | "warning" | "danger" | "muted";

export type IoniconsName = keyof typeof Ionicons.glyphMap;

export type ExpenseCategory = {
  key: string;
  label: string;
  icon: IoniconsName;
  tint: CategoryTint;
};

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { key: "tea", label: "Tea", icon: "cafe-outline", tint: "info" },
  { key: "lunch", label: "Lunch", icon: "restaurant-outline", tint: "warning" },
  { key: "dinner", label: "Dinner", icon: "restaurant", tint: "warning" },
  { key: "rent", label: "Rent", icon: "home-outline", tint: "danger" },
  { key: "electric", label: "Electric", icon: "flash-outline", tint: "info" },
  { key: "net", label: "Net", icon: "wifi-outline", tint: "primary" },
  { key: "other", label: "Other", icon: "ellipsis-horizontal", tint: "muted" },
];
