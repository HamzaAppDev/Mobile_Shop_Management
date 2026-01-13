import { AppButton, AppText } from "@/components";
import { space, typography } from "@/design/tokens";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  disabled?: boolean;
  loading?: boolean;
  onSave: () => void;
  onSaveAndAddAnother: () => void;
};

function SaveExpenseActionsBase({
  disabled = false,
  loading = false,
  onSave,
  onSaveAndAddAnother,
}: Props) {
  return (
    <View style={styles.wrap}>
      <AppButton
        title="Save Expense"
        onPress={onSave}
        disabled={disabled}
        loading={loading}
      />

      <AppText variant="link" style={styles.link} onPress={onSaveAndAddAnother}>
        Save & Add Another
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: space.xl },
  link: {
    textAlign: "center",
    marginTop: space.sm,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
});

export const SaveExpenseActions = memo(SaveExpenseActionsBase);
