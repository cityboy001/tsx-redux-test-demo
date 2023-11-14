import {
  Action,
  PreloadedState,
  StoreCreator,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import cartReducer from "./cart";
import listReducer from "./list";

export const rootReducer = combineReducers({
  cart: cartReducer,
  list: listReducer,
});

export function setupStore(
  preloadedState?: PreloadedState<ReturnType<typeof rootReducer>>,
) {
  
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

type GetReducerDataStructrue<S> = S extends ToolkitStore<infer U, any, any>
  ? U
  : any;

export type AppStore = ReturnType<typeof setupStore>;

export type ReducerDataStructrue = GetReducerDataStructrue<AppStore>;
