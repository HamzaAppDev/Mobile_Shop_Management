import { AppInput, type AppInputProps } from "@/components/AppInput";
import { AppText } from "@/components/AppText";
import { space } from "@/design/tokens";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

type Props = AppInputProps & {
  label: string;
};

function FormFieldBase({ label, error, containerStyle, ...rest }: Props) {
  return (
    <View style={[styles.wrap, containerStyle]}>
      <AppText style={styles.label}>{label}</AppText>
      <AppInput {...rest} error={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: space.md },
  label: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: space.sm,
  },
});

export const FormField = memo(FormFieldBase);
