import { UserInfoActionTypes } from "../typings/feature/user";
import * as ActionConstant from '../actions/account/constants'
import {AccountInfo, PageMinerInfo, MinerInfo, MinerTradeInfo} from '../typings/api/api'
import _ from 'lodash';
// 5 hook types to reducers
type StateType = MinerTradeInfo[];
const minerTradeListState: StateType = []

export default (
  state = minerTradeListState, 
  action: UserInfoActionTypes
  ): StateType => {
  switch (action.type) {
    case ActionConstant.GET_RECENT_TRADE_LIST:
      return state.concat(action.data)
    default:
      return state;
  }
};
