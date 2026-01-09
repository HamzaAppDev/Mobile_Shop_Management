export const Routes = {
  Auth: {
    SetPin: "Auth/SetPin",
    LoginPin: "Auth/LoginPin",
  },
  App: {
    Tabs: "App/Tabs",
  },
} as const;

export type RouteValue<T> = T[keyof T];
