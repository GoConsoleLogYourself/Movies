import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { moviesApi } from "./moviesApi";
import movieSlice from "./slices/movieSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["movies"],
};

const rootReducer = combineReducers({
  [moviesApi.reducerPath]: moviesApi.reducer,
  movies: movieSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(moviesApi.middleware),
});

export const persistor = persistStore(store);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
