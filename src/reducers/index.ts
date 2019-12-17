import {combineReducers} from 'redux'
import expensesReducer from './expenses'
import accountInfoReducer from './account'
import forgeInfoReducer from './forge'
import activeMinerReducer from './activeMiner'
import soldMinerReducer from './soldMiner'
import recentTradeReducer from './setRecentTrade'
import pageMinerTradeReducer from './minerTrade'
import currentSessionSoldMinerReducer from './currentSessionSoldMiner'
export const rootReducer = combineReducers({
  expenses: expensesReducer,
  accountInfo: accountInfoReducer,
  forge: forgeInfoReducer,
  activeMiner: activeMinerReducer,
  soldMiner: soldMinerReducer,
  recentTrade: recentTradeReducer,
  pageMinerTrade: pageMinerTradeReducer,
  currentSessionSoldMiner: currentSessionSoldMinerReducer,

});