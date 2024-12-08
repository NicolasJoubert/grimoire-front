import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { 
    id: null, 
 },
};

export const userSlice = createSlice({
  name: 'currentNote',
  initialState,
  reducers: {
    replaceCurrentNote: (state, action) => {
      state.value.id = action.payload;
    },
  },
});

export const { replaceCurrentNote } = userSlice.actions;
export default userSlice.reducer;
