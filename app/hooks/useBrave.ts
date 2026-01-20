'use client';
import { useEffect, useState } from 'react';

export function useBrave() {
  const [isBrave, setIsBrave] = useState(false);

  useEffect(() => {
    const checkBrave = async () => {
      // @ts-ignore - Brave-specific API
      if (navigator.brave && await navigator.brave.isBrave()) {
        setIsBrave(true);
      }
    };
    checkBrave();
  }, []);

  return isBrave;
}
