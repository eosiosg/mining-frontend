import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import expensesReducer from './expenses'
import accountInfoReducer from './account'
import forgeInfoReducer from './forge'
import activeMinerReducer from './activeMiner'
import soldMinerReducer from './soldMiner'
import recentTradeReducer from './setRecentTrade'
import pageMinerTradeReducer from './minerTrade'
export const rootReducer = combineReducers({
  expenses: expensesReducer,
  accountInfo: accountInfoReducer,
  forge: forgeInfoReducer,
  activeMiner: activeMinerReducer,
  soldMiner: soldMinerReducer,
  recentTrade: recentTradeReducer,
  pageMinerTrade: pageMinerTradeReducer,

});