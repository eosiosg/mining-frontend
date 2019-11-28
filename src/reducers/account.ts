import { UserInfoActionTypes } from "../typings/feature/user";
import * as ActionConstant from '../actions/account/constants'
import {AccountInfo} from '../typings/api/api'
// 5 hook types to reducers
const userReducerDefaultState: AccountInfo = {
}

export default (
  state = userReducerDefaultState, 
  action: UserInfoActionTypes
  ): AccountInfo => {
  switch (action.type) {
    case ActionConstant.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
};
