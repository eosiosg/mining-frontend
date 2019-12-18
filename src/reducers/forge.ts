import { ForgeInfoActionTypes } from "../typings/feature/pool";
import * as ActionConstant from '../actions/pool/constants'
import {ForgeInfo, ForgePage} from '../typings/api'
// 5 hook types to reducers
type State = {
  forgeInfo: ForgeInfo,
  forgePageInfo: ForgePage
}
const userReducerDefaultState: State = {
  forgeInfo: {},
  forgePageInfo: {
    forgeInfo: {}
  }
}

export default (
  state = userReducerDefaultState, 
  action: ForgeInfoActionTypes
  ): State => {
  switch (action.type) {
    case ActionConstant.GET_FORGE_INFO_SUCCESS:
      return {
        ...state,
        forgeInfo: {
          ...action.data
        }
      };
    case ActionConstant.GET_FORGE_PAGE_INFO_SUCCESS:
      return {
        ...state,
        forgePageInfo: {
          ...action.data
        }
      };
    default:
      return state;
  }
};
