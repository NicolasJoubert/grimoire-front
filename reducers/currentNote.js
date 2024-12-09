import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: "6756da2dd6533cabe3cf6871", 
};

export const userSlice = createSlice({
  name: 'currentNote',
  initialState,
  reducers: {
    replaceCurrentNote: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { replaceCurrentNote } = userSlice.actions;
export default userSlice.reducer;
