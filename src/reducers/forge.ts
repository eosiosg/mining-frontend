import { ForgeInfoActionTypes } from "../typings/feature/pool";
import * as ActionConstant from '../actions/pool/constants'
import {ForgeInfo} from '../typings/api'
// 5 hook types to reducers
const userReducerDefaultState: ForgeInfo = {
}

export default (
  state = userReducerDefaultState, 
  action: ForgeInfoActionTypes
  ): ForgeInfo => {
  switch (action.type) {
    case ActionConstant.GET_FORGE_INFO_SUCCESS:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
};
