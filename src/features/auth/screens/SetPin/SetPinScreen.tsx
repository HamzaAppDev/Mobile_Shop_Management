import { AppButton, AppScreen, AppText } from "@/components";
import { useAppTheme } from "@/design/theme";
import { radius, space } from "@/design/tokens";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { FingerprintCard } from "./components/FingerprintCard";
import { Keypad } from "./components/Keypad";
import { PinIndicators } from "./components/PinIndicators";

const PIN_LENGTH = 4;

type Step = "set" | "confirm";

export function SetPinScreen() {
  const [step, setStep] = useState<Step>("set");
  const { colors } = useAppTheme();

  const [draft, setDraft] = useState<string[]>([]);
  const [confirm, setConfirm] = useState<string[]>([]);
  const [firstPin, setFirstPin] = useState<string | null>(null);

  const [useFingerprint, setUseFingerprint] = useState(true);

  const activePin = step === "set" ? draft : confirm;
  const isComplete = activePin.length === PIN_LENGTH;

  const indicators = useMemo(
    () =>
      Array.from({ length: PIN_LENGTH }).map((_, i) => i < activePin.length),
    [activePin]
  );

  const title = step === "set" ? "Set Security" : "Confirm PIN";
  const subtitle =
    step === "set"
      ? "Enter a 4-digit PIN to secure your shop."
      : "Re-enter your PIN to confirm.";

  const addDigit = useCallback(
    (d: string) => {
      if (step === "set") {
        setDraft((prev) => (prev.length < PIN_LENGTH ? [...prev, d] : prev));
      } else {
        setConfirm((prev) => (prev.length < PIN_LENGTH ? [...prev, d] : prev));
      }
    },
    [step]
  );

  const removeDigit = useCallback(() => {
    if (step === "set") setDraft((prev) => prev.slice(0, -1));
    else setConfirm((prev) => prev.slice(0, -1));
  }, [step]);

  const goBackToSet = useCallback(() => {
    setStep("set");
    setConfirm([]);
    // keep draft + firstPin as-is
  }, []);

  const onNext = useCallback(() => {
    if (!isComplete) return;

    const pinStr = activePin.join("");

    if (step === "set") {
      setFirstPin(pinStr);
      setStep("confirm");
      return;
    }

    // confirm step
    if (firstPin && pinStr === firstPin) {
      // ✅ TODO: save PIN securely + fingerprint preference
      // expo-secure-store recommended
      // navigate to LoginPinScreen (or App)
      return;
    }

    // mismatch: reset confirm + (optional) show error/haptic later
    setConfirm([]);
  }, [activePin, firstPin, isComplete, step]);

  return (
    <AppScreen padded backgroundVariant="background">
      <View style={styles.header}>
        {step === "confirm" ? (
          <View style={styles.headerRow}>
            <Pressable
              // onPress={handleBack}
              hitSlop={12}
              style={({ pressed }) => [
                styles.backBtn,
                pressed && { opacity: 0.6 },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Back"
            >
              <Ionicons name="chevron-back" size={22} color={colors.primary} />
            </Pressable>
            <AppText variant="link" onPress={goBackToSet}>
              Back
            </AppText>
          </View>
        ) : null}
        <AppText variant="title">{title}</AppText>

        <AppText variant="muted" style={styles.subtitle}>
          {subtitle}
        </AppText>
      </View>

      <PinIndicators filled={indicators} />

      {/* Fingerprint only on Set step (recommended UX) */}
      {step === "set" ? (
        <FingerprintCard
          enabled={useFingerprint}
          onToggle={() => setUseFingerprint((v) => !v)}
        />
      ) : null}

      <View style={{ flex: 1 }} />

      <Keypad onDigit={addDigit} onBackspace={removeDigit} />

      <AppButton
        title="Next"
        variant="primary"
        disabled={!isComplete}
        style={{ marginTop: space.lg }}
        onPress={onNext}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: space.lg },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: space.sm,
  },
  subtitle: {
    marginTop: space.sm,
  },

  backBtn: {
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
});
