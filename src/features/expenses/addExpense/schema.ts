import { z } from "zod";

export const addExpenseSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((v) => Number(v) > 0, "Amount must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  note: z.string().optional(),
});

export type AddExpenseForm = z.infer<typeof addExpenseSchema>;
