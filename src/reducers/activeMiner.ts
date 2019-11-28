import { UserInfoActionTypes } from "../typings/feature/user";
import * as ActionConstant from '../actions/account/constants'
import {AccountInfo, PageMinerInfo, MinerInfo} from '../typings/api/api'
import _ from 'lodash';
// 5 hook types to reducers
type StateType = {
  content: MinerInfo[],
  pageable: {
    pageNumber: number;
    pageSize: number;
  },
  totalPages?: number;
}
const activeMinerListState: StateType = {
  content: [],
  pageable: {
    pageNumber: 0,
    pageSize: 40
  }
}

export default (
  state = activeMinerListState, 
  action: UserInfoActionTypes
  ): StateType => {
  switch (action.type) {
    case ActionConstant.GET_ACTIVE_MINER_LIST:
      return {
        content: state.content.concat(action.data.content || []),
        pageable: {
          pageNumber: action.data.pageable!.pageNumber! + 1,
          pageSize: action.data.pageable!.pageSize || 20
        },
        totalPages: action.data.totalPages

      }
    default:
      return state;
  }
};
