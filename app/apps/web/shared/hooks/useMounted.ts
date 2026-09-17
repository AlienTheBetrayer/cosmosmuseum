"use client";

import { useState, useEffect, useMemo } from "react";

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by ensuring client-only state renders post-mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return useMemo(() => ({ mounted }), [mounted]);
};
