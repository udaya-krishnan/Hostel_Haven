import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import rootReducer from './rootReducer';
import storage from 'redux-persist/lib/storage'
import {  persistStore,persistReducer} from 'redux-persist'

const persistConfig={
  key:"root",
  storage,
  whitelist:['auth','hostauth','admin']
}

const persistedReducer=persistReducer(persistConfig,rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export const persistor=persistStore(store)

