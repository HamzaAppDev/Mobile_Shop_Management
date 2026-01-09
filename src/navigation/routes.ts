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
  },
} as const;

export type RouteValue<T> = T[keyof T];
