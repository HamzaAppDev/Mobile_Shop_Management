import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { space } from "@/design/tokens";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  filled: boolean[];
};

const DOT_SIZE = 25;
const DOT_GAP = 14;

function PinIndicatorsBase({ filled }: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.row}>
      {filled.map((isFilled, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            filled && {
              transform: [{ scale: 1.15 }],
            },
            { backgroundColor: isFilled ? colors.primary : colors.border },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: space.xl,
    gap: DOT_GAP,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
});

export const PinIndicators = memo(PinIndicatorsBase);
