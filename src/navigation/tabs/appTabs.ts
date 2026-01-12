export const AppTabRoutes = {
  Dashboard: "Dashboard",
  Sales: "Sales",
  Expenses: "Expenses",
} as const;

export type AppTabsParamList = {
  [AppTabRoutes.Dashboard]: undefined;
  [AppTabRoutes.Sales]: undefined;
  [AppTabRoutes.Expenses]: undefined;
};
