import { create } from "zustand";

export type AuthStatus = "loading" | "signedOut" | "signedIn";

type SessionState = {
  authStatus: AuthStatus;
  locked: boolean;

  pinEnabled: boolean;
  biometricEnabled: boolean;

  // derived convenience (still stored so UI logic is simple)
  quickUnlockEnabled: boolean;

  // actions
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

export const useSessionStore = create<SessionState>((set, get) => ({
  authStatus: "loading",
  locked: true,

  pinEnabled: false,
  biometricEnabled: false,
  quickUnlockEnabled: false,

  bootstrapDone: ({ authStatus, pinEnabled, biometricEnabled }) =>
    set({
      authStatus,
      pinEnabled,
      biometricEnabled,
      quickUnlockEnabled: calcQuick(pinEnabled, biometricEnabled),
      locked: authStatus === "signedIn" ? true : true, // keep locked by default
    }),

  signIn: () => {
    const { pinEnabled, biometricEnabled } = get();
    set({
      authStatus: "signedIn",
      locked: calcQuick(pinEnabled, biometricEnabled), // if quick unlock enabled, start locked
      quickUnlockEnabled: calcQuick(pinEnabled, biometricEnabled),
    });
  },

  signOut: () =>
    set({
      authStatus: "signedOut",
      locked: true,
    }),

  setLocked: (locked) => set({ locked }),

  setPinEnabled: (pinEnabled) => {
    const { biometricEnabled } = get();
    set({
      pinEnabled,
      quickUnlockEnabled: calcQuick(pinEnabled, biometricEnabled),
    });
  },

  setBiometricEnabled: (biometricEnabled) => {
    const { pinEnabled } = get();
    set({
      biometricEnabled,
      quickUnlockEnabled: calcQuick(pinEnabled, biometricEnabled),
    });
  },

  unlock: () => set({ locked: false }),
}));
