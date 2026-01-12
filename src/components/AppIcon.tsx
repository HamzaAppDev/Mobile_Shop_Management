import { useAppTheme } from "@/design/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { memo } from "react";

export type AppIconName = keyof typeof MaterialCommunityIcons.glyphMap;

type Props = {
  name: AppIconName;
  size?: number;
  color?: string;
};

function AppIconBase({ name, size = 20, color }: Props) {
  const { colors } = useAppTheme();
  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={color ?? colors.text}
    />
  );
}

export const AppIcon = memo(AppIconBase);
