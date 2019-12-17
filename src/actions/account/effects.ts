import { AppAction } from '../../typings/feature';
import { Dispatch } from "redux";
import { AppState } from "../../store/configureStore";
import * as ActionTyps from './constants';
import {
  AccountInfo, 
  PageMinerInfo, 
  MinerTradeInfo, 
  PageMinerTradeInfo
} from '../../typings/api/api'

function getQueryVariable() {
  let query = window.location.search.substring(1);
  let vars = query.split('&');
  let res : {
    [key: string]: string
  }= {};
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      res[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])
  }
  return res;

}
// 4 hook up types to redux actions
type QueryObject = {
  query? : {
    refer?: string,
  account?: string
  }
}
export type TypeAccountInfo = AccountInfo & QueryObject
export const setUserInfo = (accountInfo: TypeAccountInfo): AppAction => ({
  type: ActionTyps.GET_USER_INFO_SUCCESS,
  data: accountInfo
});



export const getUserInfo = () => {
  return (dispatch: Dispatch<AppAction>, getState: () => AppState) => {
    let urlQuery = getQueryVariable();
    dispatch(
      setUserInfo({
        query: urlQuery
      })
    );
  };
};

export const setActiveMinerList = (minerContent: PageMinerInfo): AppAction => ({
  type: ActionTyps.GET_ACTIVE_MINER_LIST,
  data: minerContent
})

export const emptyActiveMinerList = (): AppAction => ({
  type: ActionTyps.EMPTY_ACTIVE_MINER_LIST
})

export const setSoldMinerList = (minerContent: PageMinerInfo): AppAction => ({
  type: ActionTyps.GET_SOLD_MINER_LIST,
  data: minerContent
})
export const setSoldMiner = (minerId: string): AppAction => ({
  type: ActionTyps.SET_SOLD_MINER_ID,
  data: minerId
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