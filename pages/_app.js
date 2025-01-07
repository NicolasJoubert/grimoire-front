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

const clientId =
  '713388606117-hcnrsufui8347oe75c0ejarar29eqpdb.apps.googleusercontent.com';

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
          <meta
            name='description'
            content='Grimoire est une application de gestion de notes et de favoris conçue pour les développeurs. Créez, organisez et accédez rapidement à vos notes en toute simplicité.'
          />
          <meta charSet='UTF-8' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
          <meta
            name='keywords'
            content='notes, exécuter du code, développeur, gestion de notes, grimoire'
          />
        </Head>
        <GoogleOAuthProvider clientId={clientId}>
          <Component {...pageProps} />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
