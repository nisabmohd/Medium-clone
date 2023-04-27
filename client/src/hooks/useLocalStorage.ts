import { useState, useCallback } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [val, setVal] = useState<T>(() => {
    const localVal = localStorage.getItem(key);
    return localVal ? JSON.parse(localVal) : initialValue;
  });
  const changeValue = (param: T | ((prevValue: T) => T)) => {
    if (param instanceof Function) {
      const t: T = param(val);
      setVal(t);
      localStorage.setItem(key, JSON.stringify(t));
    } else {
      setVal(param);
      localStorage.setItem(key, JSON.stringify(param));
    }
  };

  return [val, changeValue] as const;
}

export function clearLocalStorage() {
  localStorage.clear();
}
