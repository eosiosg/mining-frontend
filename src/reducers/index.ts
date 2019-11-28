import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import expensesReducer from './expenses'
import userInfoReducer from './user'
export const rootReducer = combineReducers({
  router: routerReducer,
  expenses: expensesReducer,
  userInfo: userInfoReducer
});