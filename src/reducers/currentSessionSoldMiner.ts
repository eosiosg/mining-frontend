import { UserInfoActionTypes } from "../typings/feature/user";
import * as ActionConstant from '../actions/account/constants'
// 5 hook types to reducers
type StateType = string[]
const soldMinerListState: StateType = []

export default (
  state = soldMinerListState, 
  action: UserInfoActionTypes
  ): StateType => {
  switch (action.type) {
    case ActionConstant.SET_SOLD_MINER_ID:
      return state.concat([action.data])
    default:
      return state;
  }
};
