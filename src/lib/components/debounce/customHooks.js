import { useState, useEffect } from 'react';

export const useDebounce = (callback, delay) => {
  const [debounceValue, setDebounceValue] = useState(callback);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebounceValue(callback);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [callback, delay]
  );
  return debounceValue;
};
