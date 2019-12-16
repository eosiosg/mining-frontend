import { UserInfoActionTypes } from "../typings/feature/user";
import * as ActionConstant from '../actions/account/constants'
import { TypeAccountInfo } from "actions/account/effects";
// 5 hook types to reducers
const userReducerDefaultState: TypeAccountInfo = {
}

export default (
  state = userReducerDefaultState, 
  action: UserInfoActionTypes
  ): TypeAccountInfo => {
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
