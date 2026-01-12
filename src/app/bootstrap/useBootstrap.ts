import { useEffect } from "react";
import { useSessionStore } from "../store/sessionStore";

export function useBootstrap() {
  const bootstrapDone = useSessionStore((s) => s.bootstrapDone);

  useEffect(() => {
    // DESIGN MODE DEFAULTS (for now)
    // Later:
    // - read firebase currentUser => signedIn/signedOut
    // - read SecureStore => pinEnabled/biometricEnabled
    bootstrapDone({
      authStatus: "signedOut",
      pinEnabled: false,
      biometricEnabled: false,
    });
  }, [bootstrapDone]);
}
