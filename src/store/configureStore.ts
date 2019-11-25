import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import expensesReducer from "../reducers/expenses";
import { AppAction } from "../../types/actions";
import {rootReducer} from '../reducers/index';
// hook up types to redux store

export type AppState = ReturnType<typeof rootReducer>; // 3 create app state types

export const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<AppState, AppAction>));
