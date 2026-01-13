import { AppInput, AppScreen } from "@/components";
import { useAppTheme } from "@/design/theme";
import { radius, space } from "@/design/tokens";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import {
  AddExpenseHeader,
  AmountInputCard,
  CategoryGrid,
  SaveExpenseActions,
} from "./components";
import { addExpenseSchema, type AddExpenseForm } from "./schema";

export function AddExpenseScreen() {
  const { colors } = useAppTheme();
  const nav = useNavigation<any>();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddExpenseForm>({
    resolver: zodResolver(addExpenseSchema),
    defaultValues: { amount: "", category: "", note: "" },
    mode: "onSubmit",
  });

  const amount = watch("amount");
  const category = watch("category");

  const canSubmit = useMemo(
    () => Number(amount || 0) > 0 && !!category,
    [amount, category]
  );

  const close = useCallback(() => {
    if (nav.canGoBack()) nav.goBack();
  }, [nav]);

  const onSave = useCallback(
    handleSubmit((values) => {
      console.log("SAVE", values);
      close();
    }),
    [close, handleSubmit]
  );

  const onSaveAndAddAnother = useCallback(
    handleSubmit((values) => {
      console.log("SAVE+ANOTHER", values);
      reset({ amount: "", category: "", note: "" });
    }),
    [handleSubmit, reset]
  );

  return (
    <AppScreen padded backgroundVariant="background" scroll={false}>
      <View
        style={[
          styles.sheet,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <AddExpenseHeader onClose={close} />

        <Controller
          control={control}
          name="amount"
          render={({ field: { value, onChange } }) => (
            <AmountInputCard
              value={value}
              onChange={onChange}
              error={errors.amount?.message}
            />
          )}
        />

        <CategoryGrid
          value={category || null}
          onChange={(v) => setValue("category", v, { shouldValidate: true })}
          error={errors.category?.message}
        />

        <Controller
          control={control}
          name="note"
          render={({ field: { value, onChange } }) => (
            <AppInput
              placeholder="Add a note (optional)..."
              value={value ?? ""}
              onChangeText={onChange}
              containerStyle={{ marginTop: space.lg }}
            />
          )}
        />

        <SaveExpenseActions
          disabled={!canSubmit || isSubmitting}
          loading={isSubmitting}
          onSave={onSave}
          onSaveAndAddAnother={onSaveAndAddAnother}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  sheet: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: space.lg,
  },
});
