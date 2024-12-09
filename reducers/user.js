import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { 
    token: null, 
    username: null,
    profilePic: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      // Gérer le cas de l'image de profil
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.profilePic = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
