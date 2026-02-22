import type { AppIconName } from "@/components";
import { AppText } from "@/components";
import { space } from "@/design/tokens";
import React, { memo, useCallback, useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ExpenseRow } from "./ExpenseRow";

export type ExpenseTx = {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  icon: AppIconName;
  colorKey: "success" | "warning" | "danger" | "info";
};

type Props = { data: ExpenseTx[] };

function ExpenseTransactionListBase({ data }: Props) {
  const renderItem = useCallback(
    ({ item }: { item: ExpenseTx }) => <ExpenseRow item={item} />,
    []
  );

  const ListSeparator = useMemo(
    () => () => <View style={{ height: space.md }} />,
    []
  );

  return (
    <View>
      <View style={styles.head}>
        <AppText style={styles.title}>RECENT TRANSACTIONS</AppText>
        <AppText variant="link" style={styles.link}>
          See All
        </AppText>
      </View>

      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        scrollEnabled={false}
        ItemSeparatorComponent={ListSeparator}
        contentContainerStyle={{ paddingBottom: space.lg }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: space.md,
  },
  title: { fontSize: 12, fontWeight: "900" },
  link: { fontSize: 12 },
});

export const ExpenseTransactionList = memo(ExpenseTransactionListBase);
