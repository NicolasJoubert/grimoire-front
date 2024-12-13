import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    toggleFavorite: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
