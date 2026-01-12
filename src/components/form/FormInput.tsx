import type { AppInputProps } from "@/components/AppInput";
import React from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { FormField } from "./FormField";

type Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = Omit<AppInputProps, "value" | "onChangeText"> & {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
};

export function FormInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({ control, name, label, ...rest }: Props<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <FormField
          label={label}
          value={value == null ? "" : String(value)}
          onChangeText={onChange}
          onBlur={onBlur}
          error={error?.message}
          {...rest}
        />
      )}
    />
  );
}
