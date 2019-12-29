import { UserInfoActionTypes } from "../typings/feature/user";
import * as ActionConstant from '../actions/account/constants'
import {MinerInfo} from '../typings/api/api'
// 5 hook types to reducers
type StateType = {
  content: MinerInfo[],
  pageable: {
    pageNumber: number;
    pageSize: number;
  },
  totalPages?: number;
}
const soldMinerListState: StateType = {
  content: [],
  pageable: {
    pageNumber: 0,
    pageSize: 40
  }
}

export default (
  state = soldMinerListState, 
  action: UserInfoActionTypes
  ): StateType => {
  switch (action.type) {
    case ActionConstant.GET_SOLD_MINER_LIST:
      return {
        content: state.content.concat(action.data.content || []),
        pageable: {
          pageNumber: action.data.pageable!.pageNumber! + 1,
          pageSize: action.data.pageable!.pageSize || 20
        },
        totalPages: action.data.totalPages

      }
    case ActionConstant.EMPTY_SOLD_MINER_LIST:
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
