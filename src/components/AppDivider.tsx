import { useAppTheme } from "@/design/theme/AppThemeProvider";
import React, { memo } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";

export type AppDividerProps = {
    inset?: number;          // left/right padding
    vertical?: boolean;      // vertical divider
    size?: number;           // thickness
    style?: ViewStyle;
    color?: string;          // override
};

function AppDividerBase({
    inset = 0,
    vertical = false,
    size = StyleSheet.hairlineWidth,
    style,
    color,
}: AppDividerProps) {
    const { colors } = useAppTheme();

    return (
        <View
            style={[
                vertical ? styles.v : styles.h,
                vertical
                    ? { width: size, marginVertical: inset }
                    : { height: size, marginHorizontal: inset },
                { backgroundColor: color ?? colors.divider },
                style,
            ]}
        />
    );
}

const styles = StyleSheet.create({
    h: { alignSelf: "stretch" },
    v: { alignSelf: "stretch" },
});

export const AppDivider = memo(AppDividerBase);
