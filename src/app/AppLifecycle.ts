import { useEffect } from "react";
import { AppState } from "react-native";
import { useSession } from "./session";

export function AppLifecycle() {
  const { setLocked } = useSession();

  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state !== "active") setLocked(true);
    });
    return () => sub.remove();
  }, [setLocked]);

  return null;
}
