"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";

import { setCompare } from "@/redux/slices/compare-slice";
import { makeStore } from "@/redux/store";

const STORAGE_KEY = "compare-list";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // create the store only once (same pattern as query-provider.tsx)
  const [store] = useState(makeStore);

  useEffect(() => {
    // 1) restore the saved list (empty list if nothing valid is saved)
    let saved: string[] = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (
          Array.isArray(parsed) &&
          parsed.every((id) => typeof id === "string")
        ) {
          saved = parsed;
        }
      }
    } catch {
      // broken or blocked storage: start with an empty list
    }
    store.dispatch(setCompare(saved));
document.cookie = `compare-count=${saved.length}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    // 2) save the list every time it changes
    let lastIds = store.getState().compare.ids;
    const unsubscribe = store.subscribe(() => {
      const ids = store.getState().compare.ids;
      if (ids === lastIds) return;
      lastIds = ids;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // storage full or blocked: ignore
    }

    // the server reads this cookie, so the first render has the right number
    document.cookie = `compare-count=${ids.length}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    });

    return unsubscribe;
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
