/**
 * Expenses API – typed service for expense data.
 * Per ARCHITECTURE: Services return typed data. Screens call services.
 */

import { apiGet, apiPost } from "./client";

export type ExpenseDto = {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  categoryId: string;
  note?: string;
};

export type ExpensesListParams = {
  from?: Date;
  to?: Date;
  categoryId?: string;
};

export async function fetchExpenses(
  _params?: ExpensesListParams
): Promise<ExpenseDto[]> {
  // TODO: Replace with real API when backend exists
  return [];
}

export async function createExpense(
  _expense: Omit<ExpenseDto, "id">
): Promise<ExpenseDto> {
  // TODO: Replace with real API when backend exists
  throw new Error("Not implemented");
}
