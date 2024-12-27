import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false
};

export const changeStatusSlice = createSlice({
  name: 'changeStatus',
  initialState,
  reducers: {
    toggleFavorite: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleFavorite } = changeStatusSlice.actions;
export default changeStatusSlice.reducer;
