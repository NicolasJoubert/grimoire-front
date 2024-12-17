import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    token: null,
    username: null,
    profilePic: null,
    defaultDevLanguage: {
      displayValue: 'Javascript',
      editorValue: 'javascript',
      apiValue: 'nodejs',
      isExecutable: true,
    },
    defaultEditorTheme: {
      displayValue: 'Monokaï',
      editorValue: 'monokai',
    },
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.profilePic = action.payload.profilePic;
      // Gérer le cas de l'image de profil
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.profilePic = null;
    },
    updateUsernameInStore: (state, action) => {
      state.value.username = action.payload;
    },
    updateProfilePicInStore: (state, action) => {
      state.value.profilePic = action.payload;
    },
    updateDefaultDevLangInStore: (state, action) => {
      state.value.defaultDevLanguage = action.payload;
    },
    updateDefaultEditorThemeInStore: (state, action) => {
      state.value.defaultEditorTheme = action.payload;
    },
  },
});

export const {
  login,
  logout,
  updateUsernameInStore,
  updateProfilePicInStore,
  updateDefaultDevLangInStore,
  updateDefaultEditorThemeInStore,
} = userSlice.actions;

export default userSlice.reducer;
