import * as SecureStore from "expo-secure-store";

const KEYS = {
  pinHash: "auth.pinHash",
  pinEnabled: "auth.pinEnabled",
  fingerprintEnabled: "auth.fingerprintEnabled",
} as const;

export async function setFingerprintEnabled(v: boolean) {
  await SecureStore.setItemAsync(KEYS.fingerprintEnabled, v ? "1" : "0");
}

export async function getFingerprintEnabled() {
  const v = await SecureStore.getItemAsync(KEYS.fingerprintEnabled);
  return v === "1";
}
