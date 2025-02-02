import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/slice/cartSlice";
import filterReducer from "../store/slice/filterSlice"; // Import the filter slice
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { combineReducers } from "redux";

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage, // This uses localStorage
};

// Combine reducers
const rootReducer = combineReducers({
  cart: cartReducer, // Only persist cart reducer
  filter: filterReducer, // You can add other reducers here if needed
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer here
});

export const persistor = persistStore(store); // Create persistor

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
