import { ForgeInfoActionTypes } from "../typings/feature/pool";
import * as ActionConstant from '../actions/pool/constants'
import { PoolInfo } from '../typings/api'
// 5 hook types to reducers

const userReducerDefaultState: PoolInfo = {}

export default (
  state = userReducerDefaultState, 
  action: ForgeInfoActionTypes
  ): PoolInfo => {
  switch (action.type) {
    case ActionConstant.SET_POOL_INFO:
        return action.data
    default:
      return state;
  }
};
