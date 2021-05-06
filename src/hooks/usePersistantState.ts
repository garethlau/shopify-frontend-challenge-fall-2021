import { useState, useEffect } from "react";

interface Options {
  autoHydrate: boolean;
}

export default function usePersistantState<T>(
  defaultValue: T,
  key: string,
  config: Options = {
    autoHydrate: false,
  }
) {
  const [value, setValue] = useState<T>(() => {
    if (config?.autoHydrate) {
      const stickyValue = localStorage.getItem(key);
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    }
    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
