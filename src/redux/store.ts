import { configureStore } from "@reduxjs/toolkit";

import compareReducer from "@/redux/slices/compare-slice";

// one function, so every request/page gets its own store (safe in Next.js)
export function makeStore() {
  return configureStore({
    reducer: {
      compare: compareReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];