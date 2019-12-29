import { UserInfoActionTypes } from "../typings/feature/user";
import * as ActionConstant from '../actions/account/constants'
import {MinerTradeInfo} from '../typings/api/api'
// 5 hook types to reducers
type StateType = MinerTradeInfo[];
const minerTradeListState: StateType = []

export default (
  state = minerTradeListState, 
  action: UserInfoActionTypes
  ): StateType => {
  switch (action.type) {
    case ActionConstant.GET_RECENT_TRADE_LIST:
      return action.data
    case ActionConstant.EMPTY_RECENT_TRADE_LIST:
      return []
    default:
      return state;
  }
};
