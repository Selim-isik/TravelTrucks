import { createSlice } from "@reduxjs/toolkit";

const getInitialFavorites = () => {
  try {
    const item = localStorage.getItem("favorites");
    return item ? JSON.parse(item) : [];
  } catch (error) {
    return [];
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: getInitialFavorites(),
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const camperId = action.payload;
      const index = state.items.indexOf(camperId);

      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(camperId);
      }

      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
