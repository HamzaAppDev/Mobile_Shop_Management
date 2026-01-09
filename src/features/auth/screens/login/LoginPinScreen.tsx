import { AppScreen } from "@/components";
import { space } from "@/design/tokens";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Keypad, PinIndicators } from "../../components";
import { FingerprintAction } from "./components/FingerprintAction";
import { LoginHeader } from "./components/LoginHeader";

const PIN_LENGTH = 4;

export function LoginPinScreen() {
  const [pin, setPin] = useState<string[]>([]);
  const fingerprintEnabled = true; // TODO: read from secure settings

  const isComplete = pin.length === PIN_LENGTH;

  const indicators = useMemo(
    () => Array.from({ length: PIN_LENGTH }).map((_, i) => i < pin.length),
    [pin]
  );

  const addDigit = useCallback((d: string) => {
    setPin((prev) => (prev.length < PIN_LENGTH ? [...prev, d] : prev));
  }, []);

  const removeDigit = useCallback(() => {
    setPin((prev) => prev.slice(0, -1));
  }, []);

  const verifyPin = useCallback(() => {
    if (!isComplete) return;

    const entered = pin.join("");

    // TODO:
    // 1) read saved pin from SecureStore
    // 2) compare
    // 3) if match => navigate App
    // 4) if not match => clear + shake + haptic
  }, [isComplete, pin]);

  // Auto-verify when 4 digits entered (smooth UX)
  React.useEffect(() => {
    if (isComplete) verifyPin();
  }, [isComplete, verifyPin]);

  const onFingerprint = useCallback(() => {
    // TODO integrate expo-local-authentication
  }, []);

  return (
    <AppScreen padded backgroundVariant="background">
      <LoginHeader />

      <PinIndicators filled={indicators} />

      {fingerprintEnabled ? (
        <FingerprintAction onPress={onFingerprint} />
      ) : null}

      <View style={{ flex: 1 }} />

      <Keypad onDigit={addDigit} onBackspace={removeDigit} />

      {/* Optional bottom spacing */}
      <View style={{ height: space.xl }} />
    </AppScreen>
  );
}

const styles = StyleSheet.create({});
