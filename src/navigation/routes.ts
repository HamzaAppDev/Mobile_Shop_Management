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
    Expenses: "App/Expenses",
    Sales: "App/Sales",
    AddExpense: "App/AddExpense",
  },
} as const;

export type RouteValue<T> = T[keyof T];
