import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null, 
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
