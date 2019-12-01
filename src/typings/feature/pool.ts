import * as ActionTypes from '../../actions/pool/constants'
import {ForgeInfo, ForgePage} from '../api/api'
// 1 add app specific types


export interface SetForgeInfoAction {
  type: typeof ActionTypes.GET_FORGE_INFO_SUCCESS;
  data: ForgeInfo;
}
export interface SetForgePageInfoAction {
  type: typeof ActionTypes.GET_FORGE_PAGE_INFO_SUCCESS;
  data: ForgePage;
}

export type ForgeInfoActionTypes = 
  | SetForgeInfoAction
  | SetForgePageInfoAction;