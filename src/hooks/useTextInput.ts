import React, { useState } from "react";

export default function useTextInput(defaultValue: string) {
  const [value, setValue] = useState<string>(defaultValue);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange,
  };
}
