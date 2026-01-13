import { SalesScreen } from "@/features";
import { AddExpenseScreen, ExpensesScreen } from "@/features/expenses";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Routes } from "../routes";
import { AppTabs } from "../tabs";
import type { AppStackParamList } from "../types";

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.App.Tabs} component={AppTabs} />
      <Stack.Screen name={Routes.App.SalesList} component={SalesScreen} />
      <Stack.Screen name={Routes.App.ExpensesList} component={ExpensesScreen} />
      <Stack.Screen
        name={Routes.App.AddExpense}
        component={AddExpenseScreen}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}
