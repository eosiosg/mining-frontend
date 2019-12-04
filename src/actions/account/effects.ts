import { AppAction } from '../../typings/feature';
import { Dispatch } from "redux";
import { AppState } from "../../store/configureStore";
import * as ActionTyps from './constants';
import {AccountInfo, PageMinerInfo, MinerTradeInfo, PageMinerTradeInfo} from '../../typings/api/api'
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

export const setActiveMinerList = (minerContent: PageMinerInfo): AppAction => ({
  type: ActionTyps.GET_ACTIVE_MINER_LIST,
  data: minerContent
})

export const setSoldMinerList = (minerContent: PageMinerInfo): AppAction => ({
  type: ActionTyps.GET_SOLD_MINER_LIST,
  data: minerContent
})

export const setRecentTradeList = (MinerTradeInfo: MinerTradeInfo[]): AppAction => ({
  type: ActionTyps.GET_RECENT_TRADE_LIST,
  data: MinerTradeInfo
})
export const setMinerTrade = (MinerTradeInfo: PageMinerTradeInfo): AppAction => ({
  type: ActionTyps.GET_MINER_TRADE_LIST,
  data: MinerTradeInfo
})

//pageMinerTrade