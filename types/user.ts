import * as ActionTypes from '../src/actions/user/constants'

// 1 add app specific types
export interface UserType {
    name?: string;
}

export interface SetUserInfoAction {
  type: typeof ActionTypes.GET_USER_INFO_SUCCESS;
  data: UserType;
}

export type UserInfoActionTypes = SetUserInfoAction;