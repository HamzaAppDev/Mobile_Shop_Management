import { AppText } from "@/components";
import { useAppTheme } from "@/design/theme";
import { space } from "@/design/tokens";
import React, { memo } from "react";
import { StyleSheet } from "react-native";

type Props = { title: string };

function SalesSectionTitleBase({ title }: Props) {
  const { colors } = useAppTheme();
  return (
    <AppText style={[styles.title, { color: colors.text }]}>{title}</AppText>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 13,
    fontWeight: "900",
    marginTop: space.sm,
    marginBottom: space.sm,
  },
});

export const SalesSectionTitle = memo(SalesSectionTitleBase);
