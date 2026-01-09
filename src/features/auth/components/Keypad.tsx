import { space } from "@/design/tokens";
import React, { memo } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { Key } from "./Key";

type Props = {
  onDigit: (digit: string) => void;
  onBackspace: () => void;
};

const ROWS: Array<Array<"empty" | string | "back">> = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["empty", "0", "back"],
];

function KeypadBase({ onDigit, onBackspace }: Props) {
  const { width } = useWindowDimensions();

  // keep it full width on phones, but avoid huge spacing on tablets
  const maxWidth = Math.min(width, 420);

  return (
    <View style={styles.wrap}>
      <View style={[styles.inner, { maxWidth }]}>
        {ROWS.map((row, r) => (
          <View key={r} style={styles.row}>
            {row.map((cell, c) => {
              if (cell === "empty")
                return <View key={c} style={styles.placeholder} />;
              if (cell === "back")
                return (
                  <Key key={c} icon="backspace-outline" onPress={onBackspace} />
                );
              return <Key key={c} label={cell} onPress={() => onDigit(cell)} />;
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ✅ FULL WIDTH
  wrap: {
    width: "100%",
    paddingHorizontal: space.xl, // controls how far keys are from edges
  },

  // ✅ Center content and clamp max width for large screens
  inner: {
    width: "100%",
    alignSelf: "center",
    gap: space.md,
  },

  // ✅ Keys spread across width evenly
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  placeholder: {
    width: 72,
    height: 72,
  },
});

export const Keypad = memo(KeypadBase);
