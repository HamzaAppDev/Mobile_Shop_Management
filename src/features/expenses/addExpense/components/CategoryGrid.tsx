import { AppText } from "@/components";
import { useAppTheme } from "@/design/theme";
import { space, typography } from "@/design/tokens";
import { EXPENSE_CATEGORIES } from "@/features/expenses/constants/categories";
import React, { memo, useCallback } from "react";
import { FlatList, View } from "react-native";
import { CategoryTile } from "./CategoryTitle";

type Props = {
  value: string | null;
  onChange: (key: string) => void;
  error?: string;
};

function CategoryGridBase({ value, onChange, error }: Props) {
  const { colors } = useAppTheme();

  const renderItem = useCallback(
    ({ item }: { item: (typeof EXPENSE_CATEGORIES)[number] }) => (
      <CategoryTile
        item={item}
        selected={value === item.key}
        onPress={() => onChange(item.key)}
      />
    ),
    [onChange, value]
  );

  return (
    <View style={{ marginTop: space.lg }}>
      <AppText
        variant="muted"
        style={{
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.semibold,
          marginBottom: space.sm,
        }}
      >
        Select Category
      </AppText>

      <FlatList
        data={EXPENSE_CATEGORIES}
        keyExtractor={(i) => i.key}
        numColumns={3}
        scrollEnabled={false}
        columnWrapperStyle={{ gap: space.md }}
        contentContainerStyle={{ gap: space.md }}
        renderItem={renderItem}
      />

      {error ? (
        <AppText
          style={{
            marginTop: space.sm,
            color: colors.danger,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
          }}
        >
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

export const CategoryGrid = memo(CategoryGridBase);
