import '../styles/globals.css';
import Head from 'next/head';

import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import currentNote from '../reducers/currentNote';
import user from '../reducers/user';
import changeStatus from '../reducers/changeStatus.js';

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const reducers = combineReducers({ currentNote, user, changeStatus });
const persistConfig = {
  key: 'grimoire',
  storage,
  blacklist: [], 
};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Grimoire</title>
        </Head>
        <GoogleOAuthProvider clientId={clientId}>
          <Component {...pageProps} />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
