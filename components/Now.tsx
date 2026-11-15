"use client";

import { createContext, useContext, useEffect, useState } from "react";

const NowContext = createContext<number>(0);

/**
 * The page is built ahead of time, so the server only knows the build time.
 * After load this swaps in the visitor's real clock, and checks again every minute,
 * so a deadline that passes while the page is open is reflected without a reload.
 */
export function NowProvider({ initial, children }: { initial: number; children: React.ReactNode }) {
  const [now, setNow] = useState(initial);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);
  return <NowContext.Provider value={now}>{children}</NowContext.Provider>;
}

export const useNow = () => useContext(NowContext);
