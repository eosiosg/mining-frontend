import * as ActionTypes from '../../actions/pool/constants'
import {ForgeInfo} from '../api/api'
// 1 add app specific types


export interface SetForgeInfoAction {
  type: typeof ActionTypes.GET_FORGE_INFO_SUCCESS;
  data: ForgeInfo;
}

export type ForgeInfoActionTypes = SetForgeInfoAction;