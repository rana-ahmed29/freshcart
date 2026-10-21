import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// the most products a user can compare at the same time
export const MAX_COMPARE = 4;

type CompareState = {
  ids: string[]; // product ids, in the order the user picked them
  hydrated: boolean; // true once the saved list was read from localStorage
};

const initialState: CompareState = { ids: [], hydrated: false };

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    // click the icon: add the product, or remove it if it is already there
    toggleCompare(state, action: PayloadAction<string>) {
      const id = action.payload;

      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((item) => item !== id);
        return;
      }

      // list is full: do nothing (the button shows a toast)
      if (state.ids.length >= MAX_COMPARE) return;

      state.ids.push(id);
    },

    removeFromCompare(state, action: PayloadAction<string>) {
      state.ids = state.ids.filter((item) => item !== action.payload);
    },

    clearCompare(state) {
      state.ids = [];
    },

    // runs once after load: restores the saved list and marks it as ready
    setCompare(state, action: PayloadAction<string[]>) {
      state.ids = action.payload.slice(0, MAX_COMPARE);
      state.hydrated = true;
    },
  },
});

export const { toggleCompare, removeFromCompare, clearCompare, setCompare } =
  compareSlice.actions;

export default compareSlice.reducer;
