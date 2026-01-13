export const Routes = {
  Root: {
    Auth: "Root/Auth",
    App: "Root/App",
  },
  Auth: {
    Login: "Auth/Login",
    Signup: "Auth/Signup",
    SetPin: "Auth/SetPin",
    LoginPin: "Auth/LoginPin",
  },
  App: {
    Tabs: "App/Tabs",
    SalesList: "App/SalesList",
    ExpensesList: "App/ExpensesList",
    AddExpense: "App/AddExpense",
  },
} as const;

export type RouteValue<T> = T[keyof T];
