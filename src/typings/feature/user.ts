import * as ActionTypes from '../../actions/account/constants'
import {AccountInfo} from '../api/api'
// 1 add app specific types


export interface SetUserInfoAction {
  type: typeof ActionTypes.GET_USER_INFO_SUCCESS;
  data: AccountInfo;
}

export type UserInfoActionTypes = SetUserInfoAction;