import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import expensesReducer from './expenses'
import accountInfoReducer from './account'
import forgeInfoReducer from './forge'
export const rootReducer = combineReducers({
  router: routerReducer,
  expenses: expensesReducer,
  accountInfo: accountInfoReducer,
  forgeInfo: forgeInfoReducer
});