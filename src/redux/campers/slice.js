import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers } from "./operations";

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    hasMore: true,
  },
  reducers: {
    resetItems: (state) => {
      state.items = [];
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        const newData = Array.isArray(action.payload)
          ? action.payload
          : action.payload.items || [];

        if (newData.length < 4) {
          state.hasMore = false;
        }

        const filteredNewData = newData.filter(
          (newItem) =>
            !state.items.some((existingItem) => existingItem.id === newItem.id),
        );

        state.items = [...state.items, ...filteredNewData];
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetItems } = campersSlice.actions;
export default campersSlice.reducer;
