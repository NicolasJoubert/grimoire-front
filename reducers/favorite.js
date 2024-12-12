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
    setFavorite: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { toggleFavorite, setFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
