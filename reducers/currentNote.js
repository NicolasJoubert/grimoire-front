import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
  title: '',
};

export const userSlice = createSlice({
  name: 'currentNote',
  initialState,
  reducers: {
    replaceCurrentNote: (state, action) => {
      state.value = action.payload;
    },
    deleteCurrentNote: (state) => {
      state.value = null;
    },
    updateTitleNote: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { replaceCurrentNote, deleteCurrentNote, updateTitleNote } =
  userSlice.actions;
export default userSlice.reducer;
