import { createEpicMiddleware } from 'redux-observable';
import rootReducer from "./root-reducer";
import { RootAction, RootState } from "typesafe-actions";
import rootEpic from "./root-epic";
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

export const epicMiddleware = createEpicMiddleware<
   any,
   any,
  RootState>();

const middleware = [...getDefaultMiddleware({serializableCheck: false}), epicMiddleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware
});

epicMiddleware.run(rootEpic);

export default store;