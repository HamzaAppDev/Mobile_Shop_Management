import { Routes } from "./routes";

export type AuthStackParamList = {
  [Routes.Auth.Login]: undefined;
  [Routes.Auth.Signup]: undefined;
  [Routes.Auth.SetPin]: undefined;
  [Routes.Auth.LoginPin]: undefined;
};

export type RootStackParamList = {
  [Routes.Root.Auth]: undefined;
  [Routes.Root.App]: undefined;
};

export type AppStackParamList = {
  [Routes.App.Tabs]: undefined;
  [Routes.App.ExpensesList]: undefined;
  [Routes.App.AddExpense]: undefined;
  [Routes.App.SalesList]: undefined;
  [Routes.App.AddExpense]: undefined;
};
