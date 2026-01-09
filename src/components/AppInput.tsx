import { AppText } from "@/components/AppText";
import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { radius } from "@/design/tokens/radius";
import React, { memo } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

export type AppInputProps = TextInputProps & {
  label?: string;
  error?: string;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  disabled?: boolean;
};

function AppInputBase({
  label,
  error,
  style,
  rightIcon,
  containerStyle,
  disabled = false,
  editable,
  ...rest
}: AppInputProps) {
  const { colors } = useAppTheme();

  const isEditable = typeof editable === "boolean" ? editable : !disabled;

  return (
    <View style={[styles.wrap, containerStyle]}>
      {label ? (
        <AppText variant="muted" style={styles.label}>
          {label}
        </AppText>
      ) : null}

      <View
        style={[
          styles.inputRow,
          {
            backgroundColor: colors.surface,
            borderColor: error ? colors.danger : colors.border,
            opacity: isEditable ? 1 : 0.55,
          },
        ]}
      >
        <TextInput
          {...rest}
          editable={isEditable}
          placeholderTextColor={colors.placeholder}
          style={[styles.input, { color: colors.text }, style as any]}
        />
        {rightIcon ? <View style={styles.iconWrap}>{rightIcon}</View> : null}
      </View>

      {error ? (
        <AppText
          variant="muted"
          style={[styles.error, { color: colors.danger }]}
        >
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
  },
  label: {
    marginBottom: 6,
  },
  inputRow: {
    minHeight: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  iconWrap: {
    marginLeft: 10,
  },
  error: {
    marginTop: 6,
  },
});

export const AppInput = memo(AppInputBase);
