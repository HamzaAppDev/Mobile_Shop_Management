import { AppText } from "@/components";
import { useAppTheme } from "@/design/theme";
import { radius, space, typography } from "@/design/tokens";
import React, { memo, useCallback, useMemo } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChange: (v: string) => void;
  error?: string;
};

function AmountInputCardBase({ value, onChange, error }: Props) {
  const { colors } = useAppTheme();

  const onChangeText = useCallback(
    (t: string) => {
      const cleaned = t.replace(/[^\d]/g, "");
      onChange(cleaned);
    },
    [onChange]
  );

  const displayValue = useMemo(() => (value?.trim() ? value : ""), [value]);

  return (
    <View style={{ marginTop: space.sm }}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.background,
            borderColor: error ? colors.danger : colors.border,
          },
        ]}
      >
        <AppText
          variant="muted"
          style={[styles.label, { color: colors.muted }]}
        >
          Total Amount
        </AppText>

        <View style={styles.row}>
          <AppText style={[styles.currency, { color: colors.muted }]}>
            ₹
          </AppText>

          <TextInput
            value={displayValue}
            onChangeText={onChangeText}
            keyboardType="number-pad"
            placeholder="0"
            placeholderTextColor={colors.placeholder}
            style={[styles.input, { color: colors.text }]}
            maxLength={10}
          />
        </View>
      </View>

      {error ? (
        <AppText style={[styles.error, { color: colors.danger }]}>
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.md,
    borderWidth: 1,
    padding: space.lg,
  },
  label: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: space.sm,
  },
  row: { flexDirection: "row", alignItems: "center", gap: space.sm },
  currency: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    paddingVertical: 6,
  },
  error: {
    marginTop: space.sm,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
});

export const AmountInputCard = memo(AmountInputCardBase);
