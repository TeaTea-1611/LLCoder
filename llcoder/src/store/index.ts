import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import appReducer from "./reducers/appReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import thunk from "redux-thunk";

const persistConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const appPersistConfig = {
  ...persistConfig,
  key: "app",
  whitelist: ["language", "theme"],
};

const userPersistConfig = {
  ...persistConfig,
  key: "user",
  whitelist: ["isLoggedIn"],
};

const appPersistReducer = persistReducer(appPersistConfig, appReducer as any);
const userPersistReducer = persistReducer(
  userPersistConfig,
  userReducer as any
);

//Store
const store = configureStore({
  reducer: {
    app: appPersistReducer,
    user: userPersistReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
} as any);

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
