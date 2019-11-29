import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import expensesReducer from './expenses'
import accountInfoReducer from './account'
import forgeInfoReducer from './forge'
import activeMinerReducer from './activeMiner'
import soldMinerReducer from './soldMiner'
export const rootReducer = combineReducers({
  expenses: expensesReducer,
  accountInfo: accountInfoReducer,
  forgeInfo: forgeInfoReducer,
  activeMiner: activeMinerReducer,
  soldMiner: soldMinerReducer,
});