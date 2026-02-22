/**
 * SessionProvider – React state–based replacement for Zustand sessionStore.
 * Per AI_RULES #8: no Zustand. Session state is app lifecycle, not business logic.
 */
import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AuthStatus = "loading" | "signedOut" | "signedIn";

type SessionContextValue = {
  authStatus: AuthStatus;
  locked: boolean;
  pinEnabled: boolean;
  biometricEnabled: boolean;
  quickUnlockEnabled: boolean;

  bootstrapDone: (args: {
    authStatus: AuthStatus;
    pinEnabled: boolean;
    biometricEnabled: boolean;
  }) => void;
  signIn: () => void;
  signOut: () => void;
  setLocked: (v: boolean) => void;
  setPinEnabled: (v: boolean) => void;
  setBiometricEnabled: (v: boolean) => void;
  unlock: () => void;
};

function calcQuick(pinEnabled: boolean, biometricEnabled: boolean) {
  return pinEnabled || biometricEnabled;
}

export const SessionContext = createContext<SessionContextValue | null>(null);

type Props = { children: ReactNode };

export function SessionProvider({ children }: Props) {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");
  const [locked, setLockedState] = useState(true);
  const [pinEnabled, setPinEnabledState] = useState(false);
  const [biometricEnabled, setBiometricEnabledState] = useState(false);

  const quickUnlockEnabled = useMemo(
    () => calcQuick(pinEnabled, biometricEnabled),
    [pinEnabled, biometricEnabled]
  );

  const bootstrapDone = useCallback(
    (args: {
      authStatus: AuthStatus;
      pinEnabled: boolean;
      biometricEnabled: boolean;
    }) => {
      setAuthStatus(args.authStatus);
      setPinEnabledState(args.pinEnabled);
      setBiometricEnabledState(args.biometricEnabled);
      setLockedState(args.authStatus === "signedIn" ? true : true);
    },
    []
  );

  const signIn = useCallback(() => {
    setAuthStatus("signedIn");
    setLockedState(calcQuick(pinEnabled, biometricEnabled));
  }, [pinEnabled, biometricEnabled]);

  const signOut = useCallback(() => {
    setAuthStatus("signedOut");
    setLockedState(true);
  }, []);

  const setLocked = useCallback((v: boolean) => {
    setLockedState(v);
  }, []);

  const setPinEnabled = useCallback((v: boolean) => {
    setPinEnabledState(v);
  }, []);

  const setBiometricEnabled = useCallback((v: boolean) => {
    setBiometricEnabledState(v);
  }, []);

  const unlock = useCallback(() => {
    setLockedState(false);
  }, []);

  const value = useMemo<SessionContextValue>(
    () => ({
      authStatus,
      locked,
      pinEnabled,
      biometricEnabled,
      quickUnlockEnabled,
      bootstrapDone,
      signIn,
      signOut,
      setLocked,
      setPinEnabled,
      setBiometricEnabled,
      unlock,
    }),
    [
      authStatus,
      locked,
      pinEnabled,
      biometricEnabled,
      quickUnlockEnabled,
      bootstrapDone,
      signIn,
      signOut,
      setLocked,
      setPinEnabled,
      setBiometricEnabled,
      unlock,
    ]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}
