import { AppInput } from "@/components";
import { space } from "@/design/tokens";
import React, { memo } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

function AddNoteInputBase({ value, onChange }: Props) {
  return (
    <AppInput
      placeholder="Add a note (optional)..."
      value={value}
      onChangeText={onChange}
      containerStyle={{ marginTop: space.lg }}
    />
  );
}

export const AddNoteInput = memo(AddNoteInputBase);
