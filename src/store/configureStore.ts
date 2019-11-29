import { createStore, applyMiddleware, compose } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { AppAction } from "../typings/feature";
import {routerMiddleware} from 'react-router-redux'
 import {rootReducer} from '../reducers/index';
 import createHistory from "history/createBrowserHistory";
// hook up types to redux store

export type AppState = ReturnType<typeof rootReducer>; // 3 create app state types
export const history = createHistory();

export const store = createStore(
  rootReducer, 
  compose(
    applyMiddleware(routerMiddleware(history), thunk as ThunkMiddleware<AppState, AppAction>),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  )
  
);
