import { Routes } from "./routes";

export type AuthStackParamList = {
  [Routes.Auth.Login]: undefined;
  [Routes.Auth.Signup]: undefined;
  [Routes.Auth.SetPin]: undefined;
  [Routes.Auth.LoginPin]: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};
