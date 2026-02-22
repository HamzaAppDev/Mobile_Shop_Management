/**
 * Session hook – exposes auth/session state and actions.
 * Replaces Zustand per AI_RULES #8. Session is app lifecycle state, not business logic.
 */
import { useContext } from "react";
import { SessionContext } from "./SessionProvider";

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used inside SessionProvider");
  }
  return ctx;
}
