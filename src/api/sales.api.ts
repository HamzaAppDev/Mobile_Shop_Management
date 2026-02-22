/**
 * Sales API – typed service for sales data.
 * Per ARCHITECTURE: Services return typed data. Screens call services.
 */

import { apiGet, apiPost } from "./client";

export type SaleDto = {
  id: string;
  title: string;
  qty: number;
  amount: number;
  payment: "Cash" | "Online" | "Udhar";
  timeLabel: string;
  statusLabel: "Paid" | "Pending";
  imageUrl?: string;
};

export type SalesListParams = {
  from?: Date;
  to?: Date;
  payment?: string;
};

export async function fetchSales(
  _params?: SalesListParams
): Promise<SaleDto[]> {
  // TODO: Replace with real API when backend exists
  return [];
}

export async function createSale(
  _sale: Omit<SaleDto, "id" | "timeLabel" | "statusLabel">
): Promise<SaleDto> {
  // TODO: Replace with real API when backend exists
  throw new Error("Not implemented");
}
