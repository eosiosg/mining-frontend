import { UserInfoActionTypes } from "../../types/user";
import { UserType } from "../../types/user";
import * as ActionConstant from '../actions/user/constants'
// 5 hook types to reducers
const userReducerDefaultState: UserType = {
}

export default (
  state = userReducerDefaultState, 
  action: UserInfoActionTypes
  ): UserType => {
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
