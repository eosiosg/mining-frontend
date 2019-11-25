import expensesReducer from './expenses'
import {combineReducers} from 'redux'
export const rootReducer = combineReducers({
  expenses: expensesReducer
});