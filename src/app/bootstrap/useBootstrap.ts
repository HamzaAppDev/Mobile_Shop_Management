import { useEffect } from "react";
import { useSession } from "../session";

export function useBootstrap() {
  const { bootstrapDone } = useSession();

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
