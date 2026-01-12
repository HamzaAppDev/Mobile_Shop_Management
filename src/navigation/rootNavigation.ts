import {
  CommonActions,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { Routes } from "./routes";
import type { RootStackParamList } from "./types";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function resetToApp() {
  if (!navigationRef.isReady()) return;

  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: Routes.Root.App }],
    })
  );
}
