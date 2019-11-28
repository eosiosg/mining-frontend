import { AppAction } from '../../typings/feature';
import { Dispatch } from "redux";
import { AppState } from "../../store/configureStore";
import * as ActionTyps from './constants';
import {AccountInfo} from '../../typings/api/api'
// 4 hook up types to redux actions
export const setUserInfo = (accountInfo: AccountInfo): AppAction => ({
  type: ActionTyps.GET_USER_INFO_SUCCESS,
  data: accountInfo
});



export const getUserInfo = () => {
  return (dispatch: Dispatch<AppAction>, getState: () => AppState) => {
    dispatch(
      setUserInfo({accountName: 'mytestalice1'})
    );
  };
};
