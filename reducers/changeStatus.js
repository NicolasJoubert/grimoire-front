import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
  modalSearchBarValue: false
};

export const favoriteSlice = createSlice({
  name: 'changeStatus',
  initialState,
  reducers: {
    toggleFavorite: (state) => {
      state.value = !state.value;
    },
    updateSetSearch: (state) => {
      state.modalSearchBarValue = true;
    },

  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
