import { useEffect } from "react";
import { AppState } from "react-native";
import { useSessionStore } from "./store/sessionStore";

export function AppLifecycle() {
  const setLocked = useSessionStore((s) => s.setLocked);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state !== "active") setLocked(true);
    });
    return () => sub.remove();
  }, [setLocked]);

  return null;
}
