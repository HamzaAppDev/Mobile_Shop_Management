import { AppText } from "@/components/AppText";
import { useAppTheme } from "@/design/theme/AppThemeProvider";
import React, { memo } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

export type AppInputProps = TextInputProps & {
    label?: string;
    error?: string;
    rightIcon?: React.ReactNode;
};

function AppInputBase({ label, error, style, rightIcon, ...rest }: AppInputProps) {
    const { colors } = useAppTheme();

    return (
        <View style={styles.wrap}>
            {label ? <AppText variant="muted" style={{ marginBottom: 6 }}>{label}</AppText> : null}

            <View
                style={[
                    styles.inputRow,
                    {
                        backgroundColor: colors.surface,
                        borderColor: error ? colors.danger : colors.border,
                    },
                ]}
            >
                <TextInput
                    {...rest}
                    placeholderTextColor={colors.placeholder}
                    style={[
                        styles.input,
                        { color: colors.text },
                        style as any,
                    ]}
                />
                {rightIcon ? <View style={styles.iconWrap}>{rightIcon}</View> : null}
            </View>

            {error ? (
                <AppText variant="muted" style={{ color: colors.danger, marginTop: 6 }}>
                    {error}
                </AppText>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: {
        marginBottom: 14,
    },
    inputRow: {
        minHeight: 52,
        borderRadius: 14,
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
});

export const AppInput = memo(AppInputBase);
