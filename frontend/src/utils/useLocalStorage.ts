import { useState } from "react";
import { z } from "zod";

export function useLocalStorage<T>(
  key: string,
  schema : z.ZodSchema<T>,
  initialValue: T
) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        return initialValue;
      }
      const jsonItem = JSON.parse(item);
      return schema.parse(jsonItem);
    } catch (error) {
      // console.error('localstorage',key,error);
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
