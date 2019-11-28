import { AppAction } from '../../../types';
import { Dispatch } from "redux";
import { AppState } from "../../store/configureStore";
import * as ActionTyps from './constants';
import { UserType } from '../../../types/user';

// 4 hook up types to redux actions
export const setUserInfo = (userInfo: UserType): AppAction => ({
  type: ActionTyps.GET_USER_INFO_SUCCESS,
  data: userInfo
});



export const getUserInfo = () => {
  return (dispatch: Dispatch<AppAction>, getState: () => AppState) => {
    dispatch(
      setUserInfo({name: 'mytestalice1'})
    );
  };
};
