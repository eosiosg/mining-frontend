import { UserInfoActionTypes } from "../typings/feature/user";
import * as ActionConstant from '../actions/account/constants'
import {MinerTradeInfo} from '../typings/api/api'
// 5 hook types to reducers
type StateType = {
  content: MinerTradeInfo[],
  pageable: {
    pageNumber: number;
    pageSize: number;
  },
  totalPages?: number;
}
const minerTradeState: StateType = {
  content: [],
  pageable: {
    pageNumber: 0,
    pageSize: 40
  }
}

export default (
  state = minerTradeState, 
  action: UserInfoActionTypes
  ): StateType => {
  switch (action.type) {
    case ActionConstant.GET_MINER_TRADE_LIST:
      return {
        content: state.content.concat(action.data.content || []),
        pageable: {
          pageNumber: action.data.pageable!.pageNumber! + 1,
          pageSize: action.data.pageable!.pageSize || 20
        },
        totalPages: action.data.totalPages

      }
    case ActionConstant.EMPTY_MINER_TRADE_LIST:
      return {
        content: [],
          pageable: {
            pageNumber: 0,
            pageSize: 40
          }
      }
    default:
      return state;
  }
};
